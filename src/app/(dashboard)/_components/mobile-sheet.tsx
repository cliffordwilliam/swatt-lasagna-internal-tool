"use client";

import { Home, PanelLeft, ShoppingCart } from "lucide-react";
import { MobileSheetItem } from "./mobile-sheet-item";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileSheet() {
  // List of navigation items
  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetHeader className="p-4 text-left">
          <SheetTitle>Swatt Lasagna</SheetTitle>
          <SheetDescription>Pilih halaman di sini.</SheetDescription>
        </SheetHeader>
        <nav className="grid gap-6 text-lg font-medium">
          {/* Loop through the navItems array */}
          {navItems.map(({ href, icon, label }) => (
            <MobileSheetItem
              key={label}
              href={href}
              icon={icon}
              label={label}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
