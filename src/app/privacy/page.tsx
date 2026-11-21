import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAbsoluteUrl, getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

const siteUrl = getSiteUrl();
const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

export const metadata: Metadata = {
  title: 'Privacy Policy — DocuForge',
  description:
    'How DocuForge processes selected image and PDF files in your browser, handles contact-form submissions, and uses third-party services.',
  alternates: {
    canonical: getAbsoluteUrl('privacy')
  },
  openGraph: {
    title: 'Privacy Policy — DocuForge',
    description:
      'How DocuForge processes selected image and PDF files in your browser, handles contact-form submissions, and uses third-party services.',
    url: getAbsoluteUrl('privacy'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — DocuForge',
    description:
      'How DocuForge processes selected image and PDF files in your browser, handles contact-form submissions, and uses third-party services.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function PrivacyPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          Privacy Policy
        </h1>
        <p className="article-meta" style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
          Last Updated &amp; Effective Date: November 2026 • Website: <code>{siteUrl}</code> • Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </header>

      <div className="prose">
        <p>
          Welcome to <strong>DocuForge</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;the Service&quot;), accessible at <code>{siteUrl}</code>. This policy describes browser-based file processing, website requests, the contact form, and third-party services. It is not legal advice or a compliance certification.
        </p>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our designated privacy administrator, <strong>Hassaan Saleh</strong>, at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>1. Browser-Based File Processing</h2>
        <p>
          The image and PDF tool components read selected files in the browser and perform their transformations locally using browser APIs and <code>pdf-lib</code>. In the implementation reviewed, these tool-processing components do not send selected file contents to a DocuForge upload endpoint. This does not mean the website makes no network requests: page assets, hosting infrastructure, and separately configured third-party services are distinct.
        </p>
        <ul>
          <li>
            <strong>Image tools</strong>: Image transformations use browser facilities such as object URLs and the Canvas API.
          </li>
          <li>
            <strong>PDF tools</strong>: PDF transformations use browser file reads and the JavaScript <code>pdf-lib</code> library.
          </li>
          <li>
            <strong>Scope</strong>: These observations describe the tool-processing code reviewed. They are not a guarantee about browser memory lifetime, other website requests, or services outside the tool components.
          </li>
        </ul>

        <h2>2. Information We Automatically Collect (Server Logs &amp; Hosting)</h2>
        <p>
          DocuForge is configured for static hosting on <strong>Cloudflare Pages</strong>. Hosting providers may process request information such as IP addresses and browser headers. We have not verified the provider’s exact logging configuration or retention period for this deployment; consult the provider’s current documentation for details.
        </p>
        <ul>
          <li>Internet Protocol (IP) address.</li>
          <li>Browser user agent, browser vendor, and version.</li>
          <li>Operating system type and device classification (desktop, tablet, mobile).</li>
          <li>Referring URL, exit pages, and HTTP response codes.</li>
          <li>Date, time, and duration of requests.</li>
        </ul>
        <p>
          The exact data collected, purposes, and retention depend on the hosting configuration and provider policies.
        </p>

        <h2>3. Cookies and Browser Local Storage</h2>
        <p>
          A cookie is a small text file placed on your device by websites you visit. DocuForge itself does not use tracking cookies for session tracking or user profiling because our site requires no account registration, login, or personal profile creation.
        </p>
        <p>
          We use browser <code>localStorage</code> solely for one functional user preference:
        </p>
        <ul>
          <li>
            <code>df_theme</code>: Stores the selected theme preference in browser local storage.
          </li>
        </ul>

        <h2>4. Advertising</h2>
        <p>
          The Google AdSense library is loaded for publisher verification. Ad units and advertising placements are disabled in the application. Loading the library is a third-party network request and is separate from displaying an advertisement. This project has not independently verified whether the verification script or hosting configuration stores or reads browser identifiers or cookies; consult Google&apos;s current privacy information and check the deployed browser behavior.
        </p>
        <p>
          Before enabling ad placements, the operator must review the applicable Google disclosures, consent requirements, and this policy against the actual account and deployment configuration.
        </p>

        <h2>5. Web Analytics</h2>
        <p>
          No analytics script was found in the application source reviewed. Hosting-provider analytics or settings outside the repository have not been verified.
        </p>

        <h2>6. Contact Form &amp; Communications Data Handling</h2>
        <p>
          When you submit an inquiry through our <Link href="/contact">Contact Page</Link> or send an email to <code>{CONTACT_EMAIL}</code>, we collect the personal information you voluntarily provide:
        </p>
        <ul>
          <li>Your full name.</li>
          <li>Your email address.</li>
          <li>The message subject and message content.</li>
        </ul>
        <p>
          <strong>Processing and delivery</strong>: When configured, the browser sends form fields to Web3Forms at <code>https://api.web3forms.com</code>. A valid access key and recipient configuration are required. The current deployment configuration and successful delivery have not been verified.
        </p>
        <p>
          Contact-form information is transmitted to the form provider for processing. Review Web3Forms&apos; current privacy terms to understand its handling and retention. Do not send sensitive information through the form.
        </p>

        <h2>7. Children&apos;s Privacy (COPPA &amp; GDPR-K)</h2>
        <p>
          DocuForge is a general-audience utility website and is not designed specifically for children. We do not knowingly ask children to provide personal information. If you believe a child has sent us information through email or the contact form, contact us so we can review the request and take appropriate steps.
        </p>

        <h2>8. Privacy Requests by Location</h2>
        <p>
          Privacy rights and response requirements depend on your location and circumstances. You can contact us to ask about personal information submitted through the contact form or email. We will review requests under applicable requirements; this policy is not a complete statement of every right or deadline.
        </p>
        <p>
          Contact-form submissions are sent to Web3Forms for processing when the form is configured. Google receives a request when its AdSense verification library loads. This policy does not determine how those disclosures are classified under any particular privacy law; consult the providers&apos; current privacy information and applicable requirements.
        </p>

        <h2>9. Security Practices</h2>
        <p>
          Use the HTTPS site address when visiting DocuForge. Browser-based file processing means the inspected tool code does not upload selected files to a DocuForge endpoint, but this does not eliminate all security risks associated with devices, browsers, hosting, or third-party services.
        </p>

        <h2>10. External Links &amp; Third-Party Services</h2>
        <p>
          Our website and technical guides may contain hyperlinks to third-party websites or services (such as Mozilla Developer Network, Google Ads Settings, or W3C standards). We do not control and are not responsible for the privacy practices or content of third-party platforms. We encourage you to review their respective privacy policies.
        </p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our tools, technology, operational practices, or legal requirements. Any modifications will be posted on this page with an updated &quot;Last Updated&quot; date at the top. Review it periodically for the current description of our information practices.
        </p>

        <h2>12. Data Controller &amp; Privacy Contact</h2>
        <p>
          If you have questions, comments, or wish to exercise your data privacy rights, please reach out to our privacy administrator:
        </p>
        <ul>
          <li><strong>Site Operator &amp; Controller</strong>: Hassaan Saleh</li>
          <li><strong>Website</strong>: <code>docuforge.pages.dev</code></li>
          <li><strong>Direct Privacy Email</strong>:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              {CONTACT_EMAIL}
            </a>
          </li>
          <li><strong>Support Page</strong>: <Link href="/contact">DocuForge Contact Form</Link></li>
        </ul>
      </div>
    </div>
  );
}
