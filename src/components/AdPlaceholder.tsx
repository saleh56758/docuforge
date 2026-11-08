import React from 'react';
import { SITE_CONFIG } from '@/utils/siteConfig';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal-banner' | 'rectangle';
  className?: string;
}

const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

/**
 * AdSafe Layout Container
 *
 * AdSense Compliance Rules Enforced:
 * 1. Fixed minimum height to prevent Cumulative Layout Shift (CLS) during ad injection.
 * 2. Generous vertical margin (2.5rem) ensuring clear physical separation from buttons
 *    and interactive tool workspaces, preventing accidental clicks.
 * 3. Compliant "Advertisement" labeling only; zero incentivizing copy.
 * 4. Never placed inside tool interaction dropzones or next to form submit buttons.
 */
export default function AdPlaceholder({
  slotId = 'default-slot',
  format = 'horizontal-banner',
  className = ''
}: AdPlaceholderProps) {
  const isAdsEnabled = SITE_CONFIG.adsEnabled;
  const hasValidAdConfiguration =
    isAdsEnabled &&
    /^ca-pub-\d+$/.test(ADSENSE_PUBLISHER_ID ?? '') &&
    /^\d+$/.test(slotId);

  return (
    <aside
      className={`ad-slot-container ${format === 'rectangle' ? 'is-rectangle' : 'is-horizontal'} ${className}`}
      aria-label="Advertisement"
      style={{
        margin: '2.5rem 0',
        minHeight: format === 'rectangle' ? '250px' : '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.75rem',
        overflow: 'hidden',
        clear: 'both'
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '0.375rem'
        }}
      >
        <span
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            fontWeight: 600
          }}
        >
          Advertisement
        </span>
      </div>

      {hasValidAdConfiguration ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: format === 'rectangle' ? '250px' : '90px' }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: format === 'rectangle' ? '250px' : '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.75rem'
          }}
        >
          Reserved Ad Space
        </div>
      )}
    </aside>
  );
}
