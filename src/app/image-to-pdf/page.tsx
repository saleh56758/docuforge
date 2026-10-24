import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageToPdf from '@/components/tools/ImageToPdf';

const tool = getToolBySlug('image-to-pdf')!;

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

export default function ImageToPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageToPdf />
    </ToolPageContainer>
  );
}
