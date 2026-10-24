import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy — DocuForge',
  description:
    'Our comprehensive privacy policy explains why your files never leave your computer and how we handle cookies, analytics, and advertising.',
  alternates: {
    canonical: 'https://docuforge.app/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="container article-page">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="article-header">
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Privacy Policy
        </h1>
        <p className="article-meta">
          Last Updated: October 2026 • Effective Date: October 2026
        </p>
      </header>

      <div className="prose">
        <h2>1. Fundamental Privacy Principle: Client-Side Processing</h2>
        <p>
          At DocuForge (accessible from <code>https://docuforge.app</code>), the privacy and security of our visitors is our core technical objective. The fundamental architectural principle of DocuForge is simple: <strong>your files are never uploaded to our servers</strong>.
        </p>
        <p>
          All image conversions, compressions, crops, and PDF modifications (such as merging, rotating, and splitting) are performed locally inside your device&apos;s web browser using client-side JavaScript, WebAssembly, and HTML5 Canvas APIs.
        </p>
        <ul>
          <li>We do not transmit your documents across the network.</li>
          <li>We do not store, view, scan, or copy your files.</li>
          <li>We cannot access the content of your images, contracts, or documents.</li>
        </ul>

        <h2>2. Information We Automatically Collect</h2>
        <p>
          Like most standard web services, when you visit our website, our web server or CDN (such as Cloudflare or Vercel) automatically logs basic technical information sent by your browser. This includes:
        </p>
        <ul>
          <li>Internet Protocol (IP) address.</li>
          <li>Browser type and version.</li>
          <li>Operating system.</li>
          <li>Referring web page and exit pages.</li>
          <li>Date and timestamp of visits.</li>
        </ul>
        <p>
          This telemetry data is used solely to maintain server stability, prevent automated DDoS attacks, diagnose network outages, and analyze aggregate visitor volume. It is never linked to any personal files or identities.
        </p>

        <h2>3. Cookies and Local Storage</h2>
        <p>
          DocuForge uses browser <code>localStorage</code> solely to remember your preferred UI appearance (such as dark mode vs light mode). This information never leaves your browser.
        </p>
        <p>
          We do not use tracking cookies for session authentication because DocuForge requires no login or account creation.
        </p>

        <h2>4. Third-Party Advertising (Google AdSense)</h2>
        <p>
          To keep our tools completely free and accessible without subscription fees, we may display commercial advertisements served by third-party advertising networks, including Google AdSense.
        </p>
        <ul>
          <li>
            Google, as a third-party vendor, uses cookies to serve ads on DocuForge based on a user&apos;s prior visits to this or other websites on the internet.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to DocuForge and/or other sites on the Internet.
          </li>
          <li>
            Users in the European Economic Area (EEA), the UK, and California are presented with applicable consent dialogs in accordance with GDPR and CCPA requirements.
          </li>
          <li>
            You may opt out of personalized advertising by visiting Google&apos;s <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>Ad Settings</a> or via <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>aboutads.info</a>.
          </li>
        </ul>

        <h2>5. Your Rights (GDPR & CCPA Compliance)</h2>
        <p>
          Because we do not collect, process, or store personal files or user account profiles, we hold zero user-generated documents in our infrastructure. If you contact us via email, you have the right to request deletion of your correspondence history at any time by contacting <code>privacy@docuforge.app</code>.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect operational or regulatory changes. Any modifications will be posted immediately on this page with an updated &quot;Last Updated&quot; date.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding our privacy practices, please contact us at: <code>privacy@docuforge.app</code>.
        </p>
      </div>
    </div>
  );
}
