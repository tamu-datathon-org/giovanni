"use client";

import React from "react";
import Teams from "./teams";

const AboutTeam = () => {
  const teamList = 
  [
    {
      teamMembers: [
        { image: "/images/teampics/dayo_headshot.jpg", name: "Dayo", position: "President" },
        { image: "/images/teampics/jonathan_headshot.jpg", name: "Jonathan Herrara", position: "Vice-President" },
        { image: "/images/teampics/warren_headshot.jpg", name: "Warren Wu", position: "Former President" },
        { image: "/images/teampics/victoria_headshot.jpg", name: "Victoria Chen", position: "Former Vice-President" },

      ],
      description: "Presidents",
    },
    {
      teamMembers: [
        { image: "/images/teampics/placeholder.jpg", name: "Rishabh", position: "Challenges Lead" },
        { image: "/images/teampics/vikram_headshot.jpg", name: "Vikram", position: "Challenges" },
        { image: "/images/teampics/anthony_headshot.jpg", name: "Anthony", position: "Challenges" },
        { image: "/images/teampics/akil_headshot.jpg", name: "Akil", position: "Challenges" },
        { image: "/images/teampics/caleb_headshot.jpg", name: "Caleb", position: "Challenges" },
        { image: "/images/teampics/zeshawn_headshot.jpg", name: "Zeshawn", position: "Challenges" },
      ],
      description: "Challenges",
    },
    {
      teamMembers: [
        { image: "/images/teampics/cameron_headshot.jpg", name: "Cameron Le", position: "Dev Lead" },
        { image: "/images/teampics/samay_headshot.jpg", name: "Samay", position: "Former Dev Lead" },
        { image: "/images/teampics/bethany_headshot.jpg", name: "Bethany", position: "Dev" },
        { image: "/images/teampics/het_headshot.jpg", name: "Het", position: "Dev" },
        { image: "/images/teampics/aniket_headshot.jpg", name: "Aniket", position: "Dev" }
      ],
      description: "Developers",
    },
    {
      teamMembers: [
        { image: "/images/teampics/timothy_headshot.jpg", name: "Timothy", position: "Outreach Lead" },
        { image: "/images/teampics/rance_headshot.jpg", name: "Rance", position: "Former Outreach" },
        { image: "/images/teampics/chris_headshot.jpg", name: "Chris Kong", position: "Former Outreach" },
        { image: "/images/teampics/daniel_headshot.jpg", name: "Daniel", position: "Former Outreach lead" },
      ],
      description: "Outreach",
    },
    {
      teamMembers: [
        { image: "/images/teampics/malika_headshot.jpg", name: "Malika", position: "Logistics Lead" },
        { image: "/images/teampics/amber_headshot.jpg", name: "Amber Chang", position: "Former Logistics Lead" },
        { image: "/images/teampics/summer_headshot.jpg", name: "Summer Wong", position: "Logistics" },
        { image: "/images/teampics/brittney_headshot.jpg", name: "Brittney", position: "Logistics" },
        { image: "/images/teampics/placeholder.jpg", name: "Trey", position: "Logistics" },
        { image: "/images/teampics/placeholder.jpg", name: "Josh Brittleman", position: "Former Logistics" },
      ],
      description: "Logistics",
    },
    {
      teamMembers: [
        { image: "/images/teampics/kelsie_headshot.jpg", name: "Kelsie", position: "Design Lead" },
        { image: "/images/teampics/kendall_headshot.jpg", name: "Kendall", position: "Design" },
        { image: "/images/teampics/linh_headshot.jpg", name: "Linh", position: "Former Design" },
        { image: "/images/teampics/heather_headshot.jpg", name: "Heather", position: "Former Design" },
      ],
      description: "Designers",
    },
  ]

  return (
    <>
      <div className="container mx-auto text-center py-12">
        <h2 className="mb-8 font-bold leading-tight text-black dark:text-white text-5xl">
          Meet the Team
        </h2>
        <div className="flex flex-col justify-center gap-4">
          {teamList.map((team, team_index) => (
            < Teams key={team_index} teamMembers={team.teamMembers} description={team.description} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutTeam;
