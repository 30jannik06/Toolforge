"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Wifi, Mail, Contact } from "lucide-react";
import { useEffect, useState } from "react";

const qrTools = [
    {
        name: "Text / URL",
        description: "Erstelle QR-Codes für Webseiten oder beliebigen Text.",
        icon: <QrCode className="w-6 h-6 text-blue-400" />,
        href: "/tools/qr/text",
    },
    {
        name: "WLAN",
        description:
            "Erzeuge QR-Codes für dein WLAN – Gäste einfach scannen lassen.",
        icon: <Wifi className="w-6 h-6 text-green-400" />,
        href: "/tools/qr/wifi",
    },
    {
        name: "E-Mail",
        description:
            "QR-Code mit Mailto-Link für schnelle Kontaktaufnahme.",
        icon: <Mail className="w-6 h-6 text-pink-400" />,
        href: "/tools/qr/email",
    },
    {
        name: "vCard / Kontakt",
        description:
            "Digitaler Visitenkarten-QR-Code mit Name, Firma & Kontaktdaten.",
        icon: <Contact className="w-6 h-6 text-yellow-400" />,
        href: "/tools/qr/vcard",
    },
];

export default function QRToolsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // Simuliertes Laden
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full text-center gap-8"
        >
            <div>
                <h1 className="text-3xl font-bold text-blue-400 mb-2">QR-Code Tools</h1>
                <p className="text-gray-300 max-w-2xl">
                    Erstelle QR-Codes für verschiedene Zwecke – ob Text, WLAN, E-Mail oder Visitenkarte.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {loading
                    ? // 🦴 Skeleton Loading Cards
                    Array.from({ length: 4 }).map((_, i) => (
                        <Card
                            key={i}
                            className="bg-white/5 border border-white/10 h-48 animate-pulse rounded-2xl"
                        >
                            <CardContent className="flex flex-col items-center justify-center text-center p-6 gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded-full" />
                                <div className="w-32 h-4 bg-white/10 rounded" />
                                <div className="w-48 h-3 bg-white/5 rounded" />
                            </CardContent>
                        </Card>
                    ))
                    : // ✅ Echte Cards nach dem Laden
                    qrTools.map((tool, i) => (
                        <Link key={i} href={tool.href}>
                            <Card className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer h-full">
                                <CardContent className="flex flex-col items-center justify-center text-center p-6 gap-3">
                                    {tool.icon}
                                    <h2 className="text-lg font-semibold text-white">{tool.name}</h2>
                                    <p className="text-gray-400 text-sm">{tool.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </div>
        </motion.div>
    );
}
