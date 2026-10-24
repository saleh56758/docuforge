import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageConverter from '@/components/tools/ImageConverter';

const tool = getToolBySlug('image-converter')!;

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

export default function ImageConverterPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageConverter />
    </ToolPageContainer>
  );
}
