"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";

export default function ImageCompressorPage() {
    const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d")!;
                const scale = 0.6;
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressed = canvas.toDataURL("image/jpeg", 0.7);
                setCompressedUrl(compressed);
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <ToolLayout
            title="Image Compressor"
            description="Reduziere Bildgröße direkt im Browser – lokal, ohne Uploads."
        >
            <div className="flex flex-col items-center gap-6">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {compressedUrl && (
                    <motion.img
                        src={compressedUrl}
                        alt="compressed"
                        className="max-w-full rounded-lg border border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                )}
            </div>
        </ToolLayout>
    );
}
