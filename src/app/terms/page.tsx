import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service — DocuForge',
  description: 'Terms of Service governing the use of DocuForge free online utilities.',
  alternates: {
    canonical: 'https://docuforge.app/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="container article-page">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <header className="article-header">
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Terms of Service
        </h1>
        <p className="article-meta">
          Last Updated: October 2026 • Effective Date: October 2026
        </p>
      </header>

      <div className="prose">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using DocuForge (<code>https://docuforge.app</code>), you agree to be bound by these Terms of Service and all applicable local, national, and international laws. If you do not agree with any of these terms, you are prohibited from using this website.
        </p>

        <h2>2. Permitted Use</h2>
        <p>
          DocuForge provides free browser-side file processing utilities for personal, educational, and commercial purposes. You agree to use the service only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the service.
        </p>
        <p>You agree NOT to:</p>
        <ul>
          <li>Use automated scripts, bots, or scrapers that cause excessive denial-of-service pressure on our web servers.</li>
          <li>Attempt to reverse-engineer, alter, or exploit bugs in our static delivery infrastructure.</li>
          <li>Embed DocuForge tools inside misleading iframes designed to deceive end users or harvest clicks.</li>
        </ul>

        <h2>3. Intellectual Property Rights</h2>
        <p>
          The layout, visual branding, trademarks, domain, custom code, tutorials, and written content on DocuForge are protected by copyright and intellectual property laws.
        </p>
        <p>
          <strong>Your Files:</strong> You retain 100% full and unconditional ownership of all files and content that you process through DocuForge. Because all operations are performed client-side on your device, DocuForge asserts zero ownership, license, or rights over your files.
        </p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          DocuForge is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, whether express or implied. While we strive to ensure that our compression, conversion, and PDF manipulation algorithms are accurate and reliable, we do not warrant that:
        </p>
        <ul>
          <li>The services will be uninterrupted, error-free, or compatible with every corrupted or proprietary file format.</li>
          <li>File transformations will always result in zero visible artifacts across all possible display monitors.</li>
        </ul>
        <p>
          You are solely responsible for keeping uncompressed, original backup copies of your important files before performing conversions.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall DocuForge, its developers, or contributors be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service, including data loss or corrupted files.
        </p>

        <h2>6. Modifications to Terms</h2>
        <p>
          We reserve the right to revise these Terms of Service at any time without prior notice. By continuing to use the website after changes are posted, you agree to be bound by the modified terms.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          Any claim relating to DocuForge shall be governed by standard principles of contract law and applicable jurisdiction without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  );
}
