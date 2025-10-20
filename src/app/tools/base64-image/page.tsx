"use client";

import {useState} from "react";
import {motion} from "framer-motion";

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
        alert("✅ Base64 in Zwischenablage kopiert!");
    };

    const handleOpen = () => {
        if (!decodedImage) return;

        try {
            const [header, data] = decodedImage.split(",");
            const mime = header.match(/:(.*?);/)?.[1] || "image/png";
            const byteString = atob(data);
            const u8arr = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                u8arr[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([u8arr], { type: mime });
            const url = URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => URL.revokeObjectURL(url), 30000);
        } catch {
            alert("❌ Konnte Bild nicht öffnen.");
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400">Base64 Image Encoder / Decoder</h1>
            <p className="text-gray-400">
                Wandle Bilder in Base64 um oder zeige ein Base64-Bild direkt an.
            </p>

            {/* Mode Switch */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => {
                        setMode("encode");
                        setDecodedImage("");
                        setImageBase64("");
                        setPreview("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                        mode === "encode"
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                >
                    Encode (Bild → Base64)
                </button>

                <button
                    onClick={() => {
                        setMode("decode");
                        setDecodedImage("");
                        setImageBase64("");
                        setPreview("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                        mode === "decode"
                            ? "bg-blue-500 border-blue-500 text-white"
                            : "bg-transparent border-white/20 text-gray-300 hover:bg-white/10"
                    }`}
                >
                    Decode (Base64 → Bild)
                </button>
            </div>

            {/* ENCODE */}
            {mode === "encode" && (
                <div className="flex flex-col items-center gap-4 w-full mt-4">
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white transition"
                    >
                        📁 Bild auswählen
                    </label>
                    <input id="fileInput" type="file" accept="image/*" onChange={handleFileUpload} className="hidden"/>

                    {preview && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-400 text-sm">Vorschau:</p>
                            <img src={preview} alt="Preview"
                                 className="max-h-64 rounded-lg border border-white/20 shadow-md"/>
                        </div>
                    )}

                    {imageBase64 && (
                        <>
              <textarea
                  readOnly
                  value={imageBase64}
                  className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-3 text-xs text-white resize-none"
              />
                            <button
                                onClick={handleCopy}
                                className="mt-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                            >
                                📋 Kopieren
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* DECODE */}
            {mode === "decode" && (
                <div className="flex flex-col items-center gap-4 w-full mt-4">
          <textarea
              placeholder="Base64 eingeben oder einfügen …"
              value={imageBase64}
              onChange={(e) => setImageBase64(e.target.value)}
              className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-white resize-none"
          />
                    <button
                        onClick={handleDecode}
                        className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold"
                    >
                        Decoden
                    </button>

                    {decodedImage && (
                        <div className="flex flex-col items-center mt-2 gap-3">
                            <p className="text-gray-400 text-sm">Bildvorschau:</p>
                            <img
                                src={decodedImage}
                                alt="Decoded"
                                className="max-h-64 rounded-lg border border-white/20 shadow-md"
                            />

                            {/* Buttons unter der Vorschau */}
                            <div className="flex gap-4 mt-2">
                                <button
                                    onClick={handleOpen}
                                    className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                                >
                                    🔗 In neuem Tab öffnen
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </motion.div>
    );
}
