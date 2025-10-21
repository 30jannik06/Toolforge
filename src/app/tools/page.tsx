"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

interface Feature {
    id: number;
    name: string;
    description?: string | null;
    route?: string | null;
    icon?: string | null;
    category?: string | null;
}

const ToolsPage: React.FC = () => {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/features")
            .then((res) => res.json())
            .then((data) => {
                setFeatures(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Feature fetch failed:", err);
                setLoading(false);
            });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-12 mt-10"
        >
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    <span className="text-blue-400">Tools</span> Übersicht
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                    Wähle eines unserer Tools aus, um direkt zu starten. Alles läuft lokal
                    und ist auf Performance optimiert.
                </p>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                transition={{ duration: 0.4 }}
            >
                {loading
                    ? // 🦴 Skeletons anzeigen, solange geladen wird
                    Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-6 h-6 bg-white/10 rounded-full" />
                                <div className="w-32 h-4 bg-white/10 rounded" />
                            </div>
                            <div className="w-full h-3 bg-white/5 rounded mb-2" />
                            <div className="w-5/6 h-3 bg-white/5 rounded mb-6" />
                            <div className="w-20 h-3 bg-blue-400/20 rounded" />
                        </motion.div>
                    ))
                    : // ✅ Echte Daten, wenn geladen
                    features.map((tool) => {
                        const Icon =
                            LucideIcons[
                            (tool.icon as keyof typeof LucideIcons) || "Wrench"
                                ] as React.ComponentType<{ className?: string }>;

                        return (
                            <motion.div
                                key={tool.id}
                                whileHover={{ scale: 1.03, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/10 transition"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className="w-6 h-6 text-blue-400" />
                                    <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {tool.description ?? "Keine Beschreibung vorhanden."}
                                </p>

                                <Link
                                    href={tool.route ?? "#"}
                                    className={`inline-flex items-center text-sm font-medium transition ${
                                        tool.route
                                            ? "text-blue-400 hover:text-blue-300"
                                            : "text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    {tool.route ? "Öffnen →" : "Demnächst"}
                                </Link>
                            </motion.div>
                        );
                    })}
            </motion.div>
        </motion.div>
    );
};

export default ToolsPage;
