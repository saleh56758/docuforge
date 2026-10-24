import { ToolMetadata } from '@/types';

export const TOOLS: ToolMetadata[] = [
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    title: 'Image Compressor',
    shortDescription: 'Compress JPG, PNG, and WebP images directly in your browser without sacrificing visual quality.',
    fullDescription: 'Reduce file sizes of JPG, PNG, and WebP images by up to 80% while retaining crisp visual clarity. Adjust compression level in real time and see before/after size comparisons before downloading.',
    category: 'image',
    iconName: 'Minimize2',
    badge: 'Popular',
    features: [
      'Interactive quality slider with real-time file size estimation',
      'Lossy and visually lossless compression algorithms',
      'Supports JPG, PNG, and WebP formats',
      '100% client-side: images never leave your computer',
      'Before & after byte-level size comparison'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSizeMB: 25,
    seoTitle: 'Free Image Compressor Online — Shrink JPG, PNG & WebP Safely',
    seoDescription: 'Compress JPG, PNG, and WebP images online for free. Adjust quality, preview file size reduction instantly, and download compressed images with zero server uploads.',
    keywords: ['image compressor', 'compress jpg', 'compress png', 'shrink image size', 'reduce photo file size', 'online image optimizer'],
    howToSteps: [
      { title: 'Upload Image', text: 'Drag and drop your JPG, PNG, or WebP file into the upload zone or click to select from your device.' },
      { title: 'Adjust Quality', text: 'Slide the quality control to find the ideal balance between low file size and high visual fidelity.' },
      { title: 'Compare Sizes', text: 'Inspect the live preview and calculated byte savings to ensure the output meets your size targets.' },
      { title: 'Download', text: 'Click "Download Compressed Image" to immediately save the optimized file directly to your device.' }
    ],
    faqs: [
      { question: 'Will compressing my image reduce visible quality?', answer: 'Our compressor lets you fine-tune the quality slider from 1% to 100%. A setting between 70% and 85% typically reduces file size by 50–75% with virtually undetectable changes to the human eye.' },
      { question: 'Are my uploaded photos sent to any remote server?', answer: 'No. All processing happens entirely within your web browser using HTML5 Canvas and native Web APIs. Your images are never transmitted across the network or stored anywhere.' },
      { question: 'What is the maximum supported file size?', answer: 'You can upload images up to 25 MB per file. Since processing runs on your local device, performance depends on your device memory.' }
    ],
    relatedTools: ['image-resizer', 'jpg-to-webp', 'image-converter']
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    title: 'Image Resizer',
    shortDescription: 'Resize image dimensions by pixels or percentage with aspect ratio locking and crisp resampling.',
    fullDescription: 'Change image dimensions accurately with custom width and height inputs or quick preset percentages. Maintain the original aspect ratio automatically to avoid distortion, and select your preferred output format.',
    category: 'image',
    iconName: 'Maximize2',
    badge: 'Essential',
    features: [
      'Resize by exact pixel dimensions or preset percentages (25%, 50%, 75%)',
      'Aspect ratio lock prevents distortion and stretching',
      'High-quality bicubic canvas resampling',
      'Supports JPG, PNG, and WebP output',
      'Original dimensions and new dimensions displayed side by side'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSizeMB: 30,
    seoTitle: 'Free Image Resizer Online — Change Image Dimensions by Pixels or %',
    seoDescription: 'Resize photos and graphics online for free. Set exact pixel dimensions or scale by percentage while preserving aspect ratios with zero server uploads.',
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'scale image', 'resize png', 'resize jpg'],
    howToSteps: [
      { title: 'Choose an Image', text: 'Select an image from your computer or drag it into the resizer box.' },
      { title: 'Set Dimensions', text: 'Type in your target Width or Height in pixels, or click a quick percentage preset (e.g. 50%).' },
      { title: 'Lock Aspect Ratio', text: 'Keep "Maintain Aspect Ratio" checked so your image scales proportionally without stretching.' },
      { title: 'Export File', text: 'Click "Resize & Download" to instantly save your resized image in your selected format.' }
    ],
    faqs: [
      { question: 'Can I make a small image larger without losing quality?', answer: 'You can increase pixel dimensions, but upscaling a raster image beyond its native resolution will naturally soften fine details. For best clarity, downscaling or resizing close to the native size is recommended.' },
      { question: 'Does resizing strip transparency in PNG images?', answer: 'If you export as PNG or WebP, transparency is fully preserved. If you export as JPG, transparent pixels are cleanly rendered with a solid white background.' }
    ],
    relatedTools: ['image-cropper', 'image-compressor', 'image-converter']
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    title: 'Image Cropper',
    shortDescription: 'Crop photos with interactive visual handles, predefined aspect ratios (1:1, 16:9, 4:3), and pixel precision.',
    fullDescription: 'Trim unwanted borders or compose the perfect shot using our interactive canvas cropper. Switch between Freeform crop, Square (1:1 for profile pictures), Landscape (16:9 for banners), or Standard (4:3) with live dimensions.',
    category: 'image',
    iconName: 'Crop',
    badge: 'Interactive',
    features: [
      'Visual interactive bounding box with corner & edge adjustment',
      'Preset aspect ratios: Free, 1:1 (Square), 16:9 (Widescreen), 4:3 (Standard), 9:16 (Story/Vertical)',
      'Real-time cropped pixel dimensions indicator',
      'Instant crop preview before downloading',
      'Full privacy: runs directly inside your browser'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSizeMB: 25,
    seoTitle: 'Free Image Cropper Online — Crop Photos to Exact Aspect Ratios',
    seoDescription: 'Crop images online with interactive handles and popular aspect ratio presets (1:1, 16:9, 4:3). Private, fast, and 100% free with no server uploads.',
    keywords: ['image cropper', 'crop photo online', 'crop image 16:9', 'crop square photo', 'free image trimmer'],
    howToSteps: [
      { title: 'Upload Your Photo', text: 'Select or drag your image file into the cropper.' },
      { title: 'Select Aspect Ratio', text: 'Choose Freeform or lock to a preset like 1:1 (Avatar), 16:9 (Social Banner), or 4:3.' },
      { title: 'Adjust Crop Box', text: 'Drag the corners or position the crop box over the area of the image you want to keep.' },
      { title: 'Download Cropped Image', text: 'Review the live preview and click "Download Cropped Image" to save.' }
    ],
    faqs: [
      { question: 'What aspect ratio should I use for social media avatars?', answer: 'A 1:1 square ratio is standard for profile pictures across LinkedIn, GitHub, X (Twitter), and Instagram.' },
      { question: 'Will cropping reduce the quality of the selected area?', answer: 'No, cropping extracts the exact native pixels from your selected bounding box without lossy re-encoding unless you choose a lower export quality.' }
    ],
    relatedTools: ['image-resizer', 'image-compressor', 'png-to-jpg']
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    title: 'JPG to WebP Converter',
    shortDescription: 'Convert JPEG/JPG images to Google’s modern WebP format for 30%+ smaller file sizes and faster page loads.',
    fullDescription: 'Transform standard JPG/JPEG photographs into lightweight WebP format. Modern websites recommend WebP because it delivers equivalent visual clarity with substantially smaller file sizes, boosting Core Web Vitals and SEO rankings.',
    category: 'image',
    iconName: 'Repeat',
    badge: 'Web Vitals',
    features: [
      'Lossy WebP compression with adjustable quality slider',
      'Typically achieves 25%–35% smaller file sizes than equivalent JPGs',
      'Supported by all modern browsers (Chrome, Safari, Firefox, Edge)',
      'Real-time before/after file size comparison',
      'Instant client-side conversion'
    ],
    supportedFormats: ['image/jpeg'],
    maxFileSizeMB: 30,
    seoTitle: 'Convert JPG to WebP Online — Free, Fast & Private Converter',
    seoDescription: 'Convert JPG images to modern WebP format online. Reduce website image weights, improve page speed, and retain sharp details with zero server uploads.',
    keywords: ['jpg to webp', 'convert jpeg to webp', 'jpeg to webp converter', 'online webp converter', 'image optimizer'],
    howToSteps: [
      { title: 'Select JPG File', text: 'Drop your .jpg or .jpeg image into the upload box.' },
      { title: 'Tune Compression', text: 'Set your preferred WebP quality setting (recommended: 80%–85%).' },
      { title: 'Review Savings', text: 'Notice how much smaller the generated WebP file is compared to the original JPG.' },
      { title: 'Save WebP', text: 'Click "Download WebP" to retrieve your optimized file.' }
    ],
    faqs: [
      { question: 'Why should I convert JPG to WebP?', answer: 'WebP uses advanced predictive coding algorithms designed by Google to compress photographic images significantly more efficiently than legacy JPEG format, saving bandwidth and improving website loading speeds.' },
      { question: 'Do all modern browsers support WebP?', answer: 'Yes, WebP has over 97% global browser support, including all current versions of Chrome, Safari, Firefox, Edge, and iOS/Android mobile browsers.' }
    ],
    relatedTools: ['webp-to-jpg', 'image-compressor', 'image-converter']
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    title: 'WebP to JPG Converter',
    shortDescription: 'Convert modern WebP images back into universally compatible JPG format for older apps, printing, and sharing.',
    fullDescription: 'Convert WebP images downloaded from the web into standard JPG format compatible with legacy photo editing software, office suites, printers, and older devices.',
    category: 'image',
    iconName: 'FileImage',
    badge: 'Universal',
    features: [
      'Converts any valid WebP image to standard JPEG format',
      'Automatic matte blending: fills transparent background areas with clean solid white',
      'Adjustable JPEG compression quality (10% to 100%)',
      'Fast, local processing directly in your browser',
      'Download ready in milliseconds'
    ],
    supportedFormats: ['image/webp'],
    maxFileSizeMB: 30,
    seoTitle: 'Convert WebP to JPG Online Free — High Quality & Private',
    seoDescription: 'Convert WebP files to JPG format in seconds. Free browser-side converter with quality controls and universal compatibility. No file uploads.',
    keywords: ['webp to jpg', 'convert webp to jpg', 'webp to jpeg', 'change webp to jpg online', 'free webp converter'],
    howToSteps: [
      { title: 'Upload WebP', text: 'Select or drag your .webp file into the conversion field.' },
      { title: 'Configure Quality', text: 'Choose your desired JPG quality level (90% is default for high clarity).' },
      { title: 'Process', text: 'The browser renders the image data onto an optimized canvas.' },
      { title: 'Download JPG', text: 'Click "Download JPG" to save the universal JPEG file.' }
    ],
    faqs: [
      { question: 'What happens if my WebP image has transparent areas?', answer: 'Because standard JPG files do not support transparency (alpha channels), our converter automatically renders transparent pixels over a clean, neutral white background.' },
      { question: 'Why convert WebP to JPG?', answer: 'Certain desktop programs, older photo viewers, print shops, and content management systems do not yet fully accept WebP files. Converting to JPG ensures 100% universal compatibility.' }
    ],
    relatedTools: ['jpg-to-webp', 'png-to-jpg', 'image-converter']
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    title: 'PNG to JPG Converter',
    shortDescription: 'Convert large PNG images into compact, web-ready JPG files with custom background color blending.',
    fullDescription: 'PNG files often produce heavy file sizes when used for photographic content or complex graphics. Convert PNG to JPG to dramatically reduce file weight while maintaining high visual definition.',
    category: 'image',
    iconName: 'Shuffle',
    badge: 'Format',
    features: [
      'Dramatically reduces file size compared to uncompressed PNGs',
      'Clean background color selection (White, Black, or Custom) for transparent areas',
      'Adjustable JPEG compression slider',
      'Live preview of converted image before downloading',
      '100% private: no data transmitted over the internet'
    ],
    supportedFormats: ['image/png'],
    maxFileSizeMB: 30,
    seoTitle: 'Convert PNG to JPG Online Free — Fast & Private Conversion',
    seoDescription: 'Convert PNG images to JPG format online. Reduce file size, customize background transparency fill, and download instantly without server uploads.',
    keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg online', 'change png to jpg', 'compress png to jpg'],
    howToSteps: [
      { title: 'Select PNG File', text: 'Upload the PNG graphic or screenshot from your device.' },
      { title: 'Set Background Color', text: 'Select white or black background fill for any transparent regions.' },
      { title: 'Select Quality', text: 'Adjust the JPG quality slider to balance size and clarity.' },
      { title: 'Download JPG', text: 'Click "Download JPG" to retrieve your converted image.' }
    ],
    faqs: [
      { question: 'Why are PNG files usually much larger than JPG?', answer: 'PNG uses lossless compression designed for flat graphics, screenshots, and text. For photographic content or rich gradients, PNG file sizes are typically 3x to 10x larger than equivalent JPGs.' },
      { question: 'Can I keep transparent backgrounds in JPG?', answer: 'No, the JPEG specification does not support alpha transparency. Our tool lets you choose a solid fill color (such as clean white) for any transparent pixels.' }
    ],
    relatedTools: ['jpg-to-webp', 'image-compressor', 'image-converter']
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    title: 'Image Format Converter',
    shortDescription: 'Universal image converter supporting JPG, PNG, and WebP with one-click conversion and quality controls.',
    fullDescription: 'Convert between any common modern web image formats. Upload any JPG, PNG, or WebP file and export to your target format with fine-grained compression controls and instant preview.',
    category: 'image',
    iconName: 'Layers',
    badge: 'All-in-One',
    features: [
      'Universal conversion between JPG, PNG, and WebP',
      'Quality control slider for lossy formats (JPG, WebP)',
      'Intelligent transparency handling',
      'Immediate client-side rendering',
      'Instant download without waiting queues'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSizeMB: 35,
    seoTitle: 'Free Universal Image Converter — Convert JPG, PNG & WebP Online',
    seoDescription: 'Convert images between JPG, PNG, and WebP formats online for free. Private, high-speed conversion directly in your browser with zero server uploads.',
    keywords: ['image converter', 'convert image format', 'online image format changer', 'jpg png webp converter'],
    howToSteps: [
      { title: 'Upload Any Image', text: 'Choose any JPG, PNG, or WebP file from your computer or phone.' },
      { title: 'Select Target Format', text: 'Pick your desired output format: JPG, PNG, or WebP.' },
      { title: 'Configure Quality', text: 'Set quality preferences if outputting to JPG or WebP.' },
      { title: 'Download Converted File', text: 'Save your newly converted image in one click.' }
    ],
    faqs: [
      { question: 'Which image format is best for websites?', answer: 'WebP is generally recommended for modern websites because it delivers smaller file sizes than JPG and PNG while supporting both transparency and photographic detail.' },
      { question: 'Is my data secure?', answer: 'Yes. All image transformations take place directly in your local browser sandbox. No file is ever uploaded to any cloud or third-party server.' }
    ],
    relatedTools: ['jpg-to-webp', 'webp-to-jpg', 'png-to-jpg']
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    title: 'Merge PDF Files',
    shortDescription: 'Combine multiple PDF documents into a single, organized PDF file with drag-and-drop reordering.',
    fullDescription: 'Combine two or more PDF files into one clean, continuous document. Reorder files up or down to set the exact sequence of pages, preview file details and page counts, and download the consolidated PDF in seconds.',
    category: 'pdf',
    iconName: 'Files',
    badge: 'Popular',
    features: [
      'Merge multiple PDF documents into a single unified file',
      'Interactive reordering: easily shift files up or down to set page order',
      'Displays page count and file size for every input document',
      'Fast, reliable PDF assembly using pdf-lib',
      'Zero server uploads: 100% private and confidential'
    ],
    supportedFormats: ['application/pdf'],
    maxFileSizeMB: 50,
    seoTitle: 'Merge PDF Online Free — Combine Multiple PDF Files Securely',
    seoDescription: 'Merge multiple PDF files into one document online for free. Reorder pages, preserve bookmarks and fonts, and download instantly with 100% browser-side privacy.',
    keywords: ['merge pdf', 'combine pdf files', 'join pdfs', 'online pdf merger', 'combine multiple documents into one pdf'],
    howToSteps: [
      { title: 'Select Multiple PDFs', text: 'Click "Add PDF Files" or drop your documents into the upload area.' },
      { title: 'Arrange Order', text: 'Use the Up/Down arrow buttons to set the order in which the files will appear in the merged document.' },
      { title: 'Inspect Summary', text: 'Review the total page count and file breakdown.' },
      { title: 'Merge & Download', text: 'Click "Merge PDFs" to generate and download your single consolidated document.' }
    ],
    faqs: [
      { question: 'Is there a limit on how many PDFs I can combine?', answer: 'You can merge dozens of files at once. Because the merger operates directly inside your browser memory, performance scales with your device hardware.' },
      { question: 'Will my original PDF bookmarks and links be preserved?', answer: 'Our merger uses the robust pdf-lib standard which copies pages, vectors, fonts, and embedded images intact into the new document structure.' }
    ],
    relatedTools: ['split-pdf', 'rotate-pdf', 'image-to-pdf']
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    title: 'Split PDF Pages',
    shortDescription: 'Extract specific page ranges or individual pages from a PDF document into a new standalone PDF.',
    fullDescription: 'Extract exactly the pages you need from long reports, textbooks, contracts, or scanned documents. Enter page ranges like "1-3, 5, 8-10" or extract individual sections with real-time validation.',
    category: 'pdf',
    iconName: 'Split',
    badge: 'Precision',
    features: [
      'Extract custom page ranges (e.g. "1-4, 7, 9-12")',
      'Extract all pages as separate individual PDF files',
      'Input validation prevents out-of-range errors',
      'Live total page count detection',
      '100% local browser execution — documents remain private'
    ],
    supportedFormats: ['application/pdf'],
    maxFileSizeMB: 50,
    seoTitle: 'Split PDF Online Free — Extract Pages from PDF Document',
    seoDescription: 'Split PDF files online for free. Extract specific pages or custom page ranges into a new PDF document with complete client-side confidentiality.',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'cut pdf online', 'divide pdf document'],
    howToSteps: [
      { title: 'Upload PDF Document', text: 'Select or drag your PDF document into the splitter.' },
      { title: 'Check Page Count', text: 'The tool reads the document and displays the total number of pages.' },
      { title: 'Enter Page Range', text: 'Specify the pages to extract, such as "1-5" or "2, 4, 6-8".' },
      { title: 'Extract & Download', text: 'Click "Split PDF" to generate and download your customized PDF.' }
    ],
    faqs: [
      { question: 'How do I specify multiple non-consecutive page ranges?', answer: 'Use commas to separate distinct page numbers or ranges. For example, typing "1-3, 5, 7-10" will include pages 1, 2, 3, 5, 7, 8, 9, and 10 in the resulting document.' },
      { question: 'Does splitting a PDF damage the quality of text or vectors?', answer: 'No. The underlying vector graphics, embedded fonts, and raster images are copied losslessly without re-rasterizing.' }
    ],
    relatedTools: ['merge-pdf', 'rotate-pdf', 'compress-pdf']
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    title: 'Rotate PDF Pages',
    shortDescription: 'Permanently rotate upside-down or sideways PDF pages by 90°, 180°, or 270° clockwise.',
    fullDescription: 'Fix scanned receipts, landscape sheets, or upside-down contracts easily. Rotate all pages at once or target specific page numbers by 90, 180, or 270 degrees clockwise, then save the corrected document permanently.',
    category: 'pdf',
    iconName: 'RotateCw',
    badge: 'Utility',
    features: [
      'Rotate all pages simultaneously or select individual pages',
      'Rotate 90° clockwise, 180° upside-down, or 270° counter-clockwise',
      'Permanent angle modification saved directly into the PDF metadata',
      'Interactive preview of rotation angles',
      'Fast, local processing with complete privacy'
    ],
    supportedFormats: ['application/pdf'],
    maxFileSizeMB: 50,
    seoTitle: 'Rotate PDF Online Free — Permanently Fix PDF Page Orientation',
    seoDescription: 'Rotate PDF pages 90, 180 or 270 degrees online. Fix upside-down scans and landscape pages permanently with private browser-side processing.',
    keywords: ['rotate pdf', 'rotate pdf pages online', 'turn pdf upside down', 'fix scanned pdf orientation', 'rotate pdf 90 degrees'],
    howToSteps: [
      { title: 'Open Your PDF', text: 'Upload the PDF document needing orientation correction.' },
      { title: 'Choose Rotation Scope', text: 'Choose to rotate "All Pages" or specify individual page numbers (e.g. "2, 4").' },
      { title: 'Select Angle', text: 'Click +90°, +180°, or +270° to set the desired rotation.' },
      { title: 'Save Document', text: 'Click "Apply Rotation & Download" to download your properly oriented PDF.' }
    ],
    faqs: [
      { question: 'Is the rotation permanent or just a viewer setting?', answer: 'The rotation updates the internal MediaBox and page rotation tags in the PDF binary, so every PDF viewer, print dialog, and phone will display the pages in the corrected orientation permanently.' },
      { question: 'Can I rotate only odd or even pages?', answer: 'Yes, you can specify individual page numbers or subsets in the page selection field before applying rotation.' }
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf']
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    title: 'Compress PDF Files',
    shortDescription: 'Optimize PDF structure, strip redundant metadata, and reduce document file size for easy emailing.',
    fullDescription: 'Optimize PDF file size safely directly on your device. Cleans redundant internal object dictionaries, flattens unused resources, and optimizes PDF stream structures for efficient email attachment and upload compliance.',
    category: 'pdf',
    iconName: 'Minimize',
    badge: 'Optimization',
    features: [
      'Cleans redundant PDF object structures and unused streams',
      'Optimizes embedded resource tables and xref tables',
      'Provides percentage size savings comparison',
      'Preserves original text sharpness and vector graphics',
      'Strictly confidential: sensitive financial and legal documents never leave your PC'
    ],
    supportedFormats: ['application/pdf'],
    maxFileSizeMB: 50,
    seoTitle: 'Compress PDF Online Free — Reduce PDF File Size Securely',
    seoDescription: 'Compress PDF documents online for free. Optimize file sizes for email and web uploads while keeping text crisp. 100% private client-side processing.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf file', 'online pdf optimizer', 'compress pdf for email'],
    howToSteps: [
      { title: 'Select PDF Document', text: 'Upload the PDF file you wish to optimize.' },
      { title: 'Inspect File Info', text: 'Review initial file size and page count.' },
      { title: 'Run Optimization', text: 'Click "Optimize & Compress PDF" to execute structural stream compression.' },
      { title: 'Download Result', text: 'Compare before and after sizes and download your streamlined document.' }
    ],
    faqs: [
      { question: 'How does client-side PDF compression work?', answer: 'Our tool parses the PDF binary with pdf-lib, removes orphaned objects, optimizes cross-reference tables, and re-encodes content streams with Flate compression. For image-heavy scanned PDFs, it consolidates object streams to minimize footprint.' },
      { question: 'Are my confidential documents safe to compress?', answer: 'Yes, 100%. Because all calculations run in your web browser sandbox without uploading anything to remote servers, your confidential contracts, medical records, and bank statements remain entirely on your device.' }
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'image-to-pdf']
  },
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    title: 'Image to PDF Converter',
    shortDescription: 'Convert JPG, PNG, and WebP images into a clean, multi-page PDF document with custom margins and sizing.',
    fullDescription: 'Convert single or multiple images into a professional, printable PDF document. Choose between page fitting options (Fit to Image, A4, US Letter), customize page orientation (Auto, Portrait, Landscape), and reorder pages easily.',
    category: 'pdf',
    iconName: 'FilePlus',
    badge: 'Multi-image',
    features: [
      'Convert multiple JPG, PNG, and WebP images into one consolidated PDF',
      'Page formats: Fit to Image Dimensions, Standard A4, or US Letter',
      'Orientation modes: Auto (matches image aspect ratio), Portrait, or Landscape',
      'Reorder images before generating the PDF document',
      'Customizable margin options (None, Small, Normal)'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSizeMB: 40,
    seoTitle: 'Convert Image to PDF Online Free — JPG & PNG to PDF Document',
    seoDescription: 'Convert JPG and PNG images to a single PDF document online. Set page size (A4, Letter), orientation, and margins. 100% free with no server uploads.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert photo to pdf', 'combine images into pdf'],
    howToSteps: [
      { title: 'Add Images', text: 'Upload one or multiple photos, scans, or screenshots in JPG, PNG, or WebP format.' },
      { title: 'Arrange Order', text: 'Reorder images using the Up/Down controls to set which image appears on which page.' },
      { title: 'Choose Page Layout', text: 'Select page format (Fit to Image, A4, or US Letter) and margin settings.' },
      { title: 'Generate PDF', text: 'Click "Convert to PDF" to instantly download your consolidated PDF file.' }
    ],
    faqs: [
      { question: 'Can I combine different image formats into one PDF?', answer: 'Yes! You can mix JPG, PNG, and WebP images in the same document. Each image will be converted and embedded cleanly on its own designated page.' },
      { question: 'What is the best setting for creating printable documents?', answer: 'Choose "A4" or "US Letter" with a "Small" margin setting. This ensures the output prints predictably on standard office paper.' }
    ],
    relatedTools: ['merge-pdf', 'image-converter', 'image-compressor']
  }
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: 'image' | 'pdf'): ToolMetadata[] {
  return TOOLS.filter((t) => t.category === category);
}
