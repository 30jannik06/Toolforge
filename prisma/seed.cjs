// prisma/seed.cjs
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.feature.createMany({
        data: [
            { key: "qr_text", name: "QR Text", category: "QR", route: "/tools/qr/text", icon: "QrCode" },
            { key: "qr_wifi", name: "QR WLAN", category: "QR", route: "/tools/qr/wifi", icon: "Wifi" },
            { key: "base64_text", name: "Base64 Text", category: "Encoder", route: "/tools/base64-text", icon: "Binary" },
            { key: "base64_image", name: "Base64 Image", category: "Encoder", route: "/tools/base64-image", icon: "Image" },
            { key: "hash_generator", name: "Hash Generator", category: "Dev", route: "/tools/hash", icon: "Hash" },
            { key: "url_inspector", name: "URL Inspector", category: "Web", route: "/tools/url", icon: "Globe" }
        ],
    });

    console.log("✅ Features seeded!");
}

main()
    .catch((err) => {
        console.error("❌ Fehler beim Seeden:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
