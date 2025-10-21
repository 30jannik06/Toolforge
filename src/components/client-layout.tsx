"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { BackgroundGlow } from "@/components/backgroundGlow";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const isLogin = pathname?.startsWith("/login");
    const isRegister = pathname?.startsWith("/register");

    const isAuthOrAdmin = isAdmin || isLogin || isRegister; // 👈 zentralisiert

    return (
        <>
            {/* 🔹 Normale Seiten (alles außer Admin, Login, Register) */}
            {!isAuthOrAdmin && (
                <>
                    <BackgroundGlow />
                    <Navbar />
                    <main className="flex flex-col items-center px-6 py-10 max-w-6xl mx-auto">
                        {children}
                    </main>
                </>
            )}

            {/* 🔹 Admin-Bereich */}
            {isAdmin && (
                <div className="w-full h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
                    {children}
                </div>
            )}

            {/* 🔹 Login-Seite */}
            {isLogin && (
                <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
                    {children}
                </div>
            )}

            {/* 🔹 Register-Seite */}
            {isRegister && (
                <div className="w-full h-screen flex items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
                    {children}
                </div>
            )}
        </>
    );
}
