import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import CompressPdf from '@/components/tools/CompressPdf';

const tool = getToolBySlug('compress-pdf')!;

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

export default function CompressPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <CompressPdf />
    </ToolPageContainer>
  );
}
