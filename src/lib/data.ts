import "server-only";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
export const dynamic = "force-dynamic";

export const getItems = unstable_cache(
  async (userId: string | null) => {
    if (!userId) {
      throw new Error("Unauthorized access");
    }
    return await prisma.item.findMany();
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
    return await prisma.pickupDelivery.findMany();
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
    return await prisma.pembayaran.findMany();
  },
  ["pembayarans"],
  {
    tags: ["pembayarans"],
  },
);

export async function fetchCreateOrderFormData(userId: string | null) {
  const [items, pickupDeliveries, pembayarans] = await Promise.all([
    getItems(userId),
    getPickupDeliveries(userId),
    getPembayarans(userId),
  ]);

  return { items, pickupDeliveries, pembayarans };
}
