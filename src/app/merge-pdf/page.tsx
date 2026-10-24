import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import MergePdf from '@/components/tools/MergePdf';

const tool = getToolBySlug('merge-pdf')!;

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

export default function MergePdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <MergePdf />
    </ToolPageContainer>
  );
}
