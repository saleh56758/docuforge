'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, FileCheck, Minimize } from 'lucide-react';
import { formatBytes, downloadBlob, readFileAsArrayBuffer, replaceFileExtension } from '@/utils/fileHelpers';

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<ArrayBuffer | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }
    setError(null);
    setCompressedBlob(null);
    setCompressedSize(0);
    setStatusMsg('');

    try {
      const { PDFDocument } = await import('pdf-lib');
      const buf = await readFileAsArrayBuffer(selectedFile);
      const pdfDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
      setFile(selectedFile);
      setBuffer(buf);
      setTotalPages(pdfDoc.getPageCount());
    } catch {
      setError('Failed to load PDF document. It may be encrypted or corrupted.');
    }
  };

  const handleCompress = async () => {
    if (!file || !buffer) return;
    setIsProcessing(true);
    setError(null);
    setStatusMsg('Rebuilding the PDF and preparing object streams...');

    try {
      const { PDFDocument } = await import('pdf-lib');
      // Load source document
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Rebuild the document from copied pages before saving with object streams.
      const newDoc = await PDFDocument.create();
      const copiedPages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices());
      copiedPages.forEach((page) => newDoc.addPage(page));

      setStatusMsg('Repacking object streams with Flate compression...');
      // Save with modern object stream compression
      const optimizedBytes = await newDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
      });

      const blob = new Blob([optimizedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
      setIsProcessing(false);
      setStatusMsg('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error optimizing PDF.');
      setIsProcessing(false);
      setStatusMsg('');
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const filename = `optimized-${replaceFileExtension(file.name, 'pdf')}`;
    downloadBlob(compressedBlob, filename, 'application/pdf');
  };

  const handleReset = () => {
    setFile(null);
    setBuffer(null);
    setTotalPages(0);
    setCompressedBlob(null);
    setCompressedSize(0);
    setError(null);
    setStatusMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sizeChange = file && file.size > 0
    ? Math.round(((compressedSize - file.size) / file.size) * 100)
    : 0;

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
          <div className="dropzone-icon" style={{ color: 'var(--color-pdf-tool)' }}>
            <Minimize size={28} />
          </div>
          <h2 className="dropzone-title">Upload a PDF to compress and optimize</h2>
          <p className="dropzone-subtitle">Re-saves the PDF with object streams enabled</p>
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
                  Original: {formatBytes(file.size)} • {totalPages} pages
                </div>
              </div>
            </div>
            <button type="button" className="btn-ghost" onClick={handleReset}>
              <RefreshCw size={14} /> Change Document
            </button>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>How PDF optimization works:</strong> The tool rebuilds the document from copied pages and saves it with object streams enabled. File-size results vary by document, and some PDF features may not be retained; review the output before using it.
          </div>

          {!compressedBlob ? (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleCompress}
                disabled={isProcessing}
                style={{ flex: 1, backgroundColor: 'var(--color-pdf-tool)' }}
              >
                <Minimize size={18} /> {isProcessing ? 'Optimizing PDF...' : 'Optimize & Compress PDF'}
              </button>
            </div>
          ) : (
            <div className="results-card">
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-label">Original Size</div>
                  <div className="stat-value">{formatBytes(file.size)}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Output Size</div>
                  <div className="stat-value">{formatBytes(compressedSize)}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-label">Size Change</div>
                  <div className="stat-value is-savings">
                    {sizeChange < 0
                      ? `${Math.abs(sizeChange)}% smaller`
                      : sizeChange > 0
                        ? `${sizeChange}% larger`
                        : 'No change'}
                  </div>
                </div>
              </div>

              {sizeChange >= 0 && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                  The re-saved PDF is not smaller than the original. Keep whichever version best meets your needs.
                </p>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn-success"
                  onClick={handleDownload}
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <Download size={18} /> Download Processed PDF
                </button>
                <button type="button" className="btn-ghost" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          )}

          {statusMsg && (
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-primary)' }}>
              {statusMsg}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
