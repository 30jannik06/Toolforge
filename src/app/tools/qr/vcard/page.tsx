"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import {copyQrAsBase64, downloadQrAsPng} from "@/lib/qrUtilis";

export default function QRVCardTool() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [copied, setCopied] = useState(false);

    const generateVCard = () => {
        if (!firstName && !lastName) return alert("Bitte mindestens einen Namen eingeben.");

        const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${company}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD
    `.trim();

        setQrValue(vcard);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center w-full max-w-2xl"
        >
            <h1 className="text-3xl font-bold text-blue-400">vCard / Kontakt QR-Code</h1>
            <p className="text-gray-400 max-w-md">
                Erstelle einen QR-Code, der beim Scannen automatisch einen Kontakt speichert.
            </p>

            <div className="flex flex-col gap-3 w-full">
                <input
                    type="text"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Firma"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="tel"
                    placeholder="Telefon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={generateVCard}
                className="bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg font-semibold mt-2"
            >
                Generieren
            </button>

            {qrValue && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-4 mt-4"
                >
                    <div className="bg-white p-4 rounded-xl">
                        <QRCode value={qrValue} size={200} />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={copyQrAsBase64}
                            className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1 rounded-lg text-sm transition"
                        >
                            {copied ? "✅ Kopiert!" : "📋 Als Base64 kopieren"}
                        </button>
                        <button
                            onClick={() => downloadQrAsPng("wifi-qr.png")}
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg text-sm font-semibold transition"
                        >
                            💾 Download PNG
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
