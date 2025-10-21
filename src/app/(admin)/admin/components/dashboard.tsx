"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Link2, Cpu, Zap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";

interface StatsData {
    users: number;
    shortlinks: number;
    featuresTotal: number;
    featuresActive: number;
    shortlinkHistory: { date: string; links: number }[];
}

export default function Dashboard() {
    const [data, setData] = useState<StatsData | null>(null);

    useEffect(() => {
        fetch("/api/stats")
            .then((res) => res.json())
            .then(setData);
    }, []);

    if (!data)
        return (
            <div className="flex justify-center items-center h-64 text-gray-400">
                Lade Dashboard ...
            </div>
        );

    const stats = [
        { title: "Benutzer", value: data.users, icon: <Users className="w-5 h-5 text-blue-400" /> },
        { title: "Shortlinks", value: data.shortlinks, icon: <Link2 className="w-5 h-5 text-green-400" /> },
        { title: "Features gesamt", value: data.featuresTotal, icon: <Cpu className="w-5 h-5 text-pink-400" /> },
        { title: "Aktive Features", value: data.featuresActive, icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-3xl font-bold text-blue-400 mb-4">Dashboard</h1>
            <p className="text-gray-400 mb-8">
                Echtzeitübersicht deiner ToolForge-Aktivität.
            </p>

            {/* STATS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:bg-white/10 transition"
                    >
                        <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm flex items-center gap-2">
                {stat.icon}
                  {stat.title}
              </span>
                        </div>
                        <span className="text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Shortlinks (letzte 14 Tage)
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={data.shortlinkHistory}>
                            <defs>
                                <linearGradient id="colorLinks" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="date" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{
                                    background: "rgba(0,0,0,0.8)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                }}
                            />
                            <Area type="monotone" dataKey="links" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLinks)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">
                        Feature-Verhältnis
                    </h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={[
                            { name: "Aktiv", value: data.featuresActive },
                            { name: "Inaktiv", value: data.featuresTotal - data.featuresActive },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip
                                contentStyle={{
                                    background: "rgba(0,0,0,0.8)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}
