interface titleSchema {
  children: React.ReactNode;
  className?: string;
}
export default function Title({ children, className }: titleSchema) {
  return (
    <div className={`w-full flex justify-center items-center text-5xl font-extrabold ${className}`}>
      {children}
    </div>
  );
}