export default function ApplicationLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="max-h-screen-sm overflow-hidden">{children}</div>
        </>
    );
}