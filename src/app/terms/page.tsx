import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAbsoluteUrl, getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const siteUrl = getSiteUrl();
const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

export const metadata: Metadata = {
  title: 'Terms of Service — DocuForge',
  description:
    'Terms of Service governing the use of DocuForge free online utilities. Full user ownership of files, permitted use, and service disclaimers.',
  alternates: {
    canonical: getAbsoluteUrl('terms')
  },
  openGraph: {
    title: 'Terms of Service — DocuForge',
    description:
      'Terms of Service governing the use of DocuForge free online utilities. Full user ownership of files, permitted use, and service disclaimers.',
    url: getAbsoluteUrl('terms'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — DocuForge',
    description:
      'Terms of Service governing the use of DocuForge free online utilities. Full user ownership of files, permitted use, and service disclaimers.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function TermsPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          Terms of Service
        </h1>
        <p className="article-meta" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Last Updated: October 2026 • Effective Date: October 2026 • Contact: <code>{CONTACT_EMAIL}</code>
        </p>
      </header>

      <div className="prose">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>DocuForge</strong> (accessible at <code>{siteUrl}</code>, including all tool pages, guides, and related services), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, our <Link href="/privacy">Privacy Policy</Link>, and our <Link href="/disclaimer">Disclaimer</Link>. If you do not agree to all of these terms, please do not access or use DocuForge.
        </p>

        <h2>2. Description of the Service</h2>
        <p>
          DocuForge provides a collection of 12 free, browser-based digital utilities designed for image optimization, dimension resizing, cropping, format conversion, and PDF document management (including merging, splitting, rotating, compressing, and compiling images into PDF).
        </p>
        <p>
          The image and PDF tool components process selected files in the browser using browser APIs and the JavaScript <code>pdf-lib</code> library. The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint. Website requests and contact-form submissions are separate.
        </p>

        <h2>3. Permitted Use &amp; Fair Usage</h2>
        <p>
          You are granted a non-exclusive, non-transferable, revocable license to access and use DocuForge for personal, educational, non-profit, or commercial purposes, subject to these terms.
        </p>
        <p>You agree <strong>NOT</strong> to:</p>
        <ul>
          <li>Deploy automated scrapers, crawlers, botnets, or flood scripts that intentionally impair, overload, or degrade the performance of our static hosting infrastructure or CDN.</li>
          <li>Embed or iframe DocuForge within third-party applications or websites in a deceptive manner that conceals our branding or manipulates advertising delivery.</li>
          <li>Circumvent, modify, disable, or tamper with any security controls, headers, or client-side integrity measures implemented across the website.</li>
          <li>Use the platform or its guides for any illegal purpose or to process files in violation of applicable copyright or intellectual property laws.</li>
        </ul>

        <h2>4. User Content &amp; Ownership</h2>
        <p>
          You retain ownership of the files you select and the outputs you create, subject to any rights that already apply to those files.
        </p>
        <p>
          Based on the current tool-processing implementation:
        </p>
        <ul>
          <li>The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint. This does not cover unrelated website requests, hosting logs, browser behavior, or third-party services.</li>
          <li>DocuForge claims zero copyright, license, title, or intellectual property rights over any file processed using our tools.</li>
          <li>You are solely responsible for ensuring that you have all legal rights, permissions, and licenses required to process and modify your source files.</li>
        </ul>

        <h2>5. Intellectual Property Rights of DocuForge</h2>
        <p>
          All original software code, user interface designs, visual layouts, styling, graphics, custom documentation, technical guides, logos, and trademarks displayed on DocuForge are the intellectual property of Hassaan Saleh and DocuForge, protected by international copyright and intellectual property laws. You may not reproduce, redistribute, or mirror our original articles or codebases without express prior written consent.
        </p>

        <h2>6. Third-Party Advertising &amp; External Links</h2>
        <p>
          Advertising placements are currently disabled. If advertising is enabled in the future, third-party advertising networks may serve advertisements. We do not endorse, guarantee, or assume responsibility for any third-party products, services, or claims advertised on the website.
        </p>
        <p>
          Our guides and pages may contain links to external third-party websites. DocuForge has no control over the content, uptime, or privacy policies of external destinations. Visiting external links is done solely at your own discretion.
        </p>

        <h2>7. Disclaimer of Warranties</h2>
        <p>
          DOCUFORGE AND ALL TOOLS, FEATURES, AND CONTENT ARE PROVIDED STRICTLY ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.
        </p>
        <p>
          While we strive for high precision and stability across all algorithms, we do not warrant that:
        </p>
        <ul>
          <li>The tools will always operate error-free, uninterrupted, or without temporary browser memory limitations on very large files.</li>
          <li>Specific proprietary, corrupted, or password-protected PDF or image formats will always be parsed without defect.</li>
          <li>File compression will achieve a specific percentage reduction on every image without any perceptual visual change.</li>
        </ul>
        <p>
          <strong>Always retain uncompressed master copies of your original files</strong> before performing conversions, crops, or compression.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL DOCUFORGE, ITS DEVELOPER (HASSAAN SALEH), AFFILIATES, OR HOSTING PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA, CORRUPTED FILES, WORK STOPPAGE, HARDWARE DAMAGE, OR BUSINESS INTERRUPTION) ARISING OUT OF OR IN CONNECTION WITH THE USE OR INABILITY TO USE OUR TOOLS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        <h2>9. Modifications to the Service and Terms</h2>
        <p>
          We reserve the right to modify, suspend, or discontinue any tool, guide, or aspect of DocuForge at any time without prior notice. We also reserve the right to revise these Terms of Service periodically. Your continued use of DocuForge following the posting of updated terms constitutes your acceptance of the revisions.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms of Service shall be governed by and construed in accordance with generally recognized contract principles and the laws of the jurisdiction of the website administrator, without giving effect to any principles of conflicts of law.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          If you have questions, feedback, or legal inquiries regarding these Terms of Service, please contact:
        </p>
        <ul>
          <li><strong>Administrator</strong>: Hassaan Saleh</li>
          <li><strong>Email</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </li>
          <li><strong>Contact Form</strong>: <Link href="/contact">DocuForge Contact Page</Link></li>
        </ul>
      </div>
    </div>
  );
}
