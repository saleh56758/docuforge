import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'horizontal-banner' | 'rectangle';
  className?: string;
}

/**
 * AdSense Placement Component
 *
 * NOTE: Commercial advertising is intentionally kept inactive until your domain
 * is submitted and approved by Google AdSense. In the meantime, this component
 * renders a compliant, discreet structural placeholder that maintains page layout
 * stability without displaying deceptive mock ads.
 *
 * To activate live ads after AdSense approval:
 * 1. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in your environment variables.
 * 2. Set NEXT_PUBLIC_ENABLE_ADS=true.
 */
export default function AdPlaceholder({
  slotId = 'default-slot',
  format = 'horizontal-banner',
  className = ''
}: AdPlaceholderProps) {
  const isAdsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (isAdsEnabled && adClientId) {
    return (
      <aside className={`ad-slot-container ${className}`} aria-label="Advertisement">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client={adClientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  // Safe developer / staging layout placeholder
  return (
    <aside className={`ad-slot-container ${className}`} aria-label="Sponsored Content Area">
      <div className="ad-slot-frame">
        <span className="ad-slot-label">Reserved Ad Space</span>
        <span className="ad-slot-note">
          Ad units remain disabled until Google AdSense domain verification is completed.
        </span>
      </div>
    </aside>
  );
}
