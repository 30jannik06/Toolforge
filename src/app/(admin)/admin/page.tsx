"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ShortlinkManager } from "@/app/(admin)/admin/components/shortLinkManager";
import { FeatureManager } from "@/app/(admin)/admin/components/featureManager";
import Dashboard from "@/app/(admin)/admin/components/dashboard";
import SystemStatus from "@/app/(admin)/admin/components/systemStatus";

type NavSection = "dashboard" | "shortlinks" | "features" | "systemstatus";

export default function AdminPage() {
    const [active, setActive] = useState<NavSection>("features");

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
