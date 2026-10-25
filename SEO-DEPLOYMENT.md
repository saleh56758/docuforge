# DocuForge SEO Deployment Checklist

## Status before deployment

The production build and local route-level SEO verification pass. Set the
environment values below in the hosting provider before building the deployed
site.

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=google-provided-token   # optional
```

`NEXT_PUBLIC_SITE_URL` must be the final HTTPS origin, without a trailing
slash. It controls canonical URLs, JSON-LD, `robots.txt`, `sitemap.xml`, and
`llms.txt`.

## Cloudflare Pages configuration

This project is configured as a static Next.js export. In Cloudflare Pages,
connect the Git repository and select **Next.js (Static HTML Export)** (or set
the equivalent values below):

| Setting | Value |
| :--- | :--- |
| Production branch | Your release branch (normally `main`) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `22` or later |

Set `NEXT_PUBLIC_SITE_URL` in Cloudflare Pages **Build variables** before the
first production build. Public Next.js values are intentionally embedded in
the generated static files at build time, so rebuild after changing them.

Security headers are defined in `public/_headers`, which Cloudflare Pages
publishes as its header rules. Do not add this generated-free configuration to
`.gitignore`; it is required for every deployment.

## Manual actions after the site is live

1. Configure the host to redirect HTTP to HTTPS and provision a valid TLS
   certificate. The application sends HSTS but cannot create the certificate
   or redirect at the hosting layer.
2. Open `https://your-production-domain.example/robots.txt` and confirm its
   sitemap URL uses the final domain.
3. Open `https://your-production-domain.example/sitemap.xml` and confirm all
   public URLs use HTTPS and the final domain.
4. In Google Search Console, add the appropriate Domain or URL-prefix
   property, then complete ownership verification using the deployed meta tag
   (or an alternative method selected in Search Console).
5. Submit the deployed `/sitemap.xml` in Search Console. This project cannot
   verify ownership or submit it on your behalf.
6. Use PageSpeed Insights or Chrome DevTools on the live HTTPS pages at mobile
   and desktop widths. Review LCP, INP, and CLS from the real deployment;
   local build output is not a substitute for field data.
7. Inspect representative pages at 320px, 768px, and desktop widths, including
   tool upload flows and guide tables. Confirm that real browser/device
   behavior matches the CSS safeguards.
8. Use the social platform debuggers relevant to your channels to refresh and
   inspect the Open Graph preview after deployment.

## Do not do automatically

Do not submit the sitemap, create a Search Console property, publish a domain,
or add analytics/verification secrets from this repository without owner
approval.
