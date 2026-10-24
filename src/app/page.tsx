import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock, Cpu, BookOpen, ArrowRight } from 'lucide-react';
import { TOOLS } from '@/data/tools';
import { GUIDES } from '@/data/guides';
import HomeDiscovery from '@/components/HomeDiscovery';
import FaqSection from '@/components/FaqSection';
import AdPlaceholder from '@/components/AdPlaceholder';

const HOMEPAGE_FAQS = [
  {
    question: 'How do DocuForge tools work without uploading files?',
    answer:
      'DocuForge is built using modern Web APIs (HTML5 Canvas, FileReader, WebAssembly, and pdf-lib). When you select a photo or PDF, your browser reads the binary data directly into your local computer memory and runs the algorithms locally. Your confidential documents never leave your device.'
  },
  {
    question: 'Are these tools completely free to use?',
    answer:
      'Yes, all tools on DocuForge are 100% free with no hidden paywalls, no trial limits, and no account registration required.'
  },
  {
    question: 'Is it safe to process confidential documents like tax forms or contracts?',
    answer:
      'Yes. Because files are processed entirely client-side inside your browser sandbox and never sent to remote servers, DocuForge complies naturally with stringent privacy requirements including GDPR and HIPAA.'
  },
  {
    question: 'Do DocuForge tools work on mobile phones and tablets?',
    answer:
      'Yes. Our interface is fully responsive and compatible with modern mobile browsers including Chrome for Android and Safari on iOS and iPadOS.'
  }
];

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-badge">
          <ShieldCheck size={14} /> 100% Private Client-Side Processing
        </div>
        <h1 id="hero-title" className="hero-title">
          Fast, Free & Private Image and PDF Utilities
        </h1>
        <p className="hero-subtitle">
          Professional file tools that run directly in your web browser. No cloud uploads, no account required, and zero waiting in queues.
        </p>

        {/* Live Search and Filter Component */}
        <HomeDiscovery tools={TOOLS} />
      </section>

      {/* Privacy Guarantee Banner */}
      <section className="privacy-banner" aria-label="Privacy Guarantee">
        <div className="privacy-banner-icon">
          <Lock size={26} />
        </div>
        <div className="privacy-banner-content">
          <h3>Your Files Never Leave Your Device</h3>
          <p>
            Unlike traditional file conversion websites that upload your personal documents to remote servers, DocuForge executes all transformations locally within your browser sandbox. Your photos, contracts, and financial records remain strictly confidential.
          </p>
        </div>
      </section>

      <AdPlaceholder slotId="home-top-banner" />

      {/* Why Choose DocuForge Section */}
      <section className="seo-content-section" style={{ marginTop: '2rem' }}>
        <div className="section-heading-wrapper" style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-heading">Engineered for Privacy, Speed & Precision</h2>
          <p className="section-subheading">
            Built from the ground up for modern web standards, privacy compliance, and instant results.
          </p>
        </div>

        <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-image-tool-light)', color: 'var(--color-image-tool)' }}>
              <Zap size={16} />
            </div>
            <h3 className="step-title">Instant Performance</h3>
            <p className="step-text">
              Zero network upload delays. Large images and multi-page PDFs are processed with native browser acceleration, giving you immediate output.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
              <ShieldCheck size={16} />
            </div>
            <h3 className="step-title">Zero Data Retention</h3>
            <p className="step-text">
              No databases, no file caches, and no tracking. Once you close your browser tab, memory is cleared instantly.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number" style={{ background: 'var(--color-pdf-tool-light)', color: 'var(--color-pdf-tool)' }}>
              <Cpu size={16} />
            </div>
            <h3 className="step-title">Full Document Fidelity</h3>
            <p className="step-text">
              Vector paths, crisp fonts, transparent PNG layers, and color profiles are preserved with mathematical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Guides & Tutorials Highlight */}
      <section className="seo-content-section" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: '0.25rem' }}>
              Practical Guides & Tutorials
            </h2>
            <p className="section-subheading">
              Expert advice on image compression, PDF management, and web performance.
            </p>
          </div>
          <Link href="/guides" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <BookOpen size={15} /> View All Guides <ArrowRight size={14} />
          </Link>
        </div>

        <div className="tool-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginBottom: '2rem' }}>
          {GUIDES.slice(0, 3).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="tool-card"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                {guide.readingTime} • {guide.tags[0]}
              </div>
              <h3 className="tool-card-title" style={{ fontSize: '1.0625rem', marginBottom: '0.5rem' }}>
                {guide.title}
              </h3>
              <p className="tool-card-desc" style={{ fontSize: '0.8125rem' }}>
                {guide.description}
              </p>
              <div className="tool-card-footer">
                <span>Read Tutorial</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Homepage FAQ */}
      <FaqSection faqs={HOMEPAGE_FAQS} />
    </div>
  );
}
