"use client";

import Link from "next/link";
import clsx from "clsx";
import { Headphones, Trophy, type LucideIcon } from "lucide-react";

/**
 * Optional redirect targets for menu footer links. Add to `.env.local`, for example:
 *   NEXT_PUBLIC_EVENT_CHALLENGES_URL=/challenges
 *   NEXT_PUBLIC_EVENT_HELP_QUEUE_URL=https://help.example.com
 */
const CHALLENGES_URL = "https://challenges.tamudatathon.com/"
const HELP_QUEUE_URL = "https://helpqueue.tamudatathon.com/"

export function hasHeaderQuickLinks() {
  return Boolean(CHALLENGES_URL || HELP_QUEUE_URL);
}

const NOISE_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='.35'/></svg>\")";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

type QuickLinkProps = {
  href: string;
  label: string;
  subtitle: string;
  icon: LucideIcon;
  embedded?: boolean;
  onNavigate?: () => void;
};

function QuickLink({
  href,
  label,
  subtitle,
  icon: Icon,
  embedded,
  onNavigate,
}: QuickLinkProps) {
  const external = isExternalHref(href);
  const shellClass = clsx(
    "group relative flex min-w-0 items-center gap-2 overflow-hidden rounded-xl border-2 border-[#b4d8ee]/40 bg-[#fdf3e3] px-3 py-2 text-left text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-200",
    "hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]",
    embedded && "w-full",
  );

  const inner = (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_10%,rgba(180,216,238,0.45),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(180,216,238,0.25),transparent_55%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
        style={{ backgroundImage: NOISE_SVG }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 bg-[#b4d8ee]/10" />
      <span
        className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b4d8ee]/60"
        aria-hidden
      />
      <Icon
        className="relative z-10 h-3.5 w-3.5 shrink-0 text-[#b4d8ee]/70"
        aria-hidden
      />
      <div className="relative z-10 flex min-w-0 flex-col">
        <span className="font-darumadrop-one text-sm leading-none tracking-wide">
          {label}
        </span>
        <span className="font-chilanka mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b4d8ee]/50">
          {subtitle}
        </span>
      </div>
    </>
  );

  const handleClick = () => {
    onNavigate?.();
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={shellClass}
        onClick={handleClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={shellClass} onClick={handleClick}>
      {inner}
    </Link>
  );
}

type HeaderQuickLinksProps = {
  className?: string;
  embedded?: boolean;
  onNavigate?: () => void;
};

export default function HeaderQuickLinks({
  className,
  embedded,
  onNavigate,
}: HeaderQuickLinksProps) {
  const entries: QuickLinkProps[] = [];
  if (CHALLENGES_URL) {
    entries.push({
      href: CHALLENGES_URL,
      label: "Challenges",
      subtitle: "Off-menu",
      icon: Trophy,
      embedded,
      onNavigate,
    });
  }
  if (HELP_QUEUE_URL) {
    entries.push({
      href: HELP_QUEUE_URL,
      label: "Help queue",
      subtitle: "Live",
      icon: Headphones,
      embedded,
      onNavigate,
    });
  }

  if (!entries.length) return null;

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {entries.map((props) => (
        <QuickLink key={props.label} {...props} />
      ))}
    </div>
  );
}
