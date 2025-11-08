"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddGroupPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();

        const { error } = await supabase.from("project_groups").insert([
            {
                title,
                description,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = "/groups";
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Create Project Group</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Group Title"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Create
                </button>
            </form>
        </div>
    );
}
