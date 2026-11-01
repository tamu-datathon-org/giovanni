/** Prize art, product images and first-place clips all live here. */
export const PRIZE_DIR = "/event_assets/prizes";

export interface Prize {
  name: string;
  imageSrc: string;
}

export interface FirstPlacePrize {
  name: string;
  /**
   * Base name of the clips in PRIZE_DIR: `<video>.mp4` + `.jpg` (poster) for the
   * slot machine's windows, `<video>_hd.mp4` + `_hd.jpg` for the modal.
   */
  video: string;
}

/** The slot machine's four windows, left to right then top to bottom. */
export const firstPlacePrizes: FirstPlacePrize[] = [
  { name: "Echo Dot", video: "echo_dots" },
  { name: "Keychron V1 Keyboard", video: "data_keyboard" },
  { name: "Meta Ray-Ban", video: "meta_glasses" },
  { name: "MacBook Neo", video: "macbook_neo" },
];

/**
 * The other prizes, shown three at a time on the craps board. Each run of
 * three is one roll; the last roll wraps round to the start to fill up.
 */
export const prizes: Prize[] = [
  { name: "Digital Camera", imageSrc: `${PRIZE_DIR}/digicam_cutout.png` },
  { name: "Logitech G703 Mouse", imageSrc: `${PRIZE_DIR}/logitech_mouse.png` },
  { name: "AirPods 4", imageSrc: `${PRIZE_DIR}/airpods.png` },

  { name: "Gaming Monitor", imageSrc: `${PRIZE_DIR}/monitor_cutout.png` },
  { name: "Owala", imageSrc: `${PRIZE_DIR}/owala_cutout.png` },
  { name: "Mini Projector", imageSrc: `${PRIZE_DIR}/projector_cutout.png` },

  { name: "Pickleball Set", imageSrc: `${PRIZE_DIR}/pickleball_cutout.png` },
  { name: "Amazon Gift Card", imageSrc: `${PRIZE_DIR}/amazon_giftcard_cutout.png` },
];
