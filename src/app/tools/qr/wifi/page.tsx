"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

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

    const handleCopyBase64 = async () => {
        try {
            const canvas = document.createElement("canvas");
            const svg = document.querySelector("svg");
            if (!svg) return alert("Kein QR-Code gefunden");

            const xml = new XMLSerializer().serializeToString(svg);
            const svg64 = btoa(unescape(encodeURIComponent(xml)));
            const image64 = `data:image/svg+xml;base64,${svg64}`;

            const img = new Image();
            img.src = image64;
            await new Promise((res) => (img.onload = res));

            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);

            const pngUrl = canvas.toDataURL("image/png");
            await navigator.clipboard.writeText(pngUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            alert("❌ Fehler beim Kopieren als Base64");
        }
    };

    const handleDownload = async () => {
        try {
            const canvas = document.createElement("canvas");
            const svg = document.querySelector("svg");
            if (!svg) return alert("Kein QR-Code gefunden");

            const xml = new XMLSerializer().serializeToString(svg);
            const svg64 = btoa(unescape(encodeURIComponent(xml)));
            const image64 = `data:image/svg+xml;base64,${svg64}`;

            const img = new Image();
            img.src = image64;
            await new Promise((res) => (img.onload = res));

            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);

            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "wifi-qr.png";
            link.click();
        } catch {
            alert("❌ Fehler beim Download");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400">WLAN QR-Code Generator</h1>
            <p className="text-gray-400 max-w-md">
                Erstelle einen QR-Code, mit dem sich Gäste automatisch in dein WLAN einloggen können.
            </p>

            <div className="flex flex-col gap-3 w-full">
                <input
                    type="text"
                    placeholder="SSID (WLAN-Name)"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />

                {encryption !== "nopass" && (
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}

                <select
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Offenes WLAN</option>
                </select>
            </div>

            <button
                onClick={handleGenerate}
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold mt-2"
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
                            onClick={handleCopyBase64}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                        >
                            {copied ? "✅ Kopiert!" : "📋 Als Base64 kopieren"}
                        </button>
                        <button
                            onClick={handleDownload}
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
