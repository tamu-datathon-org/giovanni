"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import WindowContainer from "./WindowContainer";

import "../_components/customCss.scss";

import { Separator } from "@radix-ui/react-select";

import { ScrollArea } from "~/components/ui/scroll-area";

interface PopupProps {
  item: FAQItem;
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ item, isOpen, onClose }) => {
  return (
    <div className="font-XPfont fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative m-4 max-h-[80vh] w-full max-w-2xl overflow-hidden">
        <WindowContainer isOpen={isOpen} openFunc={onClose}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "20px",
              position: "relative",
            }}
          >
            <div className="h-full w-full overflow-y-auto">
              <div className="mb-4 text-2xl font-bold">
                <ReactMarkdown>{item.question}</ReactMarkdown>
              </div>
              <div className="text-base">
                <ReactMarkdown>{item.answer}</ReactMarkdown>
              </div>
            </div>
          </div>
        </WindowContainer>
      </div>
    </div>
  );
};

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is TAMU Datathon?",
    answer:
      "A datathon is where you build your analytical skill set and create data-driven solutions in 24 hours. We provide data science lectures, workshops, challenges, prizes, fun activities, swag, food, and more!",
  },
  {
    id: 2,
    question: "When is the event?",
    answer:
      "November 9-10th, 2024. A complete schedule will be available at tamudatathon.com/schedule at a later date.",
  },
  {
    id: 3,
    question: "Where is the event & how will I get there?",
    answer:
      "The event will take place at the MSC 2300 Bethancourt Ballroom! Parking will be free at a later disclosed location",
  },
  {
    id: 4,
    question: "How much do I need to know?",
    answer:
      "If you are new to data science, TAMU Datathon is the perfect time and place to learn. We will provide introductory coursework and mentors to guide you along your journey to complete a data science project. For our more advanced students, our challenges will pique your interest and allow you to put your skills to the test. We are committed to helping you build something you can be proud of!",
  },
  {
    id: 5,
    question: "How do I sign up?",
    answer:
      "Registration is currently open! Admission decisions will be released soon after the registration ends.",
  },
  {
    id: 6,
    question: "Who can attend?",
    answer:
      "TAMU Datathon is open to any enrolled undergraduate or graduate student at least 18 years of age and anyone who has graduated within one year of the event. We welcome students from all across the world and from all majors!",
  },
  {
    id: 7,
    question: "How much does it cost?",
    answer:
      "It is FREE! All you need is a laptop! We will even throw in tons of swag, food, Wi-Fi, workspaces, and caffeine during your stay. ALSO PARKING IS FREE!",
  },
  {
    id: 8,
    question: "What should I bring?",
    answer:
      "Since the event will last overnight, it is a good idea to bring a pillow and a sleeping bag if you are planning on staying at the venue. Please remember to bring your laptop and charger.",
  },
  {
    id: 9,
    question: "How do teams work?",
    answer:
      "Teams can have up to 4 people. We encourage working with a team, it's more fun! You do not need to form a team before attending the event. There will be plenty of time to find a team after opening ceremonies.",
  },
  {
    id: 10,
    question: "I have another question?",
    answer: "Send us an email at connect@tamudatathon.com.",
  },
];

const FAQComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FAQItem | null>(null);
  // const [isMainWindowOpen, setIsMainWindowOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const handleMainWindowOpenClose = (open: boolean) => {
  //   setIsMainWindowOpen(open);
  // };

  const handlePopupOpenClose = (open: boolean) => {
    setIsPopupOpen(open);
    if (!open) {
      setSelectedItem(null);
    }
  };

  return (
    <div>
      {/* <WindowContainer
        isOpen={isMainWindowOpen}
        openFunc={handleMainWindowOpenClose}
      > */}
      <div className="font-XPfont p-4">
        <h2 className="mb-4 text-4xl font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="mb-4 font-semibold">
          click on the buttons for more info!
        </p>
        <ScrollArea
          className="max-h-[400px] overflow-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
            touchAction: "pan-y",
          }}
        >
          <div className="grid grid-cols-2 gap-4 p-1">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="compStyling clickable-box align-center h-full w-full items-center justify-center rounded-lg border border-black bg-[#f5f5f5] p-4  text-center text-black hover:bg-[#e4e3e4] active:bg-[#d3d2d3]"
                onClick={() => {
                  setSelectedItem(item);
                  setIsPopupOpen(true);
                }}
                onTouchEnd={() => {
                  setSelectedItem(item);
                  setIsPopupOpen(true);
                }}
              >
                <h3 className="text:sm font-semibold lg:text-lg">
                  {item.question}
                </h3>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      {/* </WindowContainer> */}
      {selectedItem && (
        <Popup
          item={selectedItem}
          isOpen={isPopupOpen}
          onClose={() => handlePopupOpenClose(false)}
        />
      )}
    </div>
  );
};

export default FAQComponent;
