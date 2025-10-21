"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Server } from "lucide-react";

interface Status {
    ok: boolean;
    database: string;
    features?: number;
    shortlinks?: number;
    version?: string;
    node?: string;
    timestamp?: string;
    error?: string;
}

export default function SystemStatus() {
    const [status, setStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/status")
            .then((res) => res.json())
            .then(setStatus)
            .finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Server className="w-6 h-6 text-blue-400" />
                Systemstatus
            </h1>
            <p className="text-gray-400 mb-6">
                Überblick über den aktuellen Zustand deiner ToolForge-Instanz.
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                </div>
            ) : status ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatusCard
                        title="Datenbank"
                        status={status.database === "online"}
                        info={`${status.features} Features, ${status.shortlinks} Links`}
                    />
                    <StatusCard
                        title="API-Routen"
                        status={status.ok}
                        info="/api/features & /api/shortlinks erreichbar"
                    />
                    <StatusCard
                        title="Server"
                        status
                        info={`Node ${status.node} | Version ${status.version}`}
                    />
                </div>
            ) : (
                <p className="text-red-400">Fehler beim Laden des Status.</p>
            )}
        </motion.div>
    );
}

function StatusCard({
                        title,
                        status,
                        info,
                    }: {
    title: string;
    status: boolean;
    info?: string;
}) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {status ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                )}
            </div>
            <p className="text-sm text-gray-400 mt-2">{info}</p>
        </div>
    );
}
