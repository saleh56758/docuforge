import React from 'react';
import Link from 'next/link';
import { Layers, Mail } from 'lucide-react';
import { TOOLS } from '@/data/tools';

const CONTACT_EMAIL = 'hassaansaleh56@gmail.com';

export default function Footer() {
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');

  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Direct Contact */}
          <div className="footer-brand">
            <Link href="/" className="logo-brand" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
              <span className="logo-icon" style={{ width: 28, height: 28 }}>
                <Layers size={16} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>DocuForge</span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Free online tools for everyday image and PDF tasks.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--color-success)', fontSize: '0.8125rem', fontWeight: 600 }}>
              <Mail size={16} aria-hidden="true" /> Questions or feedback? Get in touch.
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>
                Contact Us
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  textDecoration: 'underline',
                  wordBreak: 'break-all'
                }}
              >
                <Mail size={14} aria-hidden="true" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <p className="footer-col-title">Image Utilities (7)</p>
            <ul className="footer-link-list">
              {imageTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`}>{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Tools */}
          <div>
            <p className="footer-col-title">PDF Utilities (5)</p>
            <ul className="footer-link-list">
              {pdfTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`}>{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Trust / Legal */}
          <div>
            <p className="footer-col-title">Company &amp; Legal</p>
            <ul className="footer-link-list">
              <li>
                <Link href="/about">About DocuForge</Link>
              </li>
              <li>
                <Link href="/guides">Guides &amp; Tutorials</Link>
              </li>
              <li>
                <Link href="/blog">Blog &amp; Articles</Link>
              </li>
              <li>
                <Link href="/contact">Contact &amp; Feedback</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DocuForge. Created by Hassaan Saleh. All rights reserved.</p>
          <p>Direct contact: <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>{CONTACT_EMAIL}</a></p>
        </div>
      </div>
    </footer>
  );
}
