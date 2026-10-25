import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import JpgToWebp from '@/components/tools/JpgToWebp';

const tool = getToolBySlug('jpg-to-webp')!;

export const metadata: Metadata = generateToolMetadata('jpg-to-webp');

export default function JpgToWebpPage() {
  return (
    <ToolPageContainer tool={tool}>
      <JpgToWebp />
    </ToolPageContainer>
  );
}
