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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center gap-16 mt-16"
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl font-bold tracking-tight">
                    Willkommen bei <span className="text-blue-400">ToolForge</span>
                </h1>
                <p className="text-gray-300 max-w-2xl leading-relaxed">
                    Dein persönliches Dashboard für kleine, praktische Tools –{" "}
                    stilvoll, schnell und immer griffbereit.
                </p>
            </div>

            {/* Tool Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {loading
                    ? // 🦴 Skeleton Cards (6 Stück beim Laden)
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center animate-pulse h-[220px]"
                        >
                            <div className="w-10 h-10 bg-white/10 rounded-full" />
                            <div className="w-32 h-4 bg-white/10 rounded" />
                            <div className="w-48 h-3 bg-white/5 rounded" />
                        </div>
                    ))
                    : // ✅ Wenn Daten da sind → echte Cards
                    features.map((tool) => {
                        const Icon =
                            LucideIcons[
                            (tool.icon as keyof typeof LucideIcons) || "Wrench"
                                ] as React.ComponentType<{ className?: string }>;

                        return (
                            <Link key={tool.id} href={tool.route ?? "#"}>
                                <motion.div
                                    className="relative cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-between text-center hover:bg-white/10 transition h-[220px]"
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    onMouseMove={(e) => {
                                        const card = e.currentTarget;
                                        const rect = card.getBoundingClientRect();
                                        const x = e.clientX - rect.left;
                                        const y = e.clientY - rect.top;
                                        const rotateY = ((x - rect.width / 2) / rect.width) * 10;
                                        const rotateX = ((y - rect.height / 2) / rect.height) * -10;
                                        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "rotateY(0deg) rotateX(0deg) scale(1)";
                                    }}
                                    style={{
                                        transition: "transform 0.2s ease-out",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        {Icon ? (
                                            <Icon className="w-8 h-8 text-blue-400" />
                                        ) : (
                                            <LucideIcons.Wrench className="w-8 h-8 text-blue-400" />
                                        )}
                                        <h2 className="text-xl font-semibold text-white">
                                            {tool.name}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 max-w-xs">
                                            {tool.description ?? "Keine Beschreibung vorhanden."}
                                        </p>
                                    </div>

                                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300" />
                                </motion.div>
                            </Link>
                        );
                    })}
            </div>

            {/* Footer / CTA */}
            {!loading && (
                <div className="flex flex-col items-center gap-4 mt-8">
                    <p className="text-gray-400 text-sm">
                        Mehr Tools sind bereits in Arbeit...
                    </p>
                    <motion.div
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="h-2 w-2 bg-blue-400 rounded-full"
                    />
                </div>
            )}
        </motion.div>
    );
}
