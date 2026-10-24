import React from 'react';
import Link from 'next/link';
import {
  Minimize2,
  Maximize2,
  Crop,
  Repeat,
  FileImage,
  Shuffle,
  Layers,
  Files,
  Split,
  RotateCw,
  Minimize,
  FilePlus,
  ArrowRight
} from 'lucide-react';
import { ToolMetadata } from '@/types';

const ICON_MAP: Record<string, React.ElementType> = {
  Minimize2,
  Maximize2,
  Crop,
  Repeat,
  FileImage,
  Shuffle,
  Layers,
  Files,
  Split,
  RotateCw,
  Minimize,
  FilePlus
};

interface ToolCardProps {
  tool: ToolMetadata;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.iconName] || Layers;
  const isImage = tool.category === 'image';

  return (
    <Link href={`/${tool.slug}`} className="tool-card" id={`tool-card-${tool.slug}`}>
      <div className="tool-card-top">
        <div className={`tool-card-icon ${isImage ? 'is-image' : 'is-pdf'}`}>
          <IconComponent size={22} />
        </div>
        {tool.badge && <span className="tool-card-badge">{tool.badge}</span>}
      </div>

      <h3 className="tool-card-title">{tool.title}</h3>
      <p className="tool-card-desc">{tool.shortDescription}</p>

      <div className="tool-card-footer">
        <span>Open Utility</span>
        <span className="arrow-icon">
          <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
