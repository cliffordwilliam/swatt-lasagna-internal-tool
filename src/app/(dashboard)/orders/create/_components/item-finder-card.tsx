"use client";

import { ComboBoxResponsive } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Item } from "@prisma/client";

export function ItemFinderCard({
  items,
  selectedItemId,
  setSelectedItemId,
  selectedItemAmount,
  setSelectedItemAmount,
  onAddToCartPress,
}: {
  items: Item[];
  selectedItemId: string;
  setSelectedItemId: (selectedItemId: string) => void;
  selectedItemAmount: number;
  setSelectedItemAmount: (selectedItemId: number) => void;
  onAddToCartPress: () => void;
}) {
  // Turn items into combobox items format
  const comboboxItems = items.map((item) => ({
    value: item.id,
    label: item.nama,
  }));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pilih Item dan Jumlahnya</CardTitle>
          <CardDescription>Lalu masukan ke keranjang.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <ComboBoxResponsive
            placeholderItemName={"Item"}
            comboboxItems={comboboxItems}
            selectedValue={selectedItemId}
            setSelectedValue={setSelectedItemId}
          />
          <Input
            type="number"
            placeholder="0"
            // Render state if more than 0, if not render ""
            value={selectedItemAmount > 0 ? selectedItemAmount : ""}
            onChange={(e) => {
              // Parse int whatever the user typed
              const toNumber = parseInt(e.target.value);
              setSelectedItemAmount(
                // Nan? Set state to 0, state min is 0
                isNaN(toNumber) ? 0 : Math.max(0, toNumber),
              );
            }}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button
            disabled={selectedItemId === "" || selectedItemAmount === 0}
            onClick={() => onAddToCartPress()}
          >
            Masukan ke Keranjang
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
