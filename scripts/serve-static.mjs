import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, normalize, resolve } from 'node:path';

const outputDirectory = resolve('out');
const port = Number.parseInt(process.env.PORT || '3000', 10);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.woff2': 'font/woff2'
};

const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

function isWithinOutputDirectory(filePath) {
  return filePath === outputDirectory || filePath.startsWith(`${outputDirectory}\\`);
}

async function firstExistingFile(candidates) {
  for (const candidate of candidates) {
    const filePath = resolve(outputDirectory, normalize(candidate));
    if (!isWithinOutputDirectory(filePath)) continue;
    try {
      if ((await stat(filePath)).isFile()) return filePath;
    } catch {
      // Try the next clean-URL variant.
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, securityHeaders);
    response.end('Bad request');
    return;
  }

  const relativePath = pathname.replace(/^\/+/, '');
  const filePath = await firstExistingFile(
    pathname === '/'
      ? ['index.html']
      : [relativePath, `${relativePath}.html`, `${relativePath}/index.html`]
  );
  const isNotFound = !filePath;
  const finalPath = filePath || resolve(outputDirectory, '404.html');
  const contentType = contentTypes[extname(finalPath).toLowerCase()] || 'application/octet-stream';

  response.writeHead(isNotFound ? 404 : 200, {
    ...securityHeaders,
    'Content-Type': contentType
  });
  createReadStream(finalPath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Serving Cloudflare Pages static export at http://127.0.0.1:${port}`);
});
