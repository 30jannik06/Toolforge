import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const role = req.nextauth.token?.role;
        if (req.nextUrl.pathname.startsWith("/admin") && role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login?unauthorized=true", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // erlaubt nur eingeloggte User
        },
    }
);

export const config = {
    matcher: ["/admin/:path*"],
};
