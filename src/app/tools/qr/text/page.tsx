"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { copyQrAsBase64, downloadQrAsPng, shareQr } from "@/lib/qrUtilis";

export default function QRTextTool() {
    const [text, setText] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!text.trim()) return;
        setQrValue(text.trim());
    };

    const handleCopy = async () => {
        await copyQrAsBase64();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
                    QR-Code
                </span>{" "}
                Generator
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
                Erstelle stilvolle QR-Codes aus beliebigem Text oder URLs — alles direkt im Browser.
            </p>

            {/* Input */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Text oder URL eingeben..."
                className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-3 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Generate Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
                QR-Code generieren
            </motion.button>

            {/* QR Output */}
            {qrValue && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-5 mt-6"
                >
                    {/* QR Code */}
                    <div className="bg-white p-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10">
                        <QRCode value={qrValue} size={200} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={handleCopy}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm transition"
                        >
                            {copied ? "✅ Kopiert!" : "📋 Base64 kopieren"}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => downloadQrAsPng("qr-code.png")}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                            💾 Download
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => shareQr("qr-code.png")}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                            📤 Teilen
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
