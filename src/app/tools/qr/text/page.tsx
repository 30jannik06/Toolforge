"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {copyQrAsBase64, downloadQrAsPng} from "@/lib/qrUtilis";

export default function QRTextTool() {
    const [text, setText] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!text.trim()) return;
        setQrValue(text.trim());
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400">QR-Code Generator</h1>
            <p className="text-gray-400">Erstelle einen QR-Code aus Text oder einer URL.</p>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text oder URL eingeben..."
                className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleGenerate}
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold"
            >
                Generieren
            </button>

            {qrValue && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-4 mt-4"
                >
                    <div className="bg-white p-4 rounded-xl">
                        <QRCode value={qrValue} size={200} />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={copyQrAsBase64}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                        >
                            {copied ? "✅ Kopiert!" : "📋 Als Base64 kopieren"}
                        </button>
                        <button
                            onClick={() => downloadQrAsPng("wifi-qr.png")}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-sm font-semibold transition"
                        >
                            💾 Download PNG
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
