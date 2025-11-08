"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EditAssessmentPage({
    params,
}: {
    params: { groupId: string; studentId: string };
}) {
    const [assessment, setAssessment] = useState<any>(null);

    useEffect(() => {
        async function load() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data } = await supabase
                .from("project_assessments")
                .select("*")
                .eq("group_id", params.groupId)
                .eq("student_id", params.studentId)
                .eq("professor_id", user.id)
                .single();

            setAssessment(data);
        }
        load();
    }, []);

    async function handleSubmit(e: any) {
        e.preventDefault();

        const { error } = await supabase
            .from("project_assessments")
            .update({
                components: assessment.components,
                total: assessment.total,
                remarks: assessment.remarks,
            })
            .eq("id", assessment.id);

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = `/groups/${params.groupId}`;
    }

    if (!assessment) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Edit Assessment</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    value={assessment.components}
                    onChange={(e) =>
                        setAssessment({
                            ...assessment,
                            components: e.target.value,
                        })
                    }
                />

                <input
                    type="number"
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    value={assessment.total}
                    onChange={(e) =>
                        setAssessment({
                            ...assessment,
                            total: Number(e.target.value),
                        })
                    }
                />

                <textarea
                    className="w-full p-2 border rounded dark:bg-neutral-800"
                    value={assessment.remarks}
                    onChange={(e) =>
                        setAssessment({
                            ...assessment,
                            remarks: e.target.value,
                        })
                    }
                />

                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                    Update
                </button>
            </form>
        </div>
    );
}
