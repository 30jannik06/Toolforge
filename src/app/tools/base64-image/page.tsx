"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Upload, Image as ImageIcon, Link2, AlertCircle } from "lucide-react";

export default function Base64ImageTool() {
    const [imageBase64, setImageBase64] = useState("");
    const [decodedImage, setDecodedImage] = useState("");
    const [preview, setPreview] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result?.toString() || "";
            setImageBase64(base64);
            setPreview(URL.createObjectURL(file));
            setError("");
        };
        reader.onerror = () => setError("❌ Fehler beim Lesen der Datei");
        reader.readAsDataURL(file);
    };

    const handleDecode = () => {
        try {
            const src = imageBase64.startsWith("data:image")
                ? imageBase64
                : `data:image/png;base64,${imageBase64}`;
            setDecodedImage(src);
            setError("");
        } catch {
            setError("❌ Ungültige Base64-Daten");
        }
    };

    const handleCopy = async () => {
        if (!imageBase64) return;
        await navigator.clipboard.writeText(imageBase64);
        setError("");
    };

    const handleOpen = () => {
        if (!decodedImage) return;
        try {
            const [header, data] = decodedImage.split(",");
            const mime = header.match(/:(.*?);/)?.[1] || "image/png";
            const byteString = atob(data);
            const u8arr = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) u8arr[i] = byteString.charCodeAt(i);
            const blob = new Blob([u8arr], { type: mime });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => URL.revokeObjectURL(url), 30000);
        } catch {
            setError("❌ Konnte Bild nicht öffnen.");
        }
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
                Base64 Image Converter
            </h1>
            <p className="text-gray-400 mb-8">
                Wandle Bilder in Base64 um oder dekodiere Base64-Strings zu Bildern.
            </p>

            {/* Mode Switch */}
            <div className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-1 mb-8 backdrop-blur-xl">
                {(["encode", "decode"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => {
                            setMode(m);
                            setDecodedImage("");
                            setImageBase64("");
                            setPreview("");
                        }}
                        className={`px-5 py-2.5 rounded-md font-medium transition-all ${
                            mode === m
                                ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                : "text-gray-300 hover:bg-white/10"
                        }`}
                    >
                        {m === "encode" ? "Bild → Base64" : "Base64 → Bild"}
                    </button>
                ))}
            </div>

            {/* ENCODE */}
            {mode === "encode" && (
                <div className="flex flex-col items-center gap-6 w-full">
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    >
                        <Upload className="w-5 h-5" /> Bild auswählen
                    </label>
                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

                    {preview && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-400 text-sm">Vorschau:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-64 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            />
                        </div>
                    )}

                    {imageBase64 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full flex flex-col items-center gap-3"
                        >
              <textarea
                  readOnly
                  value={imageBase64}
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-200 resize-none shadow-inner"
              />
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-sm transition"
                            >
                                <Copy className="w-4 h-4" /> In Zwischenablage kopieren
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

            {/* DECODE */}
            {mode === "decode" && (
                <div className="flex flex-col items-center gap-6 w-full">
          <textarea
              placeholder="Base64 eingeben oder einfügen …"
              value={imageBase64}
              onChange={(e) => setImageBase64(e.target.value)}
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-200 resize-none shadow-inner"
          />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDecode}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    >
                        <ImageIcon className="w-5 h-5" /> Decoden
                    </motion.button>

                    {decodedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 mt-2"
                        >
                            <p className="text-gray-400 text-sm">Bildvorschau:</p>
                            <img
                                src={decodedImage}
                                alt="Decoded"
                                className="max-h-64 rounded-xl border border-white/10 shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                            />

                            <button
                                onClick={handleOpen}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg text-sm transition"
                            >
                                <Link2 className="w-4 h-4" /> In neuem Tab öffnen
                            </button>
                        </motion.div>
                    )}
                </div>
            )}

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
