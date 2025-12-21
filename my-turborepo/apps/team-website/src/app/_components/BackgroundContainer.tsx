
export default function BackgroundContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mt-24 md:w-1/2 md:h-3/4 ${className}`}>
      <div className="absolute inset-0 bg-black rounded-lg">
        {/* <div className="rounded-lg absolute inset-0 -z-10 bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [&>div]:absolute [&>div]:left-0 [&>div]:right-0 [&>div]:top-0 [&>div]:-z-10 [&>div]:m-auto [&>div]:h-[310px] [&>div]:w-[310px] [&>div]:rounded-full [&>div]:bg-fuchsia-400 [&>div]:opacity-20 [&>div]:blur-[100px]">
          <div></div>
        </div> */}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}