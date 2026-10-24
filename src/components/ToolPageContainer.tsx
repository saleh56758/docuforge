import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ToolMetadata } from '@/types';
import { TOOLS } from '@/data/tools';
import Breadcrumbs from './Breadcrumbs';
import HowToSection from './HowToSection';
import FaqSection from './FaqSection';
import AdPlaceholder from './AdPlaceholder';
import ToolCard from './ToolCard';

interface ToolPageContainerProps {
  tool: ToolMetadata;
  children: React.ReactNode;
}

export default function ToolPageContainer({ tool, children }: ToolPageContainerProps) {
  const isImage = tool.category === 'image';
  const related = TOOLS.filter((t) => tool.relatedTools.includes(t.slug));

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: `https://docuforge.app/${tool.slug}`,
    description: tool.seoDescription,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
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
              <ShieldCheck size={14} /> Client-Side Execution
            </span>
          </div>

          <h1 className="tool-page-title">{tool.title}</h1>
          <p className="tool-page-subtitle">{tool.fullDescription}</p>
        </div>
      </section>

      {/* Interactive Tool Sandbox */}
      <section aria-label={`${tool.title} workspace`}>
        {children}
      </section>

      {/* Compliant Ad Placement */}
      <AdPlaceholder slotId={`${tool.slug}-middle`} />

      {/* Key Features */}
      <section className="seo-content-section">
        <div className="section-heading-wrapper">
          <h2 className="section-heading">Key Features & Technical Advantages</h2>
          <p className="section-subheading">
            Why professionals and everyday users trust DocuForge for file processing.
          </p>
        </div>

        <ul className="features-list">
          {tool.features.map((feature, idx) => (
            <li key={idx} className="feature-item">
              <span className="feature-check">
                <CheckCircle2 size={18} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Step-by-Step Instructions */}
      <HowToSection toolName={tool.title} steps={tool.howToSteps} />

      {/* Technical Use Cases & Privacy */}
      <section className="seo-content-section" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
        <h2 className="section-heading" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          Strict Privacy & Security Guarantee
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
          When using the <strong>{tool.title}</strong> on DocuForge, your file data never leaves your computer or smartphone. All operations execute strictly within your local browser sandbox via modern WebAssembly and native Web APIs. We do not store, view, or transmit your documents to any cloud server.
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Supported Input Formats: {tool.supportedFormats.map(f => f.split('/')[1]?.toUpperCase()).join(', ')} • Maximum Recommended File Size: {tool.maxFileSizeMB} MB.
        </p>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection title={`${tool.title} — Frequently Asked Questions`} faqs={tool.faqs} />

      {/* Related Utilities */}
      {related.length > 0 && (
        <section className="seo-content-section" style={{ marginTop: '3rem' }}>
          <div className="section-heading-wrapper">
            <h2 className="section-heading">Related Utilities</h2>
            <p className="section-subheading">
              Other free tools you might find useful.
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
