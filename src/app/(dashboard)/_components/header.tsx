import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { MobileSheet } from "./mobile-sheet";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center p-6">
        <div className="mr-auto">
          <MobileSheet />
        </div>
        <div className="mr-4">
          <ModeToggle />
        </div>
        <UserButton />
      </div>
    </header>
  );
}
