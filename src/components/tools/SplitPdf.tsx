'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Layers } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes, downloadBlob, readFileAsArrayBuffer, replaceFileExtension } from '@/utils/fileHelpers';

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [rangeInput, setRangeInput] = useState<string>('1');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }
    setError(null);
    setSuccessInfo(null);
    try {
      const buf = await readFileAsArrayBuffer(selectedFile);
      const pdfDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const pages = pdfDoc.getPageCount();
      setFile(selectedFile);
      setBuffer(buf);
      setTotalPages(pages);
      setRangeInput(pages > 1 ? `1-${Math.min(pages, 2)}` : '1');
    } catch {
      setError('Failed to open PDF document. It may be encrypted or corrupted.');
    }
  };

  /**
   * Parse user page string e.g. "1-3, 5, 7-9" into zero-indexed page numbers
   */
  const parsePageRanges = (input: string, maxPages: number): number[] => {
    const indices = new Set<number>();
    const parts = input.split(',').map((p) => p.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          throw new Error(`Invalid range: "${part}". Valid range must be between 1 and ${maxPages}.`);
        }
        for (let i = start; i <= end; i++) {
          indices.add(i - 1);
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (isNaN(pageNum) || pageNum < 1 || pageNum > maxPages) {
          throw new Error(`Invalid page number: "${part}". Must be between 1 and ${maxPages}.`);
        }
        indices.add(pageNum - 1);
      }
    }

    if (indices.size === 0) {
      throw new Error('Please specify at least one valid page number.');
    }

    return Array.from(indices).sort((a, b) => a - b);
  };

  const handleSplitAndDownload = async () => {
    if (!file || !buffer || totalPages === 0) return;
    setIsProcessing(true);
    setError(null);
    setSuccessInfo(null);

    try {
      const pageIndices = parsePageRanges(rangeInput, totalPages);
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
      copiedPages.forEach((page) => newDoc.addPage(page));

      const outputBytes = await newDoc.save();
      const filename = `split-pages-${rangeInput.replace(/[^0-9,-]/g, '')}-${replaceFileExtension(file.name, 'pdf')}`;
      downloadBlob(outputBytes, filename, 'application/pdf');

      setSuccessInfo(`Successfully extracted ${pageIndices.length} page(s) and saved as "${filename}".`);
      setIsProcessing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error extracting PDF pages.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBuffer(null);
    setTotalPages(0);
    setRangeInput('1');
    setError(null);
    setSuccessInfo(null);
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

      {successInfo && (
        <div className="alert-box alert-success">
          <FileCheck size={18} />
          <span>{successInfo}</span>
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
          <div className="dropzone-icon" style={{ color: 'var(--color-pdf-tool)' }}>
            <Upload size={28} />
          </div>
          <h3 className="dropzone-title">Upload a PDF to extract pages</h3>
          <p className="dropzone-subtitle">Extract single pages or custom ranges (e.g. 1-3, 5)</p>
          <button type="button" className="dropzone-btn" style={{ backgroundColor: 'var(--color-pdf-tool)' }}>
            Choose PDF Document
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
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
                  {totalPages} total {totalPages === 1 ? 'page' : 'pages'} ({formatBytes(file.size)})
                </div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Document
            </button>
          </div>

          <div className="controls-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="control-group">
              <label className="control-label" htmlFor="page-range-input">
                <span>Specify Pages to Extract</span>
                <span className="control-value-badge">Total Pages: {totalPages}</span>
              </label>
              <input
                id="page-range-input"
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5, 8"
                className="control-input"
              />
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Examples: <strong>1-{Math.min(totalPages, 3)}</strong> for first few pages, or <strong>1, {Math.min(totalPages, 2)}</strong> for specific pages.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setRangeInput('1')}
            >
              First Page Only
            </button>
            {totalPages >= 2 && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setRangeInput(`1-${Math.ceil(totalPages / 2)}`)}
              >
                First Half (1-{Math.ceil(totalPages / 2)})
              </button>
            )}
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setRangeInput(String(totalPages))}
            >
              Last Page Only ({totalPages})
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setRangeInput(`1-${totalPages}`)}
            >
              All Pages (1-{totalPages})
            </button>
          </div>

          <div className="results-card">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleSplitAndDownload}
                disabled={isProcessing || !rangeInput.trim()}
                style={{ flex: 1, backgroundColor: 'var(--color-pdf-tool)' }}
              >
                <Download size={18} /> {isProcessing ? 'Extracting Pages...' : 'Extract & Download PDF'}
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
