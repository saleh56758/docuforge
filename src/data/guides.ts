import { GuideMetadata } from '@/types';

export const GUIDES: GuideMetadata[] = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'How to Compress Images While Managing File Size and Quality',
    description: 'Learn how compression settings affect JPG and WebP images, compare lossless and lossy formats, and choose a workflow that balances file size and visual quality.',
    readingTime: '6 min read',
    author: 'DocuForge Technical Team',
    tags: ['Optimization', 'Web Performance', 'Core Web Vitals'],
    content: `
## The Critical Impact of Image Weight on Modern Websites

Images can account for a substantial share of a page's transferred data, depending on its content and implementation. Large image files may take longer to transfer, particularly on slower connections. Image optimization can help page performance, but the result depends on the page and its other resources.

Optimizing images is not about destroying image fidelity or producing pixelated visuals. It is about understanding how human visual perception works and leveraging mathematical quantization algorithms to strip unneeded binary data.

### Understanding Lossless vs. Lossy Compression

When selecting an optimization technique, it is essential to understand the two fundamental families of compression algorithms:

- **Lossless Compression**: Preserves decoded pixel values, though metadata or ancillary chunks may differ. It is common in PNG and lossless WebP. File-size results depend on the source image.
- **Lossy Compression**: Reduces image data to make smaller files, with a possible trade-off in visual quality. It is common in JPEG and lossy WebP. The outcome depends on the source image, format, dimensions, and quality setting.

### The Human Eye & Perceptual Quantization

Human vision is significantly more sensitive to variations in luminance (brightness and edge contrast) than to chrominance (color hue nuances). Modern lossy compressors take advantage of this biological trait through chroma subsampling (often 4:2:0 subsampling), storing color data at half the resolution of brightness data.

When you adjust the quality slider on the [DocuForge Image Compressor](/image-compressor), you are directly controlling the quantization matrix:

- **Higher quality settings**: Usually retain more visual detail and may produce larger output files.
- **Middle quality settings**: Can provide a useful balance for some images, but compare the output with the source before use.
- **Lower quality settings**: May produce more visible compression artifacts, especially around edges and text.

### Compression Benchmarks Across Common Formats

| Format | Native Compression | Recommended Quality | Average Size Reduction | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **JPEG / JPG** | Lossy | Depends on encoder and use | Varies by image and settings | Photographs |
| **WebP** | Lossy & Lossless | Depends on encoder and use | Varies by image and settings | Web images where supported |
| **PNG** | Lossless | Not applicable | Varies by image | Graphics and images needing transparency |

### Four Step Strategy for Peak Optimization

To prepare images for a website, consider these steps and review the resulting quality:

1. **Resize Dimensions Before Compressing**: If an image is larger than its intended display size, reduce its dimensions with our [Image Resizer](/image-resizer). This changes the pixel dimensions, so keep a copy of the original.
2. **Crop Out Unnecessary Margins**: Frame your subject tightly using the [Image Cropper](/image-cropper) to remove extraneous background clutter.
3. **Compare Formats**: Try our [JPG to WebP Converter](/jpg-to-webp) and compare the result. File-size and visual-quality differences depend on the source and selected settings.
4. **Preserve Master Copies**: Always keep an uncompressed source archive on your local hard drive. Once lossy compression is applied, the discarded high-frequency data cannot be recovered.
    `
  },
  {
    slug: 'jpg-vs-png-vs-webp-comparison',
    title: 'JPG vs PNG vs WebP: Image Format Comparison',
    description: 'Compare file sizes, compression efficiency, transparency support, and browser compatibility to pick the right image format for your project.',
    readingTime: '7 min read',
    author: 'DocuForge Technical Team',
    tags: ['Web Design', 'Formats', 'Core Web Vitals'],
    content: `
## The Format Dilemma: Choosing the Right Tool for the Job

Selecting the wrong digital image format is one of the most common causes of sluggish websites, bloated mobile data consumption, and pixelated graphics. While all three major web formats—JPG, PNG, and WebP—render pixels on screens, their underlying compression mathematics, color models, and feature sets differ drastically.

Understanding these technical distinctions empowers you to minimize file weight while delivering pristine visual clarity.

### Detailed Technical Comparison

| Feature | JPEG / JPG | PNG | WebP |
| :--- | :--- | :--- | :--- |
| **Compression Architecture** | Lossy (DCT) | Lossless (LZ77 + Huffman) | Both Lossy (VP8) & Lossless |
| **Alpha Transparency** | ❌ No (Opaque only) | ✅ Yes (8-bit alpha channel) | ✅ Yes (8-bit alpha channel) |
| **Animation Support** | ❌ No | ❌ No (Separate APNG) | ✅ Yes |
| **Color Depth** | 24-bit Truecolor (16.7M) | 8-bit Indexed or 24/48-bit | 24-bit RGB with 8-bit Alpha |
| **Typical File Footprint** | Varies | Varies | Varies by image and encoder |
| **Browser Support** | Broadly supported | Broadly supported | Check support for target browsers |
| **Primary Sweet Spot** | Camera photos, print media | Logos, charts, transparent UI | Modern web pages, mobile apps |

### Deep Dive: JPEG (Joint Photographic Experts Group)

Created in 1992, JPEG remains a widely used format for digital cameras and legacy publishing. JPEG divides the image into 8x8 pixel blocks and applies the Discrete Cosine Transform (DCT) to discard subtle color variations that human eyes struggle to see.

- **Strengths**: Broad support across browsers, devices, and software.
- **Weaknesses**: No transparency support (transparent pixels become solid white or black). Repeatedly saving a JPEG causes generational degradation.
- **When to Use**: High-resolution photography meant for desktop download, legacy software editing, or physical printing.

### Deep Dive: PNG (Portable Network Graphics)

Developed as an open-source replacement for GIF in 1996, PNG utilizes lossless DEFLATE compression. Every single pixel value is preserved exactly as created.

- **Strengths**: Pixel-perfect precision, support for 256 levels of alpha transparency, and zero compression artifacting around high-contrast edges and typography.
- **Weaknesses**: PNG files can be larger than JPEG files for photographic content, depending on the image and encoding.
- **When to Use**: Company logos, website navigation icons, technical schematics, software screenshots, and graphics requiring transparent backgrounds. If your PNG files are too heavy for email, convert them using our [PNG to JPG Converter](/png-to-jpg).

### Deep Dive: WebP (Google Next-Gen Format)

Introduced by Google, WebP supports lossy and lossless compression, transparency, and animation. Check that the browsers and software in your workflow support the format.

- **Strengths**: Supports lossy and lossless options, transparency, and animation.
- **Weaknesses**: Older desktop software (like Adobe CS6 or legacy photo viewers) may require plugins to open local \`.webp\` files.
- **When to Use**: Consider WebP for websites and apps when your target browsers and software support it. If you need a different format, use our [WebP to JPG Converter](/webp-to-jpg).

### Decision Guide: Which Format Should You Choose?

1. **Does the image require a transparent background?**
   - If yes: Choose **WebP** for websites, or **PNG** for desktop publishing and print.
2. **Is the image a photographic scene or complex artwork?**
   - If yes: Convert to **WebP** via our [JPG to WebP Converter](/jpg-to-webp) for web use, or keep **JPG** for printing.
3. **Is the graphic a simple UI icon, vector export, or screenshot?**
   - If yes: Use **PNG** or lossless **WebP**.
4. **Need to batch convert formats?**
   - Use our [Image Converter](/image-converter) to convert between JPG, PNG, and WebP in your browser.
    `
  },
  {
    slug: 'how-to-reduce-pdf-file-size',
    title: 'How to Reduce PDF File Size for Email Attachments and Online Portals',
    description: 'Explore practical ways to manage large PDFs, including extracting needed pages, resizing source images, and testing browser-based PDF re-saving.',
    readingTime: '5 min read',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Optimization', 'Office Productivity'],
    content: `
## Why PDF File Sizes Vary

PDF size depends on its page count, embedded images, image resolution, fonts, and how the source application created the file. A PDF made from scanned photos may be much larger than one containing mostly text. There is no single setting that guarantees a smaller result for every document.

### Practical Ways to Work with a Large PDF

1. **Extract only the pages you need**: Use the [Split PDF tool](/split-pdf) to create a new PDF from selected page ranges. Review the resulting document before sharing it.
2. **Resize source images first**: If you are creating a PDF from images, resize oversized images with the [Image Resizer](/image-resizer) before using the [Image to PDF tool](/image-to-pdf).
3. **Test PDF re-saving**: The [Compress PDF tool](/compress-pdf) rebuilds a PDF from copied pages and saves with object streams enabled. It reports the before-and-after sizes, but the result may be larger or smaller. Keep the original and inspect the output.

### Handling Sensitive Documents

The inspected tool components process selected files in the browser and do not send those files to a DocuForge upload endpoint. This does not cover ordinary website requests, hosting, device security, or third-party services. Review the [Privacy Policy](/privacy) and your organization's requirements before processing sensitive files.
    `
  },
  {
    slug: 'how-to-merge-pdf-files-securely',
    title: 'How to Merge Multiple PDF Files in Your Browser',
    description: 'Arrange PDF files, merge them with the DocuForge browser-based tool, and check the resulting document.',
    readingTime: '5 min read',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Security', 'Document Management'],
    content: `
## Prepare Your Documents

Before merging, choose the files you want to combine and keep an unchanged copy of each original. The DocuForge [Merge PDF tool](/merge-pdf) reads selected files in the browser and uses pdf-lib to copy their pages into a new document.

### Step-by-Step Guide to Merging PDFs

1. **Prepare your files**: Ensure all PDFs are unencrypted (remove password protection first if applicable).
2. **Select files**: Open the [DocuForge Merge PDF Tool](/merge-pdf) and select the PDF files in the workspace.
3. **Order your files**: Arrange files in chronological or logical reading order using the intuitive Up and Down arrow controls.
4. **Verify total page counts**: Check that each included document has loaded with its expected page count.
5. **Merge and save**: Start the merge and download the resulting PDF.

### Review the Result

The tool rebuilds a PDF from copied pages. Check the output in your target PDF reader, particularly if your documents contain interactive forms, signatures, bookmarks, or other document-specific features. The file-processing code inspected does not send selected file contents to a DocuForge upload endpoint; this is not a legal or compliance certification.

### Managing Orientation and Page Extraction

Before merging, make sure that all pages read right-side up. If you have upside-down scans, use our [Rotate PDF Tool](/rotate-pdf) first. If you only need certain chapters or pages from a large source file, use our [Split PDF Tool](/split-pdf) to extract them before merging everything into your final master document.
    `
  },
  {
    slug: 'how-to-convert-images-to-pdf',
    title: 'How to Convert and Compile Images into a Clean Multi-Page PDF Document',
    description: 'Learn how to compile receipts, photos, and scanned identity documents into standard A4 or Letter PDFs ready for professional submission.',
    readingTime: '5 min read',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Productivity', 'Office Tips'],
    content: `
## Why Convert Images into a Unified PDF?

Some government portals, universities, accounting departments, and legal offices require a single, multi-page PDF instead of separate JPG and PNG files. Check the recipient's submission requirements.

Submitting loose photos creates major problems: files arrive in random order, image orientations are mismatched, and attachments get rejected by email file size filters.

### Common Problems When Creating PDFs from Images

- **Mismatched aspect ratios**: Images taken in different orientations (vertical smartphone receipts vs horizontal desktop screenshots) often look distorted when converted by basic tools.
- **Inflated file size**: Simply wrapping raw camera photos can create a massive 50 MB PDF that gets rejected by email servers.
- **Unintended margins**: Inconsistent borders make official submissions look amateurish.

### Best Practices for Clean Image-to-PDF Conversion

1. **Select the Right Page Standard**:
   - If compiling documents for international submission or European offices, select **A4**.
   - For North American offices and institutions, select **US Letter**.
   - If you want the PDF pages to match the exact dimensions of each photo with zero borders, select **Fit to Image**.
2. **Order Carefully**: Group receipts chronologically or sequence multi-page contracts from page 1 to the end using the reorder buttons in our [Image to PDF Converter](/image-to-pdf).
3. **Choose Consistent Margins**: Adding a small uniform margin prevents text on receipt edges from getting cut off by office printers.
4. **Compress Oversized Photos First**: If your camera photos are 10 MB each, run them through our [Image Compressor](/image-compressor) before compiling them into a PDF.

### Handling Sensitive Images

The inspected image-to-PDF component reads selected images and creates the PDF in the browser; it does not send those files to a DocuForge upload endpoint. This does not cover ordinary website requests, device security, or third-party services. Consider your organization's rules before processing sensitive records.
    `
  },
  {
    slug: 'how-to-crop-and-resize-images-for-web-and-social-media',
    title: 'How to Crop and Resize Images for Web and Social Media Platforms',
    description: 'Master standard aspect ratios (1:1, 16:9, 4:5, 9:16), pixel dimensions for Open Graph cards, and how to avoid interpolation blur.',
    readingTime: '6 min read',
    author: 'DocuForge Technical Team',
    tags: ['Design', 'Social Media', 'Image Optimization'],
    content: `
## Why Image Dimensions Matter for Visual Engagement

Websites and social platforms may display images within particular aspect ratios or dimensions. Depending on the service, an image that does not match its requirements may be cropped, resized, or recompressed.

Choosing suitable dimensions and framing can help your image display as intended on your target platform.

### Standard Aspect Ratios & Dimension Cheat Sheet

| Platform / Use Case | Aspect Ratio | Ideal Dimensions | Tool Recommendation |
| :--- | :--- | :--- | :--- |
| **Open Graph (Web Link Previews)** | 1.91:1 | 1200 x 630 px | [Image Resizer](/image-resizer) |
| **LinkedIn / GitHub / Discord Avatar** | 1:1 (Square) | 400 x 400 px | [Image Cropper](/image-cropper) |
| **Instagram Feed (Portrait)** | 4:5 | 1080 x 1350 px | [Image Cropper](/image-cropper) |
| **Instagram / TikTok Stories** | 9:16 (Vertical) | 1080 x 1920 px | [Image Cropper](/image-cropper) |
| **YouTube Thumbnail / Presentation** | 16:9 (Widescreen) | 1280 x 720 px | [Image Cropper](/image-cropper) |
| **Standard Website Hero Banner** | 16:9 or 21:9 | 1920 x 1080 px | [Image Resizer](/image-resizer) |

### The Difference Between Cropping and Resizing

- **Cropping**: Changes the *composition and aspect ratio* of an image by cutting away outer edges or background margins. It does not scale or distort the pixels that remain. Use our [Image Cropper](/image-cropper) when framing an avatar or converting a horizontal photo into a square.
- **Resizing**: Changes the *overall pixel dimensions* of the entire image by scaling the pixel grid up or down. Use our [Image Resizer](/image-resizer) when your composition is already perfect, but the file is 4000px wide and you need it to be exactly 1200px wide.

### Best Practices to Prevent Blurry Resizing

1. **Downscale, Don't Upscale**: Scaling a 4000px image down to 1200px results in razor-sharp details. Upscaling a 400px thumbnail to 1920px forces the browser to invent missing pixel data, producing noticeable blur.
2. **Lock Aspect Ratios**: Always keep the aspect ratio lock enabled when resizing to prevent awkward horizontal or vertical stretching.
3. **Compress After Resizing**: Once your image is sized to the exact layout dimensions, run it through our [Image Compressor](/image-compressor) to minimize byte weight.
    `
  },
  {
    slug: 'why-client-side-file-tools-are-safer',
    title: 'How Browser-Based File Processing Works',
    description: 'Learn how local browser-based image and PDF processing differs from upload-based workflows and what privacy considerations still apply.',
    readingTime: '6 min read',
    author: 'DocuForge Technical Team',
    tags: ['Privacy', 'Security', 'Web Architecture'],
    content: `
## Browser-Based Processing

Some image and PDF tools can read selected files in the browser and perform transformations locally. DocuForge's inspected tool components use browser image APIs and the JavaScript \`pdf-lib\` library for these operations.

### What Local Processing Means

The inspected file-processing code does not send selected file contents to a DocuForge upload endpoint. This is different from saying the website makes no network requests: browsers still request the page, scripts, styles, and other site resources. Contact-form submissions are also separate and are sent to Web3Forms when the form is configured.

### Limits and Practical Checks

- Browser memory and processing capacity depend on the device, browser, file, and operation.
- Closing a tab should not be treated as a guaranteed secure memory-erasure procedure; memory lifecycle is controlled by the browser and operating system.
- Client-side processing alone does not establish legal compliance or guarantee that a workflow satisfies an organization's privacy requirements.
- If you want to inspect a particular operation, use your browser's developer tools and review network activity while processing a test file.

For practical file tasks, try the [Merge PDF tool](/merge-pdf), [Compress PDF tool](/compress-pdf), or [Image Compressor](/image-compressor). Keep an original copy and review every output before relying on it.
    `
  },
  {
    slug: 'how-to-split-and-extract-pdf-pages',
    title: 'How to Split Large PDFs and Extract Specific Pages Accurately',
    description: 'Learn how to extract targeted page ranges, separate multi-invoice documents, and isolate chapters with a browser-based PDF tool.',
    readingTime: '5 min read',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Productivity', 'Office Tips'],
    content: `
## The Challenge of Oversized Multi-Page Documents

Whether dealing with a 200-page corporate financial audit, a scanned multi-tenant lease agreement, or an academic course textbook, sharing the entire file when the recipient only needs two specific pages is inefficient, clutters inboxes, and risks exposing confidential sections.

Splitting large PDF documents into manageable, targeted files is an essential digital productivity skill.

### Practical Scenarios for Splitting PDFs

- **Isolating Invoices**: Accounting teams frequently receive consolidated monthly billing statements containing dozens of separate client invoices. Splitting allows each client to receive only their specific statement.
- **Extracting Signed Signature Pages**: Legal teams often need to extract just the executed signature addendum to archive alongside contract summaries.
- **Submitting Academic Chapters**: University portals frequently limit submission uploads to 10 MB, requiring students to split dissertations into individual chapter files.

### Syntax Rules for Targeted Page Extraction

When using our [Split PDF Tool](/split-pdf), you can define precise extraction targets using standard page range syntax:

- **Hyphen for Continuous Sequences**: Entering \`1-5\` extracts pages 1 through 5 as a unified document.
- **Comma for Discrete Pages**: Entering \`1, 4, 7\` extracts only pages 1, 4, and 7.
- **Combined Syntax**: Entering \`1-3, 6, 9-12\` extracts pages 1 through 3, page 6, and pages 9 through 12 into a single new PDF.

### Preserving Document Integrity

When you split a PDF using DocuForge, the tool uses pdf-lib to copy selected pages into a new document. Review the output, especially if the source contains forms, signatures, bookmarks, or other document-specific features.

- If any pages in the extracted document are oriented sideways, use our [Rotate PDF Tool](/rotate-pdf) and review the result.
- If you need to combine the extracted pages with another document, use our [Merge PDF Tool](/merge-pdf).
    `
  }
];

export function getGuideBySlug(slug: string): GuideMetadata | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
