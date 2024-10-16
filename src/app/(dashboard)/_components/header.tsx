import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between p-6">
        <UserButton />
        <ModeToggle />
      </div>
    </header>
  );
}
