import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AlertTriangle, ShieldCheck, Mail, FileCheck } from 'lucide-react';
import { getAbsoluteUrl, getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

export const metadata: Metadata = {
  title: 'Disclaimer — DocuForge',
  description:
    'Legal and operational disclaimer for DocuForge image and PDF tools. Information regarding document backups, "as-is" software, and third-party advertising.',
  alternates: {
    canonical: getAbsoluteUrl('disclaimer')
  },
  openGraph: {
    title: 'Disclaimer — DocuForge',
    description:
      'Legal and operational disclaimer for DocuForge image and PDF tools. Information regarding document backups, "as-is" software, and third-party advertising.',
    url: getAbsoluteUrl('disclaimer'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer — DocuForge',
    description:
      'Legal and operational disclaimer for DocuForge image and PDF tools. Information regarding document backups, "as-is" software, and third-party advertising.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function DisclaimerPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          Disclaimer
        </h1>
        <p className="article-meta" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Last Updated: October 2026 • Contact: <code>{CONTACT_EMAIL}</code>
        </p>
      </header>

      <div className="prose">
        <div
          style={{
            padding: '1.25rem 1.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <AlertTriangle size={24} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            The utilities and technical guides on DocuForge are offered freely for informational, personal, and professional file manipulation. Please review these operational disclaimers regarding backup preservation, browser memory constraints, and advertising disclosures.
          </div>
        </div>

        <h2>1. General Information &amp; &quot;As-Is&quot; Software</h2>
        <p>
          All tools, calculators, guides, and services on DocuForge are provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranty of any kind. The image and PDF tools use browser APIs and <code>pdf-lib</code> to process selected files in the browser. Unexpected behavior may arise with unsupported, corrupted, encrypted, or legacy document formats.
        </p>

        <h2>2. User Responsibility: Keep Original Master Copies</h2>
        <p>
          <strong>You are solely responsible for maintaining uncompressed master backup copies of all original files before processing them on DocuForge.</strong>
        </p>
        <p>
          Image compression, resizing, and PDF re-saving can alter output data or document features. Keep the original until you have reviewed and verified the downloaded result.
        </p>

        <h2>3. No Professional, Legal, or Archival Advice</h2>
        <p>
          The content on DocuForge (including articles on image formats, PDF optimization, and document management) is for general technical educational purposes only. It does not constitute professional legal, accounting, tax, or official document certification advice. For statutory legal filings requiring sworn digital signatures or specific PDF/A archival standards, please verify requirements with your designated legal or government authority.
        </p>

        <h2>4. Client-Side Browser Limitations</h2>
        <p>
          The inspected image and PDF tool code processes selected files in the browser, so available device memory and browser capabilities can affect processing. Large files or limited device resources may cause slowdowns or failures. The website and contact form can make separate network requests.
        </p>

        <h2>5. Advertising &amp; Endorsement Disclaimer</h2>
        <p>
          Advertising placements are currently disabled. If advertising is enabled in the future, advertisements, sponsored links, or third-party products will not constitute an endorsement, guarantee, or recommendation by DocuForge or its developer, Hassaan Saleh.
        </p>

        <h2>6. Contact Regarding This Disclaimer</h2>
        <p>
          If you have any questions or require clarification regarding any portion of this Disclaimer, please reach out to:
        </p>
        <ul>
          <li><strong>Developer &amp; Site Owner</strong>: Hassaan Saleh</li>
          <li><strong>Direct Email</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </li>
          <li><strong>Online Contact</strong>: <Link href="/contact">DocuForge Contact Page</Link></li>
        </ul>
      </div>
    </div>
  );
}
