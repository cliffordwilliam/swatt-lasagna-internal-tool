import "server-only";

import { CartItem } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import {
  postOrderFormSchema,
  postOrderFormType,
  postPeopleFormSchema,
  postPeopleFormType,
} from "./definitions";
export const dynamic = "force-dynamic";

export const getItems = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.item.findMany();
    } catch (error) {
      console.error("Error fetching items:", error);
      throw new Error("Failed to fetch items");
    }
  },
  ["items"],
  {
    tags: ["items"],
  },
);

export const getPickupDeliveries = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.pickupDelivery.findMany();
    } catch (error) {
      console.error("Error fetching pickup deliveries:", error);
      throw new Error("Failed to fetch pickup deliveries");
    }
  },
  ["pickupDeliveries"],
  {
    tags: ["pickupDeliveries"],
  },
);

export const getPembayarans = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.pembayaran.findMany();
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw new Error("Failed to fetch payment methods");
    }
  },
  ["pembayarans"],
  {
    tags: ["pembayarans"],
  },
);
export async function postPerson(
  userId: string | null,
  data: postPeopleFormType,
) {
  if (!userId) {
    throw new Error("Unauthorized access");
  }
  const parsedData = postPeopleFormSchema.safeParse(data);
  if (!parsedData.success) {
    const errors = parsedData.error.flatten();
    throw new Error(JSON.stringify(errors));
  }

  const { nama, alamat, noHp } = parsedData.data;

  try {
    const newPerson = await prisma.people.create({
      data: {
        nama,
        alamat,
        noHp,
      },
    });
    return newPerson;
  } catch (error) {
    console.error("Error creating new person:", error);
    throw new Error("Tidak dapat membuat orang baru");
  }
}

export const getPeople = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.people.findMany();
    } catch (error) {
      console.error("Error fetching people:", error);
      throw new Error("Failed to fetch people");
    }
  },
  ["peoples"],
  {
    tags: ["peoples"],
  },
);

export const getOrderStatus = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.orderStatus.findMany();
    } catch (error) {
      console.error("Error fetching order statuses:", error);
      throw new Error("Failed to fetch order statuses");
    }
  },
  ["orderStatuses"],
  {
    tags: ["orderStatuses"],
  },
);

export async function fetchCreateOrderFormData(userId: string | null) {
  try {
    const [items, pickupDeliveries, pembayarans, peoples, orderStatuses] =
      await Promise.all([
        getItems(userId),
        getPickupDeliveries(userId),
        getPembayarans(userId),
        getPeople(userId),
        getOrderStatus(userId),
      ]);

    return { items, pickupDeliveries, pembayarans, peoples, orderStatuses };
  } catch (error) {
    console.error("Error fetching order form data:", error);
    throw new Error("Failed to fetch order form data");
  }
}

export const postOrder = unstable_cache(
  async (userId: string | null, data: postOrderFormType) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }

    const parsedData = postOrderFormSchema.safeParse(data);
    if (!parsedData.success) {
      const errors = parsedData.error.flatten();
      throw new Error(JSON.stringify(errors));
    }

    const {
      pembeliId,
      penerimaId,
      tanggalOrder,
      tanggalKirim,
      totalPembelian,
      pickupDeliveryId,
      ongkir,
      grandTotal,
      pembayaranId,
      orderStatusId,
      note,
    } = parsedData.data;

    try {
      const newOrder = await prisma.order.create({
        data: {
          pembeliId,
          penerimaId,
          tanggalOrder,
          tanggalKirim,
          totalPembelian,
          pickupDeliveryId,
          ongkir,
          grandTotal,
          pembayaranId,
          orderStatusId,
          note,
        },
      });

      return newOrder;
    } catch (error) {
      console.error("Error creating new order:", error);
      throw new Error("Failed to create new order");
    }
  },
  ["orders"],
  {
    tags: ["orders"],
  },
);

export const postOrderItems = unstable_cache(
  async (userId: string | null, orderId: string, items: CartItem[]) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }

    if (!items || items.length === 0) {
      throw new Error("No items provided for the order");
    }

    try {
      const orderItems = items.map((item) => ({
        orderId,
        itemId: item.id,
        quantity: item.quantity,
      }));

      await prisma.orderItem.createMany({
        data: orderItems,
      });

      return orderItems;
    } catch (error) {
      console.error("Error creating order items:", error);
      throw new Error("Failed to create order items");
    }
  },
  ["orderItems"],
  {
    tags: ["orderItems"],
  },
);

export async function createOrderWithItems(
  userId: string | null,
  data: postOrderFormType,
) {
  const newOrder = await postOrder(userId, data);
  await postOrderItems(userId, newOrder.id, data.items);
  return newOrder;
}

export const getOrders = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    try {
      return await prisma.order.findMany({
        include: {
          pembeli: { select: { nama: true } },
          penerima: { select: { nama: true } },
          pembayaran: { select: { name: true } },
          pickupDelivery: { select: { name: true } },
          status: { select: { name: true } },
        },
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  },
  ["orders"],
  {
    tags: ["orders"],
  },
);
