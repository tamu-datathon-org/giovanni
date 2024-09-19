import Image from "next/image";

export default function PreregistrationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Image
        src="/assets/wallpaper.webp"
        alt="Preregistration background"
        fill={true}
        objectFit="cover"
        layout="fill"
      />
      <div className="max-h-screen-sm overflow-hidden">{children}</div>
    </>
  );
}
