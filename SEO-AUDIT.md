# DocuForge Technical SEO Audit

**Date of Audit**: October 2026  
**Auditor**: Senior Full-Stack Developer & Technical SEO Specialist  
**Workspace**: `e:\toolkit`  
**Application**: DocuForge (Free Online Image & PDF Utilities)

---

## 1. Architecture & Rendering Method

- **Framework**: Next.js 14.2.35 (App Router).
- **Rendering Strategy**: 100% Static Site Generation (SSG / Pre-rendering). All 28 pages are compiled into static HTML at build time, ensuring zero JavaScript hydration latency for search engine crawlers (Googlebot, Bingbot).
- **Styling**: Pure Vanilla CSS (`src/styles/globals.css`). No Tailwind or external CSS runtime libraries.
- **Client Processing Libraries**: `pdf-lib` (PDF manipulation) and HTML5 Canvas API (raster image transformation).

---

## 2. Inventory of Audited Routes

| Route | Type | Current Index Status | Primary Search Intent |
| :--- | :--- | :--- | :--- |
| `/` | Homepage | Indexable | Free browser file utilities discovery |
| `/image-compressor` | Tool | Indexable | Compress JPG, PNG, and WebP images |
| `/image-resizer` | Tool | Indexable | Resize image pixel dimensions & scale % |
| `/image-cropper` | Tool | Indexable | Crop photos to aspect ratios (1:1, 16:9, etc.) |
| `/jpg-to-webp` | Tool | Indexable | Convert JPG photos to lightweight WebP |
| `/webp-to-jpg` | Tool | Indexable | Convert modern WebP to universal JPEG |
| `/png-to-jpg` | Tool | Indexable | Convert heavy PNG graphics to JPG |
| `/image-converter` | Tool | Indexable | Universal image format converter |
| `/merge-pdf` | Tool | Indexable | Combine multiple PDF files into one |
| `/split-pdf` | Tool | Indexable | Extract page ranges from PDF |
| `/rotate-pdf` | Tool | Indexable | Rotate PDF pages 90, 180, 270 degrees |
| `/compress-pdf` | Tool | Indexable | Optimize PDF file size & stream structure |
| `/image-to-pdf` | Tool | Indexable | Convert photos to A4 / Letter multi-page PDF |
| `/guides` | Knowledge Base | Indexable | Digital file optimization tutorials index |
| `/guides/how-to-compress-images-without-losing-quality` | Guide | Indexable | Image compression quality benchmarks |
| `/guides/how-to-merge-pdf-files-securely` | Guide | Indexable | Secure client-side PDF merging guide |
| `/guides/jpg-vs-png-vs-webp-comparison` | Guide | Indexable | Image format selection decision matrix |
| `/guides/how-to-convert-images-to-pdf` | Guide | Indexable | Converting photo scans to formal PDFs |
| `/about` | Supporting | Indexable | Product mission & privacy architecture |
| `/contact` | Supporting | Indexable | User support, bug reporting, inquiries |
| `/privacy` | Legal | Indexable | Client-side privacy policy & GDPR/CCPA |
| `/terms` | Legal | Indexable | Terms of service & user file rights |
| `/cookies` | Legal | Indexable | Cookie & advertising disclosures |
| `/sitemap.xml` | SEO Feed | N/A (XML) | Search engine sitemap index |
| `/robots.txt` | SEO Feed | N/A (TXT) | Crawler access permissions |
| `/_not-found` | Utility | Noindex (404) | Missing page recovery |

---

## 3. Initial SEO Problems Discovered

### Issue 1: Missing Static Assets in `public/` (404 Risk)
- **Evidence**: `public/` directory does not exist in workspace.
- **Impact**: In `src/app/layout.tsx`, `<link rel="icon" href="/favicon.ico" />` and `og:image: '/og-image.png'` are referenced. When crawlers or social platforms request `/favicon.ico` or `/og-image.png`, they will receive 404 responses.
- **Affected Routes**: Global layout, all social previews.
- **Planned Fix**: Create `public/` directory with `favicon.ico`, `favicon.svg`, `og-image.png`, `site.webmanifest`, and `llms.txt`.

### Issue 2: Hardcoded Production Domain Strings
- **Evidence**: `https://docuforge.app` is hardcoded in `layout.tsx`, `sitemap.ts`, `robots.ts`, `Breadcrumbs.tsx`, `ToolPageContainer.tsx`, and each tool page.
- **Impact**: If the user deploys to a different domain, canonical tags, sitemaps, and structured data will point to the incorrect host.
- **Planned Fix**: Create a centralized `siteConfig.ts` that reads `process.env.NEXT_PUBLIC_SITE_URL` (with fallback to `https://docuforge.app`) so the site URL is 100% configurable via `.env.local` or hosting provider settings.

### Issue 3: Broken Anchor Links in Navigation & Breadcrumbs
- **Evidence**: `Navbar.tsx` and `Breadcrumbs.tsx` link to `/#image-tools` and `/#pdf-tools`, but `id="image-tools"` and `id="pdf-tools"` do not exist in `src/app/page.tsx`.
- **Impact**: Clicking these navigation links causes no page scroll or focus change. Crawlers indexing fragment identifiers find no corresponding target anchor.
- **Planned Fix**: Add semantic category sections with `id="image-tools"` and `id="pdf-tools"` on `src/app/page.tsx`.

### Issue 4: Heading Hierarchy Violations
- **Evidence**:
  - `src/components/Footer.tsx` uses `<h4>` for column titles without parent `<h3>` headings.
  - `src/app/page.tsx` uses `<h3>` in the privacy banner directly under `<h1>`.
  - `src/app/guides/[slug]/page.tsx` uses `<h3>` for "Explore More Practical Tutorials" directly under `<h2>`.
- **Impact**: Screen readers and search engine document outline parsers detect skipped heading levels.
- **Planned Fix**: Normalize heading tags (`<h2>` for major sections, `<h3>` for cards/steps, `<p className="footer-col-title">` for footer headers).

### Issue 5: Missing Security & Performance HTTP Headers
- **Evidence**: `next.config.mjs` does not configure HTTP security headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Impact**: Suboptimal security audit scores and lower trust signals.
- **Planned Fix**: Add standard security headers in `next.config.mjs`.

### Issue 6: Missing Google Search Console Verification Support
- **Evidence**: `src/app/layout.tsx` metadata does not include `verification: { google: ... }`.
- **Impact**: The site owner must manually modify code to add HTML tag verification.
- **Planned Fix**: Connect `verification.google` to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable.

### Issue 7: Alt Text Refinement on Interactive Tool Previews
- **Evidence**: Some image preview elements use generic `alt="Preview"`.
- **Impact**: Misses descriptive context for accessibility and image search indexing.
- **Planned Fix**: Update preview alt text dynamically to `alt={`Optimized preview of ${file.name}`}`.

### Issue 8: Missing `llms.txt`
- **Evidence**: No `llms.txt` file exists at the site root.
- **Impact**: AI search engines and LLM crawlers lack a standardized markdown summary of the platform's tools and documentation.
- **Planned Fix**: Generate a clean, factual `public/llms.txt`.

---

## 4. Implementation Plan for Phase 2

1. **Centralize Domain & Site Config** in `src/utils/siteConfig.ts`.
2. **Create Static Assets** in `public/` (`favicon.ico`, `favicon.svg`, `og-image.png`, `llms.txt`, `site.webmanifest`).
3. **Configure Security Headers & Web Config** in `next.config.mjs`.
4. **Fix Navigation Anchors & Section Headings** in `src/app/page.tsx`, `Navbar.tsx`, `Footer.tsx`, and `ToolPageContainer.tsx`.
5. **Update Structured Data & Schema JSON-LD** to ensure 100% Google guideline compliance.
6. **Enrich Contextual Internal Linking** between tools and related guides.
7. **Verify & Test All 20 Checks** with automated scripts.

---

## 5. Continuation Status — October 24, 2026

This section records the implementation and verification completed after the
initial audit. It supersedes the planned-fix wording above where a check is
now marked **FIXED** or **PASS**.

| Check | Status | Verification / implementation |
| :--- | :--- | :--- |
| Sitemap XML | PASS | Dynamic `/sitemap.xml` lists all 23 indexable routes once, using the configured site URL. |
| robots.txt | PASS | `/robots.txt` allows public crawling, disallows `/api/`, and references the configured sitemap. |
| Indexability / noindex | PASS | Public pages are indexable; the tested unknown route returns `404` with `noindex, nofollow`. |
| Canonical URLs | FIXED | Root layout, tools, guides, sitemap, robots, breadcrumbs, and JSON-LD use `NEXT_PUBLIC_SITE_URL` through `siteConfig.ts`. |
| Unique titles and descriptions | PASS | Verified across 23 indexable routes. |
| H1 and heading hierarchy | FIXED | Homepage and every tool page were checked for exactly one H1; navigation anchors and heading levels were corrected. |
| Image alt text | FIXED | Interactive previews now use the selected filename in descriptive alt text; the remaining image-to-PDF previews use the original filename. |
| Schema markup | PASS | JSON-LD parsed on every indexable page; tools include `WebApplication`, `BreadcrumbList`, `HowTo`, and `FAQPage`; guides include `Article` and `BreadcrumbList`. |
| Internal and broken links | PASS | 24 discovered same-site internal paths returned HTTP 200. |
| Image optimization | FIXED | A 1200×630 JPEG Open Graph asset and 192/512px PNG application icons are present and dimension-checked. User-file previews are browser-local object URLs and cannot be optimized at build time. |
| Core Web Vitals | NEEDS MANUAL ACTION | Production compilation is clean and the shared first-load JavaScript is 87.3 kB, but field/lab CWV requires a deployed HTTPS URL and real browser measurement. |
| Mobile responsiveness | FIXED | Added narrow-screen single-column safeguards for tool/contact grids, wrapping filter tabs, safe prose wrapping, and horizontal table scrolling. Static CSS assertions pass; device/browser inspection remains recommended after deployment. |
| HTTPS readiness | FIXED | HSTS, nosniff, frame, referrer, permissions, and DNS-prefetch headers are configured. HTTPS certificate issuance and redirect enforcement must be configured by the host. |
| Clean URLs | PASS | App Router routes are path-based and sitemap entries omit file extensions/trailing-slash variants. |
| Open Graph / social image | FIXED | All indexable routes expose a 1200×630 JPEG Open Graph and Twitter image. |
| Google Search Console readiness | NEEDS MANUAL ACTION | Metadata supports `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; `.env.example` documents the token. Ownership verification and sitemap submission require the live domain. |
| llms.txt | PASS | `/llms.txt` is served as plain text and dynamically lists the current tools, guides, policies, and canonical host. |

### Actual test results

- `npm.cmd run build`: **PASS** — Next.js generated 29 static routes successfully.
- `SEO_TEST_ORIGIN=http://127.0.0.1:3103 npm.cmd run test:seo`: **PASS** — 659 assertions across 23 indexable routes and 24 discovered internal links, including one-H1 and no-skipped-heading checks.

No domain, ownership token, deployment target, or Search Console property was assumed or created during this work.
