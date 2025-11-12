"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddStudentPage() {
    const [name, setName] = useState("");
    const [rollno, setRollno] = useState("");
    const [course, setCourse] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { error } = await supabase
            .from("students")
            .insert([{ name, rollno, course }]);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Student added successfully!");
        window.location.href = "/students";
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Add Student</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                />
                <input
                    type="text"
                    placeholder="Roll No"
                    value={rollno}
                    onChange={(e) => setRollno(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                />
                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add Student
                </button>
            </form>
        </div>
    );
}
