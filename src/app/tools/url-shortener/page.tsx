"use client";

import React, { useState } from "react";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UrlShortenerPage() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const shorten = async () => {
        setError("");
        setShortUrl("");

        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            if (data.error) return setError(data.error);

            setShortUrl(data.shortUrl);
        } catch (e) {
            setError("Etwas ist schiefgelaufen 😬");
        }
    };

    return (
        <ToolLayout
            title="URL Shortener"
            description="Verkürze lange URLs schnell und simpel – mit echter Weiterleitung."
        >
            <div className="flex flex-col items-center gap-6">
                <input
                    type="text"
                    placeholder="Lange URL hier einfügen..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button onClick={shorten}>Verkürzen</Button>

                {error && (
                    <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                        {error}
                    </p>
                )}

                {shortUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-blue-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10"
                    >
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                    </motion.div>
                )}
            </div>
        </ToolLayout>
    );
}
