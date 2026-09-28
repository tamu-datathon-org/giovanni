import type { CSSProperties } from "react";

import { BEAMS, cssVars, SHOOTING_STARS, STARS } from "./scene";
import { Sparkle } from "./Sparkle";

// A soft wedge with a brighter core: invisible at the source, full just above
// the skyline, fading out toward the tip.
const BEAM_STYLE: CSSProperties = {
  background:
    "conic-gradient(from -6deg at 50% 100%, rgb(var(--tone) / 0) 0deg, rgb(var(--tone) / 0.12) 3deg, rgb(var(--tone) / 0.42) 5deg, rgb(var(--tone) / 0.7) 6deg, rgb(var(--tone) / 0.42) 7deg, rgb(var(--tone) / 0.12) 9deg, rgb(var(--tone) / 0) 12deg)",
  WebkitMaskImage:
    "linear-gradient(to top, transparent, #000 24%, rgb(0 0 0 / 0.5) 62%, transparent)",
  maskImage:
    "linear-gradient(to top, transparent, #000 24%, rgb(0 0 0 / 0.5) 62%, transparent)",
};

const DOT_STYLE: CSSProperties = {
  boxShadow: "0 0 max(2px, calc(var(--size) * 1.6 * var(--s))) currentColor",
};

/**
 * Searchlights, stars and shooting stars over the sky of background.png. They
 * stay clear of the palms and buildings by placement: stars only spawn above
 * the skyline, beams rise from behind the sign, shooting stars fly through open sky.
 */
export function SkyLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-screen"
      aria-hidden="true"
    >
      {/* Each zero-size pivot sways; its cone hangs off it. */}
      {BEAMS.map((beam, i) => (
        <span
          key={i}
          className="animate-sway absolute left-[var(--x)] top-[var(--y)] [rotate:var(--from)] motion-reduce:animate-none motion-reduce:[rotate:calc((var(--from)_+_var(--to))/2)]"
          style={cssVars({
            "--x": `${beam.x}%`,
            "--y": `${beam.y}%`,
            "--from": `${beam.from}deg`,
            "--to": `${beam.to}deg`,
            "--period": `${beam.period}s`,
            "--phase": `${-beam.phase}s`,
            "--tone": beam.tone,
            "--on-delay": `${i * 150}ms`,
          })}
        >
          <span
            className="group-data-[stage=on]/hero:animate-beam-on absolute bottom-0 left-[calc(-150*var(--s))] h-[calc(1000*var(--s))] w-[calc(300*var(--s))] opacity-0 motion-reduce:transition-opacity motion-reduce:duration-500 motion-reduce:group-data-[stage=on]/hero:!animate-none motion-reduce:group-data-[stage=on]/hero:opacity-100 [@media(scripting:none)]:!opacity-100"
            style={BEAM_STYLE}
          />
        </span>
      ))}

      {STARS.map((star, i) => (
        // The wrapper glimmers in once; the shape inside twinkles forever.
        // One animation per property per element keeps both on the compositor.
        <span
          key={i}
          className="animate-star-in absolute left-[var(--x)] top-[var(--y)] aspect-square w-[max(2px,calc(var(--size)*var(--s)))] text-[color:var(--color)] opacity-0 [translate:-50%_-50%] motion-reduce:animate-none motion-reduce:opacity-[0.85]"
          style={cssVars({
            "--x": `${star.x.toFixed(2)}%`,
            "--y": `${star.y.toFixed(2)}%`,
            "--size": star.size.toFixed(1),
            "--color": star.color,
            "--delay": `${star.delay.toFixed(2)}s`,
            "--twinkle": `${star.twinkle.toFixed(2)}s`,
            "--phase": `${(-star.phase).toFixed(2)}s`,
            "--dim": star.dim.toFixed(2),
          })}
        >
          {star.kind === "sparkle" ? (
            <Sparkle className="animate-twinkle-glint block h-full w-full drop-shadow-[0_0_calc(var(--size)*0.3*var(--s))_currentColor] motion-reduce:animate-none" />
          ) : (
            <span
              className="animate-twinkle block h-full w-full rounded-full bg-current motion-reduce:animate-none"
              style={DOT_STYLE}
            />
          )}
        </span>
      ))}

      {SHOOTING_STARS.map((star, i) => (
        <span
          key={i}
          className="group-data-[stage=on]/hero:animate-shoot absolute left-[var(--x)] top-[var(--y)] h-[max(1.5px,calc(2.4*var(--s)))] w-[calc(170*var(--s))] origin-left rounded-full bg-gradient-to-r from-[#fffaf0] opacity-0 motion-reduce:hidden"
          style={cssVars({
            "--x": `${star.x}%`,
            "--y": `${star.y}%`,
            "--angle": `${star.angle}deg`,
            "--travel": star.travel,
            "--cycle": `${star.cycle}s`,
            "--delay": `${star.delay}s`,
          })}
        />
      ))}
    </div>
  );
}
