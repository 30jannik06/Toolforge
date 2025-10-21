import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import packageJson from "../../../../package.json";

export async function GET() {
    try {
        const dbCheck = await db.feature.count();
        const shortLinks = await db.shortLink.count();

        return NextResponse.json({
            ok: true,
            database: "online",
            features: dbCheck,
            shortlinks: shortLinks,
            version: packageJson.version,
            node: process.version,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            ok: false,
            database: "offline",
            error: (err as Error).message,
        });
    }
}
