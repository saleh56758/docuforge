import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

console.log('=== STARTING FUNCTIONAL & SEO TEST SUITE ===\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName} ${details ? '(' + details + ')' : ''}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}: ${details}`);
  }
}

async function runTests() {
  const scratchDir = path.resolve('./test-artifacts');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  // 1. PDF Creation Test (Sample source documents)
  console.log('\n--- 1. Testing PDF Generation & Manipulation Engine ---');

  // Create sample Doc 1 (2 pages)
  const doc1 = await PDFDocument.create();
  const page1 = doc1.addPage([400, 400]);
  page1.drawText('Sample Document 1 - Page 1', { x: 50, y: 350, size: 18, color: rgb(0.1, 0.1, 0.1) });
  const page2 = doc1.addPage([400, 400]);
  page2.drawText('Sample Document 1 - Page 2', { x: 50, y: 350, size: 18, color: rgb(0.1, 0.1, 0.1) });
  const doc1Bytes = await doc1.save();
  const doc1Path = path.join(scratchDir, 'sample-1.pdf');
  fs.writeFileSync(doc1Path, doc1Bytes);
  assert(fs.existsSync(doc1Path) && doc1Bytes.length > 0, 'Generate Sample PDF 1', `${doc1Bytes.length} bytes, 2 pages`);

  // Create sample Doc 2 (1 page)
  const doc2 = await PDFDocument.create();
  const doc2Page = doc2.addPage([400, 400]);
  doc2Page.drawText('Sample Document 2 - Page 1', { x: 50, y: 350, size: 18, color: rgb(0.2, 0.4, 0.8) });
  const doc2Bytes = await doc2.save();
  const doc2Path = path.join(scratchDir, 'sample-2.pdf');
  fs.writeFileSync(doc2Path, doc2Bytes);
  assert(fs.existsSync(doc2Path) && doc2Bytes.length > 0, 'Generate Sample PDF 2', `${doc2Bytes.length} bytes, 1 page`);

  // 2. Test Merge PDF
  console.log('\n--- 2. Testing Merge PDF Engine ---');
  const mergedDoc = await PDFDocument.create();
  const loaded1 = await PDFDocument.load(doc1Bytes);
  const loaded2 = await PDFDocument.load(doc2Bytes);

  const copied1 = await mergedDoc.copyPages(loaded1, loaded1.getPageIndices());
  copied1.forEach((p) => mergedDoc.addPage(p));
  const copied2 = await mergedDoc.copyPages(loaded2, loaded2.getPageIndices());
  copied2.forEach((p) => mergedDoc.addPage(p));

  const mergedBytes = await mergedDoc.save();
  const mergedPath = path.join(scratchDir, 'test-merged.pdf');
  fs.writeFileSync(mergedPath, mergedBytes);

  const verifyMerged = await PDFDocument.load(mergedBytes);
  assert(verifyMerged.getPageCount() === 3, 'Merge PDF Page Count Verification', 'Expected 3 pages (2+1), got ' + verifyMerged.getPageCount());

  // 3. Test Split PDF
  console.log('\n--- 3. Testing Split PDF Engine ---');
  const splitDoc = await PDFDocument.create();
  // Extract page 2 (index 1) and page 3 (index 2)
  const splitCopied = await splitDoc.copyPages(verifyMerged, [1, 2]);
  splitCopied.forEach((p) => splitDoc.addPage(p));
  const splitBytes = await splitDoc.save();
  const verifySplit = await PDFDocument.load(splitBytes);
  assert(verifySplit.getPageCount() === 2, 'Split PDF Range Extraction', 'Extracted 2 pages from 3-page document');

  // 4. Test Rotate PDF
  console.log('\n--- 4. Testing Rotate PDF Engine ---');
  const rotateDoc = await PDFDocument.load(doc1Bytes);
  const rPages = rotateDoc.getPages();
  rPages[0].setRotation(degrees(90));
  const rotatedBytes = await rotateDoc.save();
  const verifyRotated = await PDFDocument.load(rotatedBytes);
  const rotAngle = verifyRotated.getPages()[0].getRotation().angle;
  assert(rotAngle === 90, 'Rotate PDF Angle Modification', 'Page 1 rotated to 90 degrees');

  // 5. Test Compress PDF Stream Optimization
  console.log('\n--- 5. Testing Compress PDF Optimization ---');
  const compressDoc = await PDFDocument.load(mergedBytes);
  const optimizedBytes = await compressDoc.save({ useObjectStreams: true });
  assert(optimizedBytes.length > 0, 'Compress PDF Binary Stream Recompression', `Optimized size: ${optimizedBytes.length} bytes`);

  // 6. Test Image-to-PDF Engine
  console.log('\n--- 6. Testing Image-to-PDF Embedding ---');
  // Create 1x1 test PNG base64
  const png1x1Base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const pngBuffer = Buffer.from(png1x1Base64, 'base64');
  const imgToPdfDoc = await PDFDocument.create();
  const embeddedPng = await imgToPdfDoc.embedPng(pngBuffer);
  const imgPage = imgToPdfDoc.addPage([595.28, 841.89]); // A4
  imgPage.drawImage(embeddedPng, { x: 50, y: 50, width: 200, height: 200 });
  const imgPdfBytes = await imgToPdfDoc.save();
  const verifyImgPdf = await PDFDocument.load(imgPdfBytes);
  assert(verifyImgPdf.getPageCount() === 1, 'Image to PDF A4 Compilation', 'Embedded PNG onto standard A4 page');

  // 7. Test HTTP Routes on localhost:3000
  console.log('\n--- 7. Testing HTTP Routes & Technical SEO Status ---');
  const testUrls = [
    '/',
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
    '/image-to-pdf',
    '/guides',
    '/guides/how-to-compress-images-without-losing-quality',
    '/guides/how-to-merge-pdf-files-securely',
    '/guides/jpg-vs-png-vs-webp-comparison',
    '/guides/how-to-convert-images-to-pdf',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/sitemap.xml',
    '/robots.txt'
  ];

  for (const urlPath of testUrls) {
    try {
      const res = await fetch(`http://localhost:3000${urlPath}`);
      const text = await res.text();
      assert(res.status === 200, `Route: ${urlPath}`, `HTTP 200, Size: ${text.length} chars`);

      if (urlPath === '/robots.txt') {
        assert(text.includes('Sitemap: https://docuforge.app/sitemap.xml'), 'robots.txt has Sitemap directive');
        assert(text.includes('Allow: /'), 'robots.txt allows root');
      }

      if (urlPath === '/sitemap.xml') {
        assert(text.includes('<loc>https://docuforge.app/image-compressor</loc>'), 'sitemap.xml contains image-compressor');
        assert(text.includes('<loc>https://docuforge.app/merge-pdf</loc>'), 'sitemap.xml contains merge-pdf');
      }

      if (urlPath.includes('-') && !urlPath.includes('guides')) {
        // Verify Schema.org WebApplication
        assert(text.includes('"@type":"WebApplication"'), `Schema WebApplication on ${urlPath}`);
        // Verify Single H1
        const h1Matches = text.match(/<h1[^>]*>/g);
        assert(h1Matches && h1Matches.length === 1, `Single H1 on ${urlPath}`, `Found ${h1Matches ? h1Matches.length : 0} h1 tag(s)`);
      }
    } catch (err) {
      assert(false, `Route: ${urlPath}`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`TEST SUITE SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log(`========================================\n`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
