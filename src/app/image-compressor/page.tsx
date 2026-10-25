import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageCompressor from '@/components/tools/ImageCompressor';

const tool = getToolBySlug('image-compressor')!;

export const metadata: Metadata = generateToolMetadata('image-compressor');

export default function ImageCompressorPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageCompressor />
    </ToolPageContainer>
  );
}
