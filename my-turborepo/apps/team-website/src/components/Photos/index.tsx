"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Noise } from "~/components/shared/Noise";
import { refreshOnLayoutShift } from "~/lib/scroll-trigger-refresh";
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

    // AboutUs above settles late and shifts this section down; keep start/end
    // in step with it (see refreshOnLayoutShift).
    const stopRefreshing = refreshOnLayoutShift(sectionRef.current);

    return () => {
      stopRefreshing();
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
