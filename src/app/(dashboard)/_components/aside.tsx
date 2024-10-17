"use client";

import { Home, ShoppingCart } from "lucide-react";
import { AsideItem } from "./aside-item";

export function Aside() {
  // List of navigation items
  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
  ];

  return (
    <aside className="hidden h-full w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {/* Loop through the navItems array */}
        {navItems.map(({ href, icon, label }) => (
          <AsideItem key={label} href={href} icon={icon} label={label} />
        ))}
      </nav>
    </aside>
  );
}
