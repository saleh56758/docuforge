import { GuideMetadata } from '@/types';

export const GUIDES: GuideMetadata[] = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'How to Compress Images Without Losing Visible Quality',
    description: 'Learn the difference between lossy and lossless compression, optimal quality thresholds for JPG and WebP, and how to reduce file sizes by 70% while keeping visuals sharp.',
    readingTime: '5 min read',
    publishedDate: 'October 2026',
    author: 'DocuForge Technical Team',
    tags: ['Optimization', 'Web Performance', 'Image Formats'],
    content: `
## Why Image Optimization Matters for SEO and User Experience

Images make up over 60% of the total byte weight on an average webpage. When website visitors on mobile networks encounter heavy 5 MB hero banners, page load times balloon, bounce rates surge, and Google Core Web Vitals (specifically Largest Contentful Paint - LCP) suffer.

Optimizing images is not about destroying image fidelity; it is about eliminating redundant binary metadata and choosing perceptual compression algorithms that match human vision thresholds.

### Understanding Lossless vs. Lossy Compression

- **Lossless Compression**: Retains 100% of the original pixel data. It works by identifying repeated patterns and removing non-essential EXIF metadata (camera model, GPS coordinates, timestamps). Common in PNG files. Size reductions typically range from 10% to 25%.
- **Lossy Compression**: Selectively discards high-frequency pixel variations that the human eye cannot discern under typical viewing conditions. Common in JPG and WebP. Can achieve 50% to 85% file size reductions.

### Recommended Quality Thresholds

| Image Format | Ideal Quality Slider | Typical Size Reduction | Recommended Use Case |
| :--- | :--- | :--- | :--- |
| **JPEG / JPG** | 78% – 82% | 60% – 75% | Photographs, complex illustrations |
| **WebP** | 80% – 85% | 70% – 85% | All modern web images & mobile apps |
| **PNG** | 90% or Lossless | 20% – 40% | Logos, transparent icons, diagrams |

### Best Practices Before Compressing

1. **Scale dimensions first**: Never upload a 4000x3000px image if it will only ever display at 800x600px on your blog. Downscale dimensions before or during compression.
2. **Convert to WebP**: Converting a standard JPG to WebP at the same visual quality typically saves an immediate additional 25–35% in byte size.
3. **Keep an uncompressed archive**: Always keep your raw high-resolution files stored safely offline before compressing web copies.
    `
  },
  {
    slug: 'how-to-merge-pdf-files-securely',
    title: 'How to Merge Multiple PDF Files Securely Without Server Uploads',
    description: 'A comprehensive guide on combining contracts, invoices, and reports into a single organized document using browser-side sandboxed PDF manipulation.',
    readingTime: '4 min read',
    publishedDate: 'October 2026',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Security', 'Document Management'],
    content: `
## The Hidden Privacy Risk of Online PDF Converters

Millions of users daily upload sensitive financial spreadsheets, tax forms, employment contracts, and medical summaries to generic "free PDF merge" websites. Many of these services upload your files to remote cloud servers where they may be stored, indexed, or cached indefinitely.

### How Client-Side Browser Processing Protects You

Modern browsers support WebAssembly and HTML5 Canvas sandboxing. By utilizing pure client-side PDF libraries such as \`pdf-lib\`, documents are read into your computer's local RAM:

1. **Zero Network Egress**: The file bytes never travel over the internet to an external server.
2. **No Data Retention Risk**: Once you close or reload the browser tab, the temporary memory buffer is immediately reclaimed by the OS.
3. **Compliance Friendly**: Safe for corporate compliance under GDPR, HIPAA, and CCPA guidelines since no third-party data processing agreement is required.

### Step-by-Step Guide to Merging PDFs

1. **Prepare your files**: Ensure all PDFs are unencrypted (remove password protection first if applicable).
2. **Order your files**: Arrange files in chronological or logical reading order. With DocuForge Merge PDF, use the Up and Down arrow controls to quickly reposition files.
3. **Verify total page counts**: Check that each included document has loaded with its expected page count.
4. **Merge and save**: Click Merge. The browser extracts the page trees, cross-reference tables, and font streams, stitching them into a unified PDF structure within milliseconds.
    `
  },
  {
    slug: 'jpg-vs-png-vs-webp-comparison',
    title: 'JPG vs PNG vs WebP: Which Format Should You Use?',
    description: 'Compare file sizes, compression efficiency, transparency support, and browser compatibility to pick the right image format for your project.',
    readingTime: '6 min read',
    publishedDate: 'October 2026',
    author: 'DocuForge Technical Team',
    tags: ['Web Design', 'Formats', 'Core Web Vitals'],
    content: `
## The Format Dilemma: Picking the Right Tool for the Job

Selecting the wrong image format is one of the most common causes of slow websites and bloated file storage. Here is a clear, technical comparison of the three dominant web graphics formats.

### Format Comparison Matrix

| Feature | JPG / JPEG | PNG | WebP |
| :--- | :--- | :--- | :--- |
| **Compression Type** | Lossy | Lossless | Both Lossy & Lossless |
| **Transparency (Alpha)** | ❌ No | ✅ Yes | ✅ Yes |
| **Animation Support** | ❌ No | ❌ No (APNG separate) | ✅ Yes |
| **Average File Size** | Moderate | Large | Small (25-35% smaller than JPG) |
| **Browser Compatibility** | 100% | 100% | >97% (All modern browsers) |
| **Best For** | Camera photos, print | Logos, screenshots, line art | Web pages, modern UI, apps |

### When to Choose WebP

For website assets, blog featured images, and e-commerce product catalogs, WebP is now the industry gold standard. It combines the photographic compression strengths of JPEG with the alpha transparency of PNG, all while cutting file weight substantially.

### When to Retain JPG

Use JPG when creating files destined for older print software, legacy photo kiosks, desktop operating systems from before 2020, or specialized desktop publishing workflows.

### When to Retain PNG

Use PNG when you require bit-for-bit mathematical accuracy on crisp typography, pixel-art icons, or when creating software diagrams where fuzzy compression artifacts around high-contrast edges would be noticeable.
    `
  },
  {
    slug: 'how-to-convert-images-to-pdf',
    title: 'How to Convert and Format Images into a Clean PDF Document',
    description: 'Learn how to compile receipts, photos, and scanned identity documents into standard A4 or Letter PDFs ready for professional submission.',
    readingTime: '4 min read',
    publishedDate: 'October 2026',
    author: 'DocuForge Technical Team',
    tags: ['PDF Tools', 'Productivity', 'Office Tips'],
    content: `
## Why Convert Images into a Unified PDF?

Government portals, university admissions boards, accounting departments, and legal offices almost universally reject loose collections of JPG and PNG image files. They require a single, standardized, multi-page PDF document.

### Common Problems When Creating PDFs from Images

- **Mismatched aspect ratios**: Images taken in different orientations (vertical smartphone receipts vs horizontal desktop screenshots) often look distorted when converted by basic tools.
- **Inflated file size**: Simply wrapping raw camera photos can create a massive 50 MB PDF that gets rejected by email servers.
- **Unintended margins**: Inconsistent borders make official submissions look amateurish.

### Best Practices for Clean Image-to-PDF Conversion

1. **Select the Right Page Standard**:
   - If compiling documents for international submission or European offices, select **A4**.
   - For North American offices and institutions, select **US Letter**.
   - If you want the PDF pages to match the exact dimensions of each photo with zero borders, select **Fit to Image**.
2. **Order Carefully**: Group receipts chronologically or sequence multi-page contracts from page 1 to the end.
3. **Choose Consistent Margins**: Adding a small uniform margin prevents text on receipt edges from getting cut off by office printers.
    `
  }
];

export function getGuideBySlug(slug: string): GuideMetadata | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
