"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AccessRequestCard({ request }: any) {
  const [status, setStatus] = useState(request.status);

  const updateAccess = async (type: "approve_read" | "approve_write" | "deny") => {
    let newStatus = "approved";
    let grantType = null;

    if (type === "approve_read") grantType = "read";
    else if (type === "approve_write") grantType = "write";
    else newStatus = "denied";

    // Update request status
    const { error: reqErr } = await supabase
      .from("access_requests")
      .update({ status: newStatus })
      .eq("id", request.id);

    if (reqErr) return alert(reqErr.message);

    // If approved, update user table
    if (grantType) {
      const { error: userErr } = await supabase
        .from("users")
        .update({ access_granted: true, grant_type: grantType })
        .eq("id", request.user_id);
      if (userErr) return alert(userErr.message);
    }

    setStatus(newStatus);
  };

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center dark:bg-neutral-800">
      <div>
        <p className="font-medium">
          {request.users?.name} ({request.users?.email})
        </p>
        <p className="text-sm text-gray-500">{request.reason}</p>
        <p className="text-xs text-gray-400">
          Status: <span className="font-semibold">{status}</span>
        </p>
      </div>

      {status === "pending" && (
        <div className="space-x-2">
          <button
            onClick={() => updateAccess("approve_read")}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve Read
          </button>
          <button
            onClick={() => updateAccess("approve_write")}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Approve Write
          </button>
          <button
            onClick={() => updateAccess("deny")}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Deny
          </button>
        </div>
      )}
    </div>
  );
}
