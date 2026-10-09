"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Menu } from "~/types/menu";

const resolveTarget = (id: string) => (document.getElementById(id) ? id : null);

/** "/#past-events" -> "past-events"; anything else (e.g. "/apply") -> null. */
export const sectionIdOf = (path?: string) =>
  path?.startsWith("/#") ? path.slice(2) : null;

/**
 * Click handler for links built from menuData. Shared by the sidebar and the
 * footer so both scroll to sections the same way and both route to /apply
 * safely. `onNavigate` runs after every click (e.g. to close a menu).
 */
export function useMenuNavigation(onNavigate?: () => void) {
  const pathname = usePathname();
  const router = useRouter();

  return (e: React.MouseEvent<HTMLAnchorElement>, item: Menu) => {
    // Kill ScrollTriggers before routing to /apply, otherwise GSAP tears down
    // nodes React still owns and throws Node.removeChild.
    if (pathname === "/" && item.path === "/apply") {
      e.preventDefault();
      onNavigate?.();
      void import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((s) => s.kill());
        router.push("/apply");
      });
      return;
    }

    const sectionId = pathname === "/" ? sectionIdOf(item.path) : null;
    if (sectionId) {
      e.preventDefault();
      const target = resolveTarget(sectionId);
      if (sectionId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target) {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Target not in the DOM yet (e.g. a dynamic section still loading) —
        // fall back to a hash jump instead of silently doing nothing.
        window.location.hash = sectionId;
      }
    }
    onNavigate?.();
  };
}
