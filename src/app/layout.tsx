import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { BackgroundGlow } from "@/components/backgroundGlow";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ToolForge",
    description: "Dein stylisches Tool-Dashboard.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
        <body
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white antialiased relative overflow-x-hidden`}
        >
        {/* 👇 Glow unter allem */}
        <BackgroundGlow />

        {/* Navbar bleibt darüber */}
        <Navbar />

        {/* Hauptinhalt */}
        <main className="flex flex-col items-center px-6 py-16 max-w-6xl mx-auto">
            {children}
        </main>
        </body>
        </html>
    );
}
