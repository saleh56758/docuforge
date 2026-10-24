import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import RotatePdf from '@/components/tools/RotatePdf';

const tool = getToolBySlug('rotate-pdf')!;

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

export default function RotatePdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <RotatePdf />
    </ToolPageContainer>
  );
}
