interface headingSchema {
    children: React.ReactNode;
    className?: string;
}
export default function Heading({ children, className }: headingSchema) {
    return (
        <div className={`w-full flex justify-start items-center text-1xl ${className}`}>
            {children}
        </div>
    );
}