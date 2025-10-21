import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
    interface User {
        role?: Role;
    }

    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: Role;
        };
    }

    interface JWT {
        role?: Role;
    }
}
