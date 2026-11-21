'use client';

import React, { useEffect, useState } from 'react';

interface ImageComparisonProps {
  originalUrl: string;
  outputBlob: Blob | null;
  originalName: string;
  outputLabel: string;
}

export default function ImageComparison({
  originalUrl,
  outputBlob,
  originalName,
  outputLabel
}: ImageComparisonProps) {
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!outputBlob) {
      setOutputUrl(null);
      return;
    }

    const url = URL.createObjectURL(outputBlob);
    setOutputUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [outputBlob]);

  return (
    <div className="image-comparison-grid">
      <figure className="image-comparison-item">
        <figcaption>Original</figcaption>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={originalUrl} alt={`Original image: ${originalName}`} className="preview-img" />
      </figure>
      {outputUrl && (
        <figure className="image-comparison-item">
          <figcaption>{outputLabel}</figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outputUrl} alt={`${outputLabel}: ${originalName}`} className="preview-img" />
        </figure>
      )}
    </div>
  );
}
