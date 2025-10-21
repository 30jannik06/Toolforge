"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Startseite" },
        { href: "/tools", label: "Tools" },
        { href: "/about", label: "Über" },
    ];

    const isActive = (href: string) =>
        pathname === href
            ? "text-blue-400 font-semibold border-b border-blue-500"
            : "text-gray-300 hover:text-white transition";

    const isAdmin = session?.user?.role === "ADMIN";

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/10 bg-gradient-to-b from-white/10 to-transparent"
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                {/* --- Logo --- */}
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition flex items-center gap-2"
                >
                    ⚙️ <span className="hidden sm:inline">ToolForge</span>
                </Link>

                {/* --- Navigation --- */}
                <div className="flex items-center gap-6 text-sm">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className={isActive(href)}>
                            {label}
                        </Link>
                    ))}

                    {/* Nur Admins sehen das */}
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className={`${isActive("/admin")} hover:text-blue-400`}
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* --- Auth Buttons --- */}
                <div className="flex items-center gap-4 text-sm">
                    {session ? (
                        <>
                            <span className="text-gray-400 hidden sm:inline">
                                {session.user?.name ?? session.user?.email}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="px-3 py-1 rounded-md border border-white/10 hover:border-red-400 hover:text-red-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="px-3 py-1 rounded-md border border-white/10 hover:border-blue-400 hover:text-blue-400 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
