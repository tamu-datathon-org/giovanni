"use client";

import type { AnchorHTMLAttributes } from "react";

import condensedBadge from "../public/enUS_add_to_google_wallet_add-wallet-badge.svg";
import primaryBadge from "../public/enUS_add_to_google_wallet_wallet-button.svg";

// Official artwork sizes, keep these ratios when resizing
const BADGES = {
  primary: { svg: primaryBadge, ratio: 283 / 50 },
  condensed: { svg: condensedBadge, ratio: 199 / 55 },
} as const;

export type AddToGoogleWalletButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  /** URL of a route that redirects to the pay.google.com save link */
  href: string;
  /** "primary" on light backgrounds, "condensed" when space is tight */
  variant?: keyof typeof BADGES;
  /** Button height in px. Google asks that it never be shown smaller than 48px tall */
  height?: number;
};

/**
 * Google's "Add to Google Wallet" button. Tapping it navigates to `href`, which redirects to the
 * signed save link, and Google Wallet takes over from there. Google also asks for at least 8px
 * of clear space around the button.
 */
export function AddToGoogleWalletButton({
  href,
  variant = "primary",
  height = 48,
  style,
  ...props
}: AddToGoogleWalletButtonProps) {
  const { svg, ratio } = BADGES[variant];
  // Next gives svg imports as { src, width, height }, other bundlers give a plain URL string
  const src = typeof svg === "string" ? svg : svg.src;
  const h = Math.max(height, 48);

  return (
    <a
      href={href}
      aria-label="Add to Google Wallet"
      style={{ display: "inline-block", lineHeight: 0, ...style }}
      {...props}
    >
      <img src={src} alt="Add to Google Wallet" height={h} width={Math.round(h * ratio)} />
    </a>
  );
}

export default AddToGoogleWalletButton;
