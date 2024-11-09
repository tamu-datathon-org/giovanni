interface headingSchema {
    children: React.ReactNode;
    className?: string;
}
export default function Heading({ children, className }: headingSchema) {
    return (
        <h1 className={`w-full flex justify-start items-center text-3xl font-bold ${className}`}>
            {children}
        </h1>
    );
}