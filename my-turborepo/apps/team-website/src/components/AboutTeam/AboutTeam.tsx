"use client";
// new people list





import React from "react";

import Teams from "./teams";

const AboutTeam = () => {
    const teamList_v2026 = [
        {
            teamMembers: [
                {   image: "/images/teampics_v2026/dayo.jpg", name: "Oluwadayo Bamgbelu", position: "President",
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
                {   image: "/images/teampics_v2026/mallika.jpg", name: "Mallika Parajuli", position: "Vice-President",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/mallikaparajuli",
                        },
                    ],
                },
            ], description: "Presidents",
        },
        // challenges
        {
            teamMembers: [
                {
                    image: "/images/teampics_v2026/rishab.jpg",
                    name: "Rishab Jadhav",
                    position: "Challenges Lead",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/rishabjadhav/",
                        },
                        {
                            type: "github",
                            url: "https://github.com/rishabJadhAV",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/ali.png",
                    name: "Ali Abouelazam",
                    position: "Challenges",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/ali-abouelazm",
                        },
                        {
                            type: "github",
                            url: "https://github.com/AliAbouelazm",
                        }

                    ],
                },
                {
                    image: "/images/teampics_v2026/nishit.jpg",
                    name: "Nishit Aggarwal",
                    position: "Challenges",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/nishit-aggarwal-7b62352a6/",
                        },

                        {
                            type: "github",
                            url: "https://github.com/contact2nishit",
                        },
                    ],

                },

                {
                    image: "/images/teampics_v2026/dylan.jpg",
                    name: "Dylan Bago",
                    position: "Challenges",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://linkedin.com/in/dylan-bago-4048ab2a4",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/pranav2.jpg",
                    name: "Pranav Nair",
                    position: "Challenges",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://linkedin.com/in/pranavnair2005",
                        },
                        {
                            type: "github",
                            url: "https://github.com/PNair05",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/haanh.jpg",
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
                    image: "/images/teampics_v2025/Pranav_Headshot.jpg",
                    name: "Pranav Harwadekar",
                    position: "Challenges",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/pranavharwadekar",
                        },

                        {
                            type: "github",
                            url: "https://github.com/pharwadekar",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/abhinav.jpg",
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



            ], description: "Challenges"

        },

        // dev

        {
            teamMembers: [
                {   image: "/images/teampics_v2025/Het_Headshot.jpg",
                    name: "Het Koradia",
                    position: "Dev Lead",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/het-koradia/",
                        },
                        {
                            type: "github",
                            url: "https://github.com/hetk987",
                        }
                    ],
                },

                {
                    image: "/images/teampics_v2026/layla.jpg",
                    name: "Layla Serrano",
                    position: "Dev",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://linkedin.com/in/layla-serrano-4055141b0",
                        },
                        {
                            type: "github",
                            url: "https://github.com/LaylaASerrano",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/michael.jpg",
                    name: "Michael Rao",
                    position: "Dev",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/michael-rao-p/",
                        },
                        {
                            type: "github",
                            url: "https://github.com/mike-rao"
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/zayd.jpg",
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
                    image: "/images/teampics_v2026/angela.jpg",
                    name: "Angela Yue",
                    position: "Dev",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/angela-yue-a48962247",
                        },
                        {
                            type: "github",
                            url: "https://github.com/AngelaYue2006",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/aarav.jpg",
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

            ], description: "Development",
        },

        // design



        {
            teamMembers: [
                {   image: "/images/teampics_v2026/Kendall_Headshot.jpg",
                    name: "Kendall Nguyen",
                    position: "Design Lead",
                },
                {
                    image: "/images/teampics_v2026/Antony_Headshot.jpg",
                    name: "Antony Quach",
                    position: "Design",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/antony-quach-51b7a0260/",
                        },

                        {
                            type: "github",
                            url: "https://github.com/aRandomAsianAnt",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/Bhavana_Headshot.jpg",
                    name: "Bhavana Venkatesh",
                    position: "Design",
                },
                {
                    image: "/images/teampics_v2026/Erica_Headshot.jpg",
                    name: "Erica Tong",
                    position: "Design",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/ericatongtong?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                        },

                        {
                            type: "github",
                            url: "https://github.com/lichtrune",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/Jessica_Headshot.jpg",
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
                    image: "/images/teampics_v2026/Naomi_Headshot.jpg",
                    name: "Naomi Dao",
                    position: "Design",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/naomidao",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/avery.jpg",
                    name: "Avery Shih",
                    position: "Design",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/averyshih/",
                        },
                    ],
                },
            ], description: "Design",
        },
        // logistics

        {
            teamMembers:[
                {   image: "/images/teampics_v2026/Harshini_Headshot.jpg",
                    name: "Harshini Srinivasan",
                    position: "Logistics Lead",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/harshinisriniv",
                        },
                        {
                            type: "github",
                            url: "https://github.com/harshinisriniv"
                        },

                    ],

                },
                {
                    image: "/images/teampics_v2026/Summer_Headshot.jpg",
                    name: "Summer Wong",
                    position: "Logistics",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/summerrwong/",
                        },
                        {
                            type: "github",
                            url: "https://github.com/sumshiu",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/Dakota_Headshot.jpg",
                    name: "Dakota Pound",
                    position: "Logistics",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/dakota-pound",
                        },

                        {
                            type: "github",
                            url: "https://github.com/dakotaPPP",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/ragd.jpg",
                    name: "Ragd Elsaigh",
                    position: "Logistics",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/ragdelsaigh/"
                        }
                    ]
                },

                {
                    image: "/images/teampics_v2026/trey.jpg",
                    name: "Trey Schaider",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/treyschaider",
                        },
                    ],
                },
                {
                    image: "/images/teampics_v2026/ryan.jpg",
                    name: "Ryan Dobbelaere",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/ryan-dobbelaere/",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/ram.jpg",
                    name: "Ram Pillai",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/ram-pillai-933507249/",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/pragya.jpg",
                    name: "Pragya Vetri",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/pragya-vetri-b46b36382/",
                        },
                    ],
                },

            ], description: "Logistics"

        },

        // outreach

        {
            teamMembers:[
                {   image: "/images/teampics_v2026/Shreyas_Headshot.jpg", name: "Shreyas Kumar", position: "Outreach Lead",
                    socialLinks: [{ type: "linkedin", url: "https://www.linkedin.com/in/shreyas-kumar-20",},{type: "github", url: "https://github.com/ShreyasK2005",},],},

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
                    image: "/images/teampics_v2026/roa.jpg",
                    name: "Roa Elsaigh",
                    position: "Outreach",
                    socialLinks: [
                        {
                            type: "linkenin",
                            url: "https://www.linkedin.com/in/roa-e-431b29224/"
                        }
                    ]
                },
                {
                    image: "/images/teampics_v2026/jonathan.jpg",
                    name: "Jonathan Jackson",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/jonathan-jackson-20a29b28b/",
                        },
                    ],
                },

                {
                    image: "/images/teampics_v2026/sharon.jpg",
                    name: "Sharon Alex",
                    position: "",
                    socialLinks: [
                        {
                            type: "linkedin",
                            url: "https://www.linkedin.com/in/sharon-alex/",
                        },
                    ],
                },
            ],description: "Outreach",
        },
    ];
  return (
    <>
      <div
        id="team"
        className="container mx-auto bg-white dark:bg-transparent py-16 text-center md:py-20 lg:py-24"
      >
        <h2 className="mb-8 text-5xl font-bold leading-tight text-black dark:text-white">
          Meet the Team
        </h2>
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