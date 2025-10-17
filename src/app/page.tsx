"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center flex flex-col items-center justify-center gap-6 mt-16"
        >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Willkommen bei <span className="text-blue-400">ToolForge</span>
            </h1>

            <p className="text-gray-300 max-w-xl text-sm sm:text-base leading-relaxed">
                Deine zentrale Plattform für smarte kleine Tools – schnell, stylisch und
                alles an einem Ort. Starte jetzt mit einem Klick.
            </p>

            <div className="flex gap-4 mt-4">
                <Button asChild>
                    <a href="/tools">Zu den Tools</a>
                </Button>
                <Button variant="outline" className={"text-black"} asChild>
                    <a href="/about">Mehr erfahren</a>
                </Button>
            </div>
        </motion.section>
    );
}
