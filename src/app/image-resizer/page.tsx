import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageResizer from '@/components/tools/ImageResizer';

const tool = getToolBySlug('image-resizer')!;

export const metadata: Metadata = generateToolMetadata('image-resizer');

export default function ImageResizerPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageResizer />
    </ToolPageContainer>
  );
}
