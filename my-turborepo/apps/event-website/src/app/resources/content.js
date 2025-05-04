import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "TAMU",
  lastName: "Datathon",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Design Engineer",
  avatar: "/images/avatar.jpg",
  location: "America/Chicago", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tamu-datathon-org",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/tamudatathon/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/tamudatathon/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:connect@tamudatathon.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}`,
  description: `TAMU Datathon Lite 2025`,
  headline: <>Design engineer and builder</>,
  subline: (
    <>
      I'm Selene, a design engineer at <InlineCode>FLY</InlineCode>, where I
      craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  home: {
    display: true,
    title: "Home",
  },
  event: {
    display: true, // set to false to hide this section
    title: "Event Info",
  },
  workshops: {
    display: true, // set to false to hide this section
    title: "Workshops",
  },
  faq: {
    display: true, // set to false to hide this section
    title: "FAQ",
  },
  prizes: {
    display: true, // set to false to hide this section
    title: "Prizes",
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const schedule = {
  label: "Schedule",
  title: "Day of Schedule",
  // description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const challenges = {
  label: "Challenges",
  title: "Challenges",
  // description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const helpqueue = {
  label: "Help Queue",
  title: "Help Queue",
  // description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

export {
  person,
  social,
  home,
  about,
  blog,
  work,
  schedule,
  challenges,
  helpqueue
};
