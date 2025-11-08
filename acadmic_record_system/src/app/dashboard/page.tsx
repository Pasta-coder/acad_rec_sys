import { supabaseServer } from "@/lib/supabaseServer";

export default async function Dashboard() {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">
                Welcome, {user?.email}
            </h1>

            <div className="mt-6 space-y-4">
                <a
                    className="block p-3 border rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    href="/students"
                >
                    Manage Students
                </a>
                <a
                    className="block p-3 border rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    href="/groups"
                >
                    Manage Project Groups
                </a>
            </div>
        </div>
    );
}
