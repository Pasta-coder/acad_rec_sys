"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AccessRequestDialog({ onClose }: { onClose: () => void }) {
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const submitRequest = async () => {
        setLoading(true);
        const { error } = await supabase.from("access_requests").insert({
            reason,
            status: "pending",
        });
        setLoading(false);
        if (error) return alert(error.message);
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-96 space-y-4">
                <h2 className="text-xl font-semibold">Request Access</h2>

                {submitted ? (
                    <p className="text-green-500">Request sent successfully!</p>
                ) : (
                    <>
                        <textarea
                            placeholder="Reason for requesting access..."
                            className="w-full p-2 border rounded dark:bg-neutral-900"
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>

                        <div className="flex justify-end space-x-2">
                            <button onClick={onClose} className="px-4 py-2 border rounded">
                                Cancel
                            </button>
                            <button
                                onClick={submitRequest}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                {loading ? "Sending..." : "Submit"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
