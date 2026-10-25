import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { Mail, HelpCircle } from 'lucide-react';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Support & Feedback — DocuForge',
  description:
    'Contact the DocuForge engineering team for technical support, feature requests, bug reporting, or partnership inquiries.',
  alternates: {
    canonical: getAbsoluteUrl('contact')
  },
  openGraph: {
    title: 'Contact Support & Feedback — DocuForge',
    description: 'Contact the DocuForge engineering team for technical support, feature requests, or bug reporting.',
    url: getAbsoluteUrl('contact'),
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function ContactPage() {
  return (
    <div className="container article-page">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <header className="article-header">
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Contact & Technical Support
        </h1>
        <p className="article-meta">
          Have feedback, found a bug, or want to suggest a new utility? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            <Mail size={22} aria-hidden="true" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Direct Inquiries</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            For partnership discussions, technical questions, or general feedback:
          </p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>
            support@docuforge.app
          </p>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-success)', marginBottom: '0.75rem' }}>
            <HelpCircle size={22} aria-hidden="true" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Bug Reports & Formats</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Encountered an unusual PDF or unsupported image format? Please share the file specifications or browser version so we can improve parser compatibility.
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
