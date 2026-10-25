'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Zap } from 'lucide-react';
import { formatBytes, calculateSavings, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

export default function JpgToWebp() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(82);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [webpBlob, setWebpBlob] = useState<Blob | null>(null);
  const [webpSize, setWebpSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.includes('jpeg') && !selectedFile.type.includes('jpg')) {
      setError('Please select a JPG/JPEG image.');
      return;
    }
    setError(null);
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setWebpBlob(null);
  };

  const convertToWebp = useCallback(async () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to decode JPEG image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported.');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setWebpBlob(blob);
            setWebpSize(blob.size);
          } else {
            setError('Browser WebP encoding failed.');
          }
          setIsProcessing(false);
        },
        'image/webp',
        quality / 100
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error converting image.');
      setIsProcessing(false);
    }
  }, [file, previewUrl, quality]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => convertToWebp(), 200);
      return () => clearTimeout(timer);
    }
  }, [file, quality, convertToWebp]);

  const handleDownload = () => {
    if (!webpBlob || !file) return;
    const filename = replaceFileExtension(file.name, 'webp');
    downloadBlob(webpBlob, filename, 'image/webp');
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setWebpBlob(null);
    setWebpSize(0);
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
          <h2 className="dropzone-title">Select JPG file to convert to WebP</h2>
          <p className="dropzone-subtitle">Drop .jpg or .jpeg images up to 30 MB</p>
          <button type="button" className="dropzone-btn">
            Browse JPG Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg"
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
                <div className="active-file-size">Original JPG: {formatBytes(file.size)}</div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Image
            </button>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="webp-quality">
                <span>WebP Quality</span>
                <span className="control-value-badge">{quality}%</span>
              </label>
              <input
                id="webp-quality"
                type="range"
                min="30"
                max="95"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="control-slider"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                WebP achieves smaller file size than JPG at identical visual clarity.
              </span>
            </div>
          </div>

          {previewUrl && (
            <div className="preview-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={file ? `WebP preview of ${file.name}` : 'Converted WebP image preview'}
                className="preview-img"
              />
            </div>
          )}

          <div className="results-card">
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Original JPG</div>
                <div className="stat-value">{formatBytes(file.size)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Output WebP</div>
                <div className="stat-value">
                  {isProcessing ? 'Generating...' : formatBytes(webpSize)}
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Byte Savings</div>
                <div className="stat-value is-savings">
                  {isProcessing ? '...' : `-${calculateSavings(file.size, webpSize)}%`}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-success"
                onClick={handleDownload}
                disabled={isProcessing || !webpBlob}
                style={{ flex: 1, minWidth: '200px' }}
              >
                <Download size={18} /> Download WebP Image
              </button>
              <button type="button" className="btn-ghost" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
