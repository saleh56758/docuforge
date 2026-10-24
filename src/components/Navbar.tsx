'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Moon, Sun, Menu, X, Image as ImageIcon, FileText, BookOpen, Info } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('df_theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('df_theme', nextTheme);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo-brand" aria-label="DocuForge Home">
          <span className="logo-icon">
            <Layers size={20} strokeWidth={2.5} />
          </span>
          <span>DocuForge</span>
        </Link>

        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li className="nav-item">
              <Link href="/#image-tools">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <ImageIcon size={15} /> Image Tools
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#pdf-tools">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <FileText size={15} /> PDF Tools
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/guides">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <BookOpen size={15} /> Guides
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Info size={15} /> About
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-dropdown is-open">
          <ul className="mobile-nav-list">
            <li>
              <Link href="/#image-tools" onClick={() => setIsMobileMenuOpen(false)}>
                Image Utilities
              </Link>
            </li>
            <li>
              <Link href="/#pdf-tools" onClick={() => setIsMobileMenuOpen(false)}>
                PDF Utilities
              </Link>
            </li>
            <li>
              <Link href="/guides" onClick={() => setIsMobileMenuOpen(false)}>
                Tutorials & Guides
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About DocuForge
              </Link>
            </li>
            <li>
              <Link href="/privacy" onClick={() => setIsMobileMenuOpen(false)}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Support
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
