import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get("all") === "true";

    const features = await prisma.feature.findMany({
        where: includeAll ? {} : { enabled: true },
        orderBy: { name: "asc" },
    });

    return NextResponse.json(features);
}


export async function PATCH(req: Request) {
    try {
        const { id, enabled } = await req.json();

        if (typeof id !== "number" || typeof enabled !== "boolean") {
            return NextResponse.json(
                { error: "Ungültige Daten" },
                { status: 400 }
            );
        }

        const updated = await prisma.feature.update({
            where: { id },
            data: { enabled },
        });

        return NextResponse.json(updated);
    } catch (err) {
        console.error("PATCH /api/features failed:", err);
        return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
    }
}