import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';  // Force dynamic rendering

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 });
        }

        // TODO: Make this dynamic later when I need to use this again other than the order form
        const data = await prisma.item.findMany();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error occurred:', error);

        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown Error'
        }, {
            status: 500
        });
    }
}
