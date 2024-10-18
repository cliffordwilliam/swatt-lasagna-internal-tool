"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Item, Pembayaran, PickupDelivery } from "@prisma/client";
import { useMemo, useState } from "react";
import { CartCard } from "./cart-card";
import { ComboboxCard } from "./combobox-card";
import { DatePickerCard } from "./date-picker-card";
import { DummyCard } from "./dummy-card";
import { ItemFinderCard } from "./item-finder-card";

interface CartItem extends Item {
  quantity: number;
}

export function Form({
  items,
  pickupDeliveries,
  pembayarans,
}: {
  items: Item[];
  pickupDeliveries: PickupDelivery[];
  pembayarans: Pembayaran[];
}) {
  const [orderDate, setOrderDate] = useState<Date | undefined>();
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemAmount, setSelectedItemAmount] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.quantity * item.harga;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 },
    );
  }, [cart]);
  const [selectedPickupDeliveryId, setSelectedPickupDeliveryId] = useState("");
  const [selectedPembayaranId, setSelectedPembayaranId] = useState("");

  const { toast } = useToast();

  // Turn pickupDeliveries into combobox items format
  const pickupDeliveriesComboboxItems = pickupDeliveries.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Turn pickupDeliveries into combobox items format
  const pembayaransComboboxItems = pembayarans.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const onOrderFormSubmit = () => {
    const selectedPickupDelivery = pickupDeliveries.find(
      (item) => item.id === selectedPickupDeliveryId,
    );
    const selectedPembayaran = pembayarans.find(
      (item) => item.id === selectedPembayaranId,
    );

    // Just for show for now
    const newItems = cart.map(({ id, createdAt, updatedAt, ...rest }) => ({
      ...rest,
      harga: formatCurrency(rest.harga),
    }));

    const data = {
      tanggalOrder: formatDate(orderDate),
      tanggalKirim: formatDate(deliveryDate),
      totalPembelian: totalItems,
      grandTotal: formatCurrency(totalPrice),
      items: newItems,
      pickupDelivery: selectedPickupDelivery?.name,
      metodePembayaran: selectedPembayaran?.name,
    };
    toast({
      title: "Ini pura pura di kumpulin ya:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  // ItemFinderCard tells me to update CartCard
  const onAddToCartPress = () => {
    // Check if selected item exists, it should be
    const selectedItem = items.find((item) => item.id === selectedItemId);
    if (!selectedItem) {
      toast({
        title: "Error",
        description: "Item tidak ketemu.",
        variant: "destructive",
      });
      return;
    }

    // Handle cart item accumulation or creation
    const existingCartItem = cart.find((item) => item.id === selectedItemId);
    if (existingCartItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === selectedItemId
            ? { ...item, quantity: item.quantity + selectedItemAmount }
            : item,
        ),
      );
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { ...selectedItem, quantity: selectedItemAmount },
      ]);
    }

    toast({
      title: "Berhasil",
      description: `${selectedItemAmount} ${selectedItem.nama} masuk ke keranjang.`,
    });

    setSelectedItemId("");
    setSelectedItemAmount(0);
  };

  return (
    <>
      <PageTitle backButtonHref={"/orders"} pageTitle={"Buat Order"} />
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        {/* Left col */}
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:gap-8">
            <DatePickerCard
              cardTitle={"Tanggal Order"}
              cardDescription={"Set Tanggal Order di sini."}
              placeholder={"Tanggal Order"}
              date={orderDate}
              setDate={setOrderDate}
            />
            <DatePickerCard
              cardTitle={"Tanggal Kirim"}
              cardDescription={"Set Tanggal Kirim di sini."}
              placeholder={"Tanggal Kirim"}
              date={deliveryDate}
              setDate={setDeliveryDate}
            />
          </div>
          <ItemFinderCard
            items={items}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            selectedItemAmount={selectedItemAmount}
            setSelectedItemAmount={setSelectedItemAmount}
            onAddToCartPress={onAddToCartPress}
          />
          <CartCard
            cart={cart}
            setCart={setCart}
            totalItems={totalItems}
            totalPrice={totalPrice}
          />
        </div>
        {/* Right col */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <ComboboxCard
            cardTitle={"Pilih Metode Pengantaran"}
            cardDescription={"Pilih Metode Pengantaran order di sini."}
            placeholder={"Metode Pengantaran"}
            comboboxItems={pickupDeliveriesComboboxItems}
            selectedItemId={selectedPickupDeliveryId}
            setSelectedItemId={setSelectedPickupDeliveryId}
          />
          <ComboboxCard
            cardTitle={"Pilih Metode Pembayaran"}
            cardDescription={"Pilih Metode Pembayaran order di sini."}
            placeholder={"Metode Pembayaran"}
            comboboxItems={pembayaransComboboxItems}
            selectedItemId={selectedPembayaranId}
            setSelectedItemId={setSelectedPembayaranId}
          />
          <DummyCard />
        </div>
      </div>
      {/* Flex foot */}
      <div className="mt-4 flex items-center gap-2">
        <Button variant="secondary">Batal</Button>
        <Button onClick={() => onOrderFormSubmit()}>Simpan Order</Button>
      </div>
    </>
  );
}
