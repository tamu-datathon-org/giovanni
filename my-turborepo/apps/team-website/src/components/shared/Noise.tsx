/** Figma noise: size 0.5, density 100%, #000 @ 25% */
export const NOISE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundSize: "50px 50px",
} as const;

interface NoiseProps {
  mask?: string;
}

export function Noise({ mask }: NoiseProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-25"
      style={
        mask
          ? {
              ...NOISE,
              WebkitMaskImage: `url(${mask})`,
              maskImage: `url(${mask})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }
          : NOISE
      }
    />
  );
}
