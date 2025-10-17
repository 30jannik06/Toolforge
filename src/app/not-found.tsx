"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-[70vh] flex flex-col items-center justify-center gap-8 text-center"
        >
            {/* ✨ Animation oben */}
            <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
                <span className="text-5xl">🧭</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl font-bold text-blue-400">404</h1>

            {/* Beschreibung */}
            <p className="text-gray-300 text-lg max-w-md">
                Oops! Diese Seite existiert nicht oder der Shortlink ist ungültig.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-2">
                <Button asChild>
                    <Link href="/">Zurück zur Startseite</Link>
                </Button>
                <Button variant="outline" className={"text-black"} asChild>
                    <Link href="/tools">Tools ansehen</Link>
                </Button>
            </div>
        </motion.div>
    );
}
