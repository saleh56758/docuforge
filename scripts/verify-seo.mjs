import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const origin = (process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3000').trim().replace(/\/$/, '');
const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://docuforge.pages.dev').trim().replace(/\/$/, '');

const toolRoutes = [
  '/image-compressor',
  '/image-resizer',
  '/image-cropper',
  '/jpg-to-webp',
  '/webp-to-jpg',
  '/png-to-jpg',
  '/image-converter',
  '/merge-pdf',
  '/split-pdf',
  '/rotate-pdf',
  '/compress-pdf',
  '/image-to-pdf'
];

const guideRoutes = [
  '/guides/how-to-compress-images-without-losing-quality',
  '/guides/how-to-merge-pdf-files-securely',
  '/guides/jpg-vs-png-vs-webp-comparison',
  '/guides/how-to-convert-images-to-pdf'
];

const indexableRoutes = [
  '/',
  ...toolRoutes,
  '/guides',
  ...guideRoutes,
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies'
];

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function getMetaContent(html, attribute, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => getAttribute(candidate, attribute) === value);
  return tag ? getAttribute(tag, 'content') : null;
}

function getCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const tag = tags.find((candidate) => getAttribute(candidate, 'rel') === 'canonical');
  return tag ? getAttribute(tag, 'href') : null;
}

function getTitle(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null;
}

function getSchemas(html) {
  const schemas = [];
  const expression = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = expression.exec(html))) {
    try {
      schemas.push(JSON.parse(match[1]));
    } catch (error) {
      throw new Error(`Invalid JSON-LD: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return schemas;
}

function schemaTypes(schemas) {
  return schemas.flatMap((schema) => {
    const entries = Array.isArray(schema) ? schema : [schema];
    return entries.map((entry) => entry['@type']);
  });
}

async function fetchRoute(path) {
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
  return { response, body: await response.text() };
}

function expectedCanonical(path) {
  return path === '/' ? siteOrigin : `${siteOrigin}${path}`;
}

function getJpegDimensions(buffer) {
  assert.equal(buffer[0], 0xff, 'JPEG should start with FF');
  assert.equal(buffer[1], 0xd8, 'JPEG should start with D8');
  for (let offset = 2; offset < buffer.length - 9; offset += 1) {
    if (buffer[offset] === 0xff && buffer[offset + 1] >= 0xc0 && buffer[offset + 1] <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5)
      };
    }
  }
  throw new Error('JPEG dimensions were not found');
}

function getPngDimensions(buffer) {
  assert.equal(buffer.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Expected a PNG signature');
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

const titles = new Set();
const descriptions = new Set();
const discoveredInternalLinks = new Set();
let assertions = 0;

for (const route of indexableRoutes) {
  const { response, body } = await fetchRoute(route);
  assert.equal(response.status, 200, `${route} must return HTTP 200`);
  assertions += 1;

  const title = getTitle(body);
  const description = getMetaContent(body, 'name', 'description');
  const canonical = getCanonical(body);
  const ogImage = getMetaContent(body, 'property', 'og:image');
  const twitterImage = getMetaContent(body, 'name', 'twitter:image');

  assert.ok(title, `${route} must have a title`);
  assert.ok(description, `${route} must have a meta description`);
  assert.equal(canonical, expectedCanonical(route), `${route} must have the expected canonical URL`);
  assert.ok(ogImage?.endsWith('/og-image.jpg'), `${route} must use the JPEG Open Graph image`);
  assert.ok(twitterImage?.endsWith('/og-image.jpg'), `${route} must use the JPEG Twitter image`);
  assertions += 5;

  assert.ok(!titles.has(title), `${route} has a duplicate title: ${title}`);
  assert.ok(!descriptions.has(description), `${route} has a duplicate description`);
  titles.add(title);
  descriptions.add(description);
  assertions += 2;

  const headingLevels = [...body.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) => Number(match[1]));
  assert.equal(headingLevels.filter((level) => level === 1).length, 1, `${route} must have exactly one H1`);
  for (let index = 1; index < headingLevels.length; index += 1) {
    assert.ok(
      headingLevels[index] <= headingLevels[index - 1] + 1,
      `${route} must not skip from H${headingLevels[index - 1]} to H${headingLevels[index]}`
    );
  }
  assertions += headingLevels.length + 1;

  const hrefs = body.match(/<a\b[^>]*href=["'][^"']+["'][^>]*>/gi) ?? [];
  for (const tag of hrefs) {
    const href = getAttribute(tag, 'href');
    if (!href?.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split('#')[0].split('?')[0] || '/';
    if (!path.startsWith('/_next/')) discoveredInternalLinks.add(path);
  }

  const schemas = getSchemas(body);
  assert.ok(schemas.length > 0, `${route} must expose parseable JSON-LD`);
  assertions += 1;

  const types = schemaTypes(schemas);
  if (toolRoutes.includes(route)) {
    for (const requiredType of ['WebApplication', 'BreadcrumbList', 'HowTo', 'FAQPage']) {
      assert.ok(types.includes(requiredType), `${route} is missing ${requiredType} schema`);
      assertions += 1;
    }
  }
  if (guideRoutes.includes(route)) {
    assert.ok(types.includes('Article'), `${route} is missing Article schema`);
    assert.ok(types.includes('BreadcrumbList'), `${route} is missing BreadcrumbList schema`);
    assertions += 2;
  }
}

const home = await fetchRoute('/');

for (const href of discoveredInternalLinks) {
  const { response } = await fetchRoute(href);
  assert.equal(response.status, 200, `Internal link ${href} must not be broken`);
  assertions += 1;
}

const { response: sitemapResponse, body: sitemap } = await fetchRoute('/sitemap.xml');
assert.equal(sitemapResponse.status, 200, 'sitemap.xml must return HTTP 200');
assert.match(sitemapResponse.headers.get('content-type') ?? '', /xml/i, 'sitemap.xml must be XML');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(locations).size, locations.length, 'sitemap.xml must not contain duplicate locations');
for (const route of indexableRoutes) {
  assert.ok(locations.includes(expectedCanonical(route)), `sitemap.xml is missing ${route}`);
  assertions += 1;
}
assertions += 3;

const { response: robotsResponse, body: robots } = await fetchRoute('/robots.txt');
assert.equal(robotsResponse.status, 200, 'robots.txt must return HTTP 200');
assert.match(robots, /User-Agent: \*/i, 'robots.txt must include a default user agent rule');
assert.match(robots, new RegExp(`Sitemap: ${siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/sitemap\\.xml`, 'i'), 'robots.txt must reference the configured sitemap');
assertions += 3;

const requiredHeaders = [
  'strict-transport-security',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy'
];
for (const header of requiredHeaders) {
  assert.ok(home.response.headers.get(header), `Homepage must include the ${header} header`);
  assertions += 1;
}

for (const [path, contentType] of [
  ['/og-image.jpg', /image\/jpeg/i],
  ['/icon-192.png', /image\/png/i],
  ['/icon-512.png', /image\/png/i],
  ['/site.webmanifest', /application\/manifest\+json|application\/json/i],
  ['/llms.txt', /text\/plain/i]
]) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, `${path} must return HTTP 200`);
  assert.match(response.headers.get('content-type') ?? '', contentType, `${path} must have the expected content type`);
  assertions += 2;
}

const ogDimensions = getJpegDimensions(await readFile('public/og-image.jpg'));
assert.deepEqual(ogDimensions, { width: 1200, height: 630 }, 'Open Graph image must be 1200×630');
assert.deepEqual(getPngDimensions(await readFile('public/icon-192.png')), { width: 192, height: 192 }, '192px icon dimensions must be valid');
assert.deepEqual(getPngDimensions(await readFile('public/icon-512.png')), { width: 512, height: 512 }, '512px icon dimensions must be valid');
assertions += 3;

const { response: notFoundResponse, body: notFound } = await fetchRoute('/this-route-does-not-exist');
assert.equal(notFoundResponse.status, 404, 'Unknown routes must return HTTP 404');
assert.match(notFound, /<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/i, '404 page must be noindex, nofollow');
assertions += 2;

const css = await readFile('src/styles/globals.css', 'utf8');
assert.match(css, /@media \(max-width: 480px\)[\s\S]*?\.tool-grid,[\s\S]*?\.contact-grid[\s\S]*?minmax\(0, 1fr\) !important/, 'Narrow mobile grids must collapse to one non-overflowing column');
assert.match(css, /\.filter-tabs\s*\{[\s\S]*?flex-wrap: wrap/, 'Filter tabs must wrap on narrow displays');
assertions += 2;

console.log(`SEO verification passed: ${assertions} assertions across ${indexableRoutes.length} indexable routes and ${discoveredInternalLinks.size} internal links.`);
