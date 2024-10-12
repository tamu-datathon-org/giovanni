export default function OrganizerLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="max-h-screen-sm h-screen overflow-hidden font-mono">
                {children}
            </div>
        </>
    );
}
