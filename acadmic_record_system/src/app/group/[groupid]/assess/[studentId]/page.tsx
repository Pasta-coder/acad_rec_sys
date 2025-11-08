"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddAssessmentPage({
    params,
}: {
    params: { groupId: string; studentId: string };
}) {
    const [components, setComponents] = useState("");
    const [total, setTotal] = useState(0);
    const [remarks, setRemarks] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("User not authenticated");
            return;
        }

        const { error } = await supabase.from("project_assessments").insert([
            {
                group_id: params.groupId,
                student_id: params.studentId,
                professor_id: user.id,
                components,
                total,
                remarks,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = `/groups/${params.groupId}`;
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Add Assessment</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    placeholder="Components (ex: 5+7+10)"
                    value={components}
                    onChange={(e) => {
                        setComponents(e.target.value);
                        const sum = e.target.value
                            .split("+")
                            .map(Number)
                            .filter((n) => !isNaN(n))
                            .reduce((a, b) => a + b, 0);
                        setTotal(sum);
                    }}
                />

                <input
                    type="number"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                />

                <textarea
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    placeholder="Remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                />

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Save
                </button>
            </form>
        </div>
    );
}
