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
import { useToast } from "@/hooks/use-toast";
import { Item } from "@prisma/client";
import clsx from "clsx";
import { ChevronLeft, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DummyCard } from "./dummy-card";

type OrderItem = {
  id: string;
  itemId: string;
  quantity: number;
};

export function Form({ items }: { items: Item[] }) {
  // Turn items into combobox items format
  const comboboxItems = items.map((item) => ({
    value: item.id,
    label: item.nama,
  }));

  // First item value for init the combobox
  const firstComboboxItemValue = comboboxItems[0].value;

  const { toast } = useToast();
  const router = useRouter();

  const [isValid, setIsValid] = useState(true);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: "1", itemId: firstComboboxItemValue, quantity: 1 },
  ]);

  // On field update check validity
  useEffect(() => {
    const hasFaultyItemId = orderItems.some((item) => !item.itemId);
    const hasFaultyQuantity = orderItems.some((item) => !item.quantity);
    setIsValid(!(hasFaultyItemId || hasFaultyQuantity));
  }, [orderItems]);

  const addItem = () => {
    setOrderItems([
      ...orderItems,
      {
        id: Date.now().toString(),
        itemId: firstComboboxItemValue,
        quantity: 1,
      },
    ]);
  };

  const updateItem = (
    id: string,
    field: "itemId" | "quantity",
    value: string | number,
  ) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const handleSubmit = () => {
    // Show the toast with the current state
    toast({
      title: "Ini nanti di simpen ya:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(orderItems, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  const handleCancel = () => {
    // Reset to default
    setOrderItems([{ id: "1", itemId: "", quantity: 1 }]);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Buat Order
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          {/* Pick Item Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pilih Item</CardTitle>
              <CardDescription>
                Pilih Item dan quantitasnya buat order ini, item bisa di hapus
                pake tombol merah di pojok kanan. Tambah item pake tombol di
                paling bawah.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-2">
              {/* Dynamic items bucket */}
              {orderItems.map((orderItem) => (
                <div
                  key={orderItem.id}
                  className={clsx("flex w-full items-center gap-2", {
                    "rounded-md outline outline-1 outline-red-500":
                      !orderItem.itemId || !orderItem.quantity,
                  })}
                >
                  {/* Pick the item */}
                  <ComboBoxResponsive
                    placeholderItemName={"Item"}
                    comboboxItems={comboboxItems}
                    selectedValue={orderItem.itemId}
                    setSelectedValue={(value) =>
                      updateItem(orderItem.id, "itemId", value)
                    }
                  />
                  {/* Set item quantity */}
                  <Input
                    className="w-[70px]"
                    type="number"
                    min="0"
                    value={orderItem.quantity === 0 ? "" : orderItem.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      updateItem(
                        orderItem.id,
                        "quantity",
                        isNaN(newQuantity) ? 0 : newQuantity,
                      );
                    }}
                  />
                  {/* Remove item button */}
                  <Button
                    disabled={orderItems.length === 1}
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(orderItem.id)}
                    className="aspect-square"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
              {/* Add more into bucket! */}
              <Button
                onClick={addItem}
                size="sm"
                variant="ghost"
                className="gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Tambah Item
              </Button>
            </CardFooter>
          </Card>
          {/* Dummy Card */}
          <DummyCard />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          {/* Dummy Card */}
          <DummyCard />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Reset form */}
        <Button variant="outline" size="sm" onClick={() => handleCancel()}>
          Batal
        </Button>
        {/* Submit form */}
        <Button size="sm" onClick={handleSubmit} disabled={!isValid}>
          Simpan Order
        </Button>
      </div>
    </>
  );
}
