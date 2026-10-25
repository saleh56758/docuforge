import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import RotatePdf from '@/components/tools/RotatePdf';

const tool = getToolBySlug('rotate-pdf')!;

export const metadata: Metadata = generateToolMetadata('rotate-pdf');

export default function RotatePdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <RotatePdf />
    </ToolPageContainer>
  );
}
