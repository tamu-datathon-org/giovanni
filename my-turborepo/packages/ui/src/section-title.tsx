interface SectionTitleProps {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}

export function SectionTitle({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "40px",
}: SectionTitleProps) {
  return (
    <div
      className={`w-full ${center ? "mx-auto text-center" : ""}`}
      style={{ maxWidth: width, marginBottom: mb }}
    >
      <h2 className="mb-4 text-3xl font-bold !leading-tight text-white sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      <p className="text-body-color text-white text-base !leading-relaxed md:text-lg">
        {paragraph}
      </p>
    </div>
  );
}
