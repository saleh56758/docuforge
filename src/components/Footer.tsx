import React from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck } from 'lucide-react';
import { TOOLS } from '@/data/tools';

export default function Footer() {
  const imageTools = TOOLS.filter((t) => t.category === 'image');
  const pdfTools = TOOLS.filter((t) => t.category === 'pdf');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo-brand" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
              <span className="logo-icon" style={{ width: 28, height: 28 }}>
                <Layers size={16} strokeWidth={2.5} />
              </span>
              <span>DocuForge</span>
            </Link>
            <p>
              Free, fast, and 100% private online image and PDF utilities. All file transformations execute locally inside your web browser.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: 'var(--color-success)', fontSize: '0.8125rem', fontWeight: 600 }}>
              <ShieldCheck size={16} /> Zero File Uploads to Cloud
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Image Tools</h4>
            <ul className="footer-link-list">
              {imageTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`}>{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">PDF Tools</h4>
            <ul className="footer-link-list">
              {pdfTools.map((tool) => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`}>{tool.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Resources & Legal</h4>
            <ul className="footer-link-list">
              <li>
                <Link href="/guides">Guides & Tutorials</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact & Feedback</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DocuForge. Built for performance, security, and privacy.</p>
          <p>Local client-side execution • No user file storage</p>
        </div>
      </div>
    </footer>
  );
}
