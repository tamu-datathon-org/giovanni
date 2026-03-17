import { Button } from "./button"

export function ThemedButton({ children, className, disabled }: { children?: React.ReactNode, className?: string, disabled?: boolean }) {
  return (
    <Button
      className={`
        bg-gray-300 text-black font-bold border-4 border-black hover:bg-[#500000] 
        hover:text-white transition-colors duration-200 rounded-sm rounded-lg
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
