"use client"; // Add this line to make the component a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import Link from "next/link";

export default function Home() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Function to handle login
    const handleLogin = () => {
        // Get the admin password from environment variables
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        // Check if the entered password matches the admin password
        if (password === adminPassword) {
            // Redirect to the /admin route
            router.push("/admin");
        } else {
            // Set an error message if the password is incorrect
            setError("비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                >
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            비밀번호
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs italic mb-4">
                            {error}
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
