import { cache } from 'react'
import 'server-only'
import { auth } from '@clerk/nextjs/server'
import prisma from "@/lib/prisma";
import { Item } from "@prisma/client";

export const getItems = cache(async (): Promise<Item[]> => {
    const { userId } = auth();
    if (!userId) {
        throw new Error('Unauthorized');
    }
    try {
        return await prisma.item.findMany();
    } catch (error) {
        console.error("[ITEMS]", error);
        throw new Error("Internal Error");
    }
});

