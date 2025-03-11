"use client";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
export const runtime = "edge";

export default function HomePage() {
  redirect("/apply");
  // You can await this here if you don't want to show Suspense fallback below
  // return (
  //   <>
  //     <Link
  //       id="mlh-trust-badge"
  //       className="mlh-trust-badge"
  //       href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white"
  //       target="_blank"
  //     >
  //       <img
  //         src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
  //         alt="Major League Hacking 2025 Hackathon Season"
  //         className="w-full"
  //       />
  //     </Link>
  //     <div className="h-screen w-screen overflow-hidden">
  //       <div className="flex h-screen flex-col items-center justify-center">
  //         <div className="flex h-full w-full items-center justify-center lg:relative ">
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
