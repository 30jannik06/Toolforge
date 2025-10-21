"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ShortlinkManager } from "@/app/(admin)/admin/components/shortLinkManager";
import { FeatureManager } from "@/app/(admin)/admin/components/featureManager";
import Dashboard from "@/app/(admin)/admin/components/dashboard";
import SystemStatus from "@/app/(admin)/admin/components/systemStatus";

type NavSection = "dashboard" | "shortlinks" | "features" | "systemstatus";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [active, setActive] = useState<NavSection>("features");

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.replace("/login?unauthorized=true");
        else if (session.user.role !== "ADMIN")
            router.replace("/login?unauthorized=true");
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="h-screen flex items-center justify-center text-gray-400">
                Lädt...
            </div>
        );
    }

    if (!session || session.user.role !== "ADMIN") return null;

    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white flex overflow-hidden">
            <Sidebar active={active} setActive={setActive} />

            <main className="ml-64 flex-1 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-radial from-blue-600/20 via-transparent to-transparent blur-3xl" />
                <div className="p-10 h-full overflow-y-auto">
                    {active === "dashboard" && <Dashboard />}
                    {active === "features" && <FeatureManager />}
                    {active === "shortlinks" && <ShortlinkManager />}
                    {active === "systemstatus" && <SystemStatus />}
                </div>
            </main>
        </div>
    );
}
