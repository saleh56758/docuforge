import { GUIDES } from '@/data/guides';
import { TOOLS } from '@/data/tools';
import { getSiteUrl, SITE_CONFIG } from '@/utils/siteConfig';

export const dynamic = 'force-static';

function markdownLink(path: string, label: string, description: string) {
  return `- [${label}](${getSiteUrl()}${path}): ${description}`;
}

export function GET() {
  const imageTools = TOOLS.filter((tool) => tool.category === 'image');
  const pdfTools = TOOLS.filter((tool) => tool.category === 'pdf');
  const siteUrl = getSiteUrl();

  const content = [
    `# ${SITE_CONFIG.name}`,
    `> ${SITE_CONFIG.tagline}`,
    '',
    'DocuForge is a web-based utility platform for client-side image optimization and PDF manipulation. All file operations run in the visitor\'s browser. Files are not uploaded to or stored on DocuForge servers.',
    '',
    '## Image Tools',
    ...imageTools.map((tool) => markdownLink(`/${tool.slug}`, tool.title, tool.shortDescription)),
    '',
    '## PDF Tools',
    ...pdfTools.map((tool) => markdownLink(`/${tool.slug}`, tool.title, tool.shortDescription)),
    '',
    '## Guides',
    ...GUIDES.map((guide) => markdownLink(`/guides/${guide.slug}`, guide.title, guide.description)),
    '',
    '## Policies and Support',
    markdownLink('/about', 'About DocuForge', 'Product mission and client-side architecture.'),
    markdownLink('/privacy', 'Privacy Policy', 'How browser-side processing, cookies, analytics, and advertising are handled.'),
    markdownLink('/terms', 'Terms of Service', 'Terms governing the use of the free utilities.'),
    markdownLink('/cookies', 'Cookie Policy', 'Cookie and local storage disclosures.'),
    markdownLink('/contact', 'Contact Support', 'Technical support, feedback, and bug reporting.'),
    '',
    `Canonical site URL: ${siteUrl}`
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
