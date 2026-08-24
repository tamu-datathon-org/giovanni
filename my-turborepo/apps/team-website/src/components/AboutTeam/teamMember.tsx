import type React from "react";
import Image from "next/image";
import { Github, Globe, Instagram, Linkedin, Mail } from "lucide-react";

export interface SocialLink {
  type: "linkedin" | "github" | "twitter" | "email" | "website" | "instagram";
  url: string;
}

export interface TeamMemberProps {
  image: string;
  name: string;
  position: string;
  socialLinks?: SocialLink[];
}

const getSocialIcon = (type: string) => {
  switch (type) {
    case "linkedin":
      return <Linkedin className="h-5 w-5" />;
    case "github":
      return <Github className="h-5 w-5" />;
    case "email":
      return <Mail className="h-5 w-5" />;
    case "website":
      return <Globe className="h-5 w-5" />;
    case "instagram":
      return <Instagram className="h-5 w-5" />;
    default:
      return null;
  }
};

const TeamMember: React.FC<TeamMemberProps> = ({
  image,
  name,
  position,
  socialLinks = [],
}) => {
  const [firstName, ...rest] = name.trim().split(/\s+/);
  const lastName = rest.join(" ");

  return (
    <div className="m-2 flex w-36 flex-col rounded-2xl bg-[#EEEEEE] px-3 py-4 text-center shadow-[0_0_12px_rgba(0,0,0,0.18)] lg:w-44">
      <div className="relative mx-auto my-2 size-[88px] shrink-0 overflow-hidden rounded-full lg:size-28">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="88px, (min-width: 992px) 112px"
          className="scale-125 object-cover"
          quality={75}
        />
      </div>

      <div className="flex h-[2.5rem] shrink-0 items-start justify-center lg:h-[3.5rem]">
        <h3 className="font-inter w-full text-sm leading-snug text-[#949494] lg:text-xl">
          <span className="block">{firstName}</span>
          <span className="block">{lastName || "\u00A0"}</span>
        </h3>
      </div>

      <div className="mt-1 flex flex-col items-center">
        <p className="font-inter text-xs text-[#949494] lg:text-sm">{position}</p>

        {socialLinks.length > 0 ? (
          <div className="mt-2 flex min-h-5 justify-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#949494] transition-colors hover:text-[#377BB0]"
                aria-label={`Visit ${link.type}`}
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-2 min-h-5" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

export default TeamMember;
