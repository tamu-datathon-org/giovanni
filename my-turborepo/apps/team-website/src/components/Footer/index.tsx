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
import styles from "./footer.module.css";

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

const SECTION_LINKS = menuData.filter((item) => item.path !== "/apply");
const APPLY_LINK = menuData.find((item) => item.path === "/apply");
const HOME_LINK = menuData.find((item) => item.path === "/#home")

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
    <footer id="contact" className={`font-kode ${styles.footer}`}>
      <div className={styles.background} aria-hidden />
      <Noise />

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {HOME_LINK && (
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, HOME_LINK)}
                aria-label="TAMU Datathon home"
              >
                <Image
                  src="/images/td-logos/logo/logoTD26.png"
                  alt="TAMU Datathon logo"
                  width={348}
                  height={242}
                  sizes="48px"
                  className={styles.logo}
                />
              </Link>
            )}

            <div>
              <div className={styles.nameRow}>
                <span className={styles.name}>tamu datathon</span>
                <AboutStars
                  className={styles.stars}
                  starClassName={styles.star}
                />
              </div>
              <p className={styles.tagline}>change learning with data</p>
            </div>
          </div>

          <ul className={styles.fields} aria-label="Contact">
            {CONTACTS.map(({ label, email }) => (
              <li key={email} className={styles.field}>
                <span className={styles.fieldLabel}>{label}</span>
                <a href={`mailto:${email}`} className={styles.fieldValue}>
                  {email}
                </a>
                <button
                  type="button"
                  className={styles.copy}
                  onClick={() => copy(email)}
                  aria-label={`Copy ${email}`}
                  title="Copy email"
                >
                  <LuClipboard aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.side}>
            <ul className={styles.socials}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.social}
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
                className={styles.apply}
              >
                apply
              </Link>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {SECTION_LINKS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path ?? "#"}
                    onClick={(e) => handleNavClick(e, item)}
                    className={styles.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} tamu datathon
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
