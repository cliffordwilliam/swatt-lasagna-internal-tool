import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

export function MobileSheetItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={clsx("flex items-center gap-4 px-2.5", {
          "text-foreground": isActive,
          "text-muted-foreground hover:text-foreground": !isActive,
        })}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Link>
    </SheetClose>
  );
}
