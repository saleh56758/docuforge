import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageCropper from '@/components/tools/ImageCropper';

const tool = getToolBySlug('image-cropper')!;

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

export default function ImageCropperPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageCropper />
    </ToolPageContainer>
  );
}
