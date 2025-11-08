"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AddStudentToGroup({
    params,
}: {
    params: { id: string };
}) {
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const { data } = await supabase
                .from("students")
                .select("*")
                .order("name", { ascending: true });

            setStudents(data || []);
        }
        load();
    }, []);

    async function add(studentId: string) {
        const { error } = await supabase.from("project_group_members").insert([
            {
                group_id: params.id,
                student_id: studentId,
            },
        ]);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = `/groups/${params.id}`;
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Add Student to Group</h1>

            <div className="space-y-2">
                {students.map((s: any) => (
                    <button
                        key={s.id}
                        onClick={() => add(s.id)}
                        className="block w-full text-left border p-3 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                        {s.name} — {s.rollno}
                    </button>
                ))}
            </div>
        </div>
    );
}

