"use client";

import { useCallback, useEffect, useState } from "react";

import AnnouncementBanner from "./AnnouncementBanner";

const STORAGE_KEY = "td-announcement:organizer-apps-2026";
const APPEAR_DELAY_MS = 600;

const isDismissed = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    return false;
  }
};

const Announcement = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isDismissed()) return;

    const timer = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // storage unavailable; the pill just reappears next load
    }
  }, []);

  if (!visible) return null;

  return <AnnouncementBanner onDismiss={handleDismiss} />;
};

export default Announcement;
