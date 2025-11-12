import { supabaseServer } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const supabase = supabaseServer();
    const form = await req.formData();
    const memberId = form.get("memberId") as string;

    await supabase
        .from("project_group_members")
        .delete()
        .eq("id", memberId);

    return NextResponse.redirect(`/groups/${params.id}`);
}
