"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ChallengeCard from "@/components/challenge-card";

interface Challenge {
  id: number;
  name: string;
  description: string;
  mdPath: string;
}

export default function ChallengePage() {
  const challenges: Challenge[] = [
    {
      id: 1,
      name: "Case Closed",
      description: "The grid is your crime scene. Every move leaves evidence. Every turn could be your last.",
      mdPath: "/challenges/case-closed.md",
    },
    {
      id: 2,
      name: "MCP",
      description: "Build your own Model Context Protocol (MCP) server",
      mdPath: "/challenges/mcp.md",
    },
    {
      id: 3,
      name: "Detective Rev",
      description: "Interrogate simulated suspects, find clues, solve the mystery",
      mdPath: "/challenges/revs.md",
    },
    {
      id: 4,
      name: "Mai Shan Yun Inventory Intelligence",
      description: "Design and build an interactive dashboard using raw restaurant data",
      mdPath: "/challenges/msy.md",
    },
    {
      id: 5,
      name: "Hitachi Challenge",
      description: "Build an AI that analyzes multi-page, multi-modal documents and classifies them by sensitivity level.",
      mdPath: "/challenges/hitachi.md",
    }
  ];

  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [markdown, setMarkdown] = useState<string>("");

  // Load Markdown when a challenge is selected
  useEffect(() => {
    if (selectedChallenge) {
      fetch(selectedChallenge.mdPath)
        .then((res) => res.text())
        .then((text) => setMarkdown(text));
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Challenges</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            name={challenge.name}
            description={challenge.description}
            onClick={() => setSelectedChallenge(challenge)}
          />
        ))}
      </div>

      {/* Markdown Popup */}
      {selectedChallenge && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedChallenge(null)}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full relative overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">{selectedChallenge.name}</h3>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setSelectedChallenge(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Markdown Content */}
            <div className="overflow-y-auto p-6">
              <ReactMarkdown
                className="prose prose-slate max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-0
                  prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
                  prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-gray-700 prose-li:mb-2
                  prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                  prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                  prose-img:rounded-lg prose-img:shadow-md"
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}