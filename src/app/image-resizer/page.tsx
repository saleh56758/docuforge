import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageResizer from '@/components/tools/ImageResizer';

const tool = getToolBySlug('image-resizer')!;

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

export default function ImageResizerPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageResizer />
    </ToolPageContainer>
  );
}
