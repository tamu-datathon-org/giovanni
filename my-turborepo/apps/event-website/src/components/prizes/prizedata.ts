/** Prize art, product images and first-place clips all live here. */
export const PRIZE_DIR = "/event_assets/prizes";

export interface Prize {
  name: string;
  imageSrc: string;
  /** Where clicking the prize goes. Leave "" until there's a link; it then stays on the section. */
  href: string;
}

export interface FirstPlacePrize {
  name: string;
  /**
   * Base name of the clips in PRIZE_DIR: `<video>.mp4` + `.jpg` (poster) for the
   * slot machine's windows, `<video>_hd.mp4` + `_hd.jpg` for the modal.
   */
  video: string;
  href: string;
}

/** The slot machine's four windows, left to right then top to bottom. */
export const firstPlacePrizes: FirstPlacePrize[] = [
  {
    name: "Echo Dot",
    video: "echo_dots",
    href: "https://www.amazon.com/Amazon-vibrant-helpful-routines-Charcoal/dp/B09B8V1LZ3",
  },
  {
    name: "Keychron V1 Keyboard",
    video: "data_keyboard",
    href: "https://www.amazon.com/dp/B0CR14LGX6",
  },
  {
    name: "Meta Ray-Ban",
    video: "meta_glasses",
    href: "https://www.meta.com/ai-glasses/wayfarer-shiny-black-plano-g15-green/",
  },
  {
    name: "MacBook Neo",
    video: "macbook_neo",
    href: "https://www.apple.com/us-edu/shop/buy-mac/macbook-neo/silver-256gb",
  },
];

/**
 * The other prizes, shown three at a time on the craps board. Each run of
 * three is one roll; the last roll wraps round to the start to fill up.
 */
export const prizes: Prize[] = [
  { name: "Digital Camera", imageSrc: `${PRIZE_DIR}/digicam_cutout.png`, href: "https://www.amazon.com/dp/B0B8PDHRWY" },
  { name: "Logitech G703 Mouse", imageSrc: `${PRIZE_DIR}/logitech_mouse.png`, href: "https://www.amazon.com/dp/B07NSSPV9S" },
  { name: "AirPods 4", imageSrc: `${PRIZE_DIR}/airpods.png`, href: "https://www.amazon.com/dp/B0DGHMNQ5Z" },

  { name: "Gaming Monitor", imageSrc: `${PRIZE_DIR}/monitor_cutout.png`, href: "https://www.amazon.com/dp/B08MVBYWGQ" },
  { name: "Owala", imageSrc: `${PRIZE_DIR}/owala_cutout.png`, href: "https://www.amazon.com/dp/B09SJRBMP3" },
  { name: "Mini Projector", imageSrc: `${PRIZE_DIR}/projector_cutout.png`, href: "https://www.amazon.com/dp/B0H1R7MQK8" },

  { name: "Pickleball Set", imageSrc: `${PRIZE_DIR}/pickleball_cutout.png`, href: "https://www.amazon.com/dp/B0F6VCWT85" },
  { name: "Amazon Gift Card", imageSrc: `${PRIZE_DIR}/amazon_giftcard_cutout.png`, href: "" }, // TODO: add link
];

/** Props for a prize's link: a new tab when it has one, otherwise back to the section. */
export function prizeLinkProps(href: string) {
  return href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href: "#prizes" };
}
