import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST(req: Request) {
    const { url } = await req.json();

    if (!url.startsWith("http")) {
        return NextResponse.json({error: "Ungültige URL" }, {status: 400});
    }

    const hash = Math.random().toString(36).substring(2, 8).substring(2, 8);

    const newLink = await db.shortLink.create({
        data: { hash, originalUrl: url},
    })

    return NextResponse.json({
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${newLink.hash}`,
    });
}