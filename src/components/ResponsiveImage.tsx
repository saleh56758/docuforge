import React from 'react';

interface ResponsiveImageProps {
  imageBase: string;
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
        srcSet={`/images/${imageBase}-800.webp 800w, /images/${imageBase}.webp 1200w`}
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${imageBase}.webp`}
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
