export default function PreregistrationLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="overflow-hidden max-h-screen-sm">{children}</div>
        </>
    )
}