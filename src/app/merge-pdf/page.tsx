import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import MergePdf from '@/components/tools/MergePdf';

const tool = getToolBySlug('merge-pdf')!;

export const metadata: Metadata = generateToolMetadata('merge-pdf');

export default function MergePdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <MergePdf />
    </ToolPageContainer>
  );
}
