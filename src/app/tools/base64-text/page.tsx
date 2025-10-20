"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
        alert("✅ In Zwischenablage kopiert!");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400">
                Base64 Text Encoder / Decoder
            </h1>
            <p className="text-gray-400">
                Konvertiere Text einfach in Base64 oder zurück.
            </p>

            {/* Mode Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => {
                        setMode("encode");
                        setOutput("");
                        setError("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                        mode === "encode"
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                >
                    Encode (Text → Base64)
                </button>

                <button
                    onClick={() => {
                        setMode("decode");
                        setOutput("");
                        setError("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                        mode === "decode"
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                >
                    Decode (Base64 → Text)
                </button>
            </div>

            {/* Input */}
            <textarea
                placeholder={
                    mode === "encode"
                        ? "Text eingeben, der encodiert werden soll ..."
                        : "Base64 eingeben, der decodiert werden soll ..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Convert Button */}
            <button
                onClick={handleConvert}
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold"
            >
                {mode === "encode" ? "Encoden" : "Decoden"}
            </button>

            {/* Output */}
            {output && (
                <div className="w-full">
                    <label className="block text-gray-400 mb-2">Ergebnis:</label>
                    <textarea
                        readOnly
                        value={output}
                        className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-white resize-none"
                    />
                    <button
                        onClick={handleCopy}
                        className="mt-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                    >
                        📋 Kopieren
                    </button>
                </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </motion.div>
    );
}
