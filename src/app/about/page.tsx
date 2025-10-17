"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Wrench } from "lucide-react";

const AboutPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-24 mt-10"
        >
            {/* HERO SECTION */}
            <section className="text-center flex flex-col items-center gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl font-bold tracking-tight"
                >
                    Über <span className="text-blue-400">ToolForge</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 max-w-2xl leading-relaxed text-sm sm:text-base"
                >
                    ToolForge wurde entwickelt, um kleine, praktische Developer-Tools an
                    einem Ort zu vereinen – mit Fokus auf Design, Einfachheit und
                    Geschwindigkeit. Keine überladenen Dashboards, keine Ablenkung – nur
                    das, was du brauchst.
                </motion.p>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mt-6"
                >
                    <Button asChild>
                        <a href="/tools">Zu den Tools</a>
                    </Button>
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <Section title="Unsere Philosophie">
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Wrench className="w-6 h-6 text-blue-400" />,
                            title: "Effizienz",
                            text: "Schnell starten, produktiv bleiben – jedes Tool ist sofort einsatzbereit.",
                        },
                        {
                            icon: <Sparkles className="w-6 h-6 text-blue-400" />,
                            title: "Design",
                            text: "Klare Linien, dunkle Ästhetik und subtile Animationen für Fokus statt Chaos.",
                        },
                        {
                            icon: <Code2 className="w-6 h-6 text-blue-400" />,
                            title: "Transparenz",
                            text: "Open Source Code, klare Strukturen und kontinuierliche Weiterentwicklung.",
                        },
                    ].map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center backdrop-blur-xl"
                        >
                            <div className="flex justify-center mb-3">{f.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{f.text}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* CTA SECTION */}
            <Section title="Bereit loszulegen?">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <p className="text-gray-300 text-center max-w-md">
                        Entdecke die Tools, die deinen Workflow beschleunigen – ohne
                        Kompromisse bei Design oder Usability.
                    </p>
                    <Button asChild>
                        <a href="/tools">Jetzt starten</a>
                    </Button>
                </motion.div>
            </Section>
        </motion.div>
    );
};

export default AboutPage;
