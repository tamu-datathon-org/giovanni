import Image from "next/image";

const HELP_QUEUE_URL = "https://helpqueue.tamudatathon.com/";
// The FAQ's house bear; also used by the coin transition.
const BEAR = "/event_assets/faq/bear-dealer-body.png";

/**
 * The house bear in the bottom-right corner, calling "Help Queue". The whole thing is one
 * link to the help queue, pinned to every page.
 */
export default function HelpQueueButton() {
  return (
    <a
      href={HELP_QUEUE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Help Queue (opens in a new tab)"
      // z-[45] matches the MLH badge: above the page, under the menu (z-50), the coin curtain
      // (60) and the modals. The scroll-to-top button is lifted above the bear in the layout.
      className="group/help fixed bottom-0 right-3 z-[45] block w-[72px] rounded-t-[40%] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3] md:right-6 md:w-[104px]"
    >
      <Image
        src={BEAR}
        alt=""
        width={732}
        height={909}
        sizes="(min-width: 768px) 104px, 72px"
        draggable={false}
        className="h-auto w-full origin-bottom select-none drop-shadow-[0_4px_6px_rgb(0_0_0/0.45)] transition-transform duration-200 ease-out group-hover/help:scale-105 group-focus-visible/help:scale-105 motion-reduce:transition-none"
      />
      {/* Speech bubble beside the bear's head; its tail points back at the bear. */}
      <span
        aria-hidden="true"
        className="font-righteous absolute right-[80%] top-[10%] origin-right whitespace-nowrap rounded-2xl border-2 border-[#ef8700] bg-gradient-to-b from-[#fffbef] to-[#fff3dc] px-2.5 py-1 text-sm leading-none text-[#d50000] [box-shadow:0_4px_10px_rgb(16_6_24/0.45),inset_0_-2px_0_rgb(226_168_96/0.35)] transition-transform duration-200 ease-out group-hover/help:scale-110 group-focus-visible/help:scale-110 motion-reduce:transition-none md:px-3.5 md:py-1.5 md:text-xl"
      >
        Help Queue
        <span className="absolute -right-[7px] top-1/2 size-3 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-[#ef8700] bg-[#fff3dc]" />
      </span>
    </a>
  );
}
