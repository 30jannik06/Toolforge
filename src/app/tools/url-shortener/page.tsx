"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";

export default function UrlShortenerPage() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const shorten = () => {
        if (!url.startsWith("http")) return setShortUrl("❌ Ungültige URL");
        const hash = Math.random().toString(36).substring(2, 8);
        setShortUrl(`https://toolforge.link/${hash}`);
    };

    return (
        <ToolLayout
            title="URL Shortener"
            description="Verkürze lange URLs schnell und simpel – als Demo lokal simuliert."
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
                {shortUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-blue-400 bg-white/5 px-4 py-2 rounded-lg border border-white/10"
                    >
                        {shortUrl}
                    </motion.div>
                )}
            </div>
        </ToolLayout>
    );
}
