export interface SocialLink {
  type: "linkedin" | "github" | "twitter" | "email" | "website" | "instagram";
  url: string;
}

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  position: string;
  socialLinks?: SocialLink[];
}

export interface Team {
  id: string;
  name: string;
  color: string;
  teamMembers: TeamMember[];
}

const imageBaseUrl = "/images/teampics_v2026";

export const teams: Team[] = [
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/dayo.webp`,
        id: "oluwadayo-bamgbelu",
        name: "Oluwadayo Bamgbelu",
        position: "President",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/oluwadayo-bamgbelu/",
          },
          {
            type: "github",
            url: "https://github.com/D-BX",
          },
        ],
      },

      {
        image: `${imageBaseUrl}/mallika.webp`,
        id: "mallika-parajuli",
        name: "Mallika Parajuli",
        position: "Vice-President",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/mallikaparajuli",
          },
        ],
      },
    ],
    id: "executive",
    name: "Executive",
    color: "#FF9A42",
  },
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/rishab.webp`,
        id: "rishab-jadhav",
        name: "Rishab Jadhav",
        position: "Challenges Lead",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/rishabjadhav/",
          },
          { type: "github", url: "https://github.com/rishabjadhav" },
        ],
      },
      {
        image: `${imageBaseUrl}/Pranav_Headshot.webp`,
        id: "pranav-harwadekar",
        name: "Pranav Harwadekar",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/pranavharwadekar",
          },
          { type: "github", url: "https://github.com/pharwadekar" },
        ],
      },
      {
        image: `${imageBaseUrl}/nishit.webp`,
        id: "nishit-aggarwal",
        name: "Nishit Aggarwal",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/nishit-aggarwal-7b62352a6/",
          },
          { type: "github", url: "https://github.com/contact2nishit" },
        ],
      },
      {
        image: `${imageBaseUrl}/abhinav.webp`,
        id: "abhinav-vurakaranam",
        name: "Abhinav Vurakaranam",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/abhinav-vurakaranam-03b667238/",
          },
          {
            type: "github",
            url: "https://github.com/abhivur?tab=repositories",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/haanh.webp`,
        id: "vu-ha-anh-nguyen",
        name: "Vu Ha Anh Nguyen",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://linkedin.com/in/vu-ha-anh-nguyen-b9691b314",
          },
          {
            type: "github",
            url: "https://github.com/anh-nguyen28",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/dylan.webp`,
        id: "dylan-bago",
        name: "Dylan Bago",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/dylan-bago/",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/pranav2.webp`,
        id: "pranav-nair",
        name: "Pranav Nair",
        position: "Challenges",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/pranavnair2005/",
          },
          { type: "github", url: "https://github.com/PNair05" },
        ],
      },
    ],
    id: "challenges",
    name: "Challenges",
    color: "#10AEA4",
  },
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/Het_Headshot.webp`,
        id: "het-koradia",
        name: "Het Koradia",
        position: "Dev Lead",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/het-koradia/",
          },
          { type: "github", url: "https://github.com/hetk987" },
        ],
      },
      {
        image: `${imageBaseUrl}/layla.webp`,
        id: "layla-serrano",
        name: "Layla Serrano",
        position: "Dev",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/layla-s-4055141b0/",
          },
          { type: "github", url: "https://github.com/LaylaASerrano" },
        ],
      },
      {
        image: `${imageBaseUrl}/michael.webp`,
        id: "michael-rao",
        name: "Michael Rao",
        position: "Dev",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/michael-rao-p/",
          },
          {
            type: "github",
            url: "https://github.com/mike-rao",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/zayd.webp`,
        id: "zayd-nadir",
        name: "Zayd Nadir",
        position: "Dev",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://linkedin.com/in/zaydn",
          },
          {
            type: "github",
            url: "https://github.com/zaydn4321",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/angela.webp`,
        id: "angela-yue",
        name: "Angela Yue",
        position: "Dev",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/angela-yue-a48962247/",
          },
          {
            type: "github",
            url: "https://github.com/AngelaYue2006",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/aarav.webp`,
        id: "aarav-pulsani",
        name: "Aarav Pulsani",
        position: "Dev",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/aarav-pulsani-7874b3271",
          },
          {
            type: "github",
            url: "https://github.com/s155003",
          },
        ],
      },
    ],
    id: "dev",
    name: "Dev",
    color: "#377BB0",
  },
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/shreyas.webp`,
        id: "shreyas-kumar",
        name: "Shreyas Kumar",
        position: "Outreach Lead",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/shreyas-kumar-20",
          },
          { type: "github", url: "https://github.com/ShreyasK2005" },
        ],
      },
      {
        image: `${imageBaseUrl}/roa.webp`,
        id: "roa-elsaigh",
        name: "Roa Elsaigh",
        position: "Outreach",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/roa-e-431b29224/",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/jonathan2.webp`,
        id: "jonathan-jackson",
        name: "Jonathan Jackson",
        position: "Outreach",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/jonathan-jackson-20a29b28b",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/sharon.webp`,
        id: "sharon-alex",
        name: "Sharon Alex",
        position: "Outreach",
        socialLinks: [
          {
            type: "linkedin",
            url: "http://www.linkedin.com/in/sharon-alex",
          },
        ],
      },
    ],
    id: "outreach",
    name: "Outreach",
    color: "#7568B3",
  },
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/Harshini_Headshot.webp`,
        id: "harshini-srinivasan",
        name: "Harshini Srinivasan",
        position: "Logistics Lead",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/harshinisriniv",
          },
          {
            type: "github",
            url: "https://github.com/harshinisriniv",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/ragd.webp`,
        id: "ragd-elsaigh",
        name: "Ragd Elsaigh",
        position: "Logistics",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/ragdelsaigh/",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/trey.webp`,
        id: "trey-schaider",
        name: "Trey Schaider",
        position: "Logistics",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/treyschaider",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/pragya.webp`,
        id: "pragya-vetri",
        name: "Pragya Vetri",
        position: "Logistics",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/pragya-vetri-b46b36382",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/ryan.webp`,
        id: "ryan-dobbelaere",
        name: "Ryan Dobbelaere",
        position: "Logistics",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/ryan-dobbelaere/",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/ram.webp`,
        id: "ram-pillai",
        name: "Ram Pillai",
        position: "Logistics",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/ram-pillai-933507249/",
          },
        ],
      },
    ],
    id: "logistics",
    name: "Logistics",
    color: "#254C70",
  },
  {
    teamMembers: [
      {
        image: `${imageBaseUrl}/naomi.webp`,
        id: "naomi-dao",
        name: "Naomi Dao",
        position: "Design Lead",
        socialLinks: [
          { type: "linkedin", url: "https://www.linkedin.com/in/naomidao" },
        ],
      },
      {
        image: `${imageBaseUrl}/antony.webp`,
        id: "antony-quach",
        name: "Antony Quach",
        position: "Design",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/antony-quach-51b7a0260/",
          },
          { type: "github", url: "https://github.com/aRandomAsianAnt" },
        ],
      },
      {
        image: `${imageBaseUrl}/bhavana.webp`,
        id: "bhavana-venkatesh",
        name: "Bhavana Venkatesh",
        position: "Design",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/bhavana-venkatesh-aggie27/",
          },
          {
            type: "github",
            url: "https://github.com/chocta",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/jessica.webp`,
        id: "jessica-tran",
        name: "Jessica Tran",
        position: "Design",
        socialLinks: [
          {
            type: "linkedin",
            url: "https://www.linkedin.com/in/jessica-tran28",
          },
        ],
      },
      {
        image: `${imageBaseUrl}/avery.webp`,
        id: "avery-shih",
        name: "Avery Shih",
        position: "Design",
        socialLinks: [
          { type: "linkedin", url: "http://www.linkedin.com/in/averyshih" },
        ],
      },
    ],
    id: "design",
    name: "Design",
    color: "#D66B91",
  },
];
