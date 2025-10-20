import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash("admin123", 10);
    await db.user.upsert({
        where: { email: "admin@toolforge.local" },
        update: {},
        create: {
            email: "admin@toolforge.local",
            password: hash,
            name: "Admin",
        },
    });
}

main()
    .then(() => console.log("Admin user created ✅"))
    .catch(console.error)
    .finally(() => db.$disconnect());
