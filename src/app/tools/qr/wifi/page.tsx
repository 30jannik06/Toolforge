"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { copyQrAsBase64, downloadQrAsPng } from "@/lib/qrUtilis";

export default function QRWiFiTool() {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
    const [qrValue, setQrValue] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        if (!ssid.trim()) return;
        const wifiString = `WIFI:T:${encryption};S:${ssid};${
            encryption !== "nopass" ? `P:${password};` : ""
        };`;
        setQrValue(wifiString);
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
                    WLAN
                </span>{" "}
                QR-Code Generator
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-md">
                Erstelle QR-Codes, damit Gäste sich mit einem Scan direkt in dein WLAN verbinden.
            </p>

            {/* Input Fields */}
            <div className="flex flex-col gap-4 w-full mt-2">
                <input
                    type="text"
                    placeholder="SSID (WLAN-Name)"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {encryption !== "nopass" && (
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                )}

                <select
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Offenes WLAN</option>
                </select>
            </div>

            {/* Generate Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGenerate}
                className="mt-2 bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
                QR-Code generieren
            </motion.button>

            {/* Output */}
            {qrValue && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-5 mt-6"
                >
                    <div className="bg-white p-4 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10">
                        <QRCode value={qrValue} size={200} />
                    </div>

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
                            onClick={() => downloadQrAsPng("wifi-qr.png")}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                            💾 Download
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
