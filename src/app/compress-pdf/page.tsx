import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import { generateToolMetadata } from '@/utils/toolMetadata';
import ToolPageContainer from '@/components/ToolPageContainer';
import CompressPdf from '@/components/tools/CompressPdf';

const tool = getToolBySlug('compress-pdf')!;

export const metadata: Metadata = generateToolMetadata('compress-pdf');

export default function CompressPdfPage() {
  return (
    <ToolPageContainer tool={tool}>
      <CompressPdf />
    </ToolPageContainer>
  );
}
