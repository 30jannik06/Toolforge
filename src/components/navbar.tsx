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
        pathname === href ? "text-blue-400 font-medium" : "hover:text-white transition";

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/10 bg-white/5"
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link
                    href="/"
                    className="text-lg font-semibold tracking-wide hover:text-blue-400 transition"
                >
                    ⚙️ ToolForge
                </Link>

                <div className="flex items-center gap-6 text-sm text-gray-300">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} className={isActive(href)}>
                            {label}
                        </Link>
                    ))}

                    {/* Auth Buttons */}
                    {session ? (
                        <>
                            <Link
                                href="/admin"
                                className={isActive("/admin")}
                            >
                                Admin
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-gray-400 hover:text-red-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="text-gray-400 hover:text-blue-400 transition"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
