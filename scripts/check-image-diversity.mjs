import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'src', 'data', 'imageCatalog.json');
const publicDirectory = path.join(root, 'public');
const imageDirectory = path.join(root, 'public', 'images');
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const assets = [
  catalog.homepage,
  ...Object.values(catalog.tools),
  ...Object.values(catalog.blog),
  ...Object.values(catalog.guides)
];
const errors = [];
const imageExtensions = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const uniqueValues = (property) => {
  const seen = new Map();
  for (const asset of assets) {
    const value = asset[property];
    if (seen.has(value)) {
      errors.push(`${property} is repeated for ${seen.get(value)} and ${asset.route}: ${value}`);
    } else {
      seen.set(value, asset.route);
    }
  }
};

uniqueValues('imageBase');
uniqueValues('route');
uniqueValues('sourceUrl');

const sourceIds = new Map();
for (const asset of assets) {
  const sourceId = new URL(asset.sourceUrl).pathname;
  if (sourceIds.has(sourceId)) {
    errors.push(`Unsplash photo ID is repeated for ${sourceIds.get(sourceId)} and ${asset.route}: ${sourceId}`);
  } else {
    sourceIds.set(sourceId, asset.route);
  }
}

for (const asset of assets) {
  if (asset.downloadUrl !== `${asset.sourceUrl}?fit=crop&crop=entropy&w=1400&h=933&fm=jpg&q=84`) {
    errors.push(`Unexpected source transform for ${asset.route}`);
  }
}

for (const asset of assets) {
  if (!asset.alt || asset.alt.length < 15) {
    errors.push(`Missing or unhelpful alt text for ${asset.route}`);
  }
  if (!asset.sourceUrl.startsWith('https://images.unsplash.com/photo-')) {
    errors.push(`Unexpected source URL for ${asset.route}: ${asset.sourceUrl}`);
  }
  if (asset.license !== 'Unsplash License' || asset.attribution !== 'Not required') {
    errors.push(`Unexpected license metadata for ${asset.route}`);
  }
}

const toolSource = await readFile(path.join(root, 'src', 'data', 'tools.ts'), 'utf8');
const guideSource = await readFile(path.join(root, 'src', 'data', 'guides.ts'), 'utf8');
const toolPageSource = await readFile(path.join(root, 'src', 'components', 'ToolPageContainer.tsx'), 'utf8');
const guidePageSource = await readFile(path.join(root, 'src', 'app', 'guides', '[slug]', 'page.tsx'), 'utf8');
const homepageSource = await readFile(path.join(root, 'src', 'app', 'page.tsx'), 'utf8');
if (!toolPageSource.includes('IMAGE_CATALOG.tools[tool.slug]')) errors.push('Tool headers must resolve their image from the route-keyed catalog.');
if (!guidePageSource.includes('IMAGE_CATALOG.guides[guide.slug]')) errors.push('Guide features must resolve their image from the route-keyed catalog.');
if (!homepageSource.includes('IMAGE_CATALOG.homepage')) errors.push('The homepage hero must resolve its image from the catalog.');
const slugsFrom = (source) => [...source.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((match) => match[1]);
const checkRouteCoverage = (name, expected, actual) => {
  const missing = expected.filter((slug) => !actual.includes(slug));
  const extra = actual.filter((slug) => !expected.includes(slug));
  if (missing.length || extra.length) {
    errors.push(`${name} catalog mismatch; missing: ${missing.join(', ') || 'none'}; extra: ${extra.join(', ') || 'none'}`);
  }
};

checkRouteCoverage('Tool', slugsFrom(toolSource), Object.keys(catalog.tools));
checkRouteCoverage('Guide', slugsFrom(guideSource), Object.keys(catalog.guides));

const blogSource = await readFile(path.join(root, 'src', 'app', 'blog', 'page.tsx'), 'utf8');
const blogKeys = [...blogSource.matchAll(/IMAGE_CATALOG\.blog\['([^']+)'\]/g)].map((match) => match[1]);
checkRouteCoverage('Blog workflow', Object.keys(catalog.blog), blogKeys);

const expectedFiles = new Set(assets.flatMap(({ imageBase }) => [`${imageBase}-800.webp`, `${imageBase}.webp`]));
const actualFiles = (await readdir(imageDirectory)).filter((name) => imageExtensions.test(name));
for (const file of expectedFiles) {
  if (!actualFiles.includes(file)) errors.push(`Missing responsive image: public/images/${file}`);
}
for (const file of actualFiles) {
  if (!expectedFiles.has(file)) errors.push(`Uncatalogued image asset: public/images/${file}`);
}

async function listFiles(directory, relativeDirectory = '', excludedDirectories = new Set()) {
  const entries = await readdir(path.join(directory, relativeDirectory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory() && !excludedDirectories.has(entry.name)) {
      files.push(...await listFiles(directory, relativePath, excludedDirectories));
    }
    else files.push(relativePath);
  }
  return files;
}

const publicImages = (await listFiles(publicDirectory)).filter((file) => imageExtensions.test(file));
const repositoryImageFiles = (await listFiles(root, '', new Set(['.git', '.next', 'node_modules', 'out'])))
  .filter((file) => imageExtensions.test(file));
const hashOwners = new Map();
for (const file of repositoryImageFiles) {
  const filePath = path.join(root, file);
  const bytes = await readFile(filePath);
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (hashOwners.has(hash)) {
    errors.push(`Identical image files: ${hashOwners.get(hash)} and ${file}`);
  } else {
    hashOwners.set(hash, file);
  }
  if (file.startsWith(`${path.join('public', 'images')}${path.sep}`) && (await stat(filePath)).size > 300_000) {
    errors.push(`Image exceeds 300 KB optimization budget: ${file}`);
  }
}

const sourceFiles = (await listFiles(path.join(root, 'src'))).filter((file) => /\.(tsx?|css)$/i.test(file));
for (const file of sourceFiles) {
  if (file === path.join('components', 'ResponsiveImage.tsx')) continue;
  const source = await readFile(path.join(root, 'src', file), 'utf8');
  if (/\/images\/[A-Za-z0-9_-]/.test(source)) {
    errors.push(`Hard-coded public image path outside ResponsiveImage: src/${file}`);
  }
}

if (errors.length) {
  console.error(`Image diversity check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${assets.length} unique placements, ${repositoryImageFiles.length} repository images, and ${actualFiles.length} curated files.`);
  for (const asset of assets) console.log(`${asset.route} -> ${asset.imageBase}`);
  console.log('No repeated source URLs, image paths, exact file hashes, or uncatalogued images found.');
}
