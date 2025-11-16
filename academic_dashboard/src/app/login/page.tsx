'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) return setError(error.message)
        router.push('/dashboard')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900">
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md w-80 space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

