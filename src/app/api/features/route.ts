import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const features = await prisma.feature.findMany({
        where: { enabled: true },
        orderBy: { category: "asc" },
    });
    return NextResponse.json(features);
}
