import type React from "react";
import Image from "next/image";

export interface eventprop{
    url: string;
    logo: string;
    label: string;
    year: number;
    lite?: boolean;
}

const eventButton: React.FC<eventprop> = ({
    url,
    logo,
    label,
    year,
    lite,
}) => {
    return(
        <div className="pb-2">
            <div className="container rounded-xl bg-grey-500 items-center">
                <Image
                  src={logo || "/paceholder.svg"}
                  alt= {label}
                />
                <h3 className="text-base font-semibold text-black dark:text-white">
                    {year}
                </h3>
            </div>

        </div>
    );
};





// const eventsOrdered = [
//     {
//         url:"https://2019.tamudatathon.com/",
//         logo: "images/past-logo/TD2019"
//     },
//     {
//         url:"https://2020.tamudatathon.com/",
//         year:"2020",
//         logo: "images/past-logo/TD2020"
//     },
//     {
//         url:"https://2021.tamudatathon.com/",
//         year:"2021",
//         logo: "images/past-logo/TD2021"
//     },
//     {
//         url:"https://2022.tamudatathon.com/",
//         year:"2022",
//         logo: "images/past-logo/TD2022"
//     },
//     // { <--- doesnt work ----
//     //     url:"https://2023.tamudatathon.com/",
//     //     year:"2023",
//     //     logo: "images/past-logo/TD2023"
//     // },
//     {
//         url:"https://2024.tamudatathon.com/",
//         year:"2024",
//         logo: "images/past-logo/TD2024"
//     },
//     {
//         url:"https://2025-lite.tamudatathon.com/",
//         year:"2025",
//         logo: "images/past-logo/TDL2025"
//     },
//     {
//         url:"https://2025.tamudatathon.com/",
//         year:"2025",
//         logo: "images/past-logo/TD2025"
//     },


// ];



