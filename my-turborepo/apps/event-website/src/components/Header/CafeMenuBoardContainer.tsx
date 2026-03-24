"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CafeMenuBoard, { type CafeMenuBoardItem } from "./CafeMenuBoard";

type CafeMenuBoardContainerProps = {
  onItemSelected?: () => void;
};

type MenuTarget = {
  id: string; // menu item id (also used as activeId)
  targetId: string; // DOM section id to scroll to
  label: string;
  subtitle?: string;
};

const MENU_TARGETS: MenuTarget[] = [
  { id: "menu", targetId: "menu", label: "Home", subtitle: "" },
  { id: "find-us", targetId: "find-us", label: "Location", subtitle: "" },
  { id: "baristas-note", targetId: "baristas-note", label: "FAQ", subtitle: "" },
  // { id: "brew-methods", targetId: "brew-methods", label: "About / Team", subtitle: "Brew methods" },
  // { id: "specials", targetId: "specials", label: "Current Event", subtitle: "Datathon Lite" },
  // { id: "pastries", targetId: "pastries", label: "Gallery", subtitle: "Projects" },
];

export default function CafeMenuBoardContainer({
  onItemSelected,
}: CafeMenuBoardContainerProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [activeId, setActiveId] = useState<string>("menu");
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() => {
    if (typeof document === "undefined") return {};

    const next: Record<string, boolean> = {};
    for (const t of MENU_TARGETS) {
      next[t.targetId] = !!document.getElementById(t.targetId);
    }
    return next;
  });

  const activeIdRef = useRef(activeId);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const pendingTargetIdRef = useRef<string | null>(null);

  const items: CafeMenuBoardItem[] = useMemo(() => {
    return MENU_TARGETS.map((t) => ({
      id: t.id,
      label: t.label,
      subtitle: t.subtitle,
      // On the home page we disable items whose anchor isn't present yet.
      // On other routes we still allow navigation back to `/` so clicks work.
      disabled: pathname === "/" ? enabledMap[t.targetId] === false : false,
    }));
  }, [enabledMap, pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      pendingTargetIdRef.current = null;
      return;
    }

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const maybeId = hash?.replace("#", "");
    if (!maybeId) return;
    if (!MENU_TARGETS.some((t) => t.targetId === maybeId)) return;

    // Best-effort: on first mount with a hash, scroll right away.
    const el = document.getElementById(maybeId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(
        MENU_TARGETS.find((t) => t.targetId === maybeId)?.id ?? "menu",
      );
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    // Keep menu items enabled/disabled based on whether the anchors exist.
    const nextEnabled: Record<string, boolean> = {};
    for (const t of MENU_TARGETS) {
      nextEnabled[t.targetId] = !!document.getElementById(t.targetId);
    }
    setEnabledMap((prev) => {
      const prevKeys = Object.keys(prev);
      const nextKeys = Object.keys(nextEnabled);
      if (prevKeys.length !== nextKeys.length) return nextEnabled;
      for (const k of nextKeys) {
        if (prev[k] !== nextEnabled[k]) return nextEnabled;
      }
      return prev;
    });

    const targets = MENU_TARGETS.map((t) => ({
      id: t.id,
      targetId: t.targetId,
      el: document.getElementById(t.targetId),
    })).filter((x): x is { id: string; targetId: string; el: HTMLElement } => !!x.el);

    if (!targets.length) return;

    // "Active" when a section intersects the middle-ish region of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const best = visible
          .slice()
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        const matched = MENU_TARGETS.find(
          (t) => t.targetId === (best.target as HTMLElement).id,
        );
        if (!matched) return;
        if (activeIdRef.current !== matched.id) setActiveId(matched.id);
      },
      {
        threshold: [0.15, 0.33, 0.5, 0.66],
        rootMargin: "-30% 0px -55% 0px",
      },
    );

    for (const t of targets) observer.observe(t.el);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || !pendingTargetIdRef.current) return;
    const targetId = pendingTargetIdRef.current;
    pendingTargetIdRef.current = null;

    let attempts = 0;
    let timeout: number | undefined;

    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        const matched = MENU_TARGETS.find((t) => t.targetId === targetId);
        if (matched) setActiveId(matched.id);
        return;
      }

      attempts += 1;
      if (attempts > 15) return;
      timeout = window.setTimeout(tryScroll, 120);
    };

    tryScroll();

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, [pathname]);

  const handleItemClick = (menuItemId: string) => {
    const target = MENU_TARGETS.find((t) => t.id === menuItemId);
    if (!target) return;

    if (pathname !== "/") {
      pendingTargetIdRef.current = target.targetId;
      router.push("/");
      onItemSelected?.();
      return;
    }

    const el = document.getElementById(target.targetId);
    if (!el) return;

    // If the anchor exists but the menu item is still marked as disabled
    // (ex: dynamic sections not ready yet), treat it as a no-op.
    if (enabledMap[target.targetId] === false) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(menuItemId);
    onItemSelected?.();
  };

  return <CafeMenuBoard items={items} activeId={activeId} onItemClick={handleItemClick} />;
}

