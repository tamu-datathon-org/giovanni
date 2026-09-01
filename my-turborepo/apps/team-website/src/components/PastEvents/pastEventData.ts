import type { HoverCrossfadeGroup } from "./HoverCrossfade";

import spring2026 from "../../../public/images/past_cards/card_2026_spring_alt.png";
import spring2025 from "../../../public/images/past_cards/card_2025_spring.png";
import fall2025 from "../../../public/images/past_cards/card_2025.png";
import spring2024 from "../../../public/images/past_cards/card_2024_spring.png";
import fall2024 from "../../../public/images/past_cards/card_2024.png";
import fall2023 from "../../../public/images/past_cards/card_2023.png";
import fall2022 from "../../../public/images/past_cards/card_2022.png";
import fall2021 from "../../../public/images/past_cards/card_2021.png";
import fall2020 from "../../../public/images/past_cards/card_2020.png";
import fall2019 from "../../../public/images/past_cards/card_2019.png";



export const PAST_EVENTS: HoverCrossfadeGroup[] = [
    {
        title: "2026",
        items: [
            {
                id: "2026-spring",
                label: "spring_td.ts",
                image: spring2026,
            },
        ],
    },
    {
        title: "2025",
        items: [
            {
                id: "2025-spring",
                label: "spring_td.ts",
                image: spring2025,
                caption: "2025 · Spring",
            },
            {
                id: "2025-fall",
                label: "fall_td.ts",
                image: fall2025,
                caption: "2025 · Fall",
            },
        ],
    },
    {
        title: "2024",
        items: [
            {
                id: "2024-spring",
                label: "spring_td.ts",
                image: spring2024,
                caption: "2024 · Spring",
            },
            {
                id: "2024-fall",
                label: "fall_td.ts",
                image: fall2024,
                caption: "2024 · Fall",
            },
        ],
    },
    {
        title: "2023",
        items: [
            {
                id: "2023-fall",
                label: "fall_td.ts",
                image: fall2023,
                caption: "2023 · Fall",
            },
        ],
    },
    {
        title: "2022",
        items: [
            {
                id: "2022-fall",
                label: "fall_td.ts",
                image: fall2022,
                caption: "2022 · Fall",
            },
        ],
    },
    {
        title: "2021",
        items: [
            {
                id: "2021-fall",
                label: "fall_td.ts",
                image: fall2021,
                caption: "2021 · Fall",
            },
        ],
    },
    {
        title: "2020",
        items: [
            {
                id: "2020-fall",
                label: "fall_td.ts",
                image: fall2020,
                caption: "2020 · Fall",
            },
        ],
    },
    {
        title: "2019",
        items: [
            {
                id: "2019-fall",
                label: "fall_td.ts",
                image: fall2019,
                caption: "2019 · Fall",
            },
        ],
    },
];