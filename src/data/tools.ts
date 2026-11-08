import { ToolMetadata } from '@/types';

export const TOOLS: ToolMetadata[] = [
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    title: 'Image Compressor',
    shortDescription: 'Adjust image quality and dimensions while comparing JPG, PNG, and WebP output.',
    fullDescription: 'Re-encode JPG, PNG, and WebP images in your browser. Adjust quality and scale, then compare the output size and appearance before downloading.',
    category: 'image',
    iconName: 'Minimize2',
    badge: 'Popular',
    features: [
      'Interactive quality slider with before-and-after file size comparison',
      'Adjustable output quality and image scale',
      'Supports JPG, PNG, and WebP formats',
      'Image processing runs locally in your browser',
      'Before & after byte-level size comparison'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    seoTitle: 'Free Image Compressor Online — Shrink JPG, PNG & WebP',
    seoDescription: 'Compress JPG, PNG, and WebP images online for free. Adjust quality, preview the output, and download the result processed in your browser.',
    keywords: ['image compressor', 'compress jpg', 'compress png', 'shrink image size', 'reduce photo file size', 'online image optimizer'],
    overview:
      'DocuForge Image Compressor uses browser image APIs and Canvas to re-encode selected JPG, PNG, or WebP images. Quality and scale controls let you compare the generated output with the source image.\n\nUse it to prepare images for websites, email attachments, or other workflows. Output size and visual quality depend on the input file, output format, dimensions, and selected settings. The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint.',
    howToSteps: [
      { title: 'Upload Your Image', text: 'Drag and drop your JPG, PNG, or WebP file into the dropzone or click to browse files from your local storage.' },
      { title: 'Adjust Quality Slider', text: 'Change the quality setting and compare the preview and output size. The result depends on the source image and selected settings.' },
      { title: 'Optionally Scale Dimensions', text: 'Adjust the Scale slider if you also want to reduce width and height proportionally to maximize byte savings.' },
      { title: 'Inspect & Download', text: 'Review the live preview, compare the original versus compressed byte savings, and click Download to save the optimized image.' }
    ],
    tips: [
      'Compare different quality and scale settings to find a suitable balance for your image.',
      'File-size changes depend on the source image, output format, dimensions, and selected settings.',
      'If your source image has transparent elements, make sure to compress it in WebP or PNG format to preserve alpha transparency.',
      'Always retain your uncompressed source image in cold storage so you can re-export at different resolutions in the future.'
    ],
    faqs: [
      {
        question: 'Will compressing my image reduce visible quality on retina screens?',
        answer: 'The compressor provides a quality control. Lower settings can reduce output size but may introduce visible artifacts; compare the preview and output before using the file.'
      },
      {
        question: 'Are my uploaded photos sent to any remote server or stored in the cloud?',
        answer: 'The compressor uses browser image APIs and Canvas to process the selected image. The inspected tool code does not send the selected image to a DocuForge upload endpoint. This is not a legal-compliance certification and does not describe unrelated website requests.'
      },
      {
        question: 'What is the maximum supported file size?',
        answer: 'The compressor accepts image files up to 25 MB. Processing time and memory use depend on the browser, device resources, and image.'
      },
      {
        question: 'Can I compress PNG images with transparent backgrounds?',
        answer: 'The compressor encodes PNG input as WebP, which supports transparency. JPEG does not support alpha transparency; this tool does not offer a JPG output option for PNG files.'
      },
      {
        question: 'How does client-side compression differ from server-side tools?',
        answer: 'The inspected compressor code reads and transforms the image in the browser. The tool does not send selected file contents to a DocuForge upload endpoint; ordinary website requests are separate.'
      }
    ],
    relatedTools: ['image-resizer', 'jpg-to-webp', 'image-converter']
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    title: 'Image Resizer',
    shortDescription: 'Resize image dimensions by pixels or percentage with aspect ratio locking and crisp resampling.',
    fullDescription: 'Change image dimensions with custom width and height inputs or percentage presets. Keep the aspect-ratio lock enabled to preserve the original proportions, and select an output format.',
    category: 'image',
    iconName: 'Maximize2',
    badge: 'Essential',
    features: [
      'Resize by exact pixel dimensions or preset percentages (25%, 50%, 75%)',
      'Aspect-ratio lock preserves source proportions when enabled',
      'Canvas resampling with browser image smoothing',
      'Supports JPG, PNG, and WebP output',
      'Original dimensions and new dimensions displayed side by side'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    seoTitle: 'Free Image Resizer Online — Change Image Dimensions by Pixels or %',
    seoDescription: 'Resize photos and graphics online for free. Set pixel dimensions or scale by percentage while preserving aspect ratios in your browser.',
    keywords: ['image resizer', 'resize photo', 'change image dimensions', 'scale image', 'resize png', 'resize jpg'],
    overview:
      'DocuForge Image Resizer lets you set pixel width and height or use percentage presets. Resizing an image changes its pixel dimensions; the output appearance depends on the source image, target dimensions, and export settings.\n\nUse the aspect-ratio lock to preserve proportions while resizing. Compare the downloaded image with the source, particularly when enlarging an image or preparing it for a specific website, social platform, or document.',
    howToSteps: [
      { title: 'Upload Image File', text: 'Select an image from your computer or drag it into the resizer upload box.' },
      { title: 'Set Target Dimensions', text: 'Type your exact target Width or Height in pixels, or click a quick percentage preset (25%, 50%, 75%).' },
      { title: 'Verify Aspect Ratio Lock', text: 'Keep "Maintain Aspect Ratio" checked so that changing one dimension automatically recalculates the other without stretching.' },
      { title: 'Export & Download', text: 'Select your preferred export format (JPG, PNG, or WebP) and click "Resize & Download" to save the resized image.' }
    ],
    tips: [
      'Always keep the aspect ratio lock checked unless you deliberately need to alter the proportions of a background banner.',
      'Downscaling can reduce pixel dimensions, but output appearance depends on the source image and chosen export settings. Upscaling cannot restore missing detail.',
      'When preparing images for mobile apps, resize to 2x or 3x the CSS display width to ensure crisp rendering on high-density Retina screens.',
      'Export as PNG or WebP if your original image contains transparency that you need to retain.'
    ],
    faqs: [
      {
        question: 'Can I make a small image larger without losing clarity?',
        answer: 'You can increase pixel dimensions, but upscaling a raster image cannot restore missing detail. The browser resamples the image; compare the result with the source, as some softening may occur.'
      },
      {
        question: 'Does resizing strip transparency in PNG images?',
        answer: 'PNG and WebP support transparency, though resizing and re-encoding can change image data. JPG does not support transparency; the resizer fills transparent areas with white when exporting as JPG.'
      },
      {
        question: 'What is the difference between resizing and cropping?',
        answer: 'Resizing changes the total pixel dimensions of the entire image by scaling all pixels up or down. Cropping removes outer borders or unwanted sections of the image to alter its composition or aspect ratio without scaling the remaining pixels.'
      },
      {
        question: 'Are my images stored or uploaded during resizing?',
        answer: 'The resizer uses browser image APIs to process the selected image. The inspected tool code does not send selected file contents to a DocuForge upload endpoint.'
      },
      {
        question: 'What are the standard dimensions for web social sharing cards?',
        answer: 'The standard Open Graph (og:image) dimension for Facebook, LinkedIn, and Twitter/X link previews is 1200 pixels wide by 630 pixels tall (1.91:1 aspect ratio).'
      }
    ],
    relatedTools: ['image-cropper', 'image-compressor', 'image-converter']
  },
  {
    id: 'image-cropper',
    slug: 'image-cropper',
    title: 'Image Cropper',
    shortDescription: 'Crop photos with interactive visual handles, predefined aspect ratios (1:1, 16:9, 4:3), and pixel precision.',
    fullDescription: 'Crop unwanted areas with interactive canvas controls. Choose freeform cropping or a preset ratio, and review the crop dimensions before downloading.',
    category: 'image',
    iconName: 'Crop',
    badge: 'Interactive',
    features: [
      'Visual interactive bounding box with corner & edge adjustment',
      'Preset aspect ratios: Free, 1:1 (Square), 16:9 (Widescreen), 4:3 (Standard), 9:16 (Story/Vertical)',
      'Real-time cropped pixel dimensions indicator',
      'Preview crop dimensions before downloading',
      'Converts images in your browser'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    seoTitle: 'Free Image Cropper Online — Crop Photos to Exact Aspect Ratios',
    seoDescription: 'Crop images online for free with interactive handles and aspect-ratio presets. Adjust the crop in your browser and download the result.',
    keywords: ['image cropper', 'crop photo online', 'crop image 16:9', 'crop square photo', 'free image trimmer'],
    overview:
      'DocuForge Image Cropper lets you adjust an image region using interactive handles and aspect-ratio presets. The interface displays the crop dimensions before you download the result.\n\nUse the freeform option or a preset ratio for common layouts. Downloading re-encodes the selected region, so review the output if exact pixel or color preservation matters.',
    howToSteps: [
      { title: 'Upload Photo', text: 'Select or drag your JPG, PNG, or WebP photo into the interactive cropper.' },
      { title: 'Choose Aspect Ratio', text: 'Select Freeform for custom dimensions, or click a preset like 1:1 (Square Avatar), 16:9 (Widescreen Banner), 4:3 (Standard), or 9:16 (Vertical Story).' },
      { title: 'Position Crop Box', text: 'Drag the corners or edges of the bounding box to frame the exact portion of the image you want to keep.' },
      { title: 'Download Cropped Image', text: 'Inspect the crop dimensions and click "Download Cropped Image" to save the result.' }
    ],
    tips: [
      'For social media avatars (LinkedIn, X, Discord), lock the aspect ratio to 1:1 Square before adjusting the crop area.',
      'Use the rule of thirds: place your subject along the intersection points of the bounding box for a more dynamic photographic composition.',
      'Cropping selects a region of the image; it does not add detail or zoom in. The downloaded image is re-encoded in the selected output format.',
      'If your source image has transparent margins, cropping them out reduces the overall image footprint without affecting the subject.'
    ],
    faqs: [
      {
        question: 'What aspect ratio is best for social media profile pictures?',
        answer: 'A 1:1 square is a common starting point for profile images, but platform requirements and display crops can differ. Check the target platform and preview your result.'
      },
      {
        question: 'Will cropping degrade the quality of the cropped area?',
        answer: 'Cropping selects a region of the image. Downloading the result re-encodes it in the chosen output format, so image data or quality may differ from the source.'
      },
      {
        question: 'Can I crop an image into a vertical 9:16 orientation for mobile stories?',
        answer: 'Yes! Select the 9:16 preset to lock the bounding box to vertical mobile story dimensions, ideal for Instagram Stories, TikTok, YouTube Shorts, and mobile phone wallpapers.'
      },
      {
        question: 'Is my photo uploaded to your server while cropping?',
        answer: 'The cropper uses browser image APIs to process the selected image. The inspected tool code does not send selected file contents to a DocuForge upload endpoint.'
      },
      {
        question: 'Can I undo or reset my crop if I make a mistake?',
        answer: 'Yes, you can click "Change Image" or reposition the drag handles freely at any time before clicking the final download button.'
      }
    ],
    relatedTools: ['image-resizer', 'image-compressor', 'image-converter']
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    title: 'Image Converter',
    shortDescription: 'Convert images seamlessly between JPG, PNG, and WebP formats with adjustable output quality.',
    fullDescription: 'Convert between JPG, PNG, and WebP image formats. Choose an output quality where available, review the result, and download the converted image.',
    category: 'image',
    iconName: 'Repeat',
    badge: 'Universal',
    features: [
      'Convert between JPG, PNG, and WebP formats with 1 click',
      'Configurable quality slider for lossy formats',
      'Preserves alpha transparency between PNG and WebP',
      'Canvas-based conversion in your browser',
      'Choose an output format and review the result'
    ],
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    seoTitle: 'Free Image Converter Online — Convert JPG, PNG & WebP',
    seoDescription: 'Convert images between JPG, PNG, and WebP online for free. Choose an output format and download the browser-processed result.',
    keywords: ['image converter', 'convert jpg to png', 'convert png to webp', 'convert webp to jpg', 'online photo converter'],
    overview:
      'DocuForge Image Converter re-encodes selected JPG, PNG, or WebP images into a chosen output format using browser image APIs. Choose an output format and quality setting, then review the converted image. Conversion may affect quality, transparency, or metadata depending on the source and selected format.',
    howToSteps: [
      { title: 'Upload Image', text: 'Select or drop your JPG, PNG, or WebP file into the converter upload zone.' },
      { title: 'Select Target Format', text: 'Choose your desired output format: JPG (standard photographic), PNG (lossless with transparency), or WebP (modern web standard).' },
      { title: 'Fine-Tune Quality', text: 'If converting to JPG or WebP, choose a quality setting and compare the output with the source.' },
      { title: 'Convert & Download', text: 'Click "Convert & Download" to re-encode the image in your browser and save the result.' }
    ],
    tips: [
      'When converting PNG logos with transparency to JPG, the transparent areas will automatically become solid white, as JPG does not support alpha channels.',
      'If you are considering WebP for a website image, compare its size and appearance with the source before publishing it.',
      'If you need to edit an image in older desktop software like Photoshop CS6 or legacy photo kiosks that do not recognize WebP, convert it to PNG or high-quality JPG.',
      'PNG is the best target format when saving software screenshots, diagrams, and vector logos where pixel-sharp text is critical.'
    ],
    faqs: [
      {
        question: 'Which image format should I convert to for website use?',
        answer: 'WebP is supported by many current browsers and can be useful for web images. Compare the output size and quality with your source; results vary by image and settings.'
      },
      {
        question: 'What happens to transparent pixels when converting PNG to JPG?',
        answer: 'JPEG does not support alpha transparency. The converter fills transparent pixels using the selected background color.'
      },
      {
        question: 'Does converting between formats cause quality loss?',
        answer: 'Converting to a lossy format can change image data. Even when converting between nominally lossless formats, browser decoding and encoding may affect metadata or pixel values; compare the output with the source.'
      },
      {
        question: 'Is there a limit on how many images I can convert?',
        answer: 'The current interface converts one selected file at a time. After downloading a result, select another image to convert.'
      },
      {
        question: 'Are my converted images saved on your servers?',
        answer: 'The converter uses browser image APIs to process the selected image. The inspected tool code does not send selected file contents to a DocuForge upload endpoint.'
      }
    ],
    relatedTools: ['jpg-to-webp', 'png-to-jpg', 'webp-to-jpg']
  },
  {
    id: 'png-to-jpg',
    slug: 'png-to-jpg',
    title: 'PNG to JPG Converter',
    shortDescription: 'Convert PNG images to JPG and choose how transparent areas are filled.',
    fullDescription: 'Convert PNG images to JPG, choose a background color for transparent areas, and adjust JPEG quality before downloading.',
    category: 'image',
    iconName: 'FileImage',
    badge: 'Popular',
    features: [
      'Browser-based PNG to JPG conversion',
      'Choose a background color for transparent pixels',
      'Configurable JPEG quality slider (10% to 100%)',
      'Compare the output size with the source image',
      'Converts selected images in your browser'
    ],
    supportedFormats: ['image/png'],
    seoTitle: 'Convert PNG to JPG Online Free — High Quality Image Converter',
    seoDescription: 'Convert PNG images to JPG online for free. Adjust output quality and choose a background color for transparent areas.',
    keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg converter', 'change png to jpg online', 'free png to jpg'],
    overview:
      'DocuForge PNG to JPG Converter re-encodes selected PNG images as JPEG using browser image APIs. Transparent pixels are composited onto the selected background color because JPEG does not support transparency. Output size and visual quality depend on the source image and quality setting.',
    howToSteps: [
      { title: 'Upload PNG File', text: 'Select or drag your PNG image into the converter upload area.' },
      { title: 'Configure Quality', text: 'Adjust the JPG quality slider and compare the preview with the source image.' },
      { title: 'Preview Transparency Handling', text: 'Check how transparent pixels appear against the selected background color.' },
      { title: 'Download JPG', text: 'Click "Convert to JPG" to download the resulting JPEG file.' }
    ],
    tips: [
      'Use PNG to JPG when uploading photos to platforms like eBay, Amazon, or job portals that restrict file sizes or reject PNGs.',
      'If your PNG contains transparent elements that must remain transparent, do not convert to JPG; consider WebP instead.',
      'Compare file size and image quality at different settings; the result depends on the source image.',
      'Retain your original PNG master copy if you plan to edit graphic layers in design software later.'
    ],
    faqs: [
      {
        question: 'What happens to transparent areas when I convert PNG to JPG?',
        answer: 'JPEG does not support alpha transparency. The converter fills transparent pixels using the selected background color.'
      },
      {
        question: 'How much smaller will the JPG file be compared to my original PNG?',
        answer: 'The output size depends on the source image and quality setting. Compare the original and converted file sizes before choosing the result.'
      },
      {
        question: 'Can I convert multiple PNG images in batch?',
        answer: 'The current interface converts one selected file at a time. Processing time depends on the image, browser, and device.'
      },
      {
        question: 'Is this conversion safe for confidential business documents?',
        answer: 'The converter processes selected images in the browser. The inspected tool code does not send selected file contents to a DocuForge upload endpoint; ordinary website requests and third-party services are separate.'
      },
      {
        question: 'What is the recommended quality setting for everyday photos?',
        answer: 'Try different quality settings and compare the resulting image and file size. The right setting depends on the image and how you plan to use it.'
      }
    ],
    relatedTools: ['jpg-to-webp', 'image-compressor', 'image-converter']
  },
  {
    id: 'jpg-to-webp',
    slug: 'jpg-to-webp',
    title: 'JPG to WebP Converter',
    shortDescription: 'Convert JPG images to WebP for workflows that support the format.',
    fullDescription: 'Convert JPG images to WebP format in your browser. Compare the output size and quality before using the converted image.',
    category: 'image',
    iconName: 'Zap',
    badge: 'Performance',
    features: [
      'Converts JPG images to WebP format',
      'Configurable WebP compression quality slider',
      'Adjustable output quality',
      'Check current WebP support for your target software or service',
      'Processes the selected image in your browser'
    ],
    supportedFormats: ['image/jpeg'],
    seoTitle: 'Convert JPG to WebP Online Free — Modern Next-Gen Image Format',
    seoDescription: 'Convert JPG images to WebP online for free. Choose output quality and download the converted image processed in your browser.',
    keywords: ['jpg to webp', 'convert jpg to webp', 'jpeg to webp converter', 'compress jpg to webp', 'next gen image format'],
    overview:
      'DocuForge JPG to WebP Converter re-encodes selected JPG images as WebP using the browser canvas encoder. WebP output can be useful for web workflows, but file size and visual quality depend on the source image and quality setting. Compare the result before replacing a source file.',
    howToSteps: [
      { title: 'Upload JPG Photo', text: 'Select or drag your JPG/JPEG file into the upload dropzone.' },
      { title: 'Set WebP Quality', text: 'Adjust the quality slider and compare the output appearance with the original.' },
      { title: 'Compare File Sizes', text: 'Review the displayed file sizes; the output may be smaller or larger than the source.' },
      { title: 'Download WebP', text: 'Click "Convert to WebP" to download the converted image.' }
    ],
    tips: [
      'Compare the converted image dimensions, file size, and visual quality with the original before publishing it.',
      'Check that your target browser, publishing platform, or image editor supports WebP before adopting the format.',
      'Image format alone does not determine page performance; dimensions, loading behavior, and other page resources also matter.',
      'Keep your original high-resolution JPG files archived safely offline in case you ever need to produce physical print materials.'
    ],
    faqs: [
      {
        question: 'Why should I convert my JPG files to WebP?',
        answer: 'WebP is another image format that may be useful for web publishing. Conversion does not guarantee a smaller file or better search rankings; compare the size and appearance of the output.'
      },
      {
        question: 'Are WebP images supported by all web browsers?',
        answer: 'WebP is supported by many current browsers, but support varies by software and version. Check compatibility for the browsers and tools your audience uses.'
      },
      {
        question: 'Will converting a JPG to WebP reduce its visual quality?',
        answer: 'The quality setting affects the output. Compare the converted image with the source, since results vary by image and setting.'
      },
      {
        question: 'Can I upload WebP images to WordPress and Shopify?',
        answer: 'Yes. Modern versions of WordPress (version 5.8+) and Shopify support WebP uploads natively in media libraries and product listings.'
      },
      {
        question: 'Does this tool upload my images to an external server?',
        answer: 'The converter uses the browser canvas encoder to process the selected image. The inspected tool code does not send selected file contents to a DocuForge upload endpoint.'
      }
    ],
    relatedTools: ['image-compressor', 'webp-to-jpg', 'image-converter']
  },
  {
    id: 'webp-to-jpg',
    slug: 'webp-to-jpg',
    title: 'WebP to JPG Converter',
    shortDescription: 'Convert WebP images to JPG for workflows that require the JPEG format.',
    fullDescription: 'Convert WebP images to JPG, adjust output quality, and review the result before downloading.',
    category: 'image',
    iconName: 'Undo2',
    badge: 'Utility',
    features: [
      'Exports converted images as JPG files',
      'Configurable JPEG quality slider (10% to 100%)',
      'Creates JPG output for workflows that require JPEG',
      'Processes the selected image in your browser',
      'Converts selected images in your browser'
    ],
    supportedFormats: ['image/webp'],
    seoTitle: 'Convert WebP to JPG Online Free — High Quality Image Converter',
    seoDescription: 'Convert WebP images to JPG online for free. Download a JPEG version for software and workflows that do not support WebP.',
    keywords: ['webp to jpg', 'convert webp to jpg', 'change webp to jpg', 'webp to jpeg converter', 'download webp as jpg'],
    overview:
      'DocuForge WebP to JPG Converter re-encodes a selected WebP image as a JPEG using browser image APIs. JPG is supported by many image viewers and workflows, but compatibility depends on the software or service you use.\n\nChoose a quality setting and review the converted image before downloading. If the source contains transparency, transparent pixels are filled with the selected background color because JPEG does not support transparency.',
    howToSteps: [
      { title: 'Upload WebP File', text: 'Select or drag your WebP image into the converter upload box.' },
      { title: 'Select Quality', text: 'Choose a JPG quality setting and compare the preview with the source image.' },
      { title: 'Preview Converted Result', text: 'Check the preview and compare the original and converted file sizes.' },
      { title: 'Download JPG', text: 'Click "Convert to JPG" to download the resulting image.' }
    ],
    tips: [
      'If you save images from the web in `.webp` format, use this tool to convert them for software that does not support WebP.',
      'Repeated conversion between lossy formats can change image quality; keep the original and review the result.',
      'If your WebP image has transparent areas, JPG will fill those pixels with the selected background color.',
      'Before submitting or printing a converted image, check the target service or printer requirements.'
    ],
    faqs: [
      {
        question: 'Why won\'t my software open WebP images?',
        answer: 'WebP is a relatively modern format created for web browsers. Older software programs, legacy versions of Photoshop, older digital cameras, and certain government upload portals have not updated their image decoders to recognize the WebP container format.'
      },
      {
        question: 'What happens to transparency when converting WebP to JPG?',
        answer: 'JPEG does not include an alpha transparency channel. Transparent areas are filled with the selected background color in the resulting JPG.'
      },
      {
        question: 'Will converting WebP to JPG increase the file size?',
        answer: 'JPG is widely supported, but compatibility depends on the software or service. File size may increase or decrease during conversion; compare the result.'
      },
      {
        question: 'Can I convert WebP to JPG on my iPhone or Android device?',
        answer: 'The site layout adapts to smaller screens. Tool behavior can vary by browser, device resources, and file; check compatibility with your specific setup.'
      },
      {
        question: 'Are my images stored or analyzed during conversion?',
        answer: 'The converter processes the selected image in your browser. The inspected tool code does not send selected file contents to a DocuForge upload endpoint; ordinary website requests are separate.'
      }
    ],
    relatedTools: ['jpg-to-webp', 'image-converter', 'image-compressor']
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    title: 'Merge PDF Files',
    shortDescription: 'Combine multiple PDF documents into a single, organized file with custom page reordering.',
    fullDescription: 'Merge two or more PDF files into one document. Arrange the files with the ordering controls, then create and download the merged PDF in your browser.',
    category: 'pdf',
    iconName: 'Combine',
    badge: 'Popular',
    features: [
      'Combine multiple PDF documents into a single file',
      'Intuitive Up and Down controls to reorder documents before merging',
      'Combines pages using the JavaScript pdf-lib library',
      'Merges selected PDF files in the browser',
      'Assembly powered by the JavaScript pdf-lib library'
    ],
    supportedFormats: ['application/pdf'],
    seoTitle: 'Merge PDF Files Online Free — Combine Multiple PDFs',
    seoDescription: 'Merge multiple PDF files online for free. Reorder documents, combine pages in your browser, and download one PDF.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf files', 'merge pdf online', 'pdf combiner free', 'merge documents'],
    overview:
      'DocuForge Merge PDF combines multiple selected PDF files into one document. Use the ordering controls to arrange the files before merging. The tool uses the JavaScript `pdf-lib` library in the browser; review the output, particularly if your documents contain forms, signatures, or bookmarks.',
    howToSteps: [
      { title: 'Upload PDF Files', text: 'Select or drag two or more PDF documents into the merge workspace.' },
      { title: 'Arrange Document Order', text: 'Use the Up and Down arrow controls to order your files chronologically or logically.' },
      { title: 'Verify Total Page Counts', text: 'Check the file list to confirm that each document loaded with its expected page count.' },
      { title: 'Merge & Download', text: 'Click "Merge PDFs" to compile your documents into a single file and save it directly to your device.' }
    ],
    tips: [
      'Make sure none of your source PDFs are encrypted with owner passwords; remove password protection prior to merging.',
      'Check the order of your documents before clicking Merge to ensure invoices, cover letters, and appendices follow the proper sequence.',
      'Review the merged document before relying on it, especially if it contains forms, signatures, or bookmarks.',
      'After merging, you can run the output file through our Compress PDF tool if you need to adhere to strict email attachment limits.'
    ],
    faqs: [
      {
        question: 'Is it safe to merge confidential documents like contracts and tax forms?',
        answer: 'The merge component reads and processes selected PDFs in the browser with pdf-lib. The inspected tool code does not send selected file contents to a DocuForge upload endpoint. This is not a legal or compliance certification.'
      },
      {
        question: 'Will merging my PDFs reduce the sharpness of text or graphics?',
        answer: 'The merge tool rebuilds a PDF from copied pages with pdf-lib. Review the output, particularly for interactive forms, signatures, bookmarks, and document-specific features.'
      },
      {
        question: 'How many PDF documents can I merge at once?',
        answer: 'The tool accepts multiple PDF documents. Processing capacity depends on your browser and device memory; keep the combined file size manageable and review the result.'
      },
      {
        question: 'Can I merge PDFs that have different page orientations or sizes?',
        answer: 'Yes! You can combine portrait A4 pages, landscape Letter sheets, and custom-sized documents in the same file. Each page retains its individual orientation and dimensions.'
      },
      {
        question: 'What should I do if a PDF fails to load?',
        answer: 'If a PDF fails to load, it is likely password-protected or contains corrupted cross-reference tables. Remove password security using your PDF reader before uploading.'
      }
    ],
    relatedTools: ['split-pdf', 'rotate-pdf', 'compress-pdf']
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    title: 'Split PDF Pages',
    shortDescription: 'Extract specific page ranges or individual sheets from large PDF documents effortlessly.',
    fullDescription: 'Extract specific pages or custom page ranges (e.g., "1-3, 5, 8-10") from a PDF. The tool processes the selected document in your browser.',
    category: 'pdf',
    iconName: 'Split',
    badge: 'Precision',
    features: [
      'Extract custom page ranges with flexible syntax (e.g. "1-5, 8, 11-14")',
      'Extract all pages as individual separate documents',
      'Extracts selected pages using the JavaScript pdf-lib library',
      'Page extraction runs in your browser'
    ],
    supportedFormats: ['application/pdf'],
    seoTitle: 'Split PDF Online Free — Extract Pages from PDF Documents',
    seoDescription: 'Split PDF files online for free. Extract specific pages or ranges in your browser and download the resulting PDF files.',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'split pdf online free', 'cut pdf pages'],
    overview:
      'DocuForge Split PDF extracts selected pages or page ranges from a PDF. Enter page numbers or ranges such as `1-3, 5, 8-10` and download the resulting document. The tool uses pdf-lib in the browser; review the output, especially if your source contains forms, signatures, bookmarks, or other document-specific features.',
    howToSteps: [
      { title: 'Upload Multi-Page PDF', text: 'Select or drag your PDF document into the split workspace.' },
      { title: 'Specify Page Range', text: 'Enter your desired page numbers and ranges (e.g., "1-3, 5, 8-10") or choose "Extract All Pages".' },
      { title: 'Review Total Pages', text: 'Check the total page count indicator to ensure your requested page numbers fall within the document bounds.' },
      { title: 'Extract & Download', text: 'Click "Split & Download PDF" to immediately generate and download your extracted document.' }
    ],
    tips: [
      'Use hyphen notation for continuous ranges (e.g. "4-8") and commas for individual detached pages (e.g. "1, 4-8, 12").',
      'If you need to separate every single page into individual standalone files, select the "Extract All Pages" mode.',
      'Splitting large multi-chapter manuals into smaller topic-specific files makes them much easier to email and read on mobile devices.',
      'The inspected splitter code processes selected PDF data in the browser and does not send it to a DocuForge upload endpoint. This does not cover ordinary website requests or third-party services.'
    ],
    faqs: [
      {
        question: 'How do I specify which pages to extract?',
        answer: 'You can type standard page range syntax in the input field: use hyphens for continuous page ranges (e.g., "1-5") and commas for individual pages (e.g., "1-5, 8, 12"). The tool will validate your input against the total page count.'
      },
      {
        question: 'Will the extracted pages maintain their original vector quality?',
        answer: 'The tool copies selected pages into a new PDF with pdf-lib. Review the output, particularly if the source contains forms, signatures, bookmarks, or document-specific features.'
      },
      {
        question: 'Can I extract pages from a password-protected PDF?',
        answer: 'Our tool respects PDF security specifications. If a document is encrypted with an open password, you must unlock or decrypt it first before extracting pages.'
      },
      {
        question: 'Are my extracted documents stored on your servers?',
        answer: 'The inspected splitter code processes selected PDF data in the browser and does not send it to a DocuForge upload endpoint.'
      },
      {
        question: 'What is the maximum number of pages I can split?',
        answer: 'There is no strict page count limit. Documents with hundreds of pages can be split easily, provided your device has sufficient RAM to load the file.'
      }
    ],
    relatedTools: ['merge-pdf', 'rotate-pdf', 'compress-pdf']
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    title: 'Rotate PDF Pages',
    shortDescription: 'Rotate PDF pages by 90°, 180°, or 270° clockwise.',
    fullDescription: 'Rotate all PDF pages or selected page numbers by 90, 180, or 270 degrees clockwise, then download the updated document.',
    category: 'pdf',
    iconName: 'RotateCw',
    badge: 'Utility',
    features: [
      'Rotate all pages simultaneously or select individual pages',
      'Rotate 90° clockwise, 180° upside-down, or 270° counter-clockwise',
      'Saves the selected page rotation in the resulting PDF',
      'Choose rotation angles and pages before downloading',
      'Processes selected PDF data in your browser'
    ],
    supportedFormats: ['application/pdf'],
    seoTitle: 'Rotate PDF Online Free — Permanently Fix PDF Page Orientation',
    seoDescription: 'Rotate PDF pages by 90, 180 or 270 degrees online. Adjust page orientation in your browser and download the updated PDF.',
    keywords: ['rotate pdf', 'rotate pdf pages online', 'turn pdf upside down', 'fix scanned pdf orientation', 'rotate pdf 90 degrees'],
    overview:
      'DocuForge Rotate PDF lets you change the page rotation for all pages or selected pages in a PDF. Choose 90°, 180°, or 270° clockwise, then download the updated document.\n\nThe tool uses pdf-lib to set each selected page rotation before saving the PDF. Check the output in your intended PDF reader, particularly if the document contains features that need to be preserved.',
    howToSteps: [
      { title: 'Upload PDF File', text: 'Select or drag your PDF document into the rotation tool.' },
      { title: 'Choose Rotation Scope', text: 'Select "All Pages" to rotate the entire document, or specify custom page numbers (e.g., "2, 4-6").' },
      { title: 'Select Rotation Angle', text: 'Click +90° Clockwise, +180° Upside-Down, or +270° Counter-Clockwise to set the correction.' },
      { title: 'Download Updated PDF', text: 'Click "Apply Rotation & Download" to save the updated document.' }
    ],
    tips: [
      'If only page 2 of a contract was scanned sideways, choose "Selected Pages" and type "2" so you do not accidentally rotate the correctly oriented pages.',
      'Rotating 90° clockwise four times returns the document to its original orientation.',
      'The tool changes page rotation rather than creating a screenshot. Review the saved document in your target PDF reader.',
      'Always test the downloaded PDF in your preferred viewer to ensure all target pages display at the intended reading angle.'
    ],
    faqs: [
      {
        question: 'Is the rotation permanent or just a temporary screen view setting?',
        answer: 'The tool saves the selected rotation in the resulting PDF. Review the downloaded file in your target PDF viewer to confirm the pages display as intended.'
      },
      {
        question: 'Can I rotate only specific pages in a document without affecting others?',
        answer: 'Yes! You can choose "Selected Pages" and enter specific page numbers (e.g., "2, 4, 7") or ranges (e.g., "3-5") to rotate only those individual sheets while leaving the rest of the document untouched.'
      },
      {
        question: 'Will rotating my PDF degrade the text or image clarity?',
        answer: 'The tool sets the selected page rotation and saves the PDF with pdf-lib. It does not intentionally rasterize pages, but review the resulting document and any features that matter to your workflow.'
      },
      {
        question: 'Are my confidential documents uploaded to a server?',
        answer: 'The inspected rotation component processes selected PDF data in the browser and does not send it to a DocuForge upload endpoint.'
      },
      {
        question: 'Can I rotate a document by 180 degrees if it was fed upside-down into a scanner?',
        answer: 'Yes, select +180° to flip upside-down scans right-side up in a single click.'
      }
    ],
    relatedTools: ['merge-pdf', 'split-pdf', 'compress-pdf']
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    title: 'Compress PDF Files',
    shortDescription: 'Re-save PDF files with object streams and compare the resulting file size.',
    fullDescription: 'Rebuild a PDF from its pages and save it with object streams enabled. File-size results vary by document, so review the output before using it.',
    category: 'pdf',
    iconName: 'Minimize',
    badge: 'Optimization',
    features: [
      'Re-saves PDF files using pdf-lib object streams',
      'Shows the original and output file sizes for comparison',
      'File-size results depend on the input PDF',
      'Processes selected PDF data in your browser'
    ],
    supportedFormats: ['application/pdf'],
    seoTitle: 'Compress PDF Online Free — Optimize PDF Files',
    seoDescription: 'Re-save PDF files online for free using browser-based PDF processing. File-size results vary by document, so check the output before sharing.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf file', 'online pdf optimizer', 'compress pdf for email'],
    overview:
      'The Compress PDF tool loads a PDF in the browser with `pdf-lib` and saves a new copy with object streams enabled. It reports the before-and-after sizes, but the result depends on the input document and may not be smaller. Review the output before using it.',
    howToSteps: [
      { title: 'Upload PDF Document', text: 'Select or drag the PDF file you wish to optimize into the upload zone.' },
      { title: 'Inspect Initial File Info', text: 'Review the document page count and initial file size.' },
      { title: 'Run PDF Optimization', text: 'Use the optimize control to re-save the PDF with object streams enabled.' },
      { title: 'Review & Download', text: 'Compare the before and after sizes, review the output, and download the resulting PDF.' }
    ],
    tips: [
      'File-size results depend on how the source PDF was created and what it contains; re-saving may not reduce its size.',
      'If the output is not smaller, use a workflow that can downsample embedded images and compare its result before replacing the original.',
      'Review text, images, forms, and signatures in the output PDF before relying on it.',
      'Always verify that your compressed PDF opens properly in your reader before discarding your original document.'
    ],
    faqs: [
      {
        question: 'How does client-side PDF compression work?',
        answer: 'The tool loads the PDF using pdf-lib and saves it with object streams enabled. It does not guarantee that every input PDF will become smaller.'
      },
      {
        question: 'Will compressing my PDF blur the text or signatures?',
        answer: 'The tool re-saves the PDF rather than intentionally rasterizing it, but document features may be affected by processing. Review the output, especially forms, signatures, and complex documents.'
      },
      {
        question: 'Are my confidential documents safe to compress?',
        answer: 'The inspected compression component processes the selected PDF in the browser and does not send selected file contents to a DocuForge upload endpoint. This is not a legal or compliance certification.'
      },
      {
        question: 'Why do some PDFs compress more than others?',
        answer: 'File-size results vary by document. The output may be smaller, similar in size, or larger than the original.'
      },
      {
        question: 'Is there a fixed file-size limit?',
        answer: 'The tool does not enforce a fixed file-size limit. Processing capacity depends on the browser, device resources, and document.'
      }
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
    seoTitle: 'Convert Image to PDF Online Free — JPG, PNG & WebP',
    seoDescription: 'Convert JPG, PNG, and WebP images into a PDF online. Set page size, orientation, and margins, then download the browser-generated document.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert photo to pdf', 'combine images into pdf'],
    overview:
      'DocuForge Image to PDF Converter combines selected JPG, PNG, and WebP images into a PDF. Arrange the page order and choose A4, US Letter, or Fit to Image Dimensions. The inspected component reads the selected images and creates the PDF in the browser; it does not send those files to a DocuForge upload endpoint. This does not cover ordinary website requests, device security, or third-party services.',
    howToSteps: [
      { title: 'Add Images', text: 'Upload one or multiple photos, scans, or screenshots in JPG, PNG, or WebP format.' },
      { title: 'Arrange Page Sequence', text: 'Use the Up and Down arrow controls to order which image appears on which page.' },
      { title: 'Choose Page Size & Margins', text: 'Select standard A4, US Letter, or Fit to Image Dimensions, and select your margin preference.' },
      { title: 'Compile & Download PDF', text: 'Click "Convert to PDF" to generate and download your unified multi-page PDF document.' }
    ],
    tips: [
      'Select A4 for European and international administrative submissions, or US Letter for North American applications.',
      'Choose "Fit to Image Dimensions" when you want page dimensions based on the image size.',
      'Adding a "Small" margin prevents edges of scanned receipts from being clipped when printed on standard desktop printers.',
      'You can mix landscape and portrait photos in the same document; select "Auto" orientation to match each image dynamically.'
    ],
    faqs: [
      {
        question: 'Can I combine different image formats into one PDF?',
        answer: 'Yes! You can mix JPG, PNG, and WebP images in the same document. Each image will be converted and embedded cleanly on its own designated page in the unified PDF.'
      },
      {
        question: 'What is the best setting for creating printable documents?',
        answer: 'Choose "A4" or "US Letter" with a margin setting that suits your printer. Review the PDF before printing to check that image borders are not clipped.'
      },
      {
        question: 'Are my uploaded identification photos and receipts safe?',
        answer: 'The image-to-PDF component reads selected images and creates the PDF in your browser. The inspected tool code does not send selected file contents to a DocuForge upload endpoint.'
      },
      {
        question: 'How many images can I bundle into a single PDF?',
        answer: 'You can combine multiple images in one document. Practical capacity and processing time depend on the images, browser, and device.'
      },
      {
        question: 'Can I reorder the images after uploading them?',
        answer: 'Yes. You can use the Up and Down arrow buttons next to each uploaded image in the list to rearrange the page sequence before generating the PDF.'
      }
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
