import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import WebpToJpg from '@/components/tools/WebpToJpg';

const tool = getToolBySlug('webp-to-jpg')!;

export const metadata: Metadata = generateToolMetadata('webp-to-jpg');

export default function WebpToJpgPage() {
  return (
    <ToolPageContainer tool={tool}>
      <WebpToJpg />
    </ToolPageContainer>
  );
}
