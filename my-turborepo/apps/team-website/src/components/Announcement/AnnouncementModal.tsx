"use client";

import { ArrowRight, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { announcement } from "./announcement";

interface AnnouncementModalProps {
  open: boolean;
  /** Called for every close path: X, Esc, click-outside, and "Maybe later". */
  onOpenChange: (open: boolean) => void;
  onApply: () => void;
}

const AnnouncementModal = ({
  open,
  onOpenChange,
  onApply,
}: AnnouncementModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg gap-0 overflow-hidden rounded-2xl border-white/10 bg-[#171C28] p-0 text-white shadow-[0_0_60px_rgba(45,105,223,0.25)] sm:rounded-2xl">
        <div
          aria-hidden
          className="h-1 w-full animate-gradient-wave bg-[linear-gradient(90deg,#2C41DB_0%,#6EFEEB_25%,#2C41DB_50%,#6EFEEB_75%,#2C41DB_100%)] bg-[length:200%_100%] motion-reduce:animate-none"
        />

        <div className="min-h-0 overflow-y-auto p-6 sm:p-8">
          <DialogHeader className="text-left">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-datalightblue">
              <Sparkles className="h-4 w-4" />
              {announcement.eyebrow}
            </div>
            {/*
              Fluid size so the headline holds ONE line at every width.
              The text needs ~16.5px of width per 1px of font size, and
              the available width is min(viewport, 512) minus padding —
              hence roughly 5.9vw, floored at 16px and capped at the 24px
              design size. Deliberately no `whitespace-nowrap`: if the
              copy is lengthened past what fits, wrapping to two lines is
              a better failure than being clipped by the dialog's
              overflow-hidden.
            */}
            <DialogTitle className="text-[clamp(1rem,calc(5.9vw-3px),1.5rem)] font-bold leading-tight text-white">
              {announcement.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-relaxed text-white/70">
              {announcement.body}
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-5 flex flex-wrap gap-2">
            {announcement.roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
              >
                {role}
              </li>
            ))}
          </ul>

          <a
            href={announcement.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onApply}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-datadarkblue px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-datadarkblue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-datalightblue focus-visible:ring-offset-2 focus-visible:ring-offset-[#171C28]"
          >
            {announcement.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          <DialogClose className="mt-3 w-full rounded-sm py-1 text-center text-sm text-white/50 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
            {announcement.dismissLabel}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
