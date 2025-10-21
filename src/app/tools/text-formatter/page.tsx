"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { ArrowRight } from "lucide-react";

export default function TextFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const formatJSON = () => {
        try {
            const formatted = JSON.stringify(JSON.parse(input), null, 2);
            setOutput(formatted);
            setError("");
        } catch {
            setError("❌ Ungültiges JSON – überprüfe deine Eingabe!");
            setOutput("");
        }
    };

    const toUpper = () => {
        setOutput(input.toUpperCase());
        setError("");
    };

    const toLower = () => {
        setOutput(input.toLowerCase());
        setError("");
    };

    return (
        <ToolLayout
            title="🧠 Text Formatter"
            description="Formatiere Text oder JSON mit einem Klick – übersichtlich, lokal und sicher."
        >
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full max-w-3xl gap-6"
            >
                {/* Eingabe */}
                <textarea
                    placeholder="✏️ Text oder JSON hier einfügen..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition resize-none"
                />

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                    <button
                        onClick={formatJSON}
                        className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition flex items-center gap-2"
                    >
                        JSON formatieren
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={toUpper}
                        className="px-5 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-blue-400 transition"
                    >
                        GROSSBUCHSTABEN
                    </button>
                    <button
                        onClick={toLower}
                        className="px-5 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-blue-400 transition"
                    >
                        kleinbuchstaben
                    </button>
                </div>

                {/* Fehleranzeige */}
                {error && (
                    <p className="text-red-400 text-sm mt-1 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                {/* Ausgabe */}
                <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-200 whitespace-pre-wrap overflow-auto max-h-96 mt-2"
                >
                    {output || "→ Ausgabe erscheint hier ..."}
                </motion.pre>
            </motion.div>
        </ToolLayout>
    );
}
