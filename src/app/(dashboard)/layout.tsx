import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-between">
                    <UserButton />
                    <ModeToggle />
                </div>
            </header>
            {/* // TODO: Make side bar for global navigation later when I have more than 1 page */}
            <div className="flex-1">
                <div className='container mx-auto h-full'>
                    {children}
                </div>
            </div>
            <footer className="border-t">
                <span className="container mx-auto flex h-16 items-center">
                © {new Date().getFullYear()} Swatt Lasagna Internal Tool. All rights reserved.
                </span>
            </footer>
        </>
    )
}