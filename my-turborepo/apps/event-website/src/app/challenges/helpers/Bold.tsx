interface boldSchema {
    children: React.ReactNode;
    className?: string;
}
export default function Bold({ children, className }: boldSchema) {
    return (
        <div className={`font-extrabold ${className}`}>
            {children}
        </div>
    );
}