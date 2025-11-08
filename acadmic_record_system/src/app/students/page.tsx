import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function StudentsPage() {
    const supabase = supabaseServer();

    const { data: students, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="p-6 text-red-500">Error loading students.</div>;
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Students</h1>
                <Link
                    href="/students/add"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Student
                </Link>
            </div>

            <div className="space-y-2">
                {students?.map((student) => (
                    <Link
                        key={student.id}
                        href={`/students/${student.id}`}
                        className="block border p-3 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Roll No: {student.rollno}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
