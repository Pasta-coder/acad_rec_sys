"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Student = {
    id: string;
    name: string;
    rollno: string;
    course: string;
    branch: string;
    section: string;
};

export default function EditStudentPage({
    params,
}: {
    params: { id: string };
}) {
    const [student, setStudent] = useState<Student | null>(null);
    const [branch, setBranch] = useState("");
    const [section, setSection] = useState("");


    useEffect(() => {
        async function load() {
            const { data } = await supabase
                .from("students")
                .select("*")
                .eq("id", params.id)
                .single();

            if (data) setStudent(data);
        }
        load();
    }, [params.id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!student) return;

        const { error } = await supabase
            .from("students")
            .update({
                name: student.name,
                rollno: student.rollno,
                course: student.course,
                branch: student.branch,
                section: student.section,
            })
            .eq("id", params.id);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = `/students/${params.id}`;
    }

    if (!student) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Edit Student</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={student.name}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                />
                <input
                    type="text"
                    value={student.branch}
                    onChange={(e) => setStudent({ ...student, branch: e.target.value })}
                />

                <input
                    type="text"
                    value={student.section}
                    onChange={(e) => setStudent({ ...student, section: e.target.value })}
                />

                <input
                    type="text"
                    value={student.rollno}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) =>
                        setStudent({ ...student, rollno: e.target.value })
                    }
                />

                <input
                    type="text"
                    value={student.course}
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    onChange={(e) =>
                        setStudent({ ...student, course: e.target.value })
                    }
                />

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Save
                </button>
            </form>
        </div>
    );
}
