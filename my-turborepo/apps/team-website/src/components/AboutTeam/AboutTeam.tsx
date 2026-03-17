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
  const teamList_v2026 = [
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Dayo_Headshot.jpg",
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
          image: "/images/teampics_v2025/Mallika_Headshot.jpg",
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
          image: "/images/teampics_v2025/Rishab_Headshot.jpg",
          name: "Rishab Jadhav",
          position: "Challenges Lead",
        },
        {
          image: "/images/teampics_v2025/Pranav_Headshot.jpg",
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
          image: "/images/teampics_v2025/Nishit_Headshot.jpg",
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
          image: "/images/teampics_v2025/Abhinav_Headshot.jpg",
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
          image: "/images/teampics_v2025/Ali_Headshot.png",
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
          image: "/images/teampics_v2025/Susan_Headshot.jpg",
          name: "Susan Hamilton",
          position: "Challenges",
        },
      ],
      description: "Challenges",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Het_Headshot.jpg",
          name: "Het Koradia",
          position: "Dev Co-Lead",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/het-koradia/",
            },
            { type: "github", url: "https://github.com/hetk987" },
          ],
        },
        {
          image: "/images/teampics_v2025/Bethany_Headshot.jpg",
          name: "Bethany Tran",
          position: "Dev Co-Lead",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/bethany-tran-69671a247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            },
          ],
        },
        {
          image: "/images/teampics_v2025/Layla_Headshot.jpg",
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
          image: "/images/teampics_v2025/Michael_Headshot.jpg",
          name: "Michael Rao",
          position: "Dev",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/michael-rao-p/",
            },
          ],
        },
      ],
      description: "Dev",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Shreyas_Headshot.jpg",
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
          image: "/images/teampics_v2025/Anderson_Headshot.jpg",
          name: "Anderson Loan",
          position: "Outreach",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/anderson-loan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            },
          ],
        },
        {
          image: "/images/teampics_v2025/Roa_Headshot.jpg",
          name: "Roa Elsaigh",
          position: "Outreach",
        },
      ],
      description: "Outreach",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Harshini_Headshot.jpg",
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
          image: "/images/teampics_v2025/Summer_Headshot.jpg",
          name: "Summer Wong",
          position: "Logistics",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/summerrwong/",
            },
            { type: "github", url: "https://github.com/sumshiu" },
          ],
        },
        {
          image: "/images/teampics_v2025/Dakota_Headshot.jpg",
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
          image: "/images/teampics_v2025/Ragd_Headshot.jpg",
          name: "Ragd Elsaigh",
          position: "Logistics",
        },
        {
          image: "/images/teampics_v2025/Trey_Headshot.jpg",
          name: "Trey Schaider",
          position: "Logistics",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/treyschaider",
            },
          ],
        },
      ],
      description: "Logistics",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Kendall_Headshot.jpg",
          name: "Kendall Nguyen",
          position: "Design Lead",
        },
        {
          image: "/images/teampics_v2025/Antony_Headshot.jpg",
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
          image: "/images/teampics_v2025/Bhavana_Headshot.jpg",
          name: "Bhavana Venkatesh",
          position: "Design",
        },
        {
          image: "/images/teampics_v2025/Erica_Headshot.jpg",
          name: "Erica Tong",
          position: "Design",
          socialLinks: [
            {
              type: "linkedin",
              url: "https://www.linkedin.com/in/ericatongtong?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
            },
            { type: "github", url: "https://github.com/lichtrune" },
          ],
        },
        {
          image: "/images/teampics_v2025/Jessica_Headshot.jpg",
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
          image: "/images/teampics_v2025/Naomi_Headshot.jpg",
          name: "Naomi Dao",
          position: "Design",
          socialLinks: [
            { type: "linkedin", url: "https://www.linkedin.com/in/naomidao" },
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
