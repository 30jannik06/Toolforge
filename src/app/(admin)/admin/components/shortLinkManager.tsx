"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, PlusCircle, Link2, Search, SortAsc, SortDesc } from "lucide-react";

interface ShortLink {
    id: number;
    hash: string;
    originalUrl: string;
    createdAt: string;
}

type SortOption = "newest" | "oldest" | "az" | "za";

export function ShortlinkManager() {
    const [links, setLinks] = useState<ShortLink[]>([]);
    const [newUrl, setNewUrl] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState<SortOption>("newest");

    useEffect(() => {
        fetch("/api/shortlinks")
            .then((res) => res.json())
            .then((data) => {
                setLinks(data);
                setLoading(false);
            });
    }, []);

    async function handleAdd() {
        if (!newUrl.trim()) return;
        const res = await fetch("/api/shortlinks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ originalUrl: newUrl }),
        });
        const data = await res.json();
        setLinks((prev) => [data, ...prev]);
        setNewUrl("");
    }

    async function handleDelete(id: number) {
        await fetch("/api/shortlinks", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setLinks((prev) => prev.filter((l) => l.id !== id));
    }

    // 🔍 Filterung
    const filteredLinks = useMemo(() => {
        return links.filter(
            (l) =>
                l.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
                l.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [links, searchTerm]);

    // 🔄 Sortierung
    const sortedLinks = useMemo(() => {
        const sorted = [...filteredLinks];
        switch (sort) {
            case "newest":
                sorted.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;
            case "oldest":
                sorted.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
                break;
            case "az":
                sorted.sort((a, b) => a.hash.localeCompare(b.hash));
                break;
            case "za":
                sorted.sort((a, b) => b.hash.localeCompare(a.hash));
                break;
        }
        return sorted;
    }, [filteredLinks, sort]);

    if (loading)
        return <p className="text-gray-400 animate-pulse">Lade Shortlinks...</p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-2xl font-bold text-blue-400 mb-6">
                Shortlinks
            </h1>

            {/* Eingabe, Suche & Sortierung */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                {/* URL hinzufügen */}
                <div className="flex flex-1 gap-3">
                    <input
                        type="url"
                        placeholder="https://example.com"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                    >
                        <PlusCircle className="w-4 h-4" /> Hinzufügen
                    </button>
                </div>

                {/* Suchfeld */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Suchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none text-white w-full placeholder-gray-400"
                    />
                </div>

                {/* Sortierung */}
                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 outline-none appearance-none cursor-pointer"
                    >
                        <option value="newest">Neueste zuerst</option>
                        <option value="oldest">Älteste zuerst</option>
                        <option value="az">A–Z</option>
                        <option value="za">Z–A</option>
                    </select>
                    <div className="absolute right-2 top-2.5 text-gray-400 pointer-events-none">
                        {sort === "newest" || sort === "oldest" ? (
                            <SortDesc className="w-4 h-4" />
                        ) : (
                            <SortAsc className="w-4 h-4" />
                        )}
                    </div>
                </div>
            </div>

            {/* Tabelle */}
            <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5">
                    <tr className="text-gray-400">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Kurzlink</th>
                        <th className="px-4 py-3">Original-URL</th>
                        <th className="px-4 py-3">Erstellt</th>
                        <th className="px-4 py-3 text-right">Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedLinks.length > 0 ? (
                        sortedLinks.map((link) => (
                            <tr
                                key={link.id}
                                className="border-t border-white/10 hover:bg-white/5 transition"
                            >
                                <td className="px-4 py-3 text-gray-400">
                                    {link.id}
                                </td>
                                <td className="px-4 py-3 text-blue-400">
                                    <a
                                        href={`/u/${link.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Link2 className="inline w-4 h-4 mr-1" />
                                        {link.hash}
                                    </a>
                                </td>
                                <td className="px-4 py-3 text-gray-300 truncate max-w-xs">
                                    <a
                                        href={link.originalUrl}
                                        target="_blank"
                                        className="hover:text-blue-400"
                                    >
                                        {link.originalUrl}
                                    </a>
                                </td>
                                <td className="px-4 py-3 text-gray-400">
                                    {new Date(
                                        link.createdAt
                                    ).toLocaleDateString("de-DE")}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() =>
                                            handleDelete(link.id)
                                        }
                                        className="text-red-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center text-gray-500 py-6"
                            >
                                Keine Ergebnisse gefunden 😕
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
