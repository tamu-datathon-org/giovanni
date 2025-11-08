"use client";

import { useEffect, useState } from "react";
import ChallengeCard from "@/components/challenge-card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Challenge {
  id: number;
  name: string;
  prize: string;
  description: string;
  mdPath: string;
}

export default function ChallengePage() {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Case Closed",
      prize: "First: Meta Quest, Second: Ninja Creamy, Third: Vizo Soundbar",
      description:
        "The grid is your crime scene. Every move leaves evidence. Every turn could be your last.",
      mdPath: "/challenges/case-closed.md",
    },
    {
      id: 2,
      name: "Build MCP Challenge",
      prize: "First: Scooter, Second: Monitor, Third: Echo Dot",
      description: "Build your own Model Context Protocol (MCP) server",
      mdPath: "/challenges/mcp.md",
    },
    {
      id: 3,
      name: "Detective Rev",
      prize:
        "First: Power Bank + $25 @ Amazon, Second: Fire Stick + $10 @ Amazon, Third: Apple Air tag",
      description:
        "Interrogate simulated suspects, find clues, solve the mystery",
      mdPath: "/challenges/revs.md",
    },
    {
      id: 4,
      name: "Mai Shan Yun Inventory Intelligence",
      prize:
        "First: $75 @ MSY + $25 @ Amazon, Second: $25 @ MSY + $25 @ Amazon, Third: $10 @ MSY + $25 @ Amazon",
      description:
        "Design and build an interactive dashboard using raw restaurant data",
      mdPath: "/challenges/msy.md",
    },
    {
      id: 5,
      name: "AI-Powered Regulatory Document Classifier - Hitachi",
      prize: "First: JBL Speaker, Second: Amazon Echo Dot, Third: Echo Dot",
      description:
        "Build an AI that analyzes multi-page, multi-modal documents and classifies them by sensitivity level.",
      mdPath: "/challenges/hitachi.md",
    },
    {
      id: 6,
      name: "Detective Databricks Mini Challenge",
      prize: "-",
      description:
        "Showcase your data detective skills by demonstrating how you used Databricks to solve data mysteries in other challenges.",
      mdPath: "/challenges/databricks.md",
    },
  ];

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null,
  );
  const [markdown, setMarkdown] = useState<string>("");

  // Load Markdown when a challenge is selected
  useEffect(() => {
    if (selectedChallenge) {
      void fetch(selectedChallenge.mdPath)
        .then((res) => res.text())
        .then((text) => setMarkdown(text))
        .catch((error) => {
          console.error("Error loading markdown:", error);
          setMarkdown("Error loading challenge details.");
        });
    }
  }, [selectedChallenge]);

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedChallenge(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-[#322C29] p-4">
      <h2 className="mb-6 text-center font-serif text-2xl font-semibold text-white">
        Challenges
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            name={challenge.name}
            description={challenge.description}
            prize={challenge.prize}
            onClick={() => setSelectedChallenge(challenge)}
          />
        ))}
      </div>

      {/* Markdown Popup */}
      {selectedChallenge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedChallenge(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-amber-200 bg-gradient-to-r from-[#FEF7EE] to-amber-50 px-8 py-6">
              <h3 className="font-serif text-3xl font-bold text-gray-900">
                {selectedChallenge.name}
              </h3>
              <button
                className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={() => setSelectedChallenge(null)}
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Markdown Content */}
            <div className="overflow-y-auto bg-gradient-to-b from-[#FEF7EE] to-white px-8 py-10 md:px-12 md:py-14">
              <article
                className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:font-serif
                prose-headings:text-gray-900 prose-headings:scroll-mt-4 prose-h1:text-4xl
                prose-h1:mb-4
                prose-h1:mt-0 prose-h1:leading-tight prose-h1:tracking-tight prose-h2:text-3xl prose-h2:mb-3
                prose-h2:mt-8 prose-h2:leading-tight prose-h2:tracking-tight prose-h3:text-2xl prose-h3:mb-2
                prose-h3:mt-6 prose-h3:leading-snug prose-h4:text-xl prose-h4:mb-2
                prose-h4:mt-4 prose-p:text-gray-800 prose-p:leading-7
                prose-p:my-4 prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:text-gray-800 prose-ul:my-4
                prose-ul:pl-6
                prose-li:my-2 prose-li:text-gray-800
                prose-li:leading-7 prose-ol:my-4 prose-ol:pl-6
                prose-code:text-amber-900 prose-code:bg-amber-100
                prose-code:px-1.5 prose-code:py-0.5
                prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-['']
                prose-code:after:content-[''] prose-pre:bg-gray-900 prose-pre:text-gray-100
                prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-4
                prose-pre:overflow-x-auto prose-pre:shadow-lg prose-pre:border
                prose-pre:border-gray-800 prose-pre:code:bg-transparent prose-pre:code:text-gray-100
                prose-pre:code:p-0 prose-pre:code:before:content-[''] prose-pre:code:after:content-['']
                prose-blockquote:border-l-4 prose-blockquote:border-amber-400
                prose-blockquote:pl-4 prose-blockquote:pr-4
                prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-amber-50/50 prose-blockquote:py-2
                prose-blockquote:my-4 prose-a:text-amber-700 prose-a:font-semibold
                prose-a:no-underline prose-a:underline-offset-2 hover:prose-a:text-amber-800
                hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md
                prose-img:my-6 prose-hr:my-8 prose-hr:border-gray-300
                prose-hr:border-t-2 prose-table:w-full prose-table:my-6
                prose-table:border-collapse prose-th:bg-amber-100 prose-th:text-gray-900
                prose-th:font-bold prose-th:p-3 prose-th:border
                prose-th:border-amber-200 prose-th:text-left prose-td:p-3 prose-td:border
                prose-td:border-amber-100 prose-td:text-gray-800 prose-thead:border-b-2 prose-thead:border-amber-200
                mx-auto max-w-none"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
