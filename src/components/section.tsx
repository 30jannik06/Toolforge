"use client";

import React from "react";

export function Section({
                            title,
                            children,
                        }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-blue-400">{title}</h2>
            {children}
        </section>
    );
}
