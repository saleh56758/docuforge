# Practical 90-Day Technical SEO & Growth Roadmap

This document outlines a realistic, phased 90-day growth roadmap for **DocuForge**. It focuses on search indexing, Core Web Vitals optimization, authoritative backlink acquisition, and user-first content expansion.

> **Guiding Principle**: Avoid thin mass-produced programmatic pages or automated spam. Focus on genuine technical utility, fast client-side performance, and authoritative tutorials that satisfy search intent.

---

## Phase 1: Days 1–30 — Foundation, Crawlability & Indexation

### 1. Search Console & Webmaster Verification
- [ ] Deploy production code to your custom domain (with HTTPS enabled).
- [ ] Submit property to **Google Search Console (GSC)** via DNS TXT verification.
- [ ] Submit property to **Bing Webmaster Tools** (also powers Yahoo and DuckDuckGo).
- [ ] Submit `https://yourdomain.com/sitemap.xml` directly into GSC sitemaps panel.
- [ ] Verify that Googlebot can access `robots.txt` and that no accidental `noindex` headers exist.

### 2. Core Web Vitals Benchmarking
- [ ] Run **Lighthouse** audits across desktop and mobile on both `/` and tool pages (`/image-compressor`, `/merge-pdf`).
- [ ] Target:
  - **LCP (Largest Contentful Paint)**: < 1.2s (facilitated by our static SSG output and lightweight CSS).
  - **CLS (Cumulative Layout Shift)**: 0.00 (all preview boxes and ad placeholders maintain explicit sizing).
  - **INP (Interaction to Next Paint)**: < 100ms.
- [ ] Configure modern HTTP caching headers on your hosting provider (Vercel / Cloudflare / Nginx) for static JS and CSS assets (`Cache-Control: public, max-age=31536000, immutable`).

### 3. Rich Results & Structured Data Verification
- [ ] Test sample URLs on **Google Rich Results Test**:
  - Verify `WebApplication` schema on `/image-compressor` and `/merge-pdf`.
  - Verify `HowTo` schema and `FAQPage` schema.
  - Verify `Article` and `BreadcrumbList` schemas on `/guides/`.
- [ ] Monitor GSC "Enhancements" tab for any schema warnings.

---

## Phase 2: Days 31–60 — Content Expansion & Topical Authority

### 1. In-Depth Workflow Tutorials
Create 4–6 additional high-intent technical guides addressing specific user dilemmas:
- *How to Reduce PDF File Size Below 2 MB for Government Job Portals*
- *WebP vs AVIF: Which Next-Gen Image Format Should You Target?*
- *How to Split Specific Sections from Large Bank Statements Without Exposing Account Data*
- *Best Image Dimensions and Aspect Ratios for Major Social Media Platforms (2026 Edition)*

### 2. Search Intent Refinement
- Monitor initial queries appearing in GSC Performance reports (impressions with low CTR).
- Enhance tool landing page FAQ sections with questions real visitors are asking.
- Optimize `<title>` tags for high-impression keywords that rank between positions 8 and 20.

### 3. Open-Source & Community Outreach
- [ ] Publish an introductory technical post on **Dev.to** and **Hacker News (Show HN)** titled: *"Why We Built a Browser-Only Image & PDF Utility with Zero Cloud Egress"*.
- [ ] Share on developer subreddits (`r/webdev`, `r/javascript`, `r/selfhosted`) highlighting the pure client-side `pdf-lib` and HTML5 Canvas implementation.
- [ ] Add the project to reputable privacy-respecting directories and open-source lists.

---

## Phase 3: Days 61–90 — Scale, Conversion & AdSense Readiness

### 1. Backlink Profile Diversification
- [ ] Reach out to educational websites, university library resource guides, and digital literacy blogs that maintain lists of "Free Academic PDF Tools".
- [ ] Pitch guest contributions to web development blogs discussing image payload optimization for Core Web Vitals.
- [ ] Identify broken links on web utility resource pages and suggest DocuForge as a modern, HTTPS-secure replacement.

### 2. Internationalization (i18n) Planning
- Assess top non-English countries visiting the platform in Google Analytics.
- If traffic from Spanish, German, French, or Portuguese speakers increases:
  - Structure localized URL paths (e.g., `/es/comprimir-imagen`, `/de/pdf-zusammenfuegen`).
  - Implement standard `hreflang` tags to capture global regional search volume.

### 3. AdSense Readiness Review
- [ ] Verify that Google Analytics shows steady organic search traffic (e.g., 50–100+ daily active visitors).
- [ ] Ensure low bounce rate by verifying tools remain fast and responsive.
- [ ] Audit all legal disclosures (`/privacy`, `/terms`, `/cookies`, `/about`, `/contact`).
- [ ] Complete the steps in `ADSENSE-CHECKLIST.md` and submit application.

---

## 📈 Key Performance Indicators (KPIs) to Track

| Metric | Target (Day 30) | Target (Day 60) | Target (Day 90) |
| :--- | :--- | :--- | :--- |
| **Indexed Pages** | 100% of sitemap routes | 100% + new guides | 100% |
| **Average Tool CTR** | Baseline establish | > 3.5% | > 4.5% |
| **Mobile Core Web Vitals** | 95+ Score | 98+ Score | 99+ Score |
| **Organic Daily Clicks** | Initial indexing | Steady growth | Consistent return visitors |
