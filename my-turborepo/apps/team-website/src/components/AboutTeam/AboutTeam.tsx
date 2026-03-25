"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionTitle } from "@vanni/ui/section-title";

import type { TeamMemberProps } from "./teamMember";
import Teams from "./teams";

gsap.registerPlugin(ScrollTrigger);

const AboutTeam = () => {
  const teamSectionRef = useRef<HTMLDivElement | null>(null);
  const imageBaseUrl = "/images/teampics_v2026";
  const teamList_v2026 = [
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/dayo.JPG`,
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
          image: `${imageBaseUrl}/mallika.JPG`,
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
      description: "Executive",
    },
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/rishab.JPG`,
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
          image: `${imageBaseUrl}/Pranav_Headshot.jpg`,
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
          image: `${imageBaseUrl}/nishit.JPG`,
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
          image: `${imageBaseUrl}/abhinav.JPG`,
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
          image: `${imageBaseUrl}/ali.JPG`,
          name: "Ali Abouelazam",
          position: "Challenges",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/ali-abouelazm",
            },
          ],
        },
        {
          image: `${imageBaseUrl}/hannah.JPG`,
          name: "Hannah Nguyen",
          position: "Challenges",
          socialLinks: [
            // {
            //   type: "linkedin",
            //   url: "https://www.linkedin.com/in/ali-abouelazm",
            // },
          ],
        },
        {
          image: `${imageBaseUrl}/dylan.JPG`,
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
          image: `${imageBaseUrl}/pranav2.JPG`,
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
      description: "Challenges",
    },
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/Het_Headshot.jpg`,
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
          image: `${imageBaseUrl}/layla.JPG`,
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
          image: `${imageBaseUrl}/michael.JPG`,
          name: "Michael Rao",
          position: "Dev",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/michael-rao-p/",
            },
          ],
        },
        {
          image: `${imageBaseUrl}/zayd.JPG`,
          name: "Zayd Nadir",
          position: "Dev",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/zaydn/",
            },  
          ],
        },
        {
          image: `${imageBaseUrl}/angela.JPG`,
          name: "Angela Yue",
          position: "Dev",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/angela-yue-a48962247/",
            },
            // {
            //   type: "instagram",
            //   url: "https://www.instagram.com/aspirenight/",
            // },
            {
              type: "github",
              url: "https://github.com/AngelaYue2006",
            },
          ],
        },
        {
          image: `${imageBaseUrl}/aarav.JPG`,
          name: "Aarav Pulsani",
          position: "Dev",
          socialLinks: [
            // {
            //   type: "linkedin",
            //   url: "https://www.linkedin.com/in/michael-rao-p/",
            // },
          ],
        },
      ],
      description: "Dev",
    },
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/shreyas.JPG`,
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
          image: `${imageBaseUrl}/roa.JPG`,
          name: "Roa Elsaigh",
          position: "Outreach",
        },
        {
          image: `${imageBaseUrl}/jonathan2.JPG`,
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
          image: `${imageBaseUrl}/sharon.png`,
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
      description: "Outreach",
    },
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/Harshini_Headshot.jpg`,
          name: "Harshini Srinivasan",
          position: "Logistics Lead",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/harshinisriniv",
            },
          ],
        },
        {
          image: `${imageBaseUrl}/dakota.JPG`,
          name: "Dakota Pound",
          position: "Logistics",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/dakota-pound",
            },
            { type: "github", url: "https://github.com/dakotaPPP" },
          ],
        },
        {
          image: `${imageBaseUrl}/ragd.JPG`,
          name: "Ragd Elsaigh",
          position: "Logistics",
        },
        {
          image: `${imageBaseUrl}/trey.JPG`,
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
          image: `${imageBaseUrl}/pragya.JPG`,
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
          image: `${imageBaseUrl}/ryan.JPG`,
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
          image: `${imageBaseUrl}/ram.JPG`,
          name: "Ram Pillai",
          position: "Logistics",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/ram-pillai-933507249/",
            },
            // { type: "instagram", url: "https://www.instagram.com/rhp043" },
          ],
        },
      ],
      description: "Logistics",
    },
    {
      teamMembers: [
        {
          image: `${imageBaseUrl}/kendall.JPG`,
          name: "Kendall Nguyen",
          position: "Design Lead",
        },
        {
          image: `${imageBaseUrl}/antony.png`,
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
          image: `${imageBaseUrl}/bhavana.png`,
          name: "Bhavana Venkatesh",
          position: "Design",
        },
        {
          image: `${imageBaseUrl}/jessica.JPG`,
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
          image: `${imageBaseUrl}/naomi.JPG`,
          name: "Naomi Dao",
          position: "Design",
          socialLinks: [
            { type: "linkedin", url: "https://www.linkedin.com/in/naomidao" },
          ],
        },
        {
          image: `${imageBaseUrl}/avery.png`,
          name: "Avery Shih",
          position: "Design",
          socialLinks: [
            { type: "linkedin", url: "http://www.linkedin.com/in/averyshih" },
            // { type: "instagram", url: "https://www.instagram.com/averyryan27" },
          ],
        },
      ],
      description: "Design",
    },
  ] as { teamMembers: TeamMemberProps[]; description: string }[];

  return (
    <>
      <div
        ref={teamSectionRef}
        id="team"
        className="w-full py-2 text-center dark:bg-transparent"
      >
        <SectionTitle title="Meet the Teams" paragraph={""} center mb="20px" />
        <div className="flex flex-col justify-center gap-4">
          {teamList_v2026.map((team, team_index) => (
            <Teams
              key={team_index}
              teamMembers={team.teamMembers}
              description={team.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutTeam;
