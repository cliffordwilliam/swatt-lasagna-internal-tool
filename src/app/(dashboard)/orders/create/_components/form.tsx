"use client";

import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import {
  CartItem,
  postOrderFormType,
  postPeopleFormType,
} from "@/lib/definitions";
import {
  Item,
  Order,
  OrderStatus,
  Pembayaran,
  People,
  PickupDelivery,
} from "@prisma/client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMemo, useState } from "react";
import { CartCard } from "./cart-card";
import { ComboboxCard } from "./combobox-card";
import { DatePickerCard } from "./date-picker-card";
import { ItemFinderCard } from "./item-finder-card";
import { PeopleCard } from "./people-card";
import { StatusAndNoteCard } from "./status-and-note-card";

export function Form({
  items,
  pickupDeliveries,
  pembayarans,
  peoples,
  orderStatuses,
  onPostOrderFormSubmit,
  onPostPeopleFormSubmit,
}: {
  items: Item[];
  pickupDeliveries: PickupDelivery[];
  pembayarans: Pembayaran[];
  peoples: People[];
  orderStatuses: OrderStatus[];
  onPostOrderFormSubmit: (data: postOrderFormType) => Promise<Order>;
  onPostPeopleFormSubmit: (data: postPeopleFormType) => Promise<People>;
}) {
  // States
  const [orderDate, setOrderDate] = useState<Date>();
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItemAmount, setSelectedItemAmount] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPickupDeliveryId, setSelectedPickupDeliveryId] = useState("");
  const [selectedPembayaranId, setSelectedPembayaranId] = useState("");
  const [selectedPembeliId, setSelectedPembeliId] = useState("");
  const [selectedPenerimaId, setSelectedPenerimaId] = useState("");
  const [selectedOrderStatusId, setSelectedOrderStatusId] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Memo
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

  // Hooks
  const { toast } = useToast();

  // Reformat for combobox input
  const pickupDeliveriesComboboxItems = pickupDeliveries.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const pembayaransComboboxItems = pembayarans.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const peopleComboboxItems = peoples.map((item) => ({
    value: item.id,
    label: item.nama,
  }));
  const orderStatusesComboboxItems = orderStatuses.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // Form submit callback
  const onClientPostOrderFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!orderDate) {
        throw new Error("OrderDate undefined");
      }
      if (!deliveryDate) {
        throw new Error("tanggalKirim undefined");
      }
      const data = {
        pembeliId: selectedPembeliId,
        penerimaId: selectedPenerimaId,
        tanggalOrder: orderDate,
        tanggalKirim: deliveryDate,
        totalPembelian: totalItems,
        pickupDeliveryId: selectedPickupDeliveryId,
        ongkir: 0,
        grandTotal: totalPrice,
        pembayaranId: selectedPembayaranId,
        items: cart.map(item => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        orderStatusId: selectedOrderStatusId,
        note: noteValue,
      };
      // Tell parent about it
      await onPostOrderFormSubmit(data);
      toast({
        title: "Berhasil",
        description: `Order telah ditambahkan.`,
      });
      resetStates();
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Error",
        description: "Gagal menambahkan data.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ItemFinderCard child tells me to update CartCard child
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

  const resetStates = () => {
    setOrderDate(undefined);
    setDeliveryDate(undefined);
    setSelectedItemId("");
    setSelectedItemAmount(0);
    setCart([]);
    setSelectedPickupDeliveryId("");
    setSelectedPembayaranId("");
    setSelectedPembeliId("");
    setSelectedPenerimaId("");
  };

  return (
    <>
      <PageTitle backButtonHref={"/orders"} pageTitle={"Buat Order"} />
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        {/* Left col */}
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <StatusAndNoteCard
            comboboxItems={orderStatusesComboboxItems}
            selectedItemId={selectedOrderStatusId}
            setSelectedItemId={setSelectedOrderStatusId}
            noteValue={noteValue}
            setNoteValue={setNoteValue}
          />
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
          <PeopleCard
            isBuyer={true}
            comboboxItems={peopleComboboxItems}
            selectedItemId={selectedPembeliId}
            setSelectedItemId={setSelectedPembeliId}
            onPostPeopleFormSubmit={onPostPeopleFormSubmit}
          />
          <PeopleCard
            isBuyer={false}
            comboboxItems={peopleComboboxItems}
            selectedItemId={selectedPenerimaId}
            setSelectedItemId={setSelectedPenerimaId}
            onPostPeopleFormSubmit={onPostPeopleFormSubmit}
          />
        </div>
      </div>
      {/* Flex foot */}
      <div className="mt-4 flex items-center gap-2">
        <Button variant="secondary" onClick={() => resetStates()}>
          Batal
        </Button>
        {isSubmitting ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Tunggu ya...
          </Button>
        ) : (
          <Button onClick={() => onClientPostOrderFormSubmit()}>
            Simpan Order
          </Button>
        )}
      </div>
    </>
  );
}
