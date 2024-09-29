import { getImageProps } from "next/image";

// Next doesn't support an easy way of serving separate images
// for mobile and desktop, so we need this
// https://nextjs.org/docs/pages/api-reference/components/image#art-direction
function BackgroundImage() {
  const common_attributes = {
    alt: "Preregistration background",
    fill: true,
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common_attributes,
    src: "/assets/wallpaper.png",
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common_attributes,
    src: "/assets/wallpaper-mobile.png",
  });
  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} />
    </picture>
  );
}

export default function PreregistrationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-h-screen-sm overflow-hidden">{children}</div>
    </>
  );
}
