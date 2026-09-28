import Image from "next/image";

/** MLH member-event trust badge, pinned to the top left of every page. */
export default function MlhBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white"
      target="_blank"
      rel="noopener noreferrer"
      // On phones the menu button owns the corner, so the badge hangs just to its right.
      // z-[45] keeps it above the page but under the header's menu (z-50).
      className="fixed left-[88px] top-0 z-[45] block w-[10%] min-w-[60px] max-w-[100px] md:left-[50px]"
    >
      <Image
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2027/mlh-trust-badge-2027-white.svg"
        alt="Major League Hacking 2027 Hackathon Season"
        width={100}
        height={175}
        unoptimized
        className="h-auto w-full"
      />
    </a>
  );
}
