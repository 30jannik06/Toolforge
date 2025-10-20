"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        fetch("/api/features") // 👈 holt alle aktivierten Features
            .then((res) => res.json())
            .then(setFeatures)
            .catch((err) => console.error("Feature fetch failed:", err));
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
                {features.map((tool) => {
                    const Icon = LucideIcons[
                    (tool.icon as keyof typeof LucideIcons) || "Wrench"
                        ] as React.ComponentType<{ className?: string }>;

                    return (
                        <Link key={tool.id} href={tool.route ?? "#"}>
                            <motion.div
                                className="relative cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center gap-4 text-center hover:bg-white/10 transition"
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
                                {Icon ? (
                                    <Icon className="w-8 h-8 text-blue-400" />
                                ) : (
                                    <LucideIcons.Wrench className="w-8 h-8 text-blue-400" />
                                )}
                                <h2 className="text-xl font-semibold">{tool.name}</h2>
                                {tool.description && (
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {tool.description}
                                    </p>
                                )}

                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300" />
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer / CTA */}
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
        </motion.div>
    );
}
