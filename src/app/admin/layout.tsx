"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, Link2, MessageSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        const isAuthed = localStorage.getItem("toolforge_admin_authed") === "true";
        if (!isAuthed) router.push("/admin"); // zurück zur Login-Seite
        else setAuthed(true);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("toolforge_admin_authed");
        router.push("/admin");
    };

    if (!authed) return null;

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
        { href: "/admin/shortlinks", label: "Shortlinks", icon: <Link2 className="w-4 h-4" /> },
        { href: "/admin/feedback", label: "Feedback", icon: <MessageSquare className="w-4 h-4" /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] text-white">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-56 bg-white/5 border-r border-white/10 backdrop-blur-xl flex flex-col justify-between p-6"
            >
                <div>
                    <h1 className="text-xl font-bold mb-8 text-blue-400">ToolForge Admin</h1>
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2 transition ${
                                    pathname === item.href
                                        ? "bg-blue-500/20 text-blue-400"
                                        : "hover:bg-white/10 text-gray-300"
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </motion.aside>

            {/* Content */}
            <main className="flex-1 p-10">{children}</main>
        </div>
    );
}
