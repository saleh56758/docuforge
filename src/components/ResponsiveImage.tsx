import React from 'react';

interface ResponsiveImageProps {
  imageBase: 'document-management-workflow' | 'digital-workspace-tools' | 'document-planning-productivity';
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

export default function ResponsiveImage({
  imageBase,
  alt,
  className,
  eager = false,
  sizes = '(max-width: 768px) 100vw, 800px',
  width = 1200,
  height = 800
}: ResponsiveImageProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/${imageBase}-800.webp 800w, /images/${imageBase}-1200.webp 1200w, /images/${imageBase}.webp 1800w`}
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${imageBase}-1200.webp`}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  );
}
