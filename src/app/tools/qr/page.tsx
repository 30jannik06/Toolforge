"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, Wifi, Mail, Contact } from "lucide-react";
import { useEffect, useState } from "react";

const qrTools = [
    {
        name: "Text / URL",
        description: "Erstelle QR-Codes für Webseiten oder beliebigen Text.",
        icon: <QrCode className="w-7 h-7 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />,
        href: "/tools/qr/text",
    },
    {
        name: "WLAN",
        description: "Erzeuge QR-Codes für dein WLAN – Gäste einfach scannen lassen.",
        icon: <Wifi className="w-7 h-7 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />,
        href: "/tools/qr/wifi",
    },
    {
        name: "E-Mail",
        description: "QR-Code mit Mailto-Link für schnelle Kontaktaufnahme.",
        icon: <Mail className="w-7 h-7 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]" />,
        href: "/tools/qr/email",
    },
    {
        name: "vCard / Kontakt",
        description: "Digitaler Visitenkarten-QR-Code mit Name, Firma & Kontaktdaten.",
        icon: <Contact className="w-7 h-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />,
        href: "/tools/qr/vcard",
    },
];

export default function QRToolsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center w-full text-center gap-12 mt-10"
        >
            {/* Header */}
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">QR-Code</span> Tools
                </h1>
                <p className="text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                    Erstelle individuelle QR-Codes – für Text, WLAN, E-Mail oder Visitenkarten.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl px-4">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="relative bg-white/5 border border-white/10 rounded-2xl h-48 flex flex-col items-center justify-center gap-4 animate-pulse"
                        >
                            <div className="w-10 h-10 bg-white/10 rounded-full" />
                            <div className="w-24 h-3 bg-white/10 rounded" />
                            <div className="w-40 h-3 bg-white/5 rounded" />
                        </motion.div>
                    ))
                    : qrTools.map((tool, i) => (
                        <Link key={i} href={tool.href}>
                            <motion.div
                                className="relative group bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] h-48 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                onMouseMove={(e) => {
                                    const card = e.currentTarget;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
                                    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
                                    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
                                }}
                                style={{
                                    transition: "transform 0.2s ease-out",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    {tool.icon}
                                    <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Glare Effekt */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                            </motion.div>
                        </Link>
                    ))}
            </div>

            {/* Footer Pulse */}
            {!loading && (
                <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-2 w-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
            )}
        </motion.div>
    );
}
