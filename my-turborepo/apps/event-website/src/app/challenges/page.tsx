"use client";
import {useState} from "react";
import challengeCard from "@/components/challenge-card";

export default function challengePage(){
    const challenges = [
        {   name: "revs",
            description: "buibiouboabs",
            details: "your mom"

        },
        {   name: "snake",
            description: "buibiouboabs",
            details: "butt"
        },

    ];

    const [selectedChallenge, setSelectedChallenge] = useState<typeof challenges[0] | null>(null);

    return(
        <div className="p-4">
            {/* title make sure to change before deployment i.e to theme (idk ask design) */}
            <h3 className="text-2xl font-semibold mb-6">Challenges</h3>
            {/* grid */}
            <div className="gird grid col-3">

            </div>

        </div>
    );



}
