import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import SplitPdf from '@/components/tools/SplitPdf';

const tool = getToolBySlug('split-pdf')!;

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

export default function SplitPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <SplitPdf />
    </ToolPageContainer>
  );
}
