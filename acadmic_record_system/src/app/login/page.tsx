"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleLogin(e: any) {
        e.preventDefault();
        setErrorMsg("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setErrorMsg(error.message);
            return;
        }

        window.location.href = "/dashboard";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-neutral-800 p-6 rounded shadow-md w-80"
            >
                <h1 className="text-xl font-semibold mb-4 text-center">Professor Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded dark:bg-neutral-700"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 border rounded dark:bg-neutral-700"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {errorMsg && (
                    <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
                )}

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
}
