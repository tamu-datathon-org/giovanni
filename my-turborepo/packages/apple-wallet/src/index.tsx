"use client";

import type { AnchorHTMLAttributes } from "react";

import badge from "../public/US-UK_Add_to_Apple_Wallet_RGB_101421.svg";

// Official badge is 110.739 x 35.016, keep that ratio when resizing
const BADGE_RATIO = 110.739 / 35.016;

export type AddToAppleWalletButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  /** URL of a route that responds with the .pkpass file (Content-Type: application/vnd.apple.pkpass) */
  href: string;
  /** Badge height in px. Apple asks that the badge never be shown smaller than 30px tall */
  height?: number;
};

/**
 * Apple's "Add to Apple Wallet" badge. Tapping it navigates to `href`, and Safari opens the
 * returned .pkpass straight in Wallet. Don't add a `download` attribute, iOS would save the
 * file instead of showing the add-pass sheet.
 */
export function AddToAppleWalletButton({
  href,
  height = 48,
  style,
  ...props
}: AddToAppleWalletButtonProps) {
  // Next gives svg imports as { src, width, height }, other bundlers give a plain URL string
  const src = typeof badge === "string" ? badge : badge.src;

  return (
    <a
      href={href}
      aria-label="Add to Apple Wallet"
      style={{ display: "inline-block", lineHeight: 0, ...style }}
      {...props}
    >
      <img
        src={src}
        alt="Add to Apple Wallet"
        height={Math.max(height, 30)}
        width={Math.round(Math.max(height, 30) * BADGE_RATIO)}
      />
    </a>
  );
}

export default AddToAppleWalletButton;
