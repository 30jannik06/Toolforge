"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Feature {
    id: number;
    name: string;
    enabled: boolean;
    category?: string | null;
    description?: string | null;
}

export function FeatureManager() {
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/features?all=true")
            .then((res) => res.json())
            .then((data) => setFeatures(data))
            .finally(() => setLoading(false));
    }, []);

    const toggleFeature = async (id: number, enabled: boolean) => {
        setUpdating(id);
        await fetch("/api/features", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, enabled }),
        });
        setFeatures((prev) =>
            prev.map((f) => (f.id === id ? { ...f, enabled } : f))
        );
        setUpdating(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-blue-400 mb-4">Features</h1>
            <p className="text-gray-400 mb-6">
                Hier kannst du alle Tools sehen, aktivieren oder deaktivieren.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.02 }}
                        className={`relative rounded-xl p-5 transition-all border backdrop-blur-xl 
                            ${feature.enabled
                            ? "bg-blue-500/5 border-blue-500/20"
                            : "bg-white/5 border-white/10 hover:border-blue-400/20"}
                        `}
                    >
                        <h3 className="text-lg font-semibold text-white mb-1">
                            {feature.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            {feature.category ?? "Allgemein"}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={feature.enabled}
                                    onCheckedChange={(v) => toggleFeature(feature.id, v)}
                                    disabled={updating === feature.id}
                                />
                                {updating === feature.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                                ) : feature.enabled ? (
                                    <span className="flex items-center gap-1 text-green-400 text-sm">
                                        <CheckCircle2 className="w-4 h-4" /> Aktiv
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-400 text-sm">
                                        <XCircle className="w-4 h-4" /> Deaktiviert
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Glare Effekt */}
                        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
