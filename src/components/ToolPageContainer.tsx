import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  FileText,
  Info,
  HelpCircle,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ToolMetadata } from '@/types';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import { getAbsoluteUrl } from '@/utils/siteConfig';
import Breadcrumbs from './Breadcrumbs';
import HowToSection from './HowToSection';
import FaqSection from './FaqSection';
import AdPlaceholder from './AdPlaceholder';
import ToolCard from './ToolCard';

interface ToolPageContainerProps {
  tool: ToolMetadata;
  children: React.ReactNode;
}

const relatedGuideSlugsByTool: Record<string, string[]> = {
  'image-compressor': [
    'how-to-compress-images-without-losing-quality',
    'jpg-vs-png-vs-webp-comparison'
  ],
  'image-resizer': [
    'how-to-crop-and-resize-images-for-web-and-social-media',
    'how-to-compress-images-without-losing-quality'
  ],
  'image-cropper': [
    'how-to-crop-and-resize-images-for-web-and-social-media',
    'jpg-vs-png-vs-webp-comparison'
  ],
  'jpg-to-webp': [
    'jpg-vs-png-vs-webp-comparison',
    'how-to-compress-images-without-losing-quality'
  ],
  'webp-to-jpg': [
    'jpg-vs-png-vs-webp-comparison',
    'how-to-compress-images-without-losing-quality'
  ],
  'png-to-jpg': [
    'jpg-vs-png-vs-webp-comparison',
    'how-to-compress-images-without-losing-quality'
  ],
  'image-converter': [
    'jpg-vs-png-vs-webp-comparison',
    'how-to-crop-and-resize-images-for-web-and-social-media'
  ],
  'merge-pdf': [
    'how-to-merge-pdf-files-securely',
    'why-client-side-file-tools-are-safer'
  ],
  'split-pdf': [
    'how-to-split-and-extract-pdf-pages',
    'how-to-merge-pdf-files-securely'
  ],
  'rotate-pdf': [
    'how-to-merge-pdf-files-securely',
    'why-client-side-file-tools-are-safer'
  ],
  'compress-pdf': [
    'how-to-reduce-pdf-file-size',
    'why-client-side-file-tools-are-safer'
  ],
  'image-to-pdf': [
    'how-to-convert-images-to-pdf',
    'how-to-reduce-pdf-file-size'
  ]
};

export default function ToolPageContainer({ tool, children }: ToolPageContainerProps) {
  const isImage = tool.category === 'image';
  const related = TOOLS.filter((t) => tool.relatedTools.includes(t.slug));
  const relatedGuides = GUIDES.filter((guide) =>
    (relatedGuideSlugsByTool[tool.slug] ?? []).includes(guide.slug)
  );
  const canonicalUrl = getAbsoluteUrl(tool.slug);

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: canonicalUrl,
    description: tool.seoDescription,
    applicationCategory: isImage ? 'MultimediaApplication' : 'BusinessApplication',
    browserRequirements: 'Requires JavaScript and a modern browser.',
    featureList: tool.features.join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: isImage ? 'Image Utilities' : 'PDF Utilities', href: `/#${isImage ? 'image' : 'pdf'}-tools` },
          { label: tool.title }
        ]}
      />

      {/* Tool Header */}
      <section className="tool-header-section">
        <div className="tool-header-content">
          <div className="tool-badge-row">
            <span className={`category-tag ${isImage ? 'is-image' : 'is-pdf'}`}>
              {isImage ? 'Image Tool' : 'PDF Tool'}
            </span>
            {tool.badge && <span className="tool-card-badge">{tool.badge}</span>}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>
              <ShieldCheck size={14} aria-hidden="true" /> Browser-based file processing
            </span>
          </div>

          <h1 className="tool-page-title">{tool.title}</h1>
          <p className="tool-page-subtitle">{tool.fullDescription}</p>
        </div>
      </section>

      {/* Interactive Tool Sandbox */}
      <section aria-label={`${tool.title} workspace`} style={{ marginBottom: '2.5rem' }}>
        {children}
      </section>

      {/* Compliant Ad Placement - Safe spacing from interaction buttons */}
      <AdPlaceholder slotId={`${tool.slug}-middle`} />

      {/* Detailed Overview: What It Does & When to Use It */}
      {tool.overview && (
        <section className="seo-content-section" style={{ marginTop: '2.5rem' }}>
          <div className="section-heading-wrapper">
            <h2 className="section-heading">What is {tool.title} &amp; When Should You Use It?</h2>
            <p className="section-subheading">
              A comprehensive technical overview of practical applications, workflow advantages, and ideal use cases.
            </p>
          </div>
          <div
            className="prose"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              lineHeight: 1.7,
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)'
            }}
          >
            {tool.overview.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} style={{ marginBottom: pIdx === tool.overview!.split('\n\n').length - 1 ? 0 : '1rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Key Features */}
      <section className="seo-content-section" style={{ marginTop: '2.5rem' }}>
        <div className="section-heading-wrapper">
          <h2 className="section-heading">Key Features &amp; Technical Capabilities</h2>
          <p className="section-subheading">
            Features and limits for this browser-based utility.
          </p>
        </div>

        <ul className="features-list">
          {tool.features.map((feature, idx) => (
            <li key={idx} className="feature-item">
              <span className="feature-check">
                <CheckCircle2 size={18} aria-hidden="true" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Step-by-Step Instructions */}
      <HowToSection toolName={tool.title} steps={tool.howToSteps} />

      {/* Pro Tips & Best Practices */}
      {tool.tips && tool.tips.length > 0 && (
        <section className="seo-content-section" style={{ marginTop: '2.5rem' }}>
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Tips &amp; Best Practices for Optimal Results</h2>
            <p className="section-subheading">
              Practical guidance from developers and digital media specialists to maximize quality and efficiency.
            </p>
          </div>

          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {tool.tips.map((tip, tipIdx) => (
              <div
                key={tipIdx}
                className="step-card"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem'
                }}
              >
                <div
                  className="step-number"
                  style={{
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    marginBottom: '0.75rem'
                  }}
                >
                  <Lightbulb size={18} aria-hidden="true" />
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Specifications, Limits & Privacy Guarantee */}
      <section
        className="seo-content-section"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          marginTop: '2.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-success)' }}>
          <ShieldCheck size={24} aria-hidden="true" />
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>
            Browser-based file processing
          </h2>
        </div>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          The <strong>{tool.title}</strong> component processes selected files in your browser using browser APIs and, for PDF tools, <code>pdf-lib</code>.
          The inspected tool-processing code does not send selected file contents to a DocuForge upload endpoint. This does not cover normal website requests or separate third-party services.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.875rem'
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Supported Input Formats:</div>
            <div style={{ color: 'var(--text-secondary)' }}>
              {tool.supportedFormats.map((f) => f.split('/')[1]?.toUpperCase()).join(', ')}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>File processing:</div>
            <div style={{ color: 'var(--text-secondary)' }}>Performed in this browser</div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection title={`${tool.title} — Frequently Asked Questions`} faqs={tool.faqs} />

      {/* Contextual guides */}
      {relatedGuides.length > 0 && (
        <section className="seo-content-section" style={{ marginTop: '3rem' }} aria-labelledby="related-guides-heading">
          <div className="section-heading-wrapper">
            <h2 id="related-guides-heading" className="section-heading">Related Technical Guides</h2>
            <p className="section-subheading">
              Practical background and best practices to help you get the most out of your digital assets.
            </p>
          </div>
          <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="tool-card"
                style={{ padding: '1.25rem' }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {guide.readingTime} • {guide.tags[0]}
                </div>
                <h3 className="tool-card-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{guide.title}</h3>
                <p className="tool-card-desc" style={{ fontSize: '0.875rem' }}>{guide.description}</p>
                <span className="tool-card-footer">Read Full Guide <ArrowRight size={13} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Utilities */}
      {related.length > 0 && (
        <section className="seo-content-section" style={{ marginTop: '3rem' }}>
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Related Free Utilities</h2>
            <p className="section-subheading">
              Other browser-based tools you may find helpful for your workflow.
            </p>
          </div>

          <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {related.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
