interface headingSchema {
  children: React.ReactNode;
  className?: string;
}
export default function Heading({ children, className }: headingSchema) {
  return (
    <h1
      className={`flex w-full items-center justify-start text-3xl font-bold ${className}`}
    >
      {children}
    </h1>
  );
}
