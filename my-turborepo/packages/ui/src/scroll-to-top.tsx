"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed only once the user has scrolled to the bottom of
    // the page (and only if the page is actually tall enough to scroll).
    const bottomThreshold = 24;
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollable = fullHeight > viewportHeight + bottomThreshold;
      const atBottom =
        scrollTop + viewportHeight >= fullHeight - bottomThreshold;
      setIsVisible(scrollable && atBottom);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"></span>
        </div>
      )}
    </div>
  );
}
