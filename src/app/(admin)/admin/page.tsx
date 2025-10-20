"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { motion } from "framer-motion";

type NavSection = "dashboard" | "shortlinks" | "feedback";

export default function AdminPage() {
    const [active, setActive] = useState<NavSection>("dashboard");

    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar active={active} setActive={setActive} />

            {/* Main content */}
            <main className="ml-64 flex-1 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-radial from-blue-600/20 via-transparent to-transparent blur-3xl" />
                <div className="p-10 h-full overflow-y-auto">
                    {active === "dashboard" && <Dashboard />}
                    {active === "shortlinks" && <Shortlinks />}
                    {active === "feedback" && <Feedback />}
                </div>
            </main>
        </div>
    );
}

// --- Dummy Content Components ---
function Dashboard() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-3xl font-bold text-blue-400 mb-4">Dashboard</h1>
            <p className="text-gray-400">Willkommen im Adminbereich.</p>
        </motion.div>
    );
}

function Shortlinks() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-bold text-blue-400 mb-4">Shortlinks</h1>
            <p className="text-gray-400">Hier kannst du deine Links verwalten.</p>
        </motion.div>
    );
}

function Feedback() {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-bold text-blue-400 mb-4">Feedback</h1>
            <p className="text-gray-400">Hier kannst du Feedback-Einträge sehen.</p>
        </motion.div>
    );
}
