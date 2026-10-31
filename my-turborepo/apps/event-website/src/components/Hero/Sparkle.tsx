import type { CSSProperties } from "react";

/**
 * Four-point ✦ used on the APPLY button.
 * Wrapped in a span so animations target an HTML box, which Chrome can run on
 * the compositor (transforms on an <svg> element can't be).
 */
export function Sparkle({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={className} style={style} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        focusable="false"
        style={{ display: "block" }}
      >
        <path
          d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
