"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import QRCode from "react-qr-code";

export default function QrGeneratorPage() {
    const [text, setText] = useState("");

    return (
        <ToolLayout
            title="QR Generator"
            description="Erstelle QR-Codes aus Text oder Links direkt im Browser – ganz ohne Server."
        >
            <div className="flex flex-col items-center gap-6">
                <input
                    type="text"
                    placeholder="Text oder URL eingeben..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                {text && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-white rounded-lg"
                    >
                        <QRCode value={text} size={180} />
                    </motion.div>
                )}
            </div>
        </ToolLayout>
    );
}
