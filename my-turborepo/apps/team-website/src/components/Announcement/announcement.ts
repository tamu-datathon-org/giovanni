interface Announcement {
  /** Bump to re-show the popup to everyone who dismissed the previous one. */
  id: string;
  enabled: boolean;
  eyebrow: string;
  title: string;
  body: string;
  /** Short copy for the collapsed sticky bar. */
  bannerText: string;
  roles: string[];
  ctaLabel: string;
  ctaHref: string;
  dismissLabel: string;
}

/**
 * Single source of truth for the homepage announcement popup.
 *
 * To run a new announcement: edit the fields below and bump `id`. The id is
 * part of the sessionStorage key, so bumping it makes the popup re-appear for
 * visitors who had already dismissed the previous one.
 *
 * To turn the popup off: set `enabled` to false.
 */
export const announcement: Announcement = {
  id: "organizer-apps-2026",
  enabled: true,
  eyebrow: "Now Recruiting",
  title: "Organizer Applications NOW OPEN!",
  body: "No prior experience required. Just bring the enthusiasm!!",
  bannerText: "Organizer applications are open!",
  roles: ["Design", "Web Development"],
  ctaLabel: "Apply Now",
  ctaHref: "https://forms.gle/qhatGGHSJRNt1Qey6",
  dismissLabel: "Maybe later",
};

export const ANNOUNCEMENT_STORAGE_KEY = `td-announcement:${announcement.id}`;
