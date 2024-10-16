import "server-only";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
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
