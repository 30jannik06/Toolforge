/**
 * Wandelt das aktuell gerenderte QR-SVG in eine PNG-DataURL um.
 */
export async function qrSvgToPngDataUrl(): Promise<string | null> {
    const svg = document.querySelector("svg");
    if (!svg) return null;

    try {
        const xml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(unescape(encodeURIComponent(xml)));
        const image64 = `data:image/svg+xml;base64,${svg64}`;

        const img = new Image();
        img.src = image64;
        await new Promise((res) => (img.onload = res));

        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        return canvas.toDataURL("image/png");
    } catch (err) {
        console.error("QR-Umwandlung fehlgeschlagen:", err);
        return null;
    }
}

/**
 * Kopiert den aktuellen QR-Code als Base64-String (PNG) in die Zwischenablage.
 */
export async function copyQrAsBase64() {
    const dataUrl = await qrSvgToPngDataUrl();
    if (!dataUrl) {
        alert("❌ Kein QR-Code gefunden.");
        return;
    }

    try {
        await navigator.clipboard.writeText(dataUrl);
        alert("✅ QR-Code als Base64 kopiert!");
    } catch {
        alert("❌ Kopieren fehlgeschlagen.");
    }
}

/**
 * Lädt den aktuellen QR-Code als PNG herunter.
 */
export async function downloadQrAsPng(filename = "qr-code.png") {
    const dataUrl = await qrSvgToPngDataUrl();
    if (!dataUrl) {
        alert("❌ Kein QR-Code gefunden.");
        return;
    }

    try {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("Download fehlgeschlagen:", err);
        alert("❌ Download fehlgeschlagen.");
    }
}

/**
 * Teilt den aktuellen QR-Code über die Web Share API (wenn verfügbar).
 * Falls der Browser es nicht unterstützt, wird ein Fallback-Link angezeigt.
 */
export async function shareQr(filename = "qr-code.png") {
    const dataUrl = await qrSvgToPngDataUrl();
    if (!dataUrl) {
        alert("❌ Kein QR-Code gefunden.");
        return;
    }

    try {
        // DataURL → Blob
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], filename, { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: "QR-Code teilen",
                text: "Hier ist mein generierter QR-Code!",
                files: [file],
            });
        } else {
            // Fallback → öffnet QR in neuem Tab
            const link = document.createElement("a");
            link.href = dataUrl;
            link.target = "_blank";
            link.click();
            alert("📎 Teilen nicht unterstützt – QR wurde im neuen Tab geöffnet.");
        }
    } catch (err) {
        console.error("Share-Fehler:", err);
        alert("❌ Teilen fehlgeschlagen.");
    }
}
