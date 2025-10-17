"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
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

                <div className="flex gap-6 text-sm text-gray-300">
                    <Link href="/" className="hover:text-white transition">
                        Startseite
                    </Link>
                    <Link href="/tools" className="hover:text-white transition">
                        Tools
                    </Link>
                    <Link href="/about" className="hover:text-white transition">
                        Über
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
