"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Binary, Copy, Type, AlertCircle } from "lucide-react";

export default function Base64TextTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
            setError("");
        } catch {
            setError("❌ Ungültige Eingabe – überprüfe deinen Text.");
            setOutput("");
        }
    };

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center w-full max-w-3xl mx-auto min-h-[80vh] text-white"
        >
            {/* Header */}
            <h1 className="text-4xl font-extrabold text-blue-400 mb-2">
                Base64 Text Converter
            </h1>
            <p className="text-gray-400 mb-8">
                Konvertiere Text in Base64 oder dekodiere Base64 wieder zu Klartext.
            </p>

            {/* Mode Switch */}
            <div className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-1 mb-8 backdrop-blur-xl">
                {(["encode", "decode"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => {
                            setMode(m);
                            setOutput("");
                            setError("");
                            setInput("");
                        }}
                        className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                            mode === m
                                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        {m === "encode" ? "Text → Base64" : "Base64 → Text"}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <div className="w-full flex flex-col gap-3 mb-6">
        <textarea
            placeholder={
                mode === "encode"
                    ? "Gib hier deinen Text ein, um ihn in Base64 zu encodieren..."
                    : "Füge hier Base64-Text ein, um ihn zu decodieren..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-200 resize-none shadow-inner"
        />
            </div>

            {/* Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConvert}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
                {mode === "encode" ? (
                    <>
                        <Binary className="w-5 h-5" /> Encoden
                    </>
                ) : (
                    <>
                        <Type className="w-5 h-5" /> Decoden
                    </>
                )}
            </motion.button>

            {/* Output */}
            {output && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full mt-8 flex flex-col items-center gap-3"
                >
                    <label className="block text-gray-400 text-sm">Ergebnis:</label>
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-200 resize-none shadow-inner"
                    />
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-sm transition"
                    >
                        <Copy className="w-4 h-4" /> In Zwischenablage kopieren
                    </button>
                </motion.div>
            )}

            {/* Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-red-400 text-sm mt-4"
                >
                    <AlertCircle className="w-4 h-4" /> {error}
                </motion.div>
            )}
        </motion.div>
    );
}
