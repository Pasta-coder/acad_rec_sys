"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AccessRequestDialog from "./AccessRequestDialog";

export default function StudentTable({ students, user }: any) {
    const [showDialog, setShowDialog] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);

    const checkAccess = async () => {
        if (!user?.id) return;
        
        const { data } = await supabase
            .from("users")
            .select("access_granted")
            .eq("id", user.id)
            .single();
        
        setHasAccess(data?.access_granted || false);
    };

    useEffect(() => {
        checkAccess();
    }, [user]);

    // Add refresh function for when dialog closes
    const handleDialogClose = () => {
        setShowDialog(false);
        // Refresh access status after closing dialog
        setTimeout(checkAccess, 1000); // Small delay to ensure request is processed
    };

    if (!students.length)
        return <p className="text-gray-500">No students found for this filter.</p>;

    return (
        <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300 dark:border-neutral-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-neutral-800">
                    <tr>
                        <th className="px-4 py-2 text-left">Roll No</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Branch</th>
                        <th className="px-4 py-2 text-left">Section</th>
                        <th className="px-4 py-2 text-left">Year</th>
                        <th className="px-4 py-2 text-left">Group</th>
                        <th className="px-4 py-2 text-left">Midsem</th>
                        <th className="px-4 py-2 text-left">Endsem</th>
                        <th className="px-4 py-2 text-left">Internal</th>
                        <th className="px-4 py-2 text-left">Breakdown</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((s: any) => (
                        <tr
                            key={s.id}
                            className="border-t border-gray-200 dark:border-neutral-700"
                        >
                            <td className="px-4 py-2">{s.rollno}</td>
                            <td className="px-4 py-2">{s.name}</td>
                            <td className="px-4 py-2">{s.branch}</td>
                            <td className="px-4 py-2">{s.section}</td>
                            <td className="px-4 py-2">{s.year}</td>
                            <td className="px-4 py-2">{s.group_id || "—"}</td>

                            {["midsem", "endsem", "internal_total", "internal_breakdown"].map(
                                (field) => (
                                    <td
                                        key={field}
                                        className={`px-4 py-2 ${hasAccess ? "" : "blur-sm select-none text-gray-400"
                                            }`}
                                    >
                                        {s.marks?.[field] ?? "—"}
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {!hasAccess && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowDialog(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Request Access
                    </button>
                </div>
            )}

            {showDialog && <AccessRequestDialog onClose={() => setShowDialog(false)} />}
        </div>
    );
}
