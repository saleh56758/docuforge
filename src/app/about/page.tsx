import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, Cpu, Zap, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About DocuForge — Free, Private Online Utilities',
  description:
    'Learn about the mission and architecture of DocuForge: high-speed image and PDF processing running 100% inside your browser sandbox.',
  alternates: {
    canonical: 'https://docuforge.app/about'
  }
};

export default function AboutPage() {
  return (
    <div className="container article-page">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <header className="article-header">
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          About DocuForge
        </h1>
        <p className="article-meta">
          Privacy-First File Utilities • Built for Speed, Simplicity & Security
        </p>
      </header>

      <div className="prose">
        <h2>Our Mission</h2>
        <p>
          DocuForge was created to solve a widespread security and performance flaw on the modern web: traditional online file converters require users to upload confidential photos, invoices, tax forms, and identity documents to unknown third-party servers.
        </p>
        <p>
          We believe basic utilities like compressing an image, joining two PDF sheets, or converting a format should never compromise your privacy. DocuForge is engineered to perform all computations directly on your local device.
        </p>

        <h2>How It Works: Browser-Side Sandboxing</h2>
        <p>
          Traditional converter platforms receive your file over the network, store it in an Amazon S3 or Google Cloud storage bucket, queue a background worker to run command-line utilities (like ImageMagick or Ghostscript), and return a download link. This creates severe privacy vulnerabilities, bandwidth waste, and server waiting queues.
        </p>
        <p>
          DocuForge takes advantage of modern web browser standards:
        </p>
        <ul>
          <li>
            <strong>HTML5 Canvas & Web APIs</strong>: Image compression, dimension scaling, cropping, and format switching (JPG, PNG, WebP) happen using hardware-accelerated graphics pipelines built directly into your browser.
          </li>
          <li>
            <strong>Sandboxed PDF Engines</strong>: Document manipulation (merging, splitting, rotating, and stream optimization) executes through isolated JavaScript engines like <code>pdf-lib</code>.
          </li>
          <li>
            <strong>Zero Egress</strong>: Your files never leave your computer&apos;s physical RAM. No server receives your documents, and no logs or thumbnails are ever generated remotely.
          </li>
        </ul>

        <h2>Who Uses DocuForge?</h2>
        <p>
          Our utilities are tailored for:
        </p>
        <ul>
          <li>
            <strong>Office workers & administrators</strong> who need to merge scanned invoices and reports without violating corporate privacy agreements.
          </li>
          <li>
            <strong>Web designers & developers</strong> seeking fast, lossless image compression and modern WebP generation to pass Google Core Web Vitals.
          </li>
          <li>
            <strong>Students & academics</strong> submitting assignments, admissions documents, and thesis papers formatted to standard A4 or Letter sizes.
          </li>
          <li>
            <strong>General users</strong> who simply want a clean, honest tool that does what it says without popups, artificial countdowns, or email gates.
          </li>
        </ul>

        <h2>Commitment to Transparency</h2>
        <p>
          We will never sell user data, install software bundles, or inject deceptive download buttons. We believe honest tools create long-term user trust.
        </p>
      </div>
    </div>
  );
}
