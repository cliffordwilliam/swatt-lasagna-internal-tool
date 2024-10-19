"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface ComboboxItem {
  value: string;
  label: string;
}

export function ComboBoxResponsive({
  placeholderItemName,
  comboboxItems,
  selectedValue,
  setSelectedValue,
  groupItems = true,
}: {
  placeholderItemName: string;
  comboboxItems: ComboboxItem[];
  selectedValue: string;
  setSelectedValue: (selectedValue: string) => void;
  groupItems?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Function to group items by their first word
  const groupItemsByType = (comboboxItems: ComboboxItem[]) => {
    return comboboxItems.reduce<{
      [key: string]: ComboboxItem[];
    }>((accumulator, item) => {
      const firstWord = item.label.split(" ")[0];
      if (!accumulator[firstWord]) {
        accumulator[firstWord] = [];
      }
      accumulator[firstWord].push(item);
      return accumulator;
    }, {});
  };

  // Grouped items if grouping is enabled
  const groupedItems = groupItems ? groupItemsByType(comboboxItems) : null;

  const renderItems = () => {
    if (groupItems) {
      // If grouping is enabled, map through grouped items
      return Object.keys(groupedItems!).map((group) => (
        <CommandGroup heading={group} key={group}>
          {groupedItems![group].map((item) => (
            <CommandItem
              key={item.value}
              value={item.label}
              onSelect={(currentLabel: string) => {
                const currentValue = comboboxItems.find(
                  (item) => item.label === currentLabel,
                )!.value; // Ensure it exists
                setSelectedValue(
                  currentValue === selectedValue ? "" : currentValue,
                );
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedValue === item.value ? "opacity-100" : "opacity-0",
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      ));
    } else {
      // If not grouping, map through all items normally
      return comboboxItems.map((item) => (
        <CommandItem
          key={item.value}
          value={item.label}
          onSelect={(currentLabel: string) => {
            const currentValue = comboboxItems.find(
              (item) => item.label === currentLabel,
            )!.value; // Ensure it exists
            setSelectedValue(
              currentValue === selectedValue ? "" : currentValue,
            );
            setOpen(false);
          }}
        >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedValue === item.value ? "opacity-100" : "opacity-0",
            )}
          />
          {item.label}
        </CommandItem>
      ));
    }
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selectedValue
                ? comboboxItems.find((item) => item.value === selectedValue)
                    ?.label
                : `Pilih ${placeholderItemName}...`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="PopoverContent w-full p-0">
          <Command>
            <CommandInput placeholder={`Cari ${placeholderItemName}...`} />
            <CommandList>
              <CommandEmpty>{placeholderItemName} tidak ketemu.</CommandEmpty>
              {renderItems()}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selectedValue
              ? comboboxItems.find((item) => item.value === selectedValue)
                  ?.label
              : `Pilih ${placeholderItemName}...`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Laci Item</SheetTitle>
          <SheetDescription>Semua item di dalam laci ini</SheetDescription>
        </SheetHeader>
        <Command>
          <CommandInput placeholder={`Cari ${placeholderItemName}...`} />
          <CommandList>
            <CommandEmpty>{placeholderItemName} tidak ketemu.</CommandEmpty>
            {renderItems()}
          </CommandList>
        </Command>
      </DrawerContent>
    </Drawer>
  );
}
