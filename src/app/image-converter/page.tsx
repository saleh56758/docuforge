import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageConverter from '@/components/tools/ImageConverter';

const tool = getToolBySlug('image-converter')!;

export const metadata: Metadata = generateToolMetadata('image-converter');

export default function ImageConverterPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageConverter />
    </ToolPageContainer>
  );
}
