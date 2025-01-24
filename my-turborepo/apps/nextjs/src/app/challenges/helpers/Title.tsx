interface titleSchema {
  children: React.ReactNode;
  className?: string;
}
export default function Title({ children, className }: titleSchema) {
  return (
    <div
      className={`flex w-full items-center justify-center text-5xl font-extrabold ${className}`}
    >
      {children}
    </div>
  );
}
