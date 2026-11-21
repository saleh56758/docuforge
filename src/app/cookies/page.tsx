import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

export const metadata: Metadata = {
  title: 'Cookie Policy — DocuForge',
  description:
    'Information about browser local storage and the current advertising configuration on DocuForge.',
  alternates: {
    canonical: getAbsoluteUrl('cookies')
  },
  openGraph: {
    title: 'Cookie Policy — DocuForge',
    description:
      'Information about browser local storage and the current advertising configuration on DocuForge.',
    url: getAbsoluteUrl('cookies'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy — DocuForge',
    description:
      'Information about browser local storage and the current advertising configuration on DocuForge.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function CookiesPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          Cookie Policy
        </h1>
        <p className="article-meta" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Last Updated: November 2026 • Contact: <code>{CONTACT_EMAIL}</code>
        </p>
      </header>

      <div className="prose">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your computer or mobile device when you load websites. They are widely used to make websites function correctly, remember your preferences across sessions, and provide analytical or advertising information to site operators.
        </p>

        <h2>How DocuForge Uses Cookies and Local Storage</h2>
        <p>
          DocuForge prioritizes a minimal cookie footprint. Because our 12 image and PDF utilities require no login or user accounts, we do not set any first-party session tracking cookies.
        </p>
        <p>
          The application uses browser storage for the theme preference. The AdSense library is loaded for publisher verification, while ad units and placements remain disabled. This page does not claim that the third-party script never reads or stores browser data.
        </p>

        <table>
          <thead>
            <tr>
              <th>Type / Name</th>
              <th>Provider</th>
              <th>Purpose</th>
              <th>Lifespan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>df_theme</code></td>
              <td>DocuForge (Local Storage)</td>
              <td>Remembers your Dark Mode / Light Mode color preference so your chosen theme persists.</td>
              <td>Until removed by you or your browser</td>
            </tr>
            <tr>
              <td>AdSense verification library</td>
              <td>Google</td>
              <td>Loaded for publisher verification; ad units and placements are disabled. The project has not verified third-party cookie behavior.</td>
              <td>Not determined by this project; consult Google&apos;s current information and check the deployed browser behavior.</td>
            </tr>
          </tbody>
        </table>

        <h2>Advertising Placements</h2>
        <p>
          No ad units or placements are active. If placements are enabled in the future, update provider-specific disclosures and confirm applicable consent requirements against the actual account and deployment settings.
        </p>

        <h2>Managing and Disabling Cookies in Your Browser</h2>
        <p>
          Most modern web browsers allow you to manage cookie settings, delete existing cookies, or block third-party cookies altogether:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Third-party cookies.</li>
          <li><strong>Mozilla Firefox:</strong> Settings → Privacy &amp; Security → Enhanced Tracking Protection.</li>
          <li><strong>Apple Safari:</strong> Settings / Preferences → Privacy → Block all cookies / Manage Website Data.</li>
          <li><strong>Microsoft Edge:</strong> Settings → Cookies and site permissions.</li>
        </ul>
        <p>
          The tool-processing components use browser APIs and do not depend on advertising cookies to process selected files.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have questions regarding this Cookie Policy, please contact our administrator:
        </p>
        <ul>
          <li><strong>Contact</strong>: Hassaan Saleh</li>
          <li><strong>Email</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </li>
          <li><strong>Inquiry Form</strong>: <Link href="/contact">DocuForge Contact Page</Link></li>
        </ul>
      </div>
    </div>
  );
}
