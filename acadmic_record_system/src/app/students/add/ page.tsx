"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BRANCHES, SECTIONS } from "@lib/constraints.ts";

export default function AddStudentPage() {
    const [name, setName] = useState("");
    const [rollno, setRollno] = useState("");
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const [section, setSection] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();

        const { error } = await supabase.from("students").insert([
            {
                name,
                rollno,
                course,
                branch,
                section,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = "/students";
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Add Student</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Roll No"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setRollno(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Course"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setCourse(e.target.value)}
                />

                {/* ✅ Dropdown for Branch */}
                <select
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setBranch(e.target.value)}
                >
                    <option>Select Branch</option>
                    {BRANCHES.map((b: string) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>

                {/* ✅ Dropdown for Section */}
                <select
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setSection(e.target.value)}
                >
                    <option>Select Section</option>
                    {SECTIONS.map((s: string) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add Student
                </button>
            </form>
        </div>
    );
}
