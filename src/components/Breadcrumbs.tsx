import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Construct schema.org BreadcrumbList JSON-LD
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://docuforge.app/'
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `https://docuforge.app${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/" aria-label="Home" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Home size={14} style={{ marginRight: '0.25rem' }} />
          <span>Home</span>
        </Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="breadcrumb-separator">
              <ChevronRight size={13} />
            </span>
            {item.href && idx < items.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }} aria-current="page">
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
