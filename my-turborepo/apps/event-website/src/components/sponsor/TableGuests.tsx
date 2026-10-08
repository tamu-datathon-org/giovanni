import type { CSSProperties } from "react";

const GUESTS = [
  {
    x: 365,
    y: 8,
    angle: 0,
    shirt: "#e7a43e",
    shade: "#bb7529",
    skin: "#edbd98",
    hair: "#66463b",
    hairstyle: "swept",
  },
  {
    x: 990,
    y: 8,
    angle: 0,
    shirt: "#81a995",
    shade: "#4d7a67",
    skin: "#ad7151",
    hair: "#30282b",
    hairstyle: "bun",
  },
  {
    x: 1359,
    y: 472,
    angle: 90,
    shirt: "#7799ba",
    shade: "#486b91",
    skin: "#f0c9a4",
    hair: "#d99339",
    hairstyle: "swept",
  },
  {
    x: 965,
    y: 937,
    angle: 180,
    shirt: "#d56b51",
    shade: "#a94335",
    skin: "#925a40",
    hair: "#30282b",
    hairstyle: "curls",
  },
  {
    x: 390,
    y: 937,
    angle: 180,
    shirt: "#b199c3",
    shade: "#846899",
    skin: "#edbd98",
    hair: "#754b33",
    hairstyle: "bun",
  },
  {
    x: 8,
    y: 472,
    angle: -90,
    shirt: "#c76a87",
    shade: "#984762",
    skin: "#c78b65",
    hair: "#372c2a",
    hairstyle: "curls",
  },
] as const;

type Guest = (typeof GUESTS)[number];

/** An overhead figure facing down toward the table, with independently animated limbs. */
function Guest({ guest, index }: { guest: Guest; index: number }) {
  const { shirt, shade, skin, hair, hairstyle } = guest;
  return (
    <g
      transform={`translate(${guest.x} ${guest.y}) rotate(${guest.angle}) scale(1.1)`}
      style={{ "--delay": `-${index * 1.7}s` } as CSSProperties}
    >
      {/* Upholstered chair and brass frame remain still. */}
      <ellipse cx="0" cy="-58" rx="78" ry="66" fill="#170f10" opacity="0.2" />
      <path
        d="M-59-95V-18M59-95V-18"
        stroke="#c49454"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="-57" y="-104" width="114" height="98" rx="32" fill="#39292e" />
      <rect
        x="-62"
        y="-114"
        width="124"
        height="35"
        rx="17"
        fill="#5b3941"
        stroke="#c49454"
        strokeWidth="4"
      />
      <path
        d="M-45-102H45"
        stroke="#85515b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="origin-[0_-50px] animate-guest-settle motion-reduce:animate-none">
        <path
          d="M-57-54Q-53-90 0-92Q53-90 57-54L47-11Q0 5-47-11Z"
          fill={shirt}
        />
        <path
          d="M-46-50L-40-19Q0-6 40-19L46-50L47-11Q0 5-47-11Z"
          fill={shade}
          opacity="0.6"
        />
        <path
          d="M-22-75Q0-58 22-75"
          fill="none"
          stroke={shade}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g className="origin-[-48px_-40px] animate-guest-gesture motion-reduce:animate-none">
          <path
            d="M-48-43Q-73-26-72 8L-43 32"
            fill="none"
            stroke={shade}
            strokeWidth="29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-50-44Q-69-25-68 5L-40 28"
            fill="none"
            stroke={shirt}
            strokeWidth="23"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M-40 28L-29 39"
            stroke={skin}
            strokeWidth="17"
            strokeLinecap="round"
          />
          <ellipse
            cx="-25"
            cy="43"
            rx="11"
            ry="14"
            transform="rotate(-35 -25 43)"
            fill={skin}
          />
        </g>
        <g className="origin-[48px_-40px] animate-guest-gesture-reverse motion-reduce:animate-none">
          <path
            d="M48-43Q73-23 68 10L48 39"
            fill="none"
            stroke={shade}
            strokeWidth="29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48-45Q69-23 64 8L45 35"
            fill="none"
            stroke={shirt}
            strokeWidth="23"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45 36L36 49"
            stroke={skin}
            strokeWidth="17"
            strokeLinecap="round"
          />
          {/* A tiny fan of playing cards echoes the sponsor chips. */}
          <g transform="translate(31 50) rotate(-10)">
            <rect
              x="-10"
              y="-2"
              width="24"
              height="33"
              rx="3"
              fill="#e5d7bb"
              transform="rotate(-16)"
            />
            <rect x="0" y="0" width="24" height="33" rx="3" fill="#fff4db" />
            <path d="M12 9L17 16L12 23L7 16Z" fill="#ad3d43" />
          </g>
          <ellipse
            cx="37"
            cy="49"
            rx="10"
            ry="12"
            transform="rotate(25 37 49)"
            fill={skin}
          />
        </g>
        <g className="origin-[0_-65px] animate-guest-glance motion-reduce:animate-none">
          {hairstyle === "bun" && (
            <ellipse cx="0" cy="-75" rx="41" ry="42" fill={hair} />
          )}
          <ellipse
            cx="2"
            cy="-56"
            rx="36"
            ry="38"
            fill="#241c22"
            opacity="0.16"
          />
          <ellipse cx="-33" cy="-57" rx="7" ry="10" fill={skin} />
          <ellipse cx="33" cy="-57" rx="7" ry="10" fill={skin} />
          <ellipse cx="0" cy="-57" rx="33" ry="38" fill={skin} />
          <ellipse cx="0" cy="-20" rx="7" ry="6" fill={skin} />
          <path
            d="M-35-61Q-38-104 0-105Q40-104 35-61L27-41Q0-27-28-44Z"
            fill={hair}
          />
          {hairstyle === "swept" && (
            <>
              <path
                d="M-30-76Q-10-113 27-91Q42-77 33-54Q16-42-17-42Q3-53 14-72Q-5-61-30-62Z"
                fill={hair}
              />
              <path
                d="M-23-78Q-7-96 16-88M-22-68Q-5-80 10-79"
                fill="none"
                stroke="#fff0d0"
                strokeOpacity="0.16"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          )}
          {hairstyle === "bun" && (
            <>
              <path
                d="M-26-79Q-13-103 14-91"
                fill="none"
                stroke="#fff0d0"
                strokeOpacity="0.15"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <ellipse
                cx="0"
                cy="-105"
                rx="21"
                ry="17"
                fill={hair}
                stroke={shade}
                strokeWidth="4"
              />
              <path
                d="M-10-110Q0-119 11-108"
                fill="none"
                stroke="#fff0d0"
                strokeOpacity="0.15"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          )}
          {hairstyle === "curls" && (
            <>
              <path
                d="M-30-50Q-48-57-37-70Q-47-86-30-91Q-28-109-12-103Q0-116 14-103Q34-110 35-91Q50-82 39-67Q43-49 28-45Z"
                fill={hair}
              />
              <path
                d="M-25-82Q-31-94-17-94M-7-96Q5-103 10-91M18-79Q32-87 33-73M-19-61Q-12-73-3-64"
                fill="none"
                stroke="#fff0d0"
                strokeOpacity="0.13"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          )}
        </g>
      </g>
    </g>
  );
}

export function TableGuests() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible [filter:drop-shadow(0_7px_3px_rgb(0_0_0/0.22))]"
      viewBox="0 0 1367 945"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {GUESTS.map((guest, index) => (
        <Guest key={index} guest={guest} index={index} />
      ))}
    </svg>
  );
}
