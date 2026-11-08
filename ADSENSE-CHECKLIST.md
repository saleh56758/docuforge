# AdSense and Production Configuration Status

Status snapshot: 2026-11-08. This document distinguishes repository source from the currently deployed website. It does not assess AdSense approval, eligibility, or policy compliance.

## Local source state

- `SITE_CONFIG.adsEnabled` is `false`; the AdSense script and ad placements remain disabled.
- `public/ads.txt` contains only a pending-verification comment. It does not contain a publisher record.
- The Google site-verification HTML file is present in `public/`. Its presence does not establish that the account's current verification instructions or AdSense requirements have been met.
- The source sitemap defines 29 intended canonical URLs: 9 static pages, 12 tool pages, and 8 guide articles.
- The source includes `/blog`, `/disclaimer`, and eight guide routes.
- The Contact page and footer use `hassaansaleh56@gmail.com`.

## Static export and live deployment

The project uses Next.js static export (`output: 'export'`). A local build only establishes what that build generated; it does not establish what is deployed on Cloudflare Pages.

At the latest live-site inspection:

- These routes returned HTTP 404:
  - `/blog`
  - `/disclaimer`
  - `/guides/how-to-reduce-pdf-file-size`
  - `/guides/how-to-crop-and-resize-images-for-web-and-social-media`
  - `/guides/why-client-side-file-tools-are-safer`
  - `/guides/how-to-split-and-extract-pdf-pages`
- The live `/sitemap.xml` contained 23 URLs; the source sitemap defines 29 intended canonical URLs.
- The live `/ads.txt` returned HTTP 404.

These are observations of the deployed site at inspection time, not evidence that a later deployment has fixed the mismatch. Recheck the live routes, sitemap, and `ads.txt` after any deployment.

## Manual checks required

- Check the current instructions and account status in the actual Google account. This repository does not establish approval, eligibility, or compliance.
- Do not add a publisher record to `ads.txt` until the account's actual publisher ID and required record are confirmed.
- Keep ads disabled until account approval and publisher/ad-unit configuration have been confirmed.
- Confirm that the deployed site-verification method matches the account's current instructions.
- Confirm the Cloudflare Pages build and deployment use the intended source and generated static export.

Do not treat this status document or a successful local build as confirmation of account approval or production availability.
