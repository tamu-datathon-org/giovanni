"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaDiscord,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { LuClipboard } from "react-icons/lu";

import AboutStars from "~/components/AboutUs/AboutStars";
import menuData from "~/components/Header/menuData";
import { useMenuNavigation } from "~/components/Header/useMenuNavigation";
import { Noise } from "~/components/shared/Noise";
import { useToast } from "~/hooks/use-toast";

const CONTACTS = [
  { label: "sponsors", email: "sponsor@tamudatathon.com" },
  { label: "questions", email: "connect@tamudatathon.com" },
];

const SOCIALS = [
  {
    label: "Discord",
    href: "https://discord.com/invite/pHsNmjuWSc",
    Icon: FaDiscord,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tamudatathon/",
    Icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@tamu-datathon/featured",
    Icon: FaYoutube,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tamudatathon/posts/?feedView=all",
    Icon: FaLinkedinIn,
  },
];

/** Focus ring for the footer's links and buttons. */
const FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-td-paper";
/** The rounded contact field clips outer rings, so draw them inside the cells. */
const FIELD_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[-3px] focus-visible:outline-td-deep";

const SECTION_LINKS = menuData.filter((item) => item.path !== "/apply");
const APPLY_LINK = menuData.find((item) => item.path === "/apply");

const Footer = () => {
  const { toast } = useToast();
  const pathname = usePathname();
  const handleNavClick = useMenuNavigation();
  // The apply button is redundant once you're already in the apply flow.
  const showApply = !pathname.startsWith("/apply");

  const copy = (email: string) => {
    navigator.clipboard.writeText(email).then(
      () =>
        toast({
          title: "Copied to clipboard",
          variant: "default",
          description: email,
        }),
      () =>
        toast({
          title: "Couldn't copy",
          variant: "destructive",
          description: email,
        }),
    );
  };

  return (
    <footer
      id="contact"
      className="relative isolate overflow-clip border-t-4 border-t-td-line bg-td-page font-kode text-[14px] text-td-paper @container"
    >
      <div
        className="footer-splotches pointer-events-none absolute inset-0 z-[-1]"
        aria-hidden
      />
      <Noise />

      <div className="relative mx-auto max-w-[1200px] px-[clamp(1rem,4cqw,3rem)] pb-4 pt-6">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-5 @[720px]:grid-cols-[minmax(0,1fr)_auto] @[720px]:[grid-template-areas:'brand_side'_'contact_contact'] @[1000px]:grid-cols-[auto_minmax(0,24rem)_auto] @[1000px]:justify-between @[1000px]:gap-x-8 @[1000px]:[grid-template-areas:'brand_contact_side']">
          <div className="flex min-w-0 items-center gap-3.5 @[720px]:[grid-area:brand]">
            <Image
              src="/images/td-logos/logo/logoTD26.png"
              alt="TAMU Datathon logo"
              width={348}
              height={242}
              sizes="48px"
              className="h-auto w-12 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <span className="whitespace-nowrap text-[20px] font-bold leading-[1.1] tracking-[-0.07em]">
                  tamu datathon
                </span>
                <AboutStars
                  className="flex gap-1"
                  starClassName="w-[14px]"
                />
              </div>
              <p className="mb-0 mt-1 text-[13px] tracking-[-0.04em] text-td-aqua">
                change learning with data
              </p>
            </div>
          </div>

          {/* Both fields share a row between 800px and 1000px, before the
              three-column layout kicks in. */}
          <ul
            className="m-0 grid w-full max-w-[26rem] list-none gap-2 p-0 @[720px]:[grid-area:contact] @[800px]:max-w-none @[800px]:grid-cols-2 @[1000px]:max-w-[26rem] @[1000px]:[grid-template-columns:none]"
            aria-label="Contact"
          >
            {CONTACTS.map(({ label, email }) => (
              <li
                key={email}
                className="grid grid-cols-[5.25rem_minmax(0,1fr)_auto] overflow-hidden rounded-[12px] border-2 border-td-line bg-white @[401px]:grid-cols-[6.25rem_minmax(0,1fr)_auto]"
              >
                <span className="flex items-center whitespace-nowrap border-r-2 border-r-td-line bg-td-label px-2.5 py-1.5 text-[13px] font-semibold tracking-[-0.07em] text-td-ink @[401px]:text-[14px]">
                  {label}
                </span>
                <a
                  href={`mailto:${email}`}
                  className={`flex min-h-9 min-w-0 items-center px-2.5 py-1.5 text-[13px] font-semibold tracking-[-0.07em] text-td-navy underline decoration-transparent underline-offset-[3px] [overflow-wrap:anywhere] [transition:text-decoration-color_150ms_ease] hover:decoration-current @[401px]:text-[14px] ${FIELD_FOCUS}`}
                >
                  {email}
                </a>
                <button
                  type="button"
                  className={`grid w-9 place-items-center border-l-2 border-l-td-line bg-td-paper text-td-ink [transition:background-color_150ms_ease,color_150ms_ease] hover:bg-td-aqua hover:text-td-deep [&_svg]:h-[15px] [&_svg]:w-[15px] ${FIELD_FOCUS}`}
                  onClick={() => copy(email)}
                  aria-label={`Copy ${email}`}
                  title="Copy email"
                >
                  <LuClipboard aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 @[720px]:justify-end @[720px]:[grid-area:side] @[1000px]:flex-col @[1000px]:items-end @[1000px]:gap-2">
            <ul className="m-0 flex list-none gap-2 p-0">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`grid h-9 w-9 place-items-center rounded-[10px] border-2 border-td-line bg-td-label text-td-ink [transition:background-color_150ms_ease,border-color_150ms_ease,color_150ms_ease,transform_150ms_ease] hover:-translate-y-0.5 hover:border-td-sky hover:bg-td-sky hover:text-td-deep motion-reduce:[transition:none] motion-reduce:hover:transform-none [&_svg]:h-[18px] [&_svg]:w-[18px] ${FOCUS}`}
                  >
                    <Icon aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            {showApply && APPLY_LINK && (
              <Link
                href="/apply"
                onClick={(e) => handleNavClick(e, APPLY_LINK)}
                className={`inline-flex h-9 w-32 items-center justify-center bg-[url('/images/application/submit-arrow.svg')] bg-[length:100%_100%] bg-center bg-no-repeat pl-[1.125rem] pr-6 text-[18px] font-semibold tracking-[-0.07em] text-td-ink [transition:filter_150ms_ease,transform_150ms_ease] hover:translate-x-[3px] hover:[filter:brightness(1.08)] motion-reduce:[transition:none] motion-reduce:hover:transform-none ${FOCUS}`}
              >
                apply
              </Link>
            )}
          </div>
        </div>

        {/* The right padding keeps the links out from under the fixed
            ScrollToTop button (40px, 32px from the bottom-right), which only
            shows at the bottom of the page, i.e. right over this bar. */}
        <div className="mt-5 flex flex-col items-start gap-2 border-t border-t-[rgb(145_175_194/45%)] pr-14 pt-3.5 text-[13px] tracking-[-0.04em] @[720px]:flex-row-reverse @[720px]:items-center @[720px]:justify-between">
          <nav aria-label="Footer">
            <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0">
              {SECTION_LINKS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path ?? "#"}
                    onClick={(e) => handleNavClick(e, item)}
                    // The dot echoes the sidebar's collapsed rail.
                    className={`inline-flex min-h-6 items-center gap-1.5 lowercase text-td-paper [transition:color_150ms_ease] before:h-[5px] before:w-[5px] before:shrink-0 before:rounded-[50%] before:bg-current before:opacity-50 before:[transition:opacity_150ms_ease] before:content-[''] hover:text-td-aqua hover:before:opacity-100 ${FOCUS}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="m-0">
            © {new Date().getFullYear()} tamu datathon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
