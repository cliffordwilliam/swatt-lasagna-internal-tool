"use client"
// TODO: Refacor this to be dynamic not only the items in order form
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Item } from '@prisma/client';

// Define the type for individual framework items
interface Framework {
  value: string
  label: string
}

// The component now uses the defined props interface
export function ComboboxDemo(
  { 
    frameworks = [], 
    setSelectedItem,
    selectedItem,
    items,
   }: 
   {
    frameworks?: Framework[] // Optional prop
    setSelectedItem: (selectedItem: Item | null) => void;
    selectedItem: Item | null;
    items: Item[] | undefined;
  }
) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedItem
            ? frameworks.find((framework) => framework.value === selectedItem.nama)?.label
            : "Pilih Item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Cari Item..." />
          <CommandList>
            <CommandEmpty>Item kosong.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if (currentValue === framework.value) {
                      const foundItem = items?.find(item => item.nama === currentValue) || null;
                      setSelectedItem(foundItem)
                    }
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem?.nama === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
