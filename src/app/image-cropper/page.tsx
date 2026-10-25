import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageCropper from '@/components/tools/ImageCropper';

const tool = getToolBySlug('image-cropper')!;

export const metadata: Metadata = generateToolMetadata('image-cropper');

export default function ImageCropperPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageCropper />
    </ToolPageContainer>
  );
}
