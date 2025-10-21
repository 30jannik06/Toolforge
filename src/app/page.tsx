"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Loader2 } from "lucide-react";

interface Feature {
    id: number;
    name: string;
    description?: string | null;
    route?: string | null;
    icon?: string | null;
    category?: string | null;
}

export default function ToolsPage() {
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
        <div className="min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-hidden ">
        {/* Hintergrund Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-radial from-blue-600/30 via-transparent to-transparent blur-3xl opacity-70" />

            {/* Header */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center mb-14 mt-16"
            >
                <h1 className="text-5xl font-extrabold tracking-tight">
                    Willkommen bei{" "}
                    <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                        ToolForge
                    </span>
                </h1>
                <p className="text-gray-400 max-w-2xl leading-relaxed mt-4">
                    Dein stylisches Dashboard für praktische Tools –
                    <br />
                    modern, blitzschnell und immer griffbereit ⚡
                </p>
            </motion.div>

            {/* Loading Spinner */}
            {loading && (
                <div className="flex justify-center items-center min-h-[200px]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                </div>
            )}

            {/* Tool Cards */}
            {!loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 max-w-6xl"
                >
                    {features.length > 0 ? (
                        features.map((tool) => {
                            const Icon =
                                LucideIcons[
                                (tool.icon as keyof typeof LucideIcons) || "Wrench"
                                    ] as React.ComponentType<{ className?: string }>;

                            return (
                                <Link key={tool.id} href={tool.route ?? "#"}>
                                    <motion.div
                                        className="relative group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] h-[220px]"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <Icon className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-transform duration-300 group-hover:rotate-3" />
                                            <h2 className="text-lg font-semibold text-white">
                                                {tool.name}
                                            </h2>
                                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-xs">
                                                {tool.description ?? "Keine Beschreibung vorhanden."}
                                            </p>
                                        </div>

                                        {/* Glare Effekt */}
                                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                    </motion.div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="text-gray-500 text-sm col-span-full text-center">
                            Keine Features verfügbar 💤
                        </div>
                    )}
                </motion.div>
            )}

            {/* Footer / CTA */}
            {!loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-4 mt-16 mb-10"
                >
                    <p className="text-gray-400 text-sm">
                        Neue Tools sind bereits in Arbeit ...
                    </p>
                    <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-2 w-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    />
                </motion.div>
            )}
        </div>
    );
}
