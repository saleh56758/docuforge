import catalog from './imageCatalog.json';

export interface ImageAsset {
  imageBase: string;
  alt: string;
  route: string;
  sourceUrl: string;
  downloadUrl: string;
  license: string;
  licenseUrl: string;
  attribution: string;
}

interface ImageCatalog {
  homepage: ImageAsset;
  tools: Record<string, ImageAsset>;
  blog: Record<string, ImageAsset>;
  guides: Record<string, ImageAsset>;
}

export const IMAGE_CATALOG = catalog as ImageCatalog;
