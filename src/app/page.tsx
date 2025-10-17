"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { QrCode, Type, Upload, Scissors } from "lucide-react";

export default function HomePage() {
    const tools = [
        {
            title: "QR Generator",
            description: "Erstelle QR-Codes aus Text oder Links.",
            icon: <QrCode className="w-8 h-8 text-blue-400" />,
            href: "/tools/qr-generator",
        },
        {
            title: "Text Formatter",
            description: "Formatiere Text, JSON oder Code blitzschnell.",
            icon: <Type className="w-8 h-8 text-blue-400" />,
            href: "/tools/text-formatter",
        },
        {
            title: "Image Compressor",
            description: "Komprimiere Bilder direkt im Browser.",
            icon: <Upload className="w-8 h-8 text-blue-400" />,
            href: "/tools/image-compressor",
        },
        {
            title: "URL Shortener",
            description: "Verkürze lange Links mit echter Weiterleitung.",
            icon: <Scissors className="w-8 h-8 text-blue-400" />,
            href: "/tools/url-shortener",
        },
    ];

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
                    Dein persönliches Dashboard für kleine, praktische Tools –
                    stilvoll, schnell und immer griffbereit.
                </p>
            </div>

            {/* Tool Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {tools.map((tool, i) => (
                    <Link key={i} href={tool.href}>
                        <motion.div
                            whileHover={{
                                scale: 1.04,
                                y: -4,
                                boxShadow: "0 0 25px rgba(59,130,246,0.25)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="cursor-pointer bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center gap-4 text-center hover:bg-white/10 transition"
                        >
                            {tool.icon}
                            <h2 className="text-xl font-semibold">{tool.title}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Footer / CTA */}
            <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-gray-400 text-sm">Mehr Tools sind bereits in Arbeit...</p>
                <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-2 w-2 bg-blue-400 rounded-full"
                />
            </div>
        </motion.div>
    );
}
