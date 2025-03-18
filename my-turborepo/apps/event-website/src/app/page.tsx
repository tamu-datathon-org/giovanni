import React from "react";
import { Heading, Flex, Text, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import FAQComponent from "@/components/FAQ/FAQComponent";
import EventInfo from "@/components/eventinfo/EventInfoComponent";
import LandingPage from "@/components/LandingPage";
import TableOfContents from "@/components/about/TableOfContents";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  const structure = [
    {
      title: about.home.title,
      display: about.home.display,
      items: [],
    },
    {
      title: about.event.title,
      display: about.event.display,
      items: [],
    },
    {
      title: about.faq.title,
      display: about.faq.display,
      items: [],
    },
  ];

  const faqData = [
    { question: 'What is TAMU Datathon Lite?', answer: "TD Lite is a smaller, more beginner friendly version of our main event. It's a one-day event, but it will have everything Datathon normally has including free food, swag, workshops, and prizes!" },
    { question: 'Where is the event?', answer: 'The event takes place at the ILCB. Once you enter the building, organizers will be there to guide you to the main room! If you have any questions regarding transportation or parking, please reach out to us on Discord.' },
    { question: 'Why should I come?', answer: 'It is completely free! Learn Data Science with interactive challenges and prizes. If you struggle to start to learn, TDLite offers a begineer-focused space to compete in. We have mentors to help and free swag/food.' },
    { question: 'How do I sign up?', answer: 'Head over to https://tamudatathon.org/apply to get started! Admission decisions will be released shortly after registration closes.' },
    { question: 'How much do I need to know?', answer: 'If you are new to data science, TD Lite is the perfect time and place to learn. We will provide introductory workshops and mentors to guide you throughout the competition. We are committed to helping you build something you can be proud of!' },
    { question: 'Who can attend?', answer: 'TD Lite is open to beginner students currently enrolled at Texas A&M who are at least 18 years old. We welcome students from all majors!' },
    { question: 'What should I bring?', answer: 'All you need is a laptop and a charger to get started at TD Lite! You may bring other items such as a pillow or a debugging duck if you wish to. Also make sure to check the weather in case you might need an umbrella :D.' },
    { question: 'I have another question', answer: 'Send us an email at connect@tamudatathon.com or reach out to us on Discord!' },
  ];
  return (
    <Column fillWidth gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      {about.tableOfContent.display && (
        <Column
          style={{ top: "50%", transform: "translateY(-50%)" }}
          className="left-0 gap-32 pl-24 fixed z-10"
          hide="m"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      <Column fillWidth paddingY="l" gap="m">
        <Column fillWidth>
          <RevealFx translateY="1" fillWidth horizontal="center" paddingBottom="m">
            <LandingPage />
          </RevealFx>
        </Column>
      </Column>
      <EventInfo />
      <FAQComponent faqData={faqData} />
      {/* <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}
      <Projects range={[2]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />} */}
    </Column>
  );
}
