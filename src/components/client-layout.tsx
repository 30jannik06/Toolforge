"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { BackgroundGlow } from "@/components/backgroundGlow";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isLogin = pathname?.startsWith("/login");

    return (
        <>
            {/* 🔹 Nur auf der normalen Seite sichtbar */}
            {!isAdmin && !isLogin && (
                <>
                    <BackgroundGlow />
                    <Navbar />
                </>
            )}

            {/* 🔹 Admin-Bereich → Vollbild, kein Glow, kein Navbar */}
            {isAdmin ? (
                <div className="w-full h-screen flex flex-col bg-[#0a0a0a] text-white">
                    {children}
                </div>
            ) : isLogin ? (
                /* 🔹 Login-Seite → Vollbild, kein Glow, kein Navbar */
                <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                    {children}
                </div>
            ) : (
                /* 🔹 Normale Seiten */
                <main className="flex flex-col items-center px-6 py-10 max-w-6xl mx-auto">
                    {children}
                </main>
            )}
        </>
    );
}
