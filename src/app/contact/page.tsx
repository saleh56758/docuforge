import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import { Mail, HelpCircle, MessageCircle } from 'lucide-react';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export const metadata: Metadata = {
  title: 'Contact DocuForge — Technical Support & Feedback',
  description:
    'Contact DocuForge creator Hassaan Saleh for technical support, bug reports, file format requests, or AdSense/partnership inquiries. Direct email: hassaansaleh56@gmail.com.',
  alternates: {
    canonical: getAbsoluteUrl('contact')
  },
  openGraph: {
    title: 'Contact DocuForge — Technical Support & Feedback',
    description:
      'Contact DocuForge creator Hassaan Saleh for technical support, bug reports, file format requests, or partnership inquiries.',
    url: getAbsoluteUrl('contact'),
    images: [SITE_CONFIG.defaultOgImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DocuForge — Technical Support & Feedback',
    description:
      'Contact DocuForge creator Hassaan Saleh for technical support, bug reports, or partnership inquiries.',
    images: [SITE_CONFIG.defaultOgImage]
  }
};

export default function ContactPage() {
  return (
    <div className="container article-page" style={{ maxWidth: 860, margin: '0 auto', paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <header className="article-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>
          Contact Us
        </h1>
        <p className="article-meta" style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Have a question, suggestion, or encountered a problem while using DocuForge? We’d love to hear from you.
          Get in touch using the form below or email us directly.
        </p>
      </header>

      {/* Contact Cards Grid */}
      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
            <Mail size={22} aria-hidden="true" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Email Us</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            For questions, feedback, or support:
          </p>
          <a
            href="mailto:hassaansaleh56@gmail.com"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              textDecoration: 'underline',
              wordBreak: 'break-all'
            }}
          >
            hassaansaleh56@gmail.com
          </a>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-success)', marginBottom: '0.75rem' }}>
            <MessageCircle size={22} aria-hidden="true" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Feedback &amp; Support</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Whether you have feedback, need help with a tool, or want to suggest a new feature, please get in touch.
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-pdf-tool)', marginBottom: '0.75rem' }}>
            <HelpCircle size={22} aria-hidden="true" />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Report a Problem</h2>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            If something isn’t working as expected, tell us which tool you were using. Include your browser or file type if it may help us understand the issue.
          </p>
        </div>
      </div>

      {/* Main Interactive Contact Form */}
      <ContactForm />
    </div>
  );
}
