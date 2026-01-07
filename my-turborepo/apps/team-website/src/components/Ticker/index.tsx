"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

//TODO: will need to change out the all black logos with white or something if sticking with the dark theme

export default function SponsorTicker() {
    const wrapperRef = useRef(null);
    const overflowRef = useRef(null);
    const [overflow, setOverflow] = useState(false);

    // Replace these with actual logo paths
    const logos = [
        "/images/sponsor-logo/amd.png",
        "/images/sponsor-logo/amex.png",
        "/images/sponsor-logo/bloomberg.png",
        "/images/sponsor-logo/bp.png",
        "/images/sponsor-logo/cbre.png",
        "/images/sponsor-logo/celonis.png",
        "/images/sponsor-logo/dell.png",
        "/images/sponsor-logo/facebook.png",
        "/images/sponsor-logo/gm.png",
        "/images/sponsor-logo/goldman.png",
        "/images/sponsor-logo/heb.png",
        "/images/sponsor-logo/hewlett.png",
        "/images/sponsor-logo/johnson.png",
        "/images/sponsor-logo/mathworks.png",
        "/images/sponsor-logo/msy.png",
        "/images/sponsor-logo/p66.png",
        "/images/sponsor-logo/pure.png",
        "/images/sponsor-logo/qualcomm.png",
        "/images/sponsor-logo/shell.png",
        "/images/sponsor-logo/sparx.png",
        "/images/sponsor-logo/splunk.png",
        "/images/sponsor-logo/tableau.png",
        "/images/sponsor-logo/walmart.png"
    ];


    useGSAP(() => {
        if (!wrapperRef.current) return;

        const logoElements = wrapperRef.current.querySelectorAll(".ticker-logo");
        const logoWidth = 200;
        const totalWidth = logoElements.length * logoWidth;

        gsap.set(logoElements, {
            x: (i) => i * logoWidth,
            top: "50%",
            yPercent: -50
        });

        gsap.to(logoElements, {
            duration: 80, // speed of animation
            ease: "none",
            x: `-=${totalWidth}`,
            repeat: -1,
            repeatDelay: 0
        });
    }, []);

    // toggle overflow w/ React state
    const handleOverflowChange = () => {
        setOverflow(!overflow);
    };

    return (
    <div className="w-screen">
        <label className="flex items-center gap-2 mb-4 px-4">

        </label>

        <div
            className="wrapper relative w-screen h-40 bg-grey-400"
            style={{ overflow: overflow ? "visible" : "hidden" }}
            ref={wrapperRef}
        >
        {[...Array(40)].map((_, i) => (
            <div
            key={i}
            className="ticker-logo absolute w-32 h-16"
            >
            <Image
                src={logos[i % logos.length]}
                alt={`Logo ${i + 1}`}
                fill
                className="object-contain"
            />
            </div>
        ))}
        </div>
    </div>
    );
    }