import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash("admin123", 10);

    await prisma.user.upsert({
        where: { email: "admin@toolforge.local" },
        update: {},
        create: {
            email: "admin@toolforge.local",
            name: "Admin",
            password: passwordHash,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin User seeded!");
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
