export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        // TODO: Make side bar for navigation later
        <div className="flex-1">
            <div className='container mx-auto'>
                {children}
            </div>
        </div>
    )
}