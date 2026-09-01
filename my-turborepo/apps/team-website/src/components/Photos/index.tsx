"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Noise } from "~/components/shared/Noise";

import PhotosSectionImages from "./PhotosSectionImages";

gsap.registerPlugin(ScrollTrigger);

const Photos = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef1 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef2 = useRef<HTMLDivElement | null>(null);
  const imageWrapperRef3 = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (
      !sectionRef.current ||
      !imageWrapperRef1.current ||
      !imageWrapperRef2.current ||
      !imageWrapperRef3.current
    ) {
      return;
    }

    const imageRefs = [
      imageWrapperRef1.current,
      imageWrapperRef2.current,
      imageWrapperRef3.current,
    ];

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      gsap.set(imageRefs, { y: 0, yPercent: 0 });
      return;
    }

    // Wrappers 2 and 3 carry `translate-y-full` as the no-JS fallback, and GSAP
    // folds that class into its own `y` cache (in px) the first time it touches
    // the element. yPercent is *added* to y, so without pinning y to 0 here the
    // images park at 200% and land at 100% — permanently below the frame.
    gsap.set(imageRefs[0], { y: 0, yPercent: 0 });
    gsap.set([imageRefs[1], imageRefs[2]], { y: 0, yPercent: 100 });

    // Pin against this section itself rather than the preceding one. The
    // section above is a next/dynamic chunk sized by an unsized <img>, so its
    // height isn't known when ScrollTrigger measures — reading start/end from
    // it made the pin-spacer reserve the wrong amount of scroll space.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        // Transform pinning keeps the section in normal flow instead of going
        // position:fixed at a `left` recorded once at refresh time. The sidebar
        // offset on the wrapping <main> changes after mount (localStorage) and
        // whenever the nav is collapsed, which left a fixed pin snapping
        // sideways by the width difference.
        pinType: "transform",
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // fromTo (not to) because invalidateOnRefresh re-records a `to` tween's
    // start from wherever the element happens to sit at refresh time; the
    // explicit from-vars survive. `y: 0` belongs in the from-vars for the same
    // reason the gsap.set above needs it. Fresh vars per tween — GSAP stores the
    // object on the tween, so the two must not share one.
    const parked = () => ({ y: 0, yPercent: 100 });
    const slideUp = () => ({
      yPercent: 0,
      duration: 0.4,
      ease: "power2.out",
      immediateRender: false,
    });

    // The empty tweens are dwell: without the trailing one the last photo landed
    // on the exact frame the pin released, so at scrub:1 it arrived only after
    // the section had started scrolling away and read as never arriving at all.
    tl.to({}, { duration: 0.12 })
      .fromTo(imageRefs[1], parked(), slideUp())
      .to({}, { duration: 0.18 })
      .fromTo(imageRefs[2], parked(), slideUp())
      .to({}, { duration: 0.3 });

    // Everything above this section settles late: AboutUs is a next/dynamic
    // chunk whose jagged.svg is an unsized <img>, so for the first few frames it
    // measures 0px tall and only reaches its real ~1121px once the chunk renders
    // and the SVG loads. That pushes this section ~578px further down the page.
    // ScrollTrigger caches `start` at refresh time, so a refresh landing before
    // that growth pins the section 578px down the viewport and the whole
    // slide-up plays out below the fold.
    //
    // Watching the section itself is not enough — its own box never changes
    // (h-svh); only its position does. Watch the document, the way
    // Header/index.tsx already does, and re-measure whenever the geometry this
    // trigger actually depends on has moved.
    const spacerOf = (el: HTMLElement) =>
      el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
    const signature = () => {
      const el = sectionRef.current;
      if (!el) return "";
      const r = spacerOf(el).getBoundingClientRect();
      return [
        Math.round(r.top + window.scrollY),
        Math.round(r.width),
        document.documentElement.scrollHeight,
      ].join("|");
    };

    let frame = 0;
    let lastSignature = signature();
    const sync = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (signature() === lastSignature) return;
        ScrollTrigger.refresh();
        // Refreshing resizes the pin-spacer, which feeds straight back into the
        // observer — record the settled geometry so that doesn't loop.
        lastSignature = signature();
      });
    };

    // body catches the section being pushed down; the section catches width
    // changes from the sidebar collapsing, which leave body height untouched.
    const observer = new ResizeObserver(sync);
    observer.observe(document.body);
    observer.observe(sectionRef.current);
    window.addEventListener("load", sync);
    if (document.fonts) void document.fonts.ready.then(sync);

    return () => {
      window.removeEventListener("load", sync);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="photos"
      className="relative h-svh w-full overflow-hidden bg-[#377BB0]"
    >
      <Noise />
      <PhotosSectionImages
        refs={{
          imageWrapperRef1,
          imageWrapperRef2,
          imageWrapperRef3,
        }}
      />
    </section>
  );
};

export default Photos;
