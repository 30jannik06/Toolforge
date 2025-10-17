"use client";
import { motion } from "framer-motion";

export function BackgroundGlow() {
    return (
        <motion.div
            className="fixed inset-0 -z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[160px]"
                style={{ top: "10%", left: "15%" }}
                animate={{
                    backgroundColor: [
                        "rgba(59,130,246,0.25)", // blau
                        "rgba(147,51,234,0.25)", // lila
                        "rgba(6,182,212,0.25)",  // cyan
                        "rgba(59,130,246,0.25)", // zurück zu blau
                    ],
                    x: [0, 60, -60, 0],
                    y: [0, -40, 40, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full blur-[200px]"
                style={{ bottom: "-10%", right: "10%" }}
                animate={{
                    backgroundColor: [
                        "rgba(147,51,234,0.15)",
                        "rgba(59,130,246,0.15)",
                        "rgba(236,72,153,0.15)",
                        "rgba(147,51,234,0.15)",
                    ],
                    x: [0, -100, 100, 0],
                    y: [0, 50, -50, 0],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
}
