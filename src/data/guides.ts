import { GuideMetadata } from '@/types';

export const GUIDES: GuideMetadata[] = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'Prepare Images for a Website: Resize, Convert, Compare',
    description: 'Use target dimensions and browser format conversion to prepare an image, then compare the real output instead of relying on a promised compression percentage.',
    readingTime: '4 min read',
    author: 'DocuForge',
    tags: ['Image Sizing', 'Image Formats', 'Web Workflows'],
    content: `
## Start with the displayed dimensions

The number of pixels and the encoded file size are different things. If an image is 2400 × 1600 pixels but the design displays it at 1200 pixels wide, the [Image Resizer](/image-resizer) can reduce it to 1200 × 800 while keeping its proportions. This example halves each dimension; it does not predict a particular file-size reduction.

Keep the original file. Resizing removes pixels, and upscaling a smaller source cannot restore detail.

## Compare a useful export

1. Select the image in the [Image Compressor](/image-compressor). The tool accepts JPG, PNG, and WebP up to 25 MB.
2. Choose a scale from 25% to 100% and a quality setting from 10% to 95%. The quality value is an encoder setting, not a target file size.
3. Check both the output dimensions and the displayed size change. The output can be larger.
4. Inspect the result at the size it will be used. Look closely at text, sharp edges, gradients, and transparent areas.

PNG input in this compressor is encoded as WebP, which supports transparency. If the recipient requires PNG, use the [Image Converter](/image-converter) and compare its output instead. JPG has no transparency; converting transparent artwork to JPG requires a background color.

## Choose the next step from the problem

- If the image is too many pixels wide or tall, resize it first.
- If its framing includes unwanted edges, crop it with the [Image Cropper](/image-cropper).
- If a site or app requires a particular format, use the [Image Converter](/image-converter), then verify the saved file opens in that destination.
- If you are preparing an image for a PDF, check the page-size requirements before converting it with [Image to PDF](/image-to-pdf).

There is no universally best quality value. Keep the source, compare the actual output, and choose the smallest file that remains acceptable for the intended use.
    `
  },
  {
    slug: 'jpg-vs-png-vs-webp-comparison',
    title: 'JPG vs PNG vs WebP: Choose a Format for the Task',
    description: 'Compare transparency, encoding trade-offs, and compatibility for common image workflows without assuming one format is always smaller.',
    readingTime: '4 min read',
    author: 'DocuForge',
    tags: ['Image Formats', 'Compatibility', 'Web Workflows'],
    content: `
## Compare the practical differences

| Format | Transparency | Typical trade-off | Check before using |
| :--- | :--- | :--- | :--- |
| JPG / JPEG | No | Lossy encoding is widely supported; repeated lossy saves can introduce more changes. | Choose a background for transparent source pixels and inspect edges. |
| PNG | Yes | Lossless encoding is useful when exact decoded pixels or transparency matter; photographic files may be large. | Check the recipient accepts PNG and compare its actual size. |
| WebP | Yes | Supports lossy and lossless encoding; this site’s converters use browser Canvas encoding. | Confirm the target app, upload portal, or older editor accepts WebP. |

File size depends on the image, its dimensions, the encoder, and its settings. A format name alone cannot tell you which result will be smaller.

## Select based on the destination

- **A photo for a service that accepts JPG:** use JPG if compatibility matters most. If the source has transparency, choose a background before conversion.
- **A logo or screenshot with transparent pixels:** keep PNG or use WebP only if the destination accepts it. The [PNG to JPG tool](/png-to-jpg) fills transparent pixels with a selected solid color.
- **A website image:** test WebP with the browsers and content pipeline the site actually supports. Compare the downloaded image with the source rather than relying on a fixed savings claim.
- **An image for older desktop software:** check that software’s supported formats first; [WebP to JPG](/webp-to-jpg) can create a JPEG copy.

The [Image Converter](/image-converter) re-encodes one image at a time as JPG, PNG, or WebP. Conversion is not a substitute for keeping an editable source, and some metadata or pixel data may change. Save the result under a new name and verify it in the target application.
    `
  },
  {
    slug: 'how-to-reduce-pdf-file-size',
    title: 'How to Troubleshoot a Large PDF',
    description: 'Find out whether pages, embedded images, or the source export are responsible, and understand what DocuForge’s PDF re-save tool can and cannot reduce.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['PDF Tools', 'Optimization', 'Office Productivity'],
    content: `
## First identify what is taking space

PDF size can come from scanned page images, embedded fonts, many pages, or the way the source application wrote the file. A text-heavy PDF and a photo scan can behave very differently. Check the file’s properties in a PDF reader and inspect whether the pages are images before choosing a workflow.

## What the DocuForge tool actually does

The tool at [/compress-pdf](/compress-pdf) loads a PDF with \`pdf-lib\`, copies its pages into a new document, and saves with object streams enabled. It does **not** downsample or recompress embedded page images. The output can be smaller, similar in size, or larger. Keep the original and compare both file sizes.

## Workflows to try

1. **Only some pages are needed:** use [Split PDF](/split-pdf) with a range such as \`2-5, 8\`. This makes a new PDF with the selected pages; it does not optimize the remaining pages.
2. **You are creating a PDF from images:** resize oversized images to a suitable pixel dimension with [Image Resizer](/image-resizer), then create the document with [Image to PDF](/image-to-pdf). This changes the source images, so retain the originals.
3. **You have an existing image-heavy PDF:** use a PDF application that can downsample images if the document must become smaller. Compare its output and inspect text, images, forms, and signatures.
4. **A portal has a strict limit:** check its exact file-size and format rules. Do not assume a “compress” action meets the limit; verify the saved file’s actual size.

The inspected tool components process selected files in the browser and do not send their contents to a DocuForge upload endpoint. This does not cover hosting requests, device security, or third-party services; see the [Privacy Policy](/privacy).
    `
  },
  {
    slug: 'how-to-merge-pdf-files-securely',
    title: 'How to Merge PDFs and Verify the Result',
    description: 'Arrange PDF files, merge them with the DocuForge browser-based tool, and check the resulting document.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['PDF Tools', 'Security', 'Document Management'],
    content: `
## Prepare a predictable order

Keep copies of the source PDFs and decide the reading order before opening the [Merge PDF tool](/merge-pdf). The workspace shows the selected filenames, page counts, and total input size. Use its up and down controls to arrange whole files; it does not reorder pages within a file.

For example, to combine a cover sheet, a two-page form, and an appendix, add them in that order and confirm the page count of each before merging. If a page is sideways, use [Rotate PDF](/rotate-pdf) on the source first, or rotate the merged output and inspect it.

## Merge and inspect

1. Select at least two PDF files. A file that fails to load may be invalid or encrypted; the tool reports an error for files it cannot read.
2. Check names, order, and page counts. Remove any unintended file.
3. Start the merge and save the downloaded document under a new name.
4. Open the result in the PDF reader your recipient will use. Check page order, page orientation, links, forms, bookmarks, signatures, and any other features you rely on.

This tool copies pages with \`pdf-lib\`; do not assume every interactive or document-specific feature in the original survives. The selected files are processed by the tool in your browser, but that is not a compliance certification. Read the [Privacy Policy](/privacy) for the scope of that statement.
    `
  },
  {
    slug: 'how-to-convert-images-to-pdf',
    title: 'Turn Ordered Images into an A4 or Letter PDF',
    description: 'Create a PDF with one image per page, choose paper size and margins, and check the exported document before sending or printing it.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['PDF Tools', 'Productivity', 'Office Tips'],
    content: `
## Decide the page shape first

The [Image to PDF tool](/image-to-pdf) makes one PDF page for each selected JPG, PNG, or WebP image. It can use A4, US Letter, or Fit to Image. A4 and Letter have 20- or 40-point margin options and automatic, portrait, or landscape orientation. Fit to Image uses the image’s pixel dimensions as PDF points and does not offer the page-margin or orientation controls.

## Assemble a readable packet

1. Select the scans or photos. Add them in sequence, then use the up and down buttons to correct the page order.
2. Choose A4 or US Letter if the recipient specifies paper size. Use Auto orientation to match each image’s shape, or select one orientation for all pages.
3. Choose a margin. If text is close to an image edge, inspect the PDF at print size; a margin cannot restore content already cut off in the source image.
4. Generate the PDF and open it in a PDF reader. Check page order, rotation, legibility, and final file size.

The tool embeds images; it does not recognize text or create searchable OCR. Large camera images can make a large PDF. If size matters, resize source images first with [Image Resizer](/image-resizer), preserve the originals, and compare the resulting PDF against the recipient’s requirements.

The inspected tool code processes selected images in the browser and does not send their contents to a DocuForge upload endpoint. That statement does not cover hosting requests, device security, or third-party services. See the [Privacy Policy](/privacy).
    `
  },
  {
    slug: 'how-to-crop-and-resize-images-for-web-and-social-media',
    title: 'Crop and Resize an Image Without Stretching It',
    description: 'Choose between removing part of an image and changing its pixel dimensions, then check the result against the current requirements of its destination.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['Design', 'Social Media', 'Image Optimization'],
    content: `
## Cropping and resizing solve different problems

Cropping removes part of the frame. Resizing changes the pixel width and height of the whole frame. Neither operation guarantees a particular file size or appearance; the source image and output encoding matter.

## Example: make a square avatar

1. Open the [Image Cropper](/image-cropper) and choose the 1:1 preset.
2. Move the crop box to include the subject. Drag its bottom-right handle to resize it; the current interface does not provide four independent corner handles.
3. Apply the crop and check the output dimensions and framing.
4. If the destination specifies pixel dimensions, use [Image Resizer](/image-resizer) to set them. Keep aspect-ratio lock on unless you intend to distort the image.

For a 16:9 banner, select that crop preset and then resize to the exact pixel dimensions required by the target. For other ratios such as 4:5, check the destination’s current specifications; the cropper does not provide that preset.

Upscaling adds pixels through resampling but cannot recover detail that was not in the original. Downscaling may soften fine text or edges, so compare the saved output at its expected display size. Keep an untouched source if you may need another crop later.
    `
  },
  {
    slug: 'why-client-side-file-tools-are-safer',
    title: 'How Browser-Based File Processing Works',
    description: 'See what local image and PDF processing means, what requests still occur when visiting the site, and which privacy limits remain.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['Privacy', 'Security', 'Web Architecture'],
    content: `
## What “processed in your browser” describes

The inspected image tools use browser image and Canvas APIs. The PDF tools use file reads and \`pdf-lib\` in the page. Their file-processing code does not send selected file contents to a DocuForge upload endpoint.

That is a narrow statement about these tool components. Opening the site still requests HTML, scripts, styles, and images from the host. The site also loads the Google AdSense library for publisher verification; that is separate from displaying ads, which remains disabled. The contact form sends a submission to Web3Forms when configured.

## Check a workflow, not just a slogan

To inspect a tool operation, open browser developer tools before selecting a non-sensitive test file. In the Network panel, observe requests while processing and downloading. A network request for a page asset or third-party script does not by itself mean the selected file was uploaded; inspect the request and its payload. Do not use a confidential file for this test.

Client-side processing does not remove all risks. The browser and device control memory use; large files can fail or slow down a device. Closing a tab is not a guaranteed secure memory-erasure procedure. This architecture is not a legal, security, or compliance certification. Read the [Privacy Policy](/privacy) and follow your organization’s rules before processing sensitive files.
    `
  },
  {
    slug: 'how-to-split-and-extract-pdf-pages',
    title: 'Extract Specific Pages from a PDF',
    description: 'Use page numbers and ranges to create one PDF from selected pages, then verify its order and contents.',
    readingTime: '3 min read',
    author: 'DocuForge',
    tags: ['PDF Tools', 'Productivity', 'Office Tips'],
    content: `
## Enter pages using the document’s page numbers

The [Split PDF tool](/split-pdf) accepts single pages and ranges separated by commas. For example, \`2-4, 7\` means pages 2, 3, 4, and 7. The tool uses 1-based page numbers, checks values against the loaded page count, removes duplicates, and writes the selected pages in ascending order into one new PDF.

## Verify the extracted document

1. Open the source PDF and note its total page count. Use the page labels shown by the PDF reader as the tool’s page numbers.
2. Enter a short range first, such as \`1-2\`, if you are unfamiliar with the document.
3. Generate the file and open it. Check its page count, first and last pages, and whether the intended sections are present.
4. If pages are sideways, use [Rotate PDF](/rotate-pdf). To join the extracted pages with another document, use [Merge PDF](/merge-pdf).

The tool creates a single extracted PDF; it does not create one file per page. It copies selected pages with \`pdf-lib\`, so inspect forms, signatures, bookmarks, links, and other features that matter to your use. Keep the original unchanged.
    `
  }
];

export function getGuideBySlug(slug: string): GuideMetadata | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
