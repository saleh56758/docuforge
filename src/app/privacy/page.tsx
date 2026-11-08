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
          Last Updated &amp; Effective Date: October 2026 • Website: <code>{siteUrl}</code> • Contact: <code>{CONTACT_EMAIL}</code>
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
          Advertising placements and the AdSense script are currently disabled in the application. No AdSense publisher declaration is being published while account approval and publisher configuration remain unverified. If advertising is enabled later, this policy and any applicable consent behavior must be reviewed and updated first.
        </p>
        <p>
          If advertising is activated in the future, third-party providers may process data according to their own policies. Details and opt-out information should be added here only after the actual provider configuration is confirmed.
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
          DocuForge is a general-audience digital utility website intended for students, professionals, and adults. We do not knowingly collect, solicit, or maintain personal information from children under the age of 13 (or under 16 in certain European jurisdictions), in compliance with the Children&apos;s Online Privacy Protection Act (COPPA).
        </p>
        <p>
          If you are a parent or guardian and believe that your child has provided personal information to us (for example, by sending an email or contact form message), please contact us immediately at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--color-primary)' }}>{CONTACT_EMAIL}</a>, and we will promptly delete such correspondence from our inbox.
        </p>

        <h2>8. Privacy Requests</h2>
        <p>
          Applicable privacy rights depend on your location and circumstances. This general information is not legal advice. Contact us to ask about personal information submitted through the contact form.
        </p>
        <ul>
          <li><strong>Right of Access</strong>: You may request confirmation of whether we hold personal communications relating to you.</li>
          <li><strong>Right to Rectification</strong>: You may request correction of inaccurate contact information.</li>
          <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;)</strong>: You may request that we delete any email correspondence you previously sent us.</li>
          <li><strong>Right to Restriction &amp; Objection</strong>: You may object to the processing of your communication data.</li>
          <li><strong>Right to Data Portability</strong>: You may request a machine-readable copy of any information you provided to us.</li>
        </ul>
        <p>
          <em>Note regarding files</em>: The tool-processing code reviewed does not send selected file contents to a DocuForge upload endpoint. To ask about communications sent through the contact form, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>9. California Privacy Requests</h2>
        <p>
          California privacy laws may provide rights regarding personal information. The scope of applicable rights depends on the circumstances; contact us with questions about contact-form information.
        </p>
        <ul>
          <li><strong>Right to Know &amp; Access</strong>: You have the right to request the categories and specific pieces of personal information we have collected about you over the past 12 months.</li>
          <li><strong>Right to Delete</strong>: You have the right to request deletion of personal information collected from you (e.g., support emails).</li>
          <li><strong>No Sale or Sharing of Personal Information</strong>: DocuForge does not sell, rent, or share personal data for monetary or other valuable consideration. We do not sell files, names, or email addresses.</li>
          <li><strong>Right to Non-Discrimination</strong>: We will never discriminate against you (deny services, charge different prices, or provide different quality) for exercising any of your CCPA/CPRA rights.</li>
        </ul>

        <h2>10. Security Practices</h2>
        <p>
          Use the HTTPS site address when visiting DocuForge. Browser-based file processing means the inspected tool code does not upload selected files to a DocuForge endpoint, but this does not eliminate all security risks associated with devices, browsers, hosting, or third-party services.
        </p>

        <h2>11. External Links &amp; Third-Party Services</h2>
        <p>
          Our website and technical guides may contain hyperlinks to third-party websites or services (such as Mozilla Developer Network, Google Ads Settings, or W3C standards). We do not control and are not responsible for the privacy practices or content of third-party platforms. We encourage you to review their respective privacy policies.
        </p>

        <h2>12. Changes to This Privacy Policy</h2>
        <p>
          We may periodically update this Privacy Policy to reflect changes in our tools, technology, operational practices, or legal requirements. Any modifications will be posted directly on this page with an updated &quot;Last Updated&quot; date at the top. We encourage you to review this page periodically to stay informed about how we safeguard your privacy.
        </p>

        <h2>13. Data Controller &amp; Privacy Contact</h2>
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
