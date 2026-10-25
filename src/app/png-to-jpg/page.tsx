import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import PngToJpg from '@/components/tools/PngToJpg';

const tool = getToolBySlug('png-to-jpg')!;

export const metadata: Metadata = generateToolMetadata('png-to-jpg');

export default function PngToJpgPage() {
  return (
    <ToolPageContainer tool={tool}>
      <PngToJpg />
    </ToolPageContainer>
  );
}
