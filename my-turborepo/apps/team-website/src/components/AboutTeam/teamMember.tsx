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
  return (
    <div className="pb-2">
      <div className="w-40 text-center space-y-0.5">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={100}
          height={100}
          className="h-30 w-30 mx-auto my-2 rounded-full object-cover"
        />
        <h3 className="text-base font-semibold text-black dark:text-white">
          {name}
        </h3>
        <p className="text-body-color dark:text-body-color-dark text-sm">
          {position}
        </p>

        {socialLinks.length > 0 && (
          <div className="mt-1 flex justify-center gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
                aria-label={`Visit ${link.type}`}
              >
                {getSocialIcon(link.type)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
