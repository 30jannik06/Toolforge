"use client";

import React from "react";
import { motion } from "framer-motion";

interface ToolLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
                                                          title,
                                                          description,
                                                          children,
                                                      }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto mt-10 flex flex-col gap-10"
        >
            {/* Header */}
            <div className="text-center flex flex-col gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    <span className="text-blue-400">{title}</span>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Main Container */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
                {children}
            </div>
        </motion.div>
    );
};
