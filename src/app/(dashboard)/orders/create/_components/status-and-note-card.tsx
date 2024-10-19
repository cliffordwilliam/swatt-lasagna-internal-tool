"use client";

import { ComboBoxResponsive } from "@/components/combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function StatusAndNoteCard({
  comboboxItems,
  selectedItemId,
  setSelectedItemId,
  noteValue,
  setNoteValue,
}: {
  comboboxItems: {
    value: string;
    label: string;
  }[];
  selectedItemId: string;
  setSelectedItemId: (selectedItemId: string) => void;
  noteValue: string;
  setNoteValue: (noteValue: string) => void;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Status dan Note</CardTitle>
          <CardDescription>Set Order Status dan Note di sini.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <ComboBoxResponsive
            placeholderItemName={"Order Status"}
            comboboxItems={comboboxItems}
            selectedValue={selectedItemId}
            setSelectedValue={setSelectedItemId}
            groupItems={false}
          />
          <Textarea
            placeholder="Tulis note buat order di sini."
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
        </CardContent>
      </Card>
    </>
  );
}
