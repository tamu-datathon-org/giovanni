"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CafeMenuBoard, { type CafeMenuBoardItem } from "./CafeMenuBoard";

type CafeMenuBoardContainerProps = {
  activeId: string;
  onActiveIdChange: (id: string) => void;
  onItemSelected?: () => void;
};

type MenuTarget = {
  id: string;
  targetId: string;
  label: string;
  subtitle?: string;
};

const MENU_TARGETS: MenuTarget[] = [
  { id: "menu", targetId: "menu", label: "Home", subtitle: "" },
  { id: "find-us", targetId: "find-us", label: "Location", subtitle: "" },
  { id: "baristas-note", targetId: "baristas-note", label: "FAQ", subtitle: "" },
];

/** Finer steps so the observer fires often enough to keep state in sync. */
const IO_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

export default function CafeMenuBoardContainer({
  activeId,
  onActiveIdChange,
  onItemSelected,
}: CafeMenuBoardContainerProps) {
  const pathname = usePathname();
  const router = useRouter();

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

  const sectionVisibilityRef = useRef(
    new Map<string, { ratio: number; intersecting: boolean }>(),
  );

  const pendingTargetIdRef = useRef<string | null>(null);

  const items: CafeMenuBoardItem[] = useMemo(() => {
    return MENU_TARGETS.map((t) => ({
      id: t.id,
      label: t.label,
      subtitle: t.subtitle,
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

    const el = document.getElementById(maybeId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onActiveIdChange(
        MENU_TARGETS.find((t) => t.targetId === maybeId)?.id ?? "menu",
      );
    }
  }, [pathname, onActiveIdChange]);

  useEffect(() => {
    if (pathname !== "/") return;

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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          sectionVisibilityRef.current.set(id, {
            ratio: entry.intersectionRatio,
            intersecting: entry.isIntersecting,
          });
        }

        const candidates = MENU_TARGETS.map((t) => ({
          target: t,
          state: sectionVisibilityRef.current.get(t.targetId),
        })).filter(
          (x): x is { target: MenuTarget; state: { ratio: number; intersecting: boolean } } =>
            !!x.state?.intersecting,
        );

        if (!candidates.length) return;

        const best = candidates.sort((a, b) => b.state.ratio - a.state.ratio)[0];
        if (activeIdRef.current !== best.target.id) {
          onActiveIdChange(best.target.id);
        }
      },
      {
        threshold: IO_THRESHOLDS,
        rootMargin: "-15% 0px -25% 0px",
      },
    );

    for (const t of targets) observer.observe(t.el);

    return () => observer.disconnect();
  }, [pathname, onActiveIdChange]);

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
        if (matched) onActiveIdChange(matched.id);
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
  }, [pathname, onActiveIdChange]);

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

    if (enabledMap[target.targetId] === false) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    onActiveIdChange(menuItemId);
    onItemSelected?.();
  };

  return <CafeMenuBoard items={items} activeId={activeId} onItemClick={handleItemClick} />;
}
