'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ArrowUp, ArrowDown, Trash2, FilePlus, AlertCircle, Plus } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes, downloadBlob, readFileAsArrayBuffer } from '@/utils/fileHelpers';

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function ImageToPdf() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<'fit' | 'a4' | 'letter'>('a4');
  const [orientation, setOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [margin, setMargin] = useState<number>(20);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | File[]) => {
    setError(null);
    const newItems: ImageItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith('image/')) {
        setError(`"${file.name}" is not an image file.`);
        continue;
      }
      const previewUrl = URL.createObjectURL(file);
      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    const [removed] = copy.splice(index, 1);
    copy.splice(target, 0, removed);
    setItems(copy);
  };

  const removeItem = (index: number) => {
    const copy = [...items];
    const [removed] = copy.splice(index, 1);
    URL.revokeObjectURL(removed.previewUrl);
    setItems(copy);
  };

  const handleGeneratePdf = async () => {
    if (items.length === 0) {
      setError('Please add at least one image.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      // Standard page sizes in points (72 points = 1 inch)
      const A4 = { width: 595.28, height: 841.89 };
      const LETTER = { width: 612.0, height: 792.0 };

      for (const item of items) {
        let imageBytes: ArrayBuffer;
        let isPng = item.file.type === 'image/png';
        let isJpg = item.file.type === 'image/jpeg' || item.file.type === 'image/jpg';

        // If WebP, convert to PNG via canvas first so pdf-lib can embed it cleanly
        if (!isPng && !isJpg) {
          const img = new Image();
          img.src = item.previewUrl;
          await new Promise((res, rej) => {
            img.onload = res;
            img.onerror = rej;
          });
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Canvas rendering failed.');
          ctx.drawImage(img, 0, 0);
          const pngBlob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
          if (!pngBlob) throw new Error('Failed to encode image to PNG.');
          imageBytes = await pngBlob.arrayBuffer();
          isPng = true;
        } else {
          imageBytes = await readFileAsArrayBuffer(item.file);
        }

        const embeddedImage = isPng
          ? await pdfDoc.embedPng(imageBytes)
          : await pdfDoc.embedJpg(imageBytes);

        const imgWidth = embeddedImage.width;
        const imgHeight = embeddedImage.height;

        let pageWidth = imgWidth;
        let pageHeight = imgHeight;

        if (pageSize === 'a4') {
          pageWidth = A4.width;
          pageHeight = A4.height;
        } else if (pageSize === 'letter') {
          pageWidth = LETTER.width;
          pageHeight = LETTER.height;
        }

        // Adjust orientation
        if (pageSize !== 'fit') {
          const isLandscape =
            orientation === 'landscape' ||
            (orientation === 'auto' && imgWidth > imgHeight);

          if (isLandscape && pageWidth < pageHeight) {
            const temp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = temp;
          } else if (!isLandscape && pageWidth > pageHeight) {
            const temp = pageWidth;
            pageWidth = pageHeight;
            pageHeight = temp;
          }
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        if (pageSize === 'fit') {
          // Zero margins, exact pixel matching
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight
          });
        } else {
          // Scale image within margins
          const availableWidth = Math.max(20, pageWidth - margin * 2);
          const availableHeight = Math.max(20, pageHeight - margin * 2);

          const scaleRatio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
          const renderWidth = imgWidth * scaleRatio;
          const renderHeight = imgHeight * scaleRatio;

          // Center on page
          const xPos = (pageWidth - renderWidth) / 2;
          const yPos = (pageHeight - renderHeight) / 2;

          page.drawImage(embeddedImage, {
            x: xPos,
            y: yPos,
            width: renderWidth,
            height: renderHeight
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      downloadBlob(pdfBytes, 'converted-images.pdf', 'application/pdf');
      setIsProcessing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error generating PDF from images.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
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

      {items.length === 0 ? (
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
            if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
          }}
        >
          <div className="dropzone-icon" style={{ color: 'var(--color-pdf-tool)' }}>
            <FilePlus size={28} />
          </div>
          <h3 className="dropzone-title">Upload JPG, PNG or WebP images to convert to PDF</h3>
          <p className="dropzone-subtitle">Select multiple photos, receipts, or document scans</p>
          <button type="button" className="dropzone-btn" style={{ backgroundColor: 'var(--color-pdf-tool)' }}>
            Select Images
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files) handleFiles(e.target.files);
            }}
          />
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
              Images to Convert ({items.length} {items.length === 1 ? 'page' : 'pages'})
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus size={14} /> Add More Images
              </button>
              <button type="button" className="btn-ghost" onClick={handleReset}>
                Clear
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files) handleFiles(e.target.files);
              }}
            />
          </div>

          <div className="reorder-list">
            {items.map((item, index) => (
              <div key={item.id} className="reorder-item">
                <div className="reorder-item-left">
                  <div className="reorder-index">{index + 1}</div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div className="reorder-details">
                    <div className="reorder-name">{item.file.name}</div>
                    <div className="reorder-sub">{formatBytes(item.file.size)}</div>
                  </div>
                </div>

                <div className="reorder-actions">
                  <button
                    type="button"
                    className="reorder-btn"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    aria-label="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="reorder-btn"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    aria-label="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="reorder-btn"
                    onClick={() => removeItem(index)}
                    aria-label="Remove Image"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="page-size-select">
                <span>Page Size</span>
              </label>
              <select
                id="page-size-select"
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value as 'fit' | 'a4' | 'letter')}
                className="control-select"
              >
                <option value="a4">Standard A4 (International standard)</option>
                <option value="letter">US Letter (North American standard)</option>
                <option value="fit">Fit to Image (No Borders)</option>
              </select>
            </div>

            {pageSize !== 'fit' && (
              <>
                <div className="control-group">
                  <label className="control-label" htmlFor="orientation-select">
                    <span>Page Orientation</span>
                  </label>
                  <select
                    id="orientation-select"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as 'auto' | 'portrait' | 'landscape')}
                    className="control-select"
                  >
                    <option value="auto">Auto (Match each image aspect)</option>
                    <option value="portrait">Portrait (Vertical)</option>
                    <option value="landscape">Landscape (Horizontal)</option>
                  </select>
                </div>

                <div className="control-group">
                  <label className="control-label" htmlFor="margins-select">
                    <span>Page Margins</span>
                  </label>
                  <select
                    id="margins-select"
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="control-select"
                  >
                    <option value="0">None (Full Bleed)</option>
                    <option value="20">Small Margin (20 pt)</option>
                    <option value="40">Standard Margin (40 pt)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="results-card">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleGeneratePdf}
                disabled={isProcessing}
                style={{ flex: 1, backgroundColor: 'var(--color-pdf-tool)' }}
              >
                <Download size={18} /> {isProcessing ? 'Generating PDF...' : `Convert ${items.length} Images to PDF`}
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
