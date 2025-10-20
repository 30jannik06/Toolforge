"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Type, QrCode, Scissors, Upload } from "lucide-react";

const tools = [
    {
        name: "QR Generator",
        description: "Erstelle QR-Codes aus Text, Links und vielem mehr.",
        icon: <QrCode className="w-6 h-6 text-blue-400" />,
        href: "/tools/qr",
    },
    {
        name: "Text Formatter",
        description: "Formatiere Text, JSON oder Code blitzschnell.",
        icon: <Type className="w-6 h-6 text-blue-400" />,
        href: "/tools/text-formatter",
    },
    {
        name: "Image Compressor",
        description: "Komprimiere Bilder direkt im Browser.",
        icon: <Upload className="w-6 h-6 text-blue-400" />,
        href: "/tools/image-compressor",
    },
    {
        name: "URL Shortener",
        description: "Verkürze lange URLs mit nur einem Klick.",
        icon: <Scissors className="w-6 h-6 text-blue-400" />,
        href: "/tools/url-shortener",
    },
    {
        name: "Base64 Text Converter",
        description: "Konvertiere Texte in Base64 und umgekehrt.",
        icon: <Wrench className="w-6 h-6 text-blue-400" />,
        href: "/tools/base64-text",
    },
    {
        name: "Base64 Image Converter",
        description: "Konvertiere Bilder in Base64 und umgekehrt.",
        icon: <Wrench className="w-6 h-6 text-blue-400" />,
        href: "/tools/base64-image",
    }
];

const ToolsPage: React.FC = () => {
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
                {tools.map((tool, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/10 transition"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {tool.icon}
                            <h2 className="text-lg font-semibold">{tool.name}</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {tool.description}
                        </p>
                        <Link
                            href={tool.href}
                            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition font-medium"
                        >
                            Öffnen →
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default ToolsPage;
