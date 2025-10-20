import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import NextAuthProvider from "@/components/sessionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ToolForge",
    description: "Dein stylisches Tool-Dashboard.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de">
        <body
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#0a0a0a] text-white antialiased relative overflow-x-hidden`}
        >
        {/* 🔹 Der SessionProvider sorgt dafür, dass useSession() funktioniert */}
        <NextAuthProvider>
            {/* 🔹 Der ClientLayout rendert Navbar, Glow & Seiteninhalt */}
            <ClientLayout>{children}</ClientLayout>
        </NextAuthProvider>
        </body>
        </html>
    );
}
