import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageCompressor from '@/components/tools/ImageCompressor';

const tool = getToolBySlug('image-compressor')!;

export const metadata: Metadata = {
  title: tool.seoTitle,
  description: tool.seoDescription,
  keywords: tool.keywords,
  alternates: {
    canonical: `https://docuforge.app/${tool.slug}`
  },
  openGraph: {
    title: tool.seoTitle,
    description: tool.seoDescription,
    url: `https://docuforge.app/${tool.slug}`
  }
};

export default function ImageCompressorPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageCompressor />
    </ToolPageContainer>
  );
}
