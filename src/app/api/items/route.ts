import { auth } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { userId } = auth()

        if (!userId) {
            return NextResponse.json({ error: 'Error: No signed in user' }, { status: 401 })
        }

        // TODO: Make this dynamic later when I need to use this again other than the order form
        const { searchParams } = request.nextUrl;
        const nama = searchParams.get('nama') || '';
        const data = await prisma.item.findFirst({
            where: {
                nama : {
                    contains: nama,
                    mode: 'insensitive',
                },
            }
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}