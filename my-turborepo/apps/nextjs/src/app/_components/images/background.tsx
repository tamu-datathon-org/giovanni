// Next doesn't support an easy way of serving separate images
// for mobile and desktop, so we need this

import { getImageProps } from "next/image";

// https://nextjs.org/docs/pages/api-reference/components/image#art-direction
export default function BackgroundImage({
  desktop_src,
  mobile_src,
  alt,
}: {
  desktop_src: string;
  mobile_src: string;
  alt: string;
}) {
  const common_attributes = {
    alt: alt,
    fill: true,
    sizes: "100vw",
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common_attributes,
    src: desktop_src,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common_attributes,
    src: mobile_src,
  });
  return (
    <picture>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img {...rest} />
    </picture>
  );
}
