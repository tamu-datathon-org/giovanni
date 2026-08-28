"use client";

import { useCallback, useEffect, useState } from "react";

import { ANNOUNCEMENT_STORAGE_KEY, announcement } from "./announcement";
import AnnouncementBanner from "./AnnouncementBanner";
import AnnouncementModal from "./AnnouncementModal";


const OPEN_DELAY_MS = 900;

/**
 * `hidden` -> nothing rendered. `modal` -> full popup. `banner` -> collapsed
 * sticky bar that can reopen the modal.
 *
 * Closing the modal collapses to `banner` rather than going straight to
 * `hidden`, so a visitor who clicks out can still get back to the form.
 */
type Stage = "hidden" | "modal" | "banner";

/** Persisted per browser session. Absent means "not seen yet". */
type StoredStage = "banner" | "dismissed";

const read = (): StoredStage | null => {
  try {
    const v = sessionStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
    return v === "banner" || v === "dismissed" ? v : null;
  } catch {
    // ignore private mode / storage disabled
    return null;
  }
};

const write = (value: StoredStage) => {
  try {
    sessionStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, value);
  } catch {
    // ignore quota / private mode
  }
};

/**
 * Releasing Radix's scroll lock changes the body width, so let the Hero's
 * pinned ScrollTrigger re-measure. gsap is already loaded by the Hero, which
 * makes this a cached no-op import.
 */
const refreshScrollTrigger = () => {
  void import("gsap/ScrollTrigger")
    .then(({ default: ScrollTrigger }) => ScrollTrigger.refresh())
    .catch(() => {
      // gsap never loaded; nothing to refresh
    });
};

const Announcement = () => {
  // Always starts hidden so the server and first client render agree.
  const [stage, setStage] = useState<Stage>("hidden");

  useEffect(() => {
    if (!announcement.enabled) return;

    const stored = read();
    if (stored === "dismissed") return;
    if (stored === "banner") {
      setStage("banner");
      return;
    }

    const timer = setTimeout(() => setStage("modal"), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // Every modal close path lands here: X, Esc, click-outside and "Maybe later".
  const handleOpenChange = useCallback((open: boolean) => {
    if (open) return;
    setStage("banner");
    write("banner");
    refreshScrollTrigger();
  }, []);

  const handleReopen = useCallback(() => setStage("modal"), []);

  const handleDismissBanner = useCallback(() => {
    setStage("hidden");
    write("dismissed");
  }, []);

  // Applying collapses to the banner rather than hiding outright — the form
  // opens in a new tab and they may not finish it.
  const handleApply = useCallback(() => handleOpenChange(false), [
    handleOpenChange,
  ]);

  if (!announcement.enabled) return null;

  return (
    <>
      <AnnouncementModal
        open={stage === "modal"}
        onOpenChange={handleOpenChange}
        onApply={handleApply}
      />
      {stage === "banner" && (
        <AnnouncementBanner
          onReopen={handleReopen}
          onDismiss={handleDismissBanner}
        />
      )}
    </>
  );
};

export default Announcement;
