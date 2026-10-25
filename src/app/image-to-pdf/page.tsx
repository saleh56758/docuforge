import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import ImageToPdf from '@/components/tools/ImageToPdf';

const tool = getToolBySlug('image-to-pdf')!;

export const metadata: Metadata = generateToolMetadata('image-to-pdf');

export default function ImageToPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <ImageToPdf />
    </ToolPageContainer>
  );
}
