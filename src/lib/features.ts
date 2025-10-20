import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Lädt alle aktivierten Features aus der Datenbank.
 */
export async function getActiveFeatures() {
    return await prisma.feature.findMany({
        where: { enabled: true },
        orderBy: { category: "asc" },
    });
}
