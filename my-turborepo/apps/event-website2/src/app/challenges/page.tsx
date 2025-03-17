import { Column, Flex, Heading } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { challenges, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = challenges.title;
  const description = challenges.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/challenges`,
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

export default function ChallengesPage() {
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: challenges.title,
            description: challenges.description,
            url: `https://${baseURL}/challenges`,
            image: `${baseURL}/og?title=${encodeURIComponent(challenges.title)}`,
            author: {
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
      <Heading marginBottom="l" variant="display-strong-s">
        {challenges.title}
      </Heading>
    </Column>
  );
}
