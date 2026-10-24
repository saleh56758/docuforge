export type ToolCategory = 'image' | 'pdf';

export interface ToolMetadata {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ToolCategory;
  iconName: string;
  badge?: string;
  features: string[];
  supportedFormats: string[];
  maxFileSizeMB: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  howToSteps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  relatedTools: string[];
}

export interface GuideMetadata {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  tags: string[];
  content: string;
}
