"use client";

import { ComboBoxResponsive } from "@/components/combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@prisma/client";
import { useState } from "react";

export function Form({ items }: { items: Item[] }) {
  const [selectedItemId, setSelectedItemId] = useState("");

  // Turn items into combobox items format
  const comboboxItems = items.map((item) => ({
    value: item.id,
    label: item.nama,
  }));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Buat order</CardTitle>
          <CardDescription>Pilih Item nya dulu.</CardDescription>
        </CardHeader>
        <CardContent>
          <ComboBoxResponsive
            placeholderItemName={"Item"}
            comboboxItems={comboboxItems}
            selectedValue={selectedItemId}
            setSelectedValue={setSelectedItemId}
          />
        </CardContent>
      </Card>
    </>
  );
}
