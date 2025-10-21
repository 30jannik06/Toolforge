import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const links = await db.shortLink.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(links);
}

export async function POST(req: Request) {
    const { originalUrl } = await req.json();

    if (!originalUrl) {
        return NextResponse.json({ error: "URL fehlt." }, { status: 400 });
    }

    const hash = Math.random().toString(36).substring(2, 8);

    const newLink = await db.shortLink.create({
        data: { originalUrl, hash },
    });

    return NextResponse.json(newLink);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "ID fehlt." }, { status: 400 });
    }

    await db.shortLink.delete({ where: { id } });

    return NextResponse.json({ success: true });
}
