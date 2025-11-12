import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

type Student = {
    id: string;
    name: string;
    rollno: string;
    course: string;
};

type GroupMember = {
    id: string;
    student: Student;
};

export default async function GroupPage({
    params,
}: {
    params: { id: string };
}) {
    const supabase = supabaseServer();

    // ✅ Logged-in professor
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <div>Not authenticated</div>;
    }

    // ✅ Fetch group
    const { data: group } = await supabase
        .from("project_groups")
        .select("*")
        .eq("id", params.id)
        .single();

    // ✅ Fetch group members
    const { data: members } = await supabase
        .from("project_group_members")
        .select("id, student_id, students(id, name, rollno, course)")
        .eq("group_id", params.id);

    const typedMembers = (members || []).map((m: any) => ({
        id: m.id,
        student: m.students,
    })) as GroupMember[];

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">{group?.title}</h1>
            <p>{group?.description}</p>

            <div className="flex justify-between items-center mt-4">
                <h2 className="text-xl font-semibold">Group Members</h2>

                <Link
                    href={`/groups/${params.id}/add-student`}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Student
                </Link>
            </div>

            <div className="space-y-3">
                {await Promise.all(
                    typedMembers.map(async (m) => {
                        // ✅ Fetch assessment for this professor + this student
                        const { data: assessment } = await supabase
                            .from("project_assessments")
                            .select("*")
                            .eq("group_id", params.id)
                            .eq("student_id", m.student.id)
                            .eq("professor_id", user.id)
                            .maybeSingle();

                        return (
                            <div
                                key={m.id}
                                className="border p-3 rounded flex flex-col dark:bg-neutral-800"
                            >
                                <p className="font-medium">{m.student.name}</p>
                                <p className="text-sm text-gray-500">
                                    Roll No: {m.student.rollno}
                                </p>

                                {/* ✅ Assessment display */}
                                {assessment && (
                                    <div className="mt-2 text-sm text-gray-300">
                                        <p>
                                            Marks: {assessment.components} ={" "}
                                            {assessment.total}
                                        </p>
                                        <p>Remarks: {assessment.remarks}</p>
                                    </div>
                                )}

                                {/* ✅ Give/Edit marks buttons */}
                                <div className="mt-2">
                                    {assessment ? (
                                        <Link
                                            href={`/groups/${params.id}/assess/${m.student.id}/edit`}
                                            className="text-yellow-500 underline mr-4"
                                        >
                                            Edit Marks
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/groups/${params.id}/assess/${m.student.id}`}
                                            className="text-blue-500 underline mr-4"
                                        >
                                            Give Marks
                                        </Link>
                                    )}
                                </div>

                                {/* ✅ Remove student from group */}
                                <form
                                    action={`/groups/${params.id}/remove-student`}
                                    method="post"
                                    className="mt-3"
                                >
                                    <input
                                        type="hidden"
                                        name="memberId"
                                        value={m.id}
                                    />
                                    <button className="text-red-500">
                                        Remove
                                    </button>
                                </form>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
