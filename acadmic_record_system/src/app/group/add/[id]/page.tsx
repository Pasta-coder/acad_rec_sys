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

    // Fetch group
    const { data: group } = await supabase
        .from("project_groups")
        .select("*")
        .eq("id", params.id)
        .single();

    // Fetch group members with student details
    const { data: members } = await supabase
        .from("project_group_members")
        .select("id, student_id, students(id, name, rollno, course)")
        .eq("group_id", params.id);

    // members now typed as GroupMember[]
    const typedMembers = ((members || []).map((m: any) => ({
        id: m.id,
        student: m.students,
    }))) as GroupMember[];

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
                {typedMembers.map((m) => (
                    <div
                        key={m.id}
                        className="border p-3 rounded flex justify-between items-center dark:bg-neutral-800"
                    >
                        <div>
                            <p className="font-medium">{m.student.name}</p>
                            <p className="text-sm text-gray-500">
                                Roll No: {m.student.rollno}
                            </p>
                        </div>

                        <form action={`/groups/${params.id}/remove-student`} method="post">
                            <input type="hidden" name="memberId" value={m.id} />
                            <button className="text-red-500">Remove</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
