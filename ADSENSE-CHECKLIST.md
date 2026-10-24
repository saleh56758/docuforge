# Google AdSense Readiness & Compliance Checklist

This checklist outlines the technical, editorial, and policy requirements necessary before submitting **DocuForge** for a Google AdSense account and site review.

> **Important Notice**: Google AdSense approval is never automatically guaranteed. Reviews are conducted manually by Google's policy team based on site uniqueness, traffic quality, legal compliance, and user experience. Following this checklist maximizes your probability of approval.

---

## 1. Prerequisites Before Submitting Application

- [ ] **Custom Top-Level Domain (TLD)**
  - AdSense requires a root domain (e.g., `yourdomain.com`). Subdomains on free hosts (like `something.vercel.app`) are usually rejected.
  - Domain should ideally be at least 30–60 days old with verifiable DNS ownership.

- [ ] **SSL / HTTPS Active**
  - Ensure SSL certificate is valid and redirects all HTTP requests to HTTPS.

- [ ] **Organic Search Traffic**
  - Google reviewers verify that the website receives real organic visitors. Wait until your site is indexed in Google Search Console and shows regular organic impressions and clicks before applying.

---

## 2. Policy & Content Verification

- [x] **No Fake Ads or Deceptive Triggers**
  - Current state: All ad containers in DocuForge use the compliant `AdPlaceholder` component. Commercial units remain disabled until your publisher ID is configured.
  - No fake download buttons or deceptive "Start Now" banners that mimic advertisements.

- [x] **Original, Non-Thin Content**
  - Every tool page includes unique technical descriptions, how-to instructions, supported formats, limitations, and dedicated FAQs.
  - Knowledge base guides provide multi-thousand-word original analysis on compression mathematics, security considerations, and file formats.
  - No scraped or machine-generated content farms.

- [x] **Comprehensive Legal Pages**
  - **About Us** (`/about`): Explains the technical philosophy, client-side processing, and team mission.
  - **Contact Us** (`/contact`): Provides real contact email (`support@docuforge.app`) and interactive inquiry form.
  - **Privacy Policy** (`/privacy`): Complies with GDPR/CCPA, explains local browser sandboxing, discloses third-party advertising cookies, and provides Google Ad Settings opt-out links.
  - **Terms of Service** (`/terms`): Clear acceptable use, liability limitations, and user file ownership.
  - **Cookie Policy** (`/cookies`): Clear table of local storage and advertising cookies.

- [x] **Clear, Intuitive Navigation**
  - Header navigation links to Image Tools, PDF Tools, Guides, and About.
  - Footer provides a complete catalog of all working utilities and legal pages.
  - Search bar and category filters allow visitors to find any tool in one click.

---

## 3. Technical Configuration (Once Approved)

### Step 1: Create `ads.txt`
Once your AdSense account is approved, Google will issue your publisher ID (e.g., `pub-XXXXXXXXXXXXXXXX`).
Create `public/ads.txt`:
```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

### Step 2: Configure Environment Variables
Update your production `.env` (or hosting provider environment variables):
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ENABLE_ADS=true
```

### Step 3: Insert AdSense Verification Code
Add the Google AdSense script tag to `src/app/layout.tsx` inside `<head>`:
```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossorigin="anonymous"
></script>
```

---

## 4. Common Reasons for Rejection & How We Prevented Them

| Common AdSense Rejection Reason | Prevention in DocuForge |
| :--- | :--- |
| **"Low-value content" / "Site under construction"** | 12 fully functional tools, 4 in-depth technical guides, thorough FAQs on every page, and 0 placeholder content. |
| **"Navigation issues / broken links"** | All internal links, breadcrumbs, category pills, and footer anchors are verified and return HTTP 200. |
| **"Deceptive layout"** | Clear visual hierarchy; tools and download buttons are cleanly separated from reserved advertising areas. |
| **"Missing legal disclosures"** | Full Privacy Policy, Cookie Policy, Terms of Service, and Contact forms already implemented. |
| **"Non-functional tools"** | Every single utility actually runs in the browser. Zero dummy or mock buttons. |
