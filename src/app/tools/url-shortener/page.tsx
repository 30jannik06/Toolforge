"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { motion } from "framer-motion";
import { Copy, Link2, Check } from "lucide-react";

export default function UrlShortenerPage() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const shorten = async () => {
        setError("");
        setShortUrl("");
        setCopied(false);

        if (!url.trim()) return setError("❌ Bitte gib eine gültige URL ein.");

        setLoading(true);
        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            setLoading(false);

            if (data.error) return setError(data.error);
            setShortUrl(data.shortUrl);
        } catch {
            setError("⚠️ Etwas ist schiefgelaufen – versuch’s nochmal.");
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!shortUrl) return;
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="🔗 URL Shortener"
            description="Verkürze lange Links – stylisch, schnell & lokal verarbeitet."
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-6 w-full max-w-2xl"
            >
                {/* Eingabefeld */}
                <div className="w-full flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="https://deine-lange-url.de/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition"
                    />
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={shorten}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition disabled:opacity-50"
                    >
                        {loading ? "⏳ Verkürze..." : "URL verkürzen"}
                        <Link2 className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Fehlermeldung */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg w-full text-center"
                    >
                        {error}
                    </motion.p>
                )}

                {/* Erfolgreiche Ausgabe */}
                {shortUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-4 w-full text-center shadow-lg"
                    >
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition text-sm break-all"
                        >
                            {shortUrl}
                        </a>

                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-1 rounded-lg text-sm bg-white/10 hover:bg-white/20 border border-white/10 transition text-gray-200"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-400" />
                                    Kopiert!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Kopieren
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </ToolLayout>
    );
}
