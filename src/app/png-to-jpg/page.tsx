import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import PngToJpg from '@/components/tools/PngToJpg';

const tool = getToolBySlug('png-to-jpg')!;

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

export default function PngToJpgPage() {
  return (
    <ToolPageContainer tool={tool}>
      <PngToJpg />
    </ToolPageContainer>
  );
}
