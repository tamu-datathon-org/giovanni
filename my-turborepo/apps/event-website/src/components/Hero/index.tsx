"use client"
import Image from "next/image";

export default function Hero(){
    return(
        <section id="hero" className="min-h-screen flex items-center bg-[url(/images/plaid_bg.png)]">
            <div className="box-boarder"></div>
        </section>
    );
}