"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Upload } from "lucide-react";

export default function ImageCompressorPage() {
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [quality, setQuality] = useState(0.7);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        compressImage(file);
    };

    const compressImage = (file: File) => {
        setLoading(true);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new window.Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const scale = 0.6;
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const compressed = canvas.toDataURL("image/jpeg", quality);
                setCompressedUrl(compressed);
                setLoading(false);
            };

            img.onerror = () => {
                alert("❌ Fehler beim Laden des Bildes.");
                setLoading(false);
            };
        };

        reader.onerror = () => {
            alert("❌ Fehler beim Lesen der Datei.");
            setLoading(false);
        };

        reader.readAsDataURL(file);
    };

    const handleDownload = () => {
        if (!compressedUrl) return;

        // Base64 → Blob → Download
        const [meta, data] = compressedUrl.split(",");
        const mime = meta.match(/:(.*?);/)?.[1] ?? "image/jpeg";
        const byteString = atob(data);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

        const blob = new Blob([ab], { type: mime });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `compressed_${fileName || "image"}.jpg`;
        a.click();

        setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400 mb-2">
                🧩 Image Compressor
            </h1>
            <p className="text-gray-400 mb-6">
                Komprimiere Bilder direkt im Browser – lokal, sicher und blitzschnell.
            </p>

            {/* Upload Section */}
            <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-8 w-full hover:border-blue-400 transition"
            >
                <Upload className="w-8 h-8 text-blue-400 mb-3" />
                <p className="text-gray-300">
                    <span className="font-semibold">Bild hochladen</span> oder hier ablegen
                </p>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            {/* Quality Slider */}
            <div className="w-full flex flex-col items-center mt-6">
                <label className="text-sm text-gray-400 mb-2">
                    Komprimierungsqualität: {Math.round(quality * 100)}%
                </label>
                <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-64 accent-blue-500 cursor-pointer"
                />
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-gray-400 mt-6 animate-pulse">
                    🔄 Komprimiere dein Bild ...
                </p>
            )}

            {/* Preview */}
            {compressedUrl && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-3 mt-6"
                >
                    <img
                        src={compressedUrl}
                        alt="Compressed"
                        className="max-h-72 rounded-lg border border-white/10 shadow-lg"
                    />

                    <button
                        onClick={handleDownload}
                        className="mt-3 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold transition"
                    >
                        <Download className="w-4 h-4" />
                        Download
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
