# DocuForge — Free Online Image & PDF Utilities

**DocuForge** is a fast, 100% private, browser-side file utility platform. It provides essential image optimization and PDF manipulation tools designed for students, office professionals, content creators, and web developers.

Unlike traditional converter sites that upload personal documents to external cloud servers, **DocuForge executes all file processing directly within the user's browser sandbox**. Files never leave the user's computer or smartphone.

---

## 🛠️ Implemented & Verified Utilities

### Image Tools
| Utility | Route | Capability |
| :--- | :--- | :--- |
| **Image Compressor** | `/image-compressor` | Real-time quality slider, dimension scaling, byte savings comparison, JPG/PNG/WebP. |
| **Image Resizer** | `/image-resizer` | Custom width & height, aspect ratio lock, percentage presets (25%, 50%, 75%, 100%). |
| **Image Cropper** | `/image-cropper` | Interactive canvas bounding box, drag handles, aspect presets (Free, 1:1, 16:9, 4:3, 9:16). |
| **JPG to WebP** | `/jpg-to-webp` | Modern WebP encoder with quality control and immediate byte-level savings. |
| **WebP to JPG** | `/webp-to-jpg` | Converts WebP into universal JPEG format with matte background fill for transparency. |
| **PNG to JPG** | `/png-to-jpg` | Converts heavy PNGs to lightweight JPGs with transparency background options. |
| **Image Converter** | `/image-converter` | Universal format converter switching between JPG, PNG, and WebP. |

### PDF Tools
| Utility | Route | Capability |
| :--- | :--- | :--- |
| **Merge PDF** | `/merge-pdf` | Combine multiple PDF files, reorder pages up/down, page count indicators. |
| **Split PDF** | `/split-pdf` | Extract custom page ranges (e.g. `1-3, 5, 8`) or specific pages with range validation. |
| **Rotate PDF** | `/rotate-pdf` | Rotate all or specific pages by +90°, +180°, or +270° clockwise permanently. |
| **Compress PDF** | `/compress-pdf` | Reconstructs PDF cross-references and compresses object streams via `pdf-lib`. |
| **Image to PDF** | `/image-to-pdf` | Compile multiple JPG, PNG, and WebP images into standard A4, US Letter, or Fit-to-Image PDFs. |

### Supporting & Content Pages
- **Homepage (`/`)**: Fast tool discovery, live fuzzy search, category tabs, and privacy guarantee.
- **Knowledge Base (`/guides`)**:
  - `/guides/how-to-compress-images-without-losing-quality`
  - `/guides/how-to-merge-pdf-files-securely`
  - `/guides/jpg-vs-png-vs-webp-comparison`
  - `/guides/how-to-convert-images-to-pdf`
- **Legal & Transparency**:
  - `/about` — Mission and technical sandboxing explanation.
  - `/contact` — Feedback, inquiries, and bug reporting.
  - `/privacy` — Comprehensive privacy disclosures (client-side execution, zero file retention, GDPR/CCPA).
  - `/terms` — Acceptable use, warranty disclaimers, and user ownership guarantee.
  - `/cookies` — Transparent cookie policy with AdSense disclosures.
- **SEO Engines**:
  - `/sitemap.xml` — Dynamically generated XML sitemap with change frequencies and priorities.
  - `/robots.txt` — Standard crawl directives pointing to sitemap.
  - `/_not-found` — User-friendly 404 error page directing visitors back to working utilities.

---

## 💻 Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) with full Static Site Generation (SSG).
- **Styling**: Pure **Vanilla CSS** (`src/styles/globals.css`). No bloated utility frameworks. High-contrast, clean typography, responsive layout, and built-in Light/Dark mode.
- **PDF Engine**: `pdf-lib` (pure JavaScript/TypeScript client-side PDF manipulation).
- **Image Engine**: Native HTML5 Canvas 2D Context, FileReader, and Blob APIs.
- **Icons**: `lucide-react` (clean SVG vector icons, no emojis as UI icons).
- **SEO**: Schema.org JSON-LD (`WebApplication`, `HowTo`, `FAQPage`, `BreadcrumbList`, `Article`, `WebSite`), dynamic OpenGraph, canonical links, and unique title/meta descriptions.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js `v18.0.0` or higher (Tested on `v24.12.0`).
- npm `v9.0.0` or higher.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Run Production Bundle
```bash
npm run build
npm run start
```

### 4. Run Automated Test Suite
```bash
node scripts/test-tools.mjs
```
Executes the 60-point verification test suite verifying PDF engines, image converters, HTTP routes, schema validation, and SEO output.

---

## 🌐 Deployment Instructions

DocuForge is pre-configured for instant zero-config deployment to:
- **Vercel**: Import repository, framework preset auto-detected as Next.js.
- **Cloudflare Pages / Netlify**: Standard Next.js deployment.
- **Self-Hosted VPS (Node/Docker)**: Run `npm run build && npm run start`.

To generate a 100% static HTML output folder (`out/`) for static web hosting (Apache, Nginx, or GitHub Pages), add `output: 'export'` to `next.config.mjs` and run `npm run build`.

---

## 🔐 Privacy & Security Architecture

1. **No External API Keys**: Zero third-party cloud processing APIs.
2. **Client-Side Sandbox**: Uploaded files reside only in temporary browser memory buffers (`ArrayBuffer` / `HTMLImageElement`) and are garbage collected when tabs are closed.
3. **No Database Required**: Zero user credentials or document metadata stored.
