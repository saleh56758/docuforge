import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GUIDES, getGuideBySlug } from '@/data/guides';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getAbsoluteUrl, SITE_CONFIG } from '@/utils/siteConfig';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: 'Guide Not Found' };
  const canonicalUrl = getAbsoluteUrl(`guides/${guide.slug}`);

  return {
    title: `${guide.title} — DocuForge`,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      publishedTime: '2026-10-01T00:00:00Z',
      authors: [guide.author],
      images: [
        {
          url: SITE_CONFIG.defaultOgImage,
          width: 1200,
          height: 630,
          alt: guide.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [SITE_CONFIG.defaultOgImage]
    }
  };
}

export default function GuideDetailPage({ params }: Props) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const canonicalUrl = getAbsoluteUrl(`guides/${guide.slug}`);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: {
      '@type': 'Organization',
      name: guide.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'DocuForge',
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('icon-512.png')
      }
    },
    image: getAbsoluteUrl('og-image.jpg'),
    datePublished: '2026-10-01T00:00:00Z',
    dateModified: '2026-10-24T00:00:00Z',
    mainEntityOfPage: canonicalUrl
  };

  // Split markdown headings and paragraphs into clean JSX elements
  const renderContent = (raw: string) => {
    const lines = raw.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let keyCounter = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          elements.push(
            <p key={`p-${keyCounter++}`} dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
          );
        }
        currentParagraph = [];
      }
    };

    const formatInline = (str: string) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
    };

    let inTable = false;
    let tableRows: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('|')) {
        flushParagraph();
        inTable = true;
        if (!line.includes('---')) {
          const cells = line.split('|').slice(1, -1).map((c) => c.trim());
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        inTable = false;
        if (tableRows.length > 0) {
          const header = tableRows[0];
          const body = tableRows.slice(1);
          elements.push(
            <table key={`table-${keyCounter++}`}>
              <thead>
                <tr>
                  {header.map((h, idx) => (
                    <th key={idx} dangerouslySetInnerHTML={{ __html: formatInline(h) }} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
          tableRows = [];
        }
      }

      if (line.startsWith('## ')) {
        flushParagraph();
        elements.push(<h2 key={`h2-${keyCounter++}`}>{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        flushParagraph();
        elements.push(<h3 key={`h3-${keyCounter++}`}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        flushParagraph();
        elements.push(
          <li key={`li-${keyCounter++}`} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^[-*]\s+/, '')) }} />
        );
      } else if (/^\d+\.\s+/.test(line)) {
        flushParagraph();
        elements.push(
          <li key={`oli-${keyCounter++}`} dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\.\s+/, '')) }} />
        );
      } else if (line === '') {
        flushParagraph();
      } else {
        currentParagraph.push(line);
      }
    }

    flushParagraph();
    return elements;
  };

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <div className="container article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Guides & Tutorials', href: '/guides' },
          { label: guide.title }
        ]}
      />

      <header className="article-header">
        <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.75rem' }}>
          {guide.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="tool-page-title" style={{ fontSize: '2.25rem', lineHeight: 1.25 }}>
          {guide.title}
        </h1>

        <div className="article-meta">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <User size={14} aria-hidden="true" /> {guide.author}
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={14} aria-hidden="true" /> {guide.publishedDate}
          </span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} aria-hidden="true" /> {guide.readingTime}
          </span>
        </div>
      </header>

      <div className="prose">
        {renderContent(guide.content)}
      </div>

      <AdPlaceholder slotId="guide-bottom-banner" />

      {/* Other Recommended Guides */}
      <section style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Explore More Practical Tutorials
        </h2>

        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {otherGuides.map((item) => (
            <Link
              key={item.slug}
              href={`/guides/${item.slug}`}
              className="tool-card"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.375rem' }}>
                {item.readingTime} • {item.tags[0]}
              </div>
              <h3 className="tool-card-title" style={{ fontSize: '1rem', marginBottom: '0.375rem' }}>
                {item.title}
              </h3>
              <p className="tool-card-desc" style={{ fontSize: '0.8125rem' }}>
                {item.description}
              </p>
              <div className="tool-card-footer">
                <span>Read Tutorial</span>
                <ArrowRight size={13} aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
