"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";

export default function TextFormatterPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const formatJSON = () => {
        try {
            setOutput(JSON.stringify(JSON.parse(input), null, 2));
        } catch {
            setOutput("❌ Ungültiges JSON");
        }
    };

    const toUpper = () => setOutput(input.toUpperCase());
    const toLower = () => setOutput(input.toLowerCase());

    return (
        <ToolLayout
            title="Text Formatter"
            description="Formatiere Text oder JSON blitzschnell und übersichtlich."
        >
            <div className="flex flex-col gap-6">
        <textarea
            placeholder="Text oder JSON hier einfügen..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
                <div className="flex gap-3 flex-wrap">
                    <Button onClick={formatJSON}>JSON formatieren</Button>
                    <Button variant="outline" className={"text-black"} onClick={toUpper}>
                        Großbuchstaben
                    </Button>
                    <Button variant="outline" className={"text-black"} onClick={toLower}>
                        Kleinbuchstaben
                    </Button>
                </div>
                <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-black/30 border border-white/10 rounded-lg p-4 text-sm whitespace-pre-wrap text-gray-200 overflow-auto"
                >
                    {output || "→ Ausgabe erscheint hier"}
                </motion.pre>
            </div>
        </ToolLayout>
    );
}
