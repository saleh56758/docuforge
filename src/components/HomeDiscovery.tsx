'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Image as ImageIcon, FileText, Sparkles } from 'lucide-react';
import { ToolMetadata } from '@/types';
import ToolCard from './ToolCard';

interface HomeDiscoveryProps {
  tools: ToolMetadata[];
}

export default function HomeDiscovery({ tools }: HomeDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'pdf'>('all');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const inTitle = tool.title.toLowerCase().includes(query);
      const inDesc = tool.shortDescription.toLowerCase().includes(query);
      const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(query));
      return inTitle || inDesc || inKeywords;
    });
  }, [tools, activeCategory, searchQuery]);

  const imageCount = tools.filter((t) => t.category === 'image').length;
  const pdfCount = tools.filter((t) => t.category === 'pdf').length;

  return (
    <div>
      <div className="search-filter-wrapper">
        <div className="search-input-box">
          <span className="search-icon-wrapper">
            <Search size={20} />
          </span>
          <input
            id="tool-search-input"
            type="text"
            className="search-input"
            placeholder="Search tools (e.g., compress, resize, merge pdf, webp)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search image and PDF tools"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="filter-tabs" role="tablist" aria-label="Tool Categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`filter-tab-btn ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <Sparkles size={14} /> All Tools ({tools.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'image'}
            className={`filter-tab-btn ${activeCategory === 'image' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('image')}
          >
            <ImageIcon size={14} /> Image Utilities ({imageCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'pdf'}
            className={`filter-tab-btn ${activeCategory === 'pdf' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('pdf')}
          >
            <FileText size={14} /> PDF Utilities ({pdfCount})
          </button>
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="tool-grid" role="region" aria-label="Tools Grid">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '3rem' }}>
          <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No tools found matching &quot;{searchQuery}&quot;
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Try searching for common terms like &quot;compress&quot;, &quot;pdf&quot;, &quot;crop&quot;, or &quot;jpg&quot;.
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
