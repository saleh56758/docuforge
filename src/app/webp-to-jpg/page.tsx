import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import WebpToJpg from '@/components/tools/WebpToJpg';

const tool = getToolBySlug('webp-to-jpg')!;

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

export default function WebpToJpgPage() {
  return (
    <ToolPageContainer tool={tool}>
      <WebpToJpg />
    </ToolPageContainer>
  );
}
