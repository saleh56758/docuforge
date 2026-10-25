import Link from 'next/link';
import { Metadata } from 'next';
import { FileQuestion, ArrowRight, Home } from 'lucide-react';
import { TOOLS } from '@/data/tools';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false
  }
};

export default function NotFound() {
  const popularTools = TOOLS.slice(0, 4);

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '5rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 'var(--radius-full)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', marginBottom: '1.25rem' }}>
        <FileQuestion size={32} />
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
        Page Not Found (404)
      </h1>

      <p style={{ fontSize: '1.0625rem', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 2rem auto' }}>
        The page or utility you requested does not exist or may have been relocated. Use the links below to access our free tools.
      </p>

      <div style={{ display: 'inline-flex', gap: '0.75rem', marginBottom: '3.5rem' }}>
        <Link href="/" className="btn-primary">
          <Home size={16} /> Return to Homepage
        </Link>
        <Link href="/guides" className="btn-ghost">
          Browse Guides
        </Link>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', textAlign: 'center' }}>
          Popular Working Utilities
        </h2>
        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {popularTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="tool-card"
              style={{ padding: '1rem' }}
            >
              <h3 className="tool-card-title" style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                {tool.title}
              </h3>
              <p className="tool-card-desc" style={{ fontSize: '0.8125rem', marginBottom: '0.75rem' }}>
                {tool.shortDescription}
              </p>
              <div className="tool-card-footer" style={{ padding: 0, border: 'none' }}>
                <span>Launch Tool</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
