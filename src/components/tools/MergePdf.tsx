'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, ArrowUp, ArrowDown, Trash2, FileText, Plus, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes, downloadBlob, readFileAsArrayBuffer } from '@/utils/fileHelpers';

interface PdfItem {
  id: string;
  file: File;
  pageCount: number;
  buffer: ArrayBuffer;
}

export default function MergePdf() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | File[]) => {
    setError(null);
    const newItems: PdfItem[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setError(`"${file.name}" is not a recognized PDF document.`);
        continue;
      }
      try {
        const buffer = await readFileAsArrayBuffer(file);
        // Load with pdf-lib to verify valid PDF and get page count
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const pageCount = pdfDoc.getPageCount();
        newItems.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          pageCount,
          buffer
        });
      } catch {
        setError(`Could not read "${file.name}". It may be password-protected or corrupted.`);
      }
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (items.length < 2) {
      setError('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsMerging(true);
    setProgressMsg('Combining documents...');
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < items.length; i++) {
        setProgressMsg(`Merging file ${i + 1} of ${items.length}...`);
        const item = items[i];
        const srcDoc = await PDFDocument.load(item.buffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgressMsg('Finalizing merged PDF...');
      const mergedBytes = await mergedPdf.save();
      downloadBlob(mergedBytes, 'merged-document.pdf', 'application/pdf');
      setProgressMsg('');
      setIsMerging(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred during PDF merge.');
      setIsMerging(false);
      setProgressMsg('');
    }
  };

  const totalPages = items.reduce((sum, item) => sum + item.pageCount, 0);
  const totalSize = items.reduce((sum, item) => sum + item.file.size, 0);

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
            <Upload size={28} />
          </div>
          <h3 className="dropzone-title">Select multiple PDF files to combine</h3>
          <p className="dropzone-subtitle">Drag and drop two or more PDF files</p>
          <button type="button" className="dropzone-btn" style={{ backgroundColor: 'var(--color-pdf-tool)' }}>
            Select PDF Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
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
              Files to Merge ({items.length}) • Total: {totalPages} pages ({formatBytes(totalSize)})
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus size={14} /> Add More Files
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setItems([])}
              >
                Clear All
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
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
                  <div style={{ color: 'var(--color-pdf-tool)', flexShrink: 0 }}>
                    <FileText size={22} />
                  </div>
                  <div className="reorder-details">
                    <div className="reorder-name">{item.file.name}</div>
                    <div className="reorder-sub">
                      {item.pageCount} {item.pageCount === 1 ? 'page' : 'pages'} • {formatBytes(item.file.size)}
                    </div>
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
                    aria-label="Remove File"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {items.length === 1 && (
            <div className="alert-box alert-warning">
              <AlertCircle size={18} />
              <span>Please add at least one more PDF file to merge them together.</span>
            </div>
          )}

          <div className="results-card">
            {progressMsg && (
              <div style={{ textAlign: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                {progressMsg}
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleMerge}
                disabled={isMerging || items.length < 2}
                style={{ flex: 1, backgroundColor: 'var(--color-pdf-tool)' }}
              >
                <Download size={18} /> {isMerging ? 'Merging Documents...' : `Merge ${items.length} PDFs`}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setItems([])}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
