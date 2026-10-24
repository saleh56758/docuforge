import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import { GUIDES } from '@/data/guides';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Guides & Tutorials — DocuForge',
  description:
    'Comprehensive guides on image compression techniques, format comparisons, secure PDF management, and web performance optimization.',
  alternates: {
    canonical: 'https://docuforge.app/guides'
  }
};

export default function GuidesIndexPage() {
  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      <Breadcrumbs items={[{ label: 'Guides & Tutorials' }]} />

      <header className="tool-header-section" style={{ borderBottom: 'none', paddingBottom: '1rem' }}>
        <div className="hero-badge" style={{ marginBottom: '0.75rem' }}>
          <BookOpen size={14} /> Knowledge Base
        </div>
        <h1 className="tool-page-title" style={{ fontSize: '2.25rem' }}>
          Guides & Technical Tutorials
        </h1>
        <p className="tool-page-subtitle">
          In-depth articles written by developers and technical SEO specialists to help you master digital formats, file optimization, and web performance.
        </p>
      </header>

      <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', marginTop: '1.5rem' }}>
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="tool-card"
            style={{ padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={13} /> {guide.readingTime}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={13} /> {guide.publishedDate}
              </span>
            </div>

            <h2 className="tool-card-title" style={{ fontSize: '1.1875rem', lineHeight: 1.35, marginBottom: '0.625rem' }}>
              {guide.title}
            </h2>

            <p className="tool-card-desc" style={{ fontSize: '0.875rem' }}>
              {guide.description}
            </p>

            <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="tool-card-footer">
              <span>Read Full Guide</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
