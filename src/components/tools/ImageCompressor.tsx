'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Sliders } from 'lucide-react';
import { formatBytes, calculateSavings, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [scale, setScale] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }
    if (selectedFile.size > 25 * 1024 * 1024) {
      setError('File size exceeds the 25 MB limit.');
      return;
    }
    setError(null);
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setCompressedBlob(null);
    setCompressedSize(0);
  };

  const compressImage = useCallback(async () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load image.'));
      });

      const canvas = document.createElement('canvas');
      const targetWidth = Math.round((img.naturalWidth * scale) / 100);
      const targetHeight = Math.round((img.naturalHeight * scale) / 100);
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not initialize canvas context.');

      // High quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // If output is JPEG and source has transparency, fill with white background
      const outputType = file.type === 'image/png' ? 'image/png' : file.type;
      if (outputType === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Compress via canvas.toBlob
      // For PNG, canvas ignores quality parameter unless converted to WebP or JPG
      // We offer lossy WebP compression or JPEG compression
      const finalMime = file.type === 'image/png' ? 'image/webp' : file.type;
      const normalizedQuality = quality / 100;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedBlob(blob);
            setCompressedSize(blob.size);
          } else {
            setError('Browser compression failed.');
          }
          setIsProcessing(false);
        },
        finalMime,
        normalizedQuality
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error during compression.');
      setIsProcessing(false);
    }
  }, [file, previewUrl, quality, scale]);

  useEffect(() => {
    if (file) {
      const debounce = setTimeout(() => {
        compressImage();
      }, 250);
      return () => clearTimeout(debounce);
    }
  }, [file, quality, scale, compressImage]);

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const finalExtension = file.type === 'image/png' ? 'webp' : file.name.split('.').pop() || 'jpg';
    const filename = `compressed-${replaceFileExtension(file.name, finalExtension)}`;
    downloadBlob(compressedBlob, filename);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setCompressedBlob(null);
    setCompressedSize(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="tool-workspace">
      {error && (
        <div className="alert-box alert-danger">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!file ? (
        <div
          className="dropzone"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add('is-dragover');
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('is-dragover');
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.classList.remove('is-dragover');
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
        >
          <div className="dropzone-icon">
            <Upload size={28} />
          </div>
          <h2 className="dropzone-title">Choose an image or drop it here</h2>
          <p className="dropzone-subtitle">Supports JPG, PNG, and WebP up to 25 MB</p>
          <button type="button" className="dropzone-btn">
            Browse Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
        </div>
      ) : (
        <div>
          <div className="active-file-header">
            <div className="active-file-info">
              <div className="active-file-icon">
                <FileCheck size={20} />
              </div>
              <div className="active-file-meta">
                <div className="active-file-name">{file.name}</div>
                <div className="active-file-size">Original: {formatBytes(file.size)}</div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Image
            </button>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="quality-slider">
                <span>Compression Quality</span>
                <span className="control-value-badge">{quality}%</span>
              </label>
              <input
                id="quality-slider"
                type="range"
                min="10"
                max="95"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="control-slider"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Recommended: 75%–85% for optimal quality and small file size.
              </span>
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="scale-slider">
                <span>Scale Dimensions</span>
                <span className="control-value-badge">{scale}%</span>
              </label>
              <input
                id="scale-slider"
                type="range"
                min="25"
                max="100"
                step="5"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="control-slider"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Downscaling resolution yields dramatic file size savings.
              </span>
            </div>
          </div>

          {previewUrl && (
            <div className="preview-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={file ? `Compressed preview of ${file.name}` : 'Compressed image preview'}
                className="preview-img"
              />
            </div>
          )}

          <div className="results-card">
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Original Size</div>
                <div className="stat-value">{formatBytes(file.size)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Compressed Size</div>
                <div className="stat-value">
                  {isProcessing ? 'Calculating...' : formatBytes(compressedSize)}
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Size Reduction</div>
                <div className="stat-value is-savings">
                  {isProcessing ? '...' : `-${calculateSavings(file.size, compressedSize)}%`}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-success"
                onClick={handleDownload}
                disabled={isProcessing || !compressedBlob}
                style={{ flex: 1, minWidth: '200px' }}
              >
                <Download size={18} /> Download Compressed Image
              </button>
              <button type="button" className="btn-ghost" onClick={handleReset}>
                Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
