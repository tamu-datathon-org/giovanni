"use client";

import React from "react";
import Teams from "./teams";

const AboutTeam = () => {
  const teamList = 
  [
    {
      teamMembers: [
        { image: "/images/teampics/dayo_headshot.jpg", name: "Oluwadayo Bamgbelu", position: "President" },
        { image: "/images/teampics/jonathan_headshot.jpg", name: "Jonathan Herrera", position: "Vice-President" },
        { image: "/images/teampics/warren_headshot.jpg", name: "Warren Wu", position: "Former President" },
        { image: "/images/teampics/victoria_headshot.jpg", name: "Victoria Chen", position: "Former Vice-President" },

      ],
      description: "Presidents",
    },
    {
      teamMembers: [
        { image: "/images/teampics/rishab_headshot.jpg", name: "Rishab Jadhav", position: "Challenges Lead" },
        { image: "/images/teampics/vikram_headshot.jpg", name: "Sreevikram Rajaraman", position: "Challenges" },
        { image: "/images/teampics/caleb_headshot.jpg", name: "Caleb Xu", position: "Challenges" },
        { image: "/images/teampics/akil_headshot.jpg", name: "Akil Manivannan", position: "Former Challenges Lead" },
        { image: "/images/teampics/anthony_headshot.jpg", name: "Anthony Ciardelli", position: "Former Challenges" },
        { image: "/images/teampics/zeshawn_headshot.jpg", name: "Zeeshan CHatur", position: "Former Challenges" },
      ],
      description: "Challenges",
    },
    {
      teamMembers: [
        { image: "/images/teampics/cameron_headshot.jpg", name: "Cameron Le", position: "Dev Lead" },
        { image: "/images/teampics/bethany_headshot.jpg", name: "Bethany Tran", position: "Dev" },
        { image: "/images/teampics/het_headshot.jpg", name: "Het Koradia", position: "Dev" },
        { image: "/images/teampics/aniket_headshot.jpg", name: "Aniket Shirodkar", position: "Dev" },
        { image: "/images/teampics/samay_headshot.jpg", name: "Samay Upadhyay", position: "Former Dev Lead" },
      ],
      description: "Developers",
    },
    {
      teamMembers: [
        { image: "/images/teampics/timothy_headshot.jpg", name: "Timothy Tsai", position: "Outreach Lead" },
        { image: "/images/teampics/daniel_headshot.jpg", name: "Daniel Vinnik", position: "Former Outreach Lead" },
        { image: "/images/teampics/rance_headshot.jpg", name: "Rance Blancaflor", position: "Former Outreach" },
        { image: "/images/teampics/chris_headshot.jpg", name: "Chris Kong", position: "Former Outreach" },
      ],
      description: "Outreach",
    },
    {
      teamMembers: [
        { image: "/images/teampics/malika_headshot.jpg", name: "Mallika Parajuli", position: "Logistics Lead" },
        { image: "/images/teampics/summer_headshot.jpg", name: "Summer Wong", position: "Logistics" },
        { image: "/images/teampics/brittney_headshot.jpg", name: "Brittney Sanchez", position: "Logistics" },
        { image: "/images/teampics/trey_headshot.jpg", name: "Trey Schaider", position: "Logistics" },
        { image: "/images/teampics/cindy_headshot.jpg", name: "Cindy Lam", position: "Former Logistics" },
        { image: "/images/teampics/amber_headshot.jpg", name: "Amber Chang", position: "Former Logistics Lead" },
        { image: "/images/teampics/josh_headshot.jpg", name: "Josh Bittlestone", position: "Former Logistics" },
      ],
      description: "Logistics",
    },
    {
      teamMembers: [
        { image: "/images/teampics/kelsie_headshot.jpg", name: "Kelsie Sheridan", position: "Design Lead" },
        { image: "/images/teampics/kendall_headshot.jpg", name: "Kendall Nguyen", position: "Design" },
        { image: "/images/teampics/linh_headshot.jpg", name: "Lynn Nie", position: "Former Design" },
        { image: "/images/teampics/heather_headshot.jpg", name: "Heather An", position: "Former Design" },
      ],
      description: "Designers",
    },
  ]

  return (
    <>
      <div id="team" className="container mx-auto text-center py-12">
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
