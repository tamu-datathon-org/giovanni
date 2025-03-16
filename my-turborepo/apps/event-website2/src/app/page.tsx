import React from "react";
// import { GetServerSideProps } from 'next';
import TableOfContents from "@/components/TableOfContents";
import { Heading, Flex, Text, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";

import { baseURL, routes } from "@/app/resources";
import { home, person, newsletter } from "@/app/resources/content";
import FAQComponent from "@/components/FAQ/FAQComponent";
import LandingPage from "@/components/LandingPage";

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
  const faqData = [
    { question: 'What is Next.js?', answer: 'Next.js is a React framework for production.' },
    { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for styling.' },
    { question: 'Is TypeScript required for Next.js?', answer: 'No, but it is highly recommended for type safety.' },
    { question: 'How to create a Next.js project?', answer: 'Use the command `npx create-next-app@latest`.' },
    { question: 'What is server-side rendering?', answer: 'It is a technique for rendering pages on the server, improving performance.' },
    { question: 'Can I use Tailwind CSS with Next.js?', answer: 'Yes, you can easily integrate Tailwind with Next.js.' },
  ];

  const structure = [
    {
      title: "FAQ",
      display: true,
      items: [],
    },
  ];

  const TOC = {
    tableOfContent: {
      display: true,
      subItems: false,
    }
  };

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
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
      {
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={TOC} />
        </Column>
      }
      <Column fillWidth paddingY="l" gap="m">
        <Column fillWidth>
          <RevealFx translateY="1" fillWidth horizontal="center" paddingBottom="m">
            <LandingPage />
          </RevealFx>
        </Column>
      </Column>
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
