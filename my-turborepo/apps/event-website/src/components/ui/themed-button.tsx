import { Button } from "./button"

export function ThemedButton({ children, className }: { children?: React.ReactNode, className?: string }) {
  return (
    <Button
      className={`
        bg-gray-300 text-black font-bold border-4 border-black hover:bg-[#500000] 
        hover:text-white transition-colors duration-200 rounded-sm rounded-lg
        ${className}
      `}
    >
      {children}
    </Button>
  );
};
