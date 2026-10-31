"use client";

import { useEffect, useState } from "react";

export type DevicePlatform = "ios" | "android" | "other";

function detectPlatform(): DevicePlatform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  // iPadOS 13+ says it's a Mac; a touch-screen "Mac" is an iPad
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

/**
 * Visitor's phone OS, or "other" for desktop. null until mounted, so the server
 * render and the first client render match.
 */
export function useDevicePlatform(): DevicePlatform | null {
  const [platform, setPlatform] = useState<DevicePlatform | null>(null);
  useEffect(() => setPlatform(detectPlatform()), []);
  return platform;
}
