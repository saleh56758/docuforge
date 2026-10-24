import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import JpgToWebp from '@/components/tools/JpgToWebp';

const tool = getToolBySlug('jpg-to-webp')!;

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

export default function JpgToWebpPage() {
  return (
    <ToolPageContainer tool={tool}>
      <JpgToWebp />
    </ToolPageContainer>
  );
}
