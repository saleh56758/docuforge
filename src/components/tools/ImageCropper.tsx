'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Crop as CropIcon } from 'lucide-react';
import { formatBytes, downloadBlob, replaceFileExtension } from '@/utils/fileHelpers';

interface CropBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function ImageCropper() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>('free');
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 100, height: 100 });
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewSize, setPreviewSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDragging = useRef<boolean>(false);
  const dragHandle = useRef<string | null>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startBox = useRef<CropBox>({ x: 0, y: 0, width: 0, height: 0 });

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, or WebP).');
      return;
    }
    setError(null);
    setFile(selectedFile);

    const objectUrl = URL.createObjectURL(selectedFile);
    const img = new Image();
    img.src = objectUrl;
    img.onload = () => {
      setImgElement(img);
      // Initialize crop box to 80% center
      const initialWidth = Math.round(img.naturalWidth * 0.8);
      const initialHeight = Math.round(img.naturalHeight * 0.8);
      const initialX = Math.round((img.naturalWidth - initialWidth) / 2);
      const initialY = Math.round((img.naturalHeight - initialHeight) / 2);
      setCropBox({ x: initialX, y: initialY, width: initialWidth, height: initialHeight });
    };
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Display scale to fit container (max 700px width)
    const maxWidth = 700;
    const maxHeight = 450;
    let displayWidth = imgElement.naturalWidth;
    let displayHeight = imgElement.naturalHeight;

    if (displayWidth > maxWidth) {
      const scale = maxWidth / displayWidth;
      displayWidth = maxWidth;
      displayHeight = displayHeight * scale;
    }
    if (displayHeight > maxHeight) {
      const scale = maxHeight / displayHeight;
      displayHeight = maxHeight;
      displayWidth = displayWidth * scale;
    }

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // Draw main image
    ctx.drawImage(imgElement, 0, 0, displayWidth, displayHeight);

    // Calculate crop box in canvas display coordinates
    const scaleX = displayWidth / imgElement.naturalWidth;
    const scaleY = displayHeight / imgElement.naturalHeight;

    const dx = cropBox.x * scaleX;
    const dy = cropBox.y * scaleY;
    const dw = cropBox.width * scaleX;
    const dh = cropBox.height * scaleY;

    // Dark semi-transparent overlay outside crop area
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    // Top
    ctx.fillRect(0, 0, displayWidth, dy);
    // Bottom
    ctx.fillRect(0, dy + dh, displayWidth, displayHeight - (dy + dh));
    // Left
    ctx.fillRect(0, dy, dx, dh);
    // Right
    ctx.fillRect(dx + dw, dy, displayWidth - (dx + dw), dh);

    // Crop box outline
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(dx, dy, dw, dh);

    // Rule of thirds grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // vertical
    ctx.moveTo(dx + dw / 3, dy);
    ctx.lineTo(dx + dw / 3, dy + dh);
    ctx.moveTo(dx + (dw * 2) / 3, dy);
    ctx.lineTo(dx + (dw * 2) / 3, dy + dh);
    // horizontal
    ctx.moveTo(dx, dy + dh / 3);
    ctx.lineTo(dx + dw, dy + dh / 3);
    ctx.moveTo(dx, dy + (dh * 2) / 3);
    ctx.lineTo(dx + dw, dy + (dh * 2) / 3);
    ctx.stroke();

    // Corner handle squares
    ctx.fillStyle = '#2563eb';
    const handleSize = 8;
    // top-left
    ctx.fillRect(dx - handleSize / 2, dy - handleSize / 2, handleSize, handleSize);
    // top-right
    ctx.fillRect(dx + dw - handleSize / 2, dy - handleSize / 2, handleSize, handleSize);
    // bottom-left
    ctx.fillRect(dx - handleSize / 2, dy + dh - handleSize / 2, handleSize, handleSize);
    // bottom-right
    ctx.fillRect(dx + dw - handleSize / 2, dy + dh - handleSize / 2, handleSize, handleSize);
  }, [imgElement, cropBox]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Adjust aspect ratio presets
  const handleRatioChange = (ratioStr: string) => {
    setAspectRatio(ratioStr);
    if (!imgElement) return;

    if (ratioStr === 'free') return;

    let targetRatio = 1;
    if (ratioStr === '1:1') targetRatio = 1;
    else if (ratioStr === '16:9') targetRatio = 16 / 9;
    else if (ratioStr === '4:3') targetRatio = 4 / 3;
    else if (ratioStr === '9:16') targetRatio = 9 / 16;

    let newWidth = cropBox.width;
    let newHeight = Math.round(newWidth / targetRatio);

    if (newHeight > imgElement.naturalHeight) {
      newHeight = imgElement.naturalHeight;
      newWidth = Math.round(newHeight * targetRatio);
    }
    if (newWidth > imgElement.naturalWidth) {
      newWidth = imgElement.naturalWidth;
      newHeight = Math.round(newWidth / targetRatio);
    }

    const newX = Math.min(cropBox.x, imgElement.naturalWidth - newWidth);
    const newY = Math.min(cropBox.y, imgElement.naturalHeight - newHeight);

    setCropBox({
      x: Math.max(0, newX),
      y: Math.max(0, newY),
      width: newWidth,
      height: newHeight
    });
  };

  // Mouse interaction for moving or resizing crop box
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleX = canvas.width / imgElement.naturalWidth;
    const scaleY = canvas.height / imgElement.naturalHeight;

    const dx = cropBox.x * scaleX;
    const dy = cropBox.y * scaleY;
    const dw = cropBox.width * scaleX;
    const dh = cropBox.height * scaleY;

    // Check bottom-right corner resize handle
    const cornerSize = 16;
    if (
      Math.abs(mouseX - (dx + dw)) <= cornerSize &&
      Math.abs(mouseY - (dy + dh)) <= cornerSize
    ) {
      isDragging.current = true;
      dragHandle.current = 'br';
      startPos.current = { x: mouseX, y: mouseY };
      startBox.current = { ...cropBox };
      return;
    }

    // Inside box -> drag move
    if (mouseX >= dx && mouseX <= dx + dw && mouseY >= dy && mouseY <= dy + dh) {
      isDragging.current = true;
      dragHandle.current = 'move';
      startPos.current = { x: mouseX, y: mouseY };
      startBox.current = { ...cropBox };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current || !imgElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleX = canvas.width / imgElement.naturalWidth;
    const scaleY = canvas.height / imgElement.naturalHeight;

    const deltaX = (mouseX - startPos.current.x) / scaleX;
    const deltaY = (mouseY - startPos.current.y) / scaleY;

    if (dragHandle.current === 'move') {
      let nextX = Math.round(startBox.current.x + deltaX);
      let nextY = Math.round(startBox.current.y + deltaY);

      nextX = Math.max(0, Math.min(nextX, imgElement.naturalWidth - startBox.current.width));
      nextY = Math.max(0, Math.min(nextY, imgElement.naturalHeight - startBox.current.height));

      setCropBox((prev) => ({ ...prev, x: nextX, y: nextY }));
    } else if (dragHandle.current === 'br') {
      let nextW = Math.round(startBox.current.width + deltaX);
      let nextH = Math.round(startBox.current.height + deltaY);

      if (aspectRatio !== 'free') {
        let ratio = 1;
        if (aspectRatio === '1:1') ratio = 1;
        else if (aspectRatio === '16:9') ratio = 16 / 9;
        else if (aspectRatio === '4:3') ratio = 4 / 3;
        else if (aspectRatio === '9:16') ratio = 9 / 16;
        nextH = Math.round(nextW / ratio);
      }

      nextW = Math.max(40, Math.min(nextW, imgElement.naturalWidth - startBox.current.x));
      nextH = Math.max(40, Math.min(nextH, imgElement.naturalHeight - startBox.current.y));

      setCropBox((prev) => ({ ...prev, width: nextW, height: nextH }));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    dragHandle.current = null;
  };

  const executeCrop = () => {
    if (!imgElement || !file) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = cropBox.width;
    offscreen.height = cropBox.height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      imgElement,
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height,
      0,
      0,
      cropBox.width,
      cropBox.height
    );

    offscreen.toBlob((blob) => {
      if (blob) {
        setPreviewBlob(blob);
        setPreviewSize({ width: cropBox.width, height: cropBox.height });
      }
    }, file.type);
  };

  const handleDownloadCropped = () => {
    if (!previewBlob || !file) return;
    const ext = file.name.split('.').pop() || 'jpg';
    downloadBlob(previewBlob, `cropped-${previewSize.width}x${previewSize.height}-${file.name}`);
  };

  const handleReset = () => {
    setFile(null);
    setImgElement(null);
    setPreviewBlob(null);
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
          <h2 className="dropzone-title">Upload photo to crop</h2>
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
                <div className="active-file-size">
                  Crop: {cropBox.width} × {cropBox.height} px (from {imgElement?.naturalWidth} × {imgElement?.naturalHeight})
                </div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Photo
            </button>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.75rem' }}>
              Aspect Ratio Preset:
            </span>
            <div style={{ display: 'inline-flex', gap: '0.375rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Freeform', val: 'free' },
                { label: '1:1 (Square)', val: '1:1' },
                { label: '16:9 (Landscape)', val: '16:9' },
                { label: '4:3 (Standard)', val: '4:3' },
                { label: '9:16 (Story)', val: '9:16' }
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  className={`btn-ghost ${aspectRatio === item.val ? 'is-active' : ''}`}
                  style={{
                    backgroundColor: aspectRatio === item.val ? 'var(--color-primary-light)' : undefined,
                    borderColor: aspectRatio === item.val ? 'var(--color-primary)' : undefined,
                    color: aspectRatio === item.val ? 'var(--color-primary)' : undefined,
                    fontWeight: aspectRatio === item.val ? 600 : 500
                  }}
                  onClick={() => handleRatioChange(item.val)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="crop-container">
            <canvas
              ref={canvasRef}
              className="crop-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: 'crosshair' }}
            />
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1.25rem', textAlign: 'center' }}>
            💡 Drag inside the box to reposition. Drag the bottom-right corner blue handle to resize.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn-primary" onClick={executeCrop} style={{ flex: 1 }}>
              <CropIcon size={18} /> Apply Crop Preview
            </button>
          </div>

          {previewBlob && (
            <div className="results-card">
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-label">Cropped Dimensions</div>
                  <div className="stat-value is-savings">{previewSize.width} × {previewSize.height} px</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Output Size</div>
                  <div className="stat-value">{formatBytes(previewBlob.size)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="btn-success"
                  onClick={handleDownloadCropped}
                  style={{ flex: 1 }}
                >
                  <Download size={18} /> Download Cropped Image
                </button>
                <button type="button" className="btn-ghost" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
