# DocuForge Image Diversity Report

## Result

The previous integration had only three stock-photo source families for the homepage, tool headers, About page, workflow cards, and guide features. The image files themselves were not exact byte-for-byte duplicates; the problem was reuse of the same photographs across unrelated placements.

The site now has 25 distinct stock-photo placements with unique Unsplash source URLs and local asset bases: one homepage hero, 12 tool headers, four workflow cards on `/blog`, and eight guide cards with matching featured images on the guide detail routes. The guides index and each guide detail use the same unique guide image. The generic corridor photo was removed from About because it did not add useful context. No ordinary stock photo is intentionally reused.

## Audit findings and changes

| Area | Finding before changes | Change |
| --- | --- | --- |
| Homepage | The workspace photo was also used on unrelated image-tool and guide pages. | Assigned `home-workspace` only to the homepage hero. |
| Image tools | Multiple image tools shared one workspace photo. | Assigned a separate contextual photo to each of the seven image-tool routes. |
| PDF tools | Multiple PDF tools shared one document photo. | Assigned a separate contextual photo to each of the five PDF-tool routes. |
| Blog/workflow cards | Two cards shared the same document photo; the remaining cards drew from the same small set. | Each of the four workflow cards now has a distinct image. |
| Guides | Guide listings and article pages reused three generic photos across unrelated articles. | Each of the eight guide cards and its matching article page has its own featured photo. |
| About | The reused stock photo showed an empty office corridor and did not communicate DocuForge's identity. | Removed the photo rather than replacing it with decoration. |
| Asset inventory | The old three photos each had 800, 1200, and 1800-pixel variants. SHA-256 checks found no identical files, but the same source photos appeared repeatedly in page code. | Removed the superseded files and added unique local WebP assets. |

### Unique placement inventory

The source URL, licensing note, alt text, local variants, and exact primary placement are recorded in [`IMAGE-SOURCES.md`](./IMAGE-SOURCES.md) and [`src/data/imageCatalog.json`](./src/data/imageCatalog.json).

| Route or placement | Local image base |
| --- | --- |
| Homepage hero | `home-workspace` |
| `/image-compressor` | `tool-image-compressor` |
| `/image-resizer` | `tool-image-resizer` |
| `/image-cropper` | `tool-image-cropper` |
| `/image-converter` | `tool-image-converter` |
| `/jpg-to-webp` | `tool-jpg-to-webp` |
| `/webp-to-jpg` | `tool-webp-to-jpg` |
| `/png-to-jpg` | `tool-png-to-jpg` |
| `/merge-pdf` | `tool-merge-pdf` |
| `/split-pdf` | `tool-split-pdf` |
| `/rotate-pdf` | `tool-rotate-pdf` |
| `/compress-pdf` | `tool-compress-pdf` |
| `/image-to-pdf` | `tool-image-to-pdf` |
| `/blog` — prepare image workflow | `blog-prepare-image` |
| `/blog` — assemble scans workflow | `blog-scanned-pdf` |
| `/blog` — extract pages workflow | `blog-extract-pages` |
| `/blog` — PDF file-size workflow | `blog-pdf-size` |
| `/guides/how-to-compress-images-without-losing-quality` | `guide-compress-images` |
| `/guides/jpg-vs-png-vs-webp-comparison` | `guide-format-comparison` |
| `/guides/how-to-reduce-pdf-file-size` | `guide-pdf-size` |
| `/guides/how-to-merge-pdf-files-securely` | `guide-merge-pdf` |
| `/guides/how-to-convert-images-to-pdf` | `guide-images-to-pdf` |
| `/guides/how-to-crop-and-resize-images-for-web-and-social-media` | `guide-crop-resize` |
| `/guides/why-client-side-file-tools-are-safer` | `guide-client-side` |
| `/guides/how-to-split-and-extract-pdf-pages` | `guide-extract-pages` |

## Image selection, licensing, and optimization

- The 25 unique images were visually reviewed together and in representative rendered pages. They are contextual stock photos, not representations of DocuForge's interface or tool output.
- The source and derived-download URLs are stored per asset in the catalog. All are Unsplash CDN photo endpoints; the official Unsplash License permits commercial use and does not require attribution.
- The individual Unsplash photo pages and photographer names could not be independently retrieved from their CDN identifiers. They are explicitly not claimed as verified in the source inventory. If page-level creator records are required for internal records, manually match the photo IDs before publication.
- Each source was downloaded locally, focal-cropped to a landscape frame, and encoded as WebP at 800 × 533 and 1200 × 800, quality 82. The 50 curated files total 2,543,676 bytes (about 2.43 MiB); the largest is 240,284 bytes.
- `ResponsiveImage` serves the appropriate local variant through `srcSet`; page-level image frames retain their existing responsive styling and descriptive alt text.

## Automated duplicate checks

Added `npm run check:images` (`scripts/check-image-diversity.mjs`). It:

- Hashes every image under `public/` and fails on exact byte-identical files.
- Fails when a source URL, image base/path, or primary placement is repeated.
- Checks that tool and guide routes and all blog workflow cards have catalog entries.
- Verifies the two responsive variants exist for every catalog entry and that no uncatalogued files remain in `public/images/`.
- Rejects hard-coded `/images/<filename>` paths outside the shared responsive-image component and flags curated files over 300 KB.

Latest result: **25 unique placements, 50 curated image files, and 54 public image files including the existing favicon/icons/Open Graph image; no repeated source URLs, image paths, exact hashes, or uncatalogued image assets.**

## Verification

- `npm run build` — passed; static production export generated.
- `npm run test:seo` — passed, 827 assertions across 29 indexable routes and 29 internal links.
- `npm run check:images` — passed.
- Production-browser route pass — all 29 indexable routes checked at 320, 390, 768, and 1280 px (116 route/viewport combinations). All returned HTTP 200, had one H1, loaded their rendered images with nonempty alt text, and had no horizontal overflow.
- The rendered image placements were unique across all 12 tool routes, all eight guide articles, all four `/blog` workflow cards, and the homepage. Representative homepage and image-tool pages were visually inspected in the browser at mobile size.
- `git diff --check` — passed.

## Remaining checks and protected settings

- Physical-device rendering and slow-network behavior were not tested.
- Individual photo-page URLs/photographer identities remain unverified; see the source note above. No attribution is required under the linked Unsplash License.
- AdSense source configuration was not changed. `SITE_CONFIG.adsEnabled` remains `false`, the app's ad placeholder returns `null`, and this work adds no ad slots. The browser did observe aborted requests to Google ad endpoints and a hidden zero-size `adsbygoogle-noablate` node from the existing verification script; no visible ad or ad iframe was present. Account-level Auto ads settings were not tested and should be checked in AdSense if zero ad requests are required.
