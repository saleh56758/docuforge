'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck } from 'lucide-react';
import { formatBytes, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<'webp' | 'jpeg' | 'png'>('webp');
  const [quality, setQuality] = useState<number>(85);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
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
    setOutputBlob(null);

    // Default target format recommendation
    if (selectedFile.type.includes('png') || selectedFile.type.includes('jpeg')) {
      setTargetFormat('webp');
    } else {
      setTargetFormat('jpeg');
    }
  };

  const convertImage = useCallback(async () => {
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
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported.');

      const mimeType = `image/${targetFormat}`;

      // Solid background fill only if JPEG
      if (targetFormat === 'jpeg') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setOutputBlob(blob);
            setOutputSize(blob.size);
          } else {
            setError('Conversion failed in this browser.');
          }
          setIsProcessing(false);
        },
        mimeType,
        targetFormat === 'png' ? undefined : quality / 100
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error converting image.');
      setIsProcessing(false);
    }
  }, [file, previewUrl, targetFormat, quality, bgColor]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => convertImage(), 200);
      return () => clearTimeout(timer);
    }
  }, [file, targetFormat, quality, bgColor, convertImage]);

  const handleDownload = () => {
    if (!outputBlob || !file) return;
    const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    const filename = `converted-${replaceFileExtension(file.name, ext)}`;
    downloadBlob(outputBlob, filename, `image/${targetFormat}`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setOutputBlob(null);
    setOutputSize(0);
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
          <h2 className="dropzone-title">Select an image to convert format</h2>
          <p className="dropzone-subtitle">Convert freely between JPG, PNG, and WebP</p>
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
                <div className="active-file-size">Original: {formatBytes(file.size)} ({file.type})</div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Image
            </button>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="convert-target-fmt">
                <span>Convert To Format</span>
              </label>
              <select
                id="convert-target-fmt"
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value as 'webp' | 'jpeg' | 'png')}
                className="control-select"
              >
                <option value="webp">WebP (Modern, Small File Size)</option>
                <option value="jpeg">JPG (Universal Compatibility)</option>
                <option value="png">PNG (Lossless, Transparent)</option>
              </select>
            </div>

            {targetFormat !== 'png' && (
              <div className="control-group">
                <label className="control-label" htmlFor="convert-quality">
                  <span>Output Quality</span>
                  <span className="control-value-badge">{quality}%</span>
                </label>
                <input
                  id="convert-quality"
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="control-slider"
                />
              </div>
            )}

            {targetFormat === 'jpeg' && (
              <div className="control-group">
                <label className="control-label" htmlFor="convert-bg-color">
                  <span>Matte Background (Transparent Fill)</span>
                </label>
                <select
                  id="convert-bg-color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="control-select"
                >
                  <option value="#ffffff">Solid White</option>
                  <option value="#000000">Solid Black</option>
                  <option value="#f1f5f9">Light Gray</option>
                </select>
              </div>
            )}
          </div>

          {previewUrl && (
            <div className="preview-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={file ? `Converted preview of ${file.name}` : 'Converted image preview'}
                className="preview-img"
              />
            </div>
          )}

          <div className="results-card">
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Source Format</div>
                <div className="stat-value">{file.type.replace('image/', '').toUpperCase()}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Target Format</div>
                <div className="stat-value is-savings">{targetFormat.toUpperCase()}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Output Size</div>
                <div className="stat-value">
                  {isProcessing ? 'Converting...' : formatBytes(outputSize)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleDownload}
                disabled={isProcessing || !outputBlob}
                style={{ flex: 1, minWidth: '200px' }}
              >
                <Download size={18} /> Download {targetFormat.toUpperCase()} Image
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
