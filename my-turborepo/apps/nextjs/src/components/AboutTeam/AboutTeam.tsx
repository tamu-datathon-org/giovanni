"use client";

import React from "react";

import Teams from "./teams";

const AboutTeam = () => {
  const teamList_v2025 = [
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Dayo_Headshot.jpg",
          name: "Oluwadayo Bamgbelu",
          position: "President",
        },
        {
          image: "/images/teampics_v2025/Jonathan_Headshot.png",
          name: "Jonathan Herrera",
          position: "Vice-President",
        },
      ],
      description: "Presidents",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Rishab_Headshot.jpg",
          name: "Rishab Jadhav",
          position: "Challenges Lead",
        },
        {
          image: "/images/teampics_v2025/Vikram_Headshot.jpg",
          name: "Sreevikram Rajaraman",
          position: "Challenges",
        },
        {
          image: "/images/teampics_v2025/Pranav_Headshot.jpg",
          name: "Pranav Harwadekar",
          position: "Challenges",
        },
        {
          image: "/images/teampics_v2025/Nishit_Headshot.jpg",
          name: "Nishit Aggarwal",
          position: "Challenges",
        },
        {
          image: "/images/teampics_v2025/Harshini_Headshot.jpg",
          name: "Harshini Srinivasan",
          position: "Challenges",
        },
        {
          image: "/images/teampics_v2025/Abhinav_Headshot.jpg",
          name: "Abhinav Vurakaranam",
          position: "Challenges",
        },
        {
          image: "/images/teampics_v2025/Ali_Headshot.png",
          name: "Ali Abouelazam",
          position: "Challenges",
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
          image: "/images/teampics_v2025/Cameron_Headshot.jpg",
          name: "Cameron Le",
          position: "Dev Lead",
        },
        {
          image: "/images/teampics_v2025/Bethany_Headshot.jpg",
          name: "Bethany Tran",
          position: "Dev",
        },
        {
          image: "/images/teampics_v2025/Het_Headshot.jpg",
          name: "Het Koradia",
          position: "Dev",
        },
        {
          image: "/images/teampics_v2025/Layla_Headshot.jpg",
          name: "Layla Serrano",
          position: "Dev",
        },
        {
          image: "/images/teampics_v2025/Michael_Headshot.jpg",
          name: "Michael Rao",
          position: "Dev",
        },
      ],
      description: "Developers",
    },
    {
      teamMembers: [
        {
          image: "/images/teampics_v2025/Timothy_Headshot.jpg",
          name: "Timothy Tsai",
          position: "Outreach Lead",
        },
        {
          image: "/images/teampics_v2025/Anderson_Headshot.jpg",
          name: "Anderson Loan",
          position: "Outreach",
        },
        {
          image: "/images/teampics_v2025/Shreyas_Headshot.jpg",
          name: "Shreyas Kumar",
          position: "Outreach",
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
          image: "/images/teampics_v2025/Mallika_Headshot.jpg",
          name: "Mallika Parajuli",
          position: "Logistics Lead",
        },
        {
          image: "/images/teampics_v2025/Summer_Headshot.jpg",
          name: "Summer Wong",
          position: "Logistics",
        },
        {
          image: "/images/teampics_v2025/Dakota_Headshot.jpg",
          name: "Dakota Pound",
          position: "Logistics",
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
        },
        {
          image: "/images/teampics_v2025/Jessica_Headshot.jpg",
          name: "Jessica Tran",
          position: "Design",
        },
        {
          image: "/images/teampics_v2025/Naomi_Headshot.jpg",
          name: "Naomi Dao",
          position: "Design",
        },
      ],
      description: "Designers",
    },
  ];
  return (
    <>
      <div
        id="team"
        className="container mx-auto py-16 text-center md:py-20 lg:py-24"
      >
        <h2 className="mb-8 text-5xl font-bold leading-tight text-black dark:text-white">
          Meet the Team
        </h2>
        <div className="flex flex-col justify-center gap-4">
          {teamList_v2025.map((team, team_index) => (
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
