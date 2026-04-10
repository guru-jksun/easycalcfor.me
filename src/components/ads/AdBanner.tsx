"use client";

interface AdBannerProps {
  slot: string;
  format?: "horizontal" | "rectangle" | "vertical" | "auto";
  className?: string;
}

/**
 * Google AdSense ad placeholder.
 * Set ADSENSE_ENABLED to true and update data-ad-slot values
 * once your AdSense account is approved.
 */
const ADSENSE_ENABLED = false;

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  // Hide completely until AdSense is approved
  if (!ADSENSE_ENABLED) return null;

  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2043013197583248"
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}
