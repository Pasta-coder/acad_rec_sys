import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function StudentPage({ params }: { params: { id: string } }) {
    const supabase = supabaseServer();

    const { data: student, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!student) {
        return <div className="p-6">Student not found.</div>;
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">{student.name}</h1>

            <p>Roll No: {student.rollno}</p>
            <p>Course: {student.course}</p>

            <div className="flex space-x-3 mt-4">
                <Link
                    href={`/students/${student.id}/edit`}
                    className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                    Edit
                </Link>

                <form action={`/students/${student.id}/delete`} method="post">
                    <button className="px-4 py-2 bg-red-600 text-white rounded">
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}
