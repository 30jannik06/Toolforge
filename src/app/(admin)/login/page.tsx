"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        if (!res?.error) router.push("/admin");
        else setError("Falsche Login-Daten 😅");
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a] text-white relative overflow-hidden">
            {/* Hintergrund Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-blue-600/10 via-purple-800/10 to-transparent blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-6 text-center p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl w-[350px]"
            >
                <h1 className="text-3xl font-bold text-blue-400">Admin Login</h1>

                <div className="flex flex-col gap-3 w-full">
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold w-full"
                >
                    Login
                </button>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex justify-between w-full text-sm text-gray-400 mt-2">
                    <Link href="/" className="hover:text-blue-400 transition">
                        ← Zur Startseite
                    </Link>
                    <button
                        className="hover:text-blue-400 transition"
                        onClick={() => alert("Passwort-Reset ist aktuell deaktiviert.")}
                    >
                        Passwort vergessen?
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
