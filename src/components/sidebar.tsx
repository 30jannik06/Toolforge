"use client";

import {cn} from "@/lib/utils";
import {signOut, useSession} from "next-auth/react";
import {useState} from "react";
import Link from "next/link";

type NavSection = "dashboard" | "shortlinks" | "features" | "systemstatus";

export function Sidebar({
                            active,
                            setActive,
                        }: {
    active: NavSection;
    setActive: (section: NavSection) => void;
}) {
    const [loggingOut, setLoggingOut] = useState(false);
    const { data: session } = useSession();

    const handleLogout = async () => {
        setLoggingOut(true);
        await signOut({ callbackUrl: "/login" });
    };

    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-white/5 border-r border-white/10 backdrop-blur-md flex flex-col justify-between">
            {/* 🔹 Navigation oben */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-blue-400 mb-8">
                    ToolForge Admin
                </h1>

                <nav className="flex flex-col gap-2">
                    <SidebarLink
                        label="Dashboard"
                        active={active === "dashboard"}
                        onClick={() => setActive("dashboard")}
                    />
                    <SidebarLink
                        label="Shortlinks"
                        active={active === "shortlinks"}
                        onClick={() => setActive("shortlinks")}
                    />
                    <SidebarLink
                        label="Features"
                        active={active === "features"}
                        onClick={() => setActive("features")}
                    />
                    <SidebarLink
                        label="Systemstatus"
                        active={active === "systemstatus"}
                        onClick={() => setActive("systemstatus")}
                    />
                </nav>
            </div>

            {/* 🔻 Footer-Bereich */}
            <div className="p-6 border-t border-white/10 text-sm flex flex-col gap-3">
                <Link
                    href="/"
                    className="text-gray-400 hover:text-blue-400 transition text-left"
                >
                    ← Zurück zur Hauptseite
                </Link>

                <p className="text-gray-400 mb-1 truncate">
                    {session?.user?.email ?? "admin@toolforge.local"}
                </p>

                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className={cn(
                        "transition font-medium text-left",
                        loggingOut
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-gray-400 hover:text-red-400"
                    )}
                >
                    {loggingOut ? "Abmelden..." : "Logout"}
                </button>
            </div>
        </aside>
    );
}

// 🔸 SidebarLink-Komponente
function SidebarLink({
                         label,
                         active,
                         onClick,
                     }: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-left px-3 py-2 rounded-md transition-colors w-full",
                active
                    ? "bg-blue-500/20 text-blue-400 font-semibold"
                    : "hover:bg-white/10 text-gray-300"
            )}
        >
            {label}
        </button>
    );
}
