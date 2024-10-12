export default function OrganizerLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="max-h-screen-sm overflow-hidden bg-white">{children}</div>
        </>
    );
}
