"use client";

import { ComboBoxResponsive } from "@/components/combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ComboboxCard({
  cardTitle,
  cardDescription,
  placeholder,
  comboboxItems,
  selectedItemId,
  setSelectedItemId,
}: {
  cardTitle: string;
  cardDescription: string;
  placeholder: string;
  comboboxItems: {
    value: string;
    label: string;
  }[];
  selectedItemId: string;
  setSelectedItemId: (selectedItemId: string) => void;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <ComboBoxResponsive
            placeholderItemName={placeholder}
            comboboxItems={comboboxItems}
            selectedValue={selectedItemId}
            setSelectedValue={setSelectedItemId}
          />
        </CardContent>
      </Card>
    </>
  );
}
