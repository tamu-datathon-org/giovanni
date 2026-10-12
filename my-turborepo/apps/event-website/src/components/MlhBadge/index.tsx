import Image from "next/image";

/** MLH member-event trust badge, pinned to the top left of every page. */
export default function MlhBadge() {
  return (
    <a
      id="mlh-trust-badge"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=white"
      target="_blank"
      rel="noopener noreferrer"
      // The menu chip is in the top right, so the badge can hang near the left edge on phones too.
      // z-[45] keeps it above the page but under the header's menu (z-50).
      className="fixed left-4 top-0 z-[45] block w-[10%] min-w-[60px] max-w-[100px] md:left-[50px]"
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
