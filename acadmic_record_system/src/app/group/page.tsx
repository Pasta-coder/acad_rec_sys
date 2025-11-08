import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

export default async function GroupsPage() {
    const supabase = supabaseServer();

    const { data: groups, error } = await supabase
        .from("project_groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return <div className="p-6 text-red-500">Error loading groups.</div>;
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Project Groups</h1>
                <Link
                    href="/groups/add"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    + Create Group
                </Link>
            </div>

            <div className="space-y-2">
                {groups?.map((group) => (
                    <Link
                        key={group.id}
                        href={`/groups/${group.id}`}
                        className="block border p-3 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                        <p className="font-medium">{group.title}</p>
                        <p className="text-sm dark:text-gray-400">{group.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
