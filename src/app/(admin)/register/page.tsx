"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Loader2 } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        setError("");
        setSuccess(false);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || "Registrierung fehlgeschlagen 😕");
            return;
        }

        setSuccess(true);
        setTimeout(() => router.push("/login?registered=true"), 1500);
    };

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden relative">
            {/* --- Hintergrund Glow --- */}
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-blue-700/30 via-transparent to-transparent blur-3xl opacity-70" />

            {/* --- Header --- */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-6 text-center"
            >
                <Link href="/" className="text-2xl font-semibold hover:text-blue-400 transition">
                    ⚙️ ToolForge
                </Link>
                <p className="text-gray-400 text-sm mt-1">
                    Dein Zugang zum ToolForge-Universum
                </p>
            </motion.div>

            {/* --- Register Box --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-6 text-center bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl px-10 py-8 shadow-2xl"
            >
                <div className="flex items-center gap-2 mb-2">
                    <UserPlus className="w-6 h-6 text-blue-400" />
                    <h1 className="text-2xl font-bold text-blue-400">Registrieren</h1>
                </div>

                <p className="text-gray-400 text-sm -mt-3">
                    Erstelle dein persönliches ToolForge-Konto
                </p>

                <div className="flex flex-col gap-4 mt-2">
                    <input
                        type="text"
                        placeholder="Name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-64 text-center outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-64 text-center outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-64 text-center outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {success && (
                        <p className="text-green-400 text-sm">
                            ✅ Registrierung erfolgreich! Weiterleitung …
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={loading}
                        onClick={handleRegister}
                        className={`${
                            loading
                                ? "bg-blue-500/40 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        } transition px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Registriere …
                            </>
                        ) : (
                            "Registrieren"
                        )}
                    </motion.button>
                </div>

                {/* --- Footer Links --- */}
                <div className="flex flex-col items-center mt-4 text-sm">
                    <Link
                        href="/login"
                        className="text-gray-400 hover:text-blue-400 transition"
                    >
                        ← Zum Login
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-blue-400 transition mt-1"
                    >
                        Zurück zur Hauptseite
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
