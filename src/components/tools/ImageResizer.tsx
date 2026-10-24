'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Lock, Unlock } from 'lucide-react';
import { formatBytes, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<string>('original');
  const [quality, setQuality] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }
    setError(null);
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
    };
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspectRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspectRatio && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyPercentage = (pct: number) => {
    if (originalWidth > 0 && originalHeight > 0) {
      setTargetWidth(Math.round((originalWidth * pct) / 100));
      setTargetHeight(Math.round((originalHeight * pct) / 100));
    }
  };

  const handleResizeAndDownload = async () => {
    if (!file || !previewUrl || targetWidth <= 0 || targetHeight <= 0) return;
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
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not initialize canvas context.');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      let outputMime = file.type;
      if (format === 'jpeg') outputMime = 'image/jpeg';
      else if (format === 'png') outputMime = 'image/png';
      else if (format === 'webp') outputMime = 'image/webp';

      if (outputMime === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            let ext = 'jpg';
            if (outputMime === 'image/png') ext = 'png';
            if (outputMime === 'image/webp') ext = 'webp';
            const filename = `resized-${targetWidth}x${targetHeight}-${replaceFileExtension(file.name, ext)}`;
            downloadBlob(blob, filename);
          } else {
            setError('Image export failed.');
          }
          setIsProcessing(false);
        },
        outputMime,
        quality / 100
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error resizing image.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setTargetWidth(0);
    setTargetHeight(0);
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
          <h3 className="dropzone-title">Select an image to resize</h3>
          <p className="dropzone-subtitle">Supports JPG, PNG, and WebP up to 30 MB</p>
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
                <div className="active-file-size">
                  Original: {originalWidth} × {originalHeight} px ({formatBytes(file.size)})
                </div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Image
            </button>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>
              Quick Presets:
            </span>
            <div style={{ display: 'inline-flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  className="btn-ghost"
                  style={{ padding: '0.25rem 0.625rem', fontSize: '0.75rem' }}
                  onClick={() => applyPercentage(pct)}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="target-width">
                <span>Target Width (px)</span>
              </label>
              <input
                id="target-width"
                type="number"
                min="1"
                max="10000"
                value={targetWidth || ''}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                className="control-input"
              />
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="target-height">
                <span>Target Height (px)</span>
              </label>
              <input
                id="target-height"
                type="number"
                min="1"
                max="10000"
                value={targetHeight || ''}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="control-input"
              />
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="output-format">
                <span>Output Format</span>
              </label>
              <select
                id="output-format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="control-select"
              >
                <option value="original">Original Format</option>
                <option value="jpeg">JPG (Universal / Compressed)</option>
                <option value="png">PNG (Lossless / Transparency)</option>
                <option value="webp">WebP (Modern / Efficient)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <label className="checkbox-group">
              <input
                type="checkbox"
                checked={lockAspectRatio}
                onChange={(e) => setLockAspectRatio(e.target.checked)}
                className="checkbox-input"
              />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
                {lockAspectRatio ? <Lock size={15} /> : <Unlock size={15} />}
                Lock Aspect Ratio (Keep Proportions)
              </span>
            </label>

            {format !== 'png' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Quality:</span>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  style={{ width: '100px', accentColor: 'var(--color-primary)' }}
                />
                <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>{quality}%</span>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="preview-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="preview-img" />
            </div>
          )}

          <div className="results-card">
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Original Dimensions</div>
                <div className="stat-value">{originalWidth} × {originalHeight}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Resized Dimensions</div>
                <div className="stat-value is-savings">{targetWidth} × {targetHeight}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleResizeAndDownload}
                disabled={isProcessing || targetWidth <= 0 || targetHeight <= 0}
                style={{ flex: 1, minWidth: '200px' }}
              >
                <Download size={18} /> Resize & Download Image
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
