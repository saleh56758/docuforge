import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import SplitPdf from '@/components/tools/SplitPdf';

const tool = getToolBySlug('split-pdf')!;

export const metadata: Metadata = generateToolMetadata('split-pdf');

export default function SplitPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <SplitPdf />
    </ToolPageContainer>
  );
}
