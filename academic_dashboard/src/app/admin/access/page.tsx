import { supabaseServer } from "@/lib/supabaseServer";
import AccessRequestCard from "@/components/AccessRequestCard";

export default async function AdminAccessPage() {
  const supabase = await supabaseServer();

  // Check if current user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: admin } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (admin?.role !== "admin") {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-red-500">
          Access Denied: Admins Only
        </h1>
      </div>
    );
  }

  // Fetch all requests
  const { data: requests } = await supabase
    .from("access_requests")
    .select("id, reason, status, user_id, created_at, users(email,name)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Access Requests</h1>

      {requests?.length ? (
        <div className="space-y-4">
          {requests.map((r: any) => (
            <AccessRequestCard key={r.id} request={r} />
          ))}
        </div>
      ) : (
        <p>No access requests found.</p>
      )}
    </div>
  );
}
