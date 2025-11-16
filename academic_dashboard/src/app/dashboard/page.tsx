import { supabaseServer } from "@/lib/supabaseServer";
import FilterBar from "@/components/FilterBar";
import StudentTable from "@/components/StudentsTable";

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{
        branch?: string;
        section?: string;
        year?: string;
        group?: string;
    }>;
}) {
    const supabase = await supabaseServer();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Fetch filters
    const { branch, section, year, group } = await searchParams;

    // Build dynamic query
    let query = supabase.from("students").select(`
    id, rollno, name, branch, section, year, group_id,
    marks(midsem, endsem, internal_total, internal_breakdown)
  `);

    if (branch) query = query.eq("branch", branch);
    if (section) query = query.eq("section", section);
    if (year) query = query.eq("year", parseInt(year));
    if (group) query = query.eq("group_id", group);

    const { data: students, error } = await query;

    if (error) console.error(error);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">Academic Record Dashboard</h1>
            
            {/* Admin Panel Link */}
            {user?.user_metadata?.role === "admin" && (
                <a
                    href="/admin/access"
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Go to Admin Panel
                </a>
            )}
            
            <FilterBar />

            <StudentTable students={students || []} user={user} />
        </div>
    );
}
