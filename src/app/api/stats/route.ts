import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await db.user.count();
    const shortlinks = await db.shortLink.count();
    const featuresTotal = await db.feature.count();
    const featuresActive = await db.feature.count({ where: { enabled: true } });

    const days = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return {
            date: date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
            links: Math.floor(Math.random() * 10),
        };
    }).reverse();

    return NextResponse.json({
        users,
        shortlinks,
        featuresTotal,
        featuresActive,
        shortlinkHistory: days,
    });
}
