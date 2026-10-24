/**
 * Formats a byte number into human-readable string (e.g., "1.45 MB", "340 KB")
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Calculates percentage size savings
 */
export function calculateSavings(originalBytes: number, newBytes: number): number {
  if (originalBytes <= 0) return 0;
  const savings = ((originalBytes - newBytes) / originalBytes) * 100;
  return Math.max(0, Math.round(savings));
}

/**
 * Triggers browser download of a Blob or Uint8Array
 */
export function downloadBlob(blob: Blob | Uint8Array, filename: string, mimeType?: string): void {
  const finalBlob = blob instanceof Blob ? blob : new Blob([blob.buffer as ArrayBuffer], { type: mimeType || 'application/octet-stream' });
  const url = URL.createObjectURL(finalBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Reads a File into an HTMLImageElement
 */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to decode image data'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Reads a File into an ArrayBuffer
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read file buffer'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Strips or changes the file extension
 */
export function replaceFileExtension(filename: string, newExt: string): string {
  const lastDot = filename.lastIndexOf('.');
  const base = lastDot !== -1 ? filename.substring(0, lastDot) : filename;
  const cleanExt = newExt.startsWith('.') ? newExt : `.${newExt}`;
  return `${base}${cleanExt}`;
}
