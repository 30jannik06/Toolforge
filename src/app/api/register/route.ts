import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "E-Mail und Passwort erforderlich" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "E-Mail wird bereits verwendet" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                name: name || email.split("@")[0],
                password: hashed,
                role: "USER", // Standardrolle
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
    }
}
