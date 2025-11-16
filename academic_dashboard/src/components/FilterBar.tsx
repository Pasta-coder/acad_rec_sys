"use client";

import { useRouter, useSearchParams } from "next/navigation";

const branches = ["CSE", "IT", "ECE", "EE", "ME"];
const sections = ["A", "B", "C"];
const years = ["2023", "2024", "2025"];
const groups = ["G01", "G03", "G07", "G09"];

export default function FilterBar() {
    const router = useRouter();
    const params = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const query = new URLSearchParams(params.toString());
        if (value) query.set(key, value);
        else query.delete(key);
        router.push(`/dashboard?${query.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-4 items-center">
            <select
                className="p-2 border rounded dark:bg-neutral-800"
                onChange={(e) => updateFilter("branch", e.target.value)}
                defaultValue={params.get("branch") || ""}
            >
                <option value="">All Branches</option>
                {branches.map((b) => (
                    <option key={b}>{b}</option>
                ))}
            </select>

            <select
                className="p-2 border rounded dark:bg-neutral-800"
                onChange={(e) => updateFilter("section", e.target.value)}
                defaultValue={params.get("section") || ""}
            >
                <option value="">All Sections</option>
                {sections.map((s) => (
                    <option key={s}>{s}</option>
                ))}
            </select>

            <select
                className="p-2 border rounded dark:bg-neutral-800"
                onChange={(e) => updateFilter("year", e.target.value)}
                defaultValue={params.get("year") || ""}
            >
                <option value="">All Years</option>
                {years.map((y) => (
                    <option key={y}>{y}</option>
                ))}
            </select>

            <select
                className="p-2 border rounded dark:bg-neutral-800"
                onChange={(e) => updateFilter("group", e.target.value)}
                defaultValue={params.get("group") || ""}
            >
                <option value="">All Groups</option>
                {groups.map((g) => (
                    <option key={g}>{g}</option>
                ))}
            </select>
        </div>
    );
}
