'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck } from 'lucide-react';
import { formatBytes, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

export default function WebpToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(90);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jpgBlob, setJpgBlob] = useState<Blob | null>(null);
  const [jpgSize, setJpgSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.includes('webp')) {
      setError('Please select a WebP image.');
      return;
    }
    setError(null);
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setJpgBlob(null);
  };

  const convertToJpg = useCallback(async () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);
    setError(null);

    try {
      const img = new Image();
      img.src = previewUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to decode WebP image.'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available.');

      // Solid background fill since JPEG does not support transparency
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setJpgBlob(blob);
            setJpgSize(blob.size);
          } else {
            setError('JPEG encoding failed.');
          }
          setIsProcessing(false);
        },
        'image/jpeg',
        quality / 100
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error converting WebP to JPG.');
      setIsProcessing(false);
    }
  }, [file, previewUrl, quality, bgColor]);

  useEffect(() => {
    if (file) {
      const timer = setTimeout(() => convertToJpg(), 200);
      return () => clearTimeout(timer);
    }
  }, [file, quality, bgColor, convertToJpg]);

  const handleDownload = () => {
    if (!jpgBlob || !file) return;
    const filename = replaceFileExtension(file.name, 'jpg');
    downloadBlob(jpgBlob, filename, 'image/jpeg');
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setJpgBlob(null);
    setJpgSize(0);
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
          <h2 className="dropzone-title">Select WebP image to convert to JPG</h2>
          <p className="dropzone-subtitle">Convert modern WebP to universal JPEG for any device</p>
          <button type="button" className="dropzone-btn">
            Browse WebP Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/webp"
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
                <div className="active-file-size">Original WebP: {formatBytes(file.size)}</div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Image
            </button>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="jpg-quality">
                <span>Output JPG Quality</span>
                <span className="control-value-badge">{quality}%</span>
              </label>
              <input
                id="jpg-quality"
                type="range"
                min="40"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="control-slider"
              />
            </div>

            <div className="control-group">
              <label className="control-label" htmlFor="bg-fill-color">
                <span>Background Fill (for transparent areas)</span>
              </label>
              <select
                id="bg-fill-color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="control-select"
              >
                <option value="#ffffff">Solid White (Standard)</option>
                <option value="#000000">Solid Black</option>
                <option value="#f1f5f9">Light Slate Gray</option>
              </select>
            </div>
          </div>

          {previewUrl && (
            <div className="preview-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={file ? `JPG preview of ${file.name}` : 'Converted JPG image preview'}
                className="preview-img"
              />
            </div>
          )}

          <div className="results-card">
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-label">Source WebP</div>
                <div className="stat-value">{formatBytes(file.size)}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Output JPG</div>
                <div className="stat-value">
                  {isProcessing ? 'Converting...' : formatBytes(jpgSize)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-success"
                onClick={handleDownload}
                disabled={isProcessing || !jpgBlob}
                style={{ flex: 1, minWidth: '200px' }}
              >
                <Download size={18} /> Download JPG Image
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
