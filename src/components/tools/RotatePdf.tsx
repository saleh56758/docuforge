'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, RotateCw } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { formatBytes, downloadBlob, readFileAsArrayBuffer, replaceFileExtension } from '@/utils/fileHelpers';

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [angle, setAngle] = useState<number>(90);
  const [scope, setScope] = useState<'all' | 'custom'>('all');
  const [pageSelection, setPageSelection] = useState<string>('1');
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
      setPageSelection(`1-${pages}`);
    } catch {
      setError('Failed to open PDF document. It may be encrypted or corrupted.');
    }
  };

  const handleRotateAndDownload = async () => {
    if (!file || !buffer || totalPages === 0) return;
    setIsProcessing(true);
    setError(null);
    setSuccessInfo(null);

    try {
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      let targetIndices: number[] = [];
      if (scope === 'all') {
        targetIndices = pages.map((_, i) => i);
      } else {
        // Parse custom selection
        const indices = new Set<number>();
        const parts = pageSelection.split(',').map((p) => p.trim()).filter(Boolean);
        for (const part of parts) {
          if (part.includes('-')) {
            const [startStr, endStr] = part.split('-').map((s) => s.trim());
            const start = parseInt(startStr, 10);
            const end = parseInt(endStr, 10);
            if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
              throw new Error(`Invalid range: "${part}". Valid pages are 1 to ${totalPages}.`);
            }
            for (let i = start; i <= end; i++) indices.add(i - 1);
          } else {
            const pageNum = parseInt(part, 10);
            if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
              throw new Error(`Invalid page: "${part}". Valid pages are 1 to ${totalPages}.`);
            }
            indices.add(pageNum - 1);
          }
        }
        targetIndices = Array.from(indices);
      }

      if (targetIndices.length === 0) {
        throw new Error('Please select at least one page to rotate.');
      }

      for (const idx of targetIndices) {
        const page = pages[idx];
        const currentAngle = page.getRotation().angle;
        page.setRotation(degrees((currentAngle + angle) % 360));
      }

      const outputBytes = await pdfDoc.save();
      const filename = `rotated-${angle}deg-${replaceFileExtension(file.name, 'pdf')}`;
      downloadBlob(outputBytes, filename, 'application/pdf');

      setSuccessInfo(`Successfully rotated ${targetIndices.length} page(s) by ${angle}° clockwise.`);
      setIsProcessing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error rotating PDF.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setBuffer(null);
    setTotalPages(0);
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
            <RotateCw size={28} />
          </div>
          <h3 className="dropzone-title">Upload a PDF to permanently rotate pages</h3>
          <p className="dropzone-subtitle">Fix sideways or upside-down scans and pages</p>
          <button type="button" className="dropzone-btn" style={{ backgroundColor: 'var(--color-pdf-tool)' }}>
            Select PDF Document
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
                  {totalPages} {totalPages === 1 ? 'page' : 'pages'} ({formatBytes(file.size)})
                </div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Document
            </button>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
              Choose Rotation Angle:
            </span>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
              {[
                { label: '+90° Clockwise', val: 90 },
                { label: '+180° Flip (Upside-Down)', val: 180 },
                { label: '+270° (90° Counter-Clockwise)', val: 270 }
              ].map((btn) => (
                <button
                  key={btn.val}
                  type="button"
                  className={`btn-ghost ${angle === btn.val ? 'is-active' : ''}`}
                  style={{
                    backgroundColor: angle === btn.val ? 'var(--color-pdf-tool-light)' : undefined,
                    borderColor: angle === btn.val ? 'var(--color-pdf-tool)' : undefined,
                    color: angle === btn.val ? 'var(--color-pdf-tool)' : undefined,
                    fontWeight: angle === btn.val ? 700 : 500
                  }}
                  onClick={() => setAngle(btn.val)}
                >
                  <RotateCw size={14} style={{ marginRight: '0.375rem' }} /> {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="controls-grid">
            <div className="control-group">
              <label className="control-label" htmlFor="rotation-scope">
                <span>Pages to Rotate</span>
              </label>
              <select
                id="rotation-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value as 'all' | 'custom')}
                className="control-select"
              >
                <option value="all">All Pages ({totalPages} pages)</option>
                <option value="custom">Specific Pages Only</option>
              </select>
            </div>

            {scope === 'custom' && (
              <div className="control-group">
                <label className="control-label" htmlFor="custom-pages-input">
                  <span>Enter Page Numbers or Ranges</span>
                </label>
                <input
                  id="custom-pages-input"
                  type="text"
                  value={pageSelection}
                  onChange={(e) => setPageSelection(e.target.value)}
                  placeholder="e.g. 1, 3, 5-7"
                  className="control-input"
                />
              </div>
            )}
          </div>

          <div className="results-card">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleRotateAndDownload}
                disabled={isProcessing}
                style={{ flex: 1, backgroundColor: 'var(--color-pdf-tool)' }}
              >
                <Download size={18} /> {isProcessing ? 'Rotating Pages...' : `Rotate Pages by ${angle}° & Download`}
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
