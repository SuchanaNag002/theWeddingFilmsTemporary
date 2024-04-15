"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function handleAdminLogin(e) {
    console.log(username);
    e.preventDefault();
    if (username === "anshu" && password === "123") {
      localStorage.setItem("authenticated", true);
      router.push("/admin/AddProject");
    } else if (username !== "anshu") {
      setError("Invalid credential. Wrong username!");
    } else if (password !== "123") {
      setError("Invalid credential. Wrong password!");
    } else {
      setError("Error logging in. Please try again later");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-4 md:p-8 shadow-md rounded-lg">
        <h1 className="text-3xl md:text-6xl font-bold text-center mb-6 text-black">
          Admin Login
        </h1>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Go To Dashboard
            </button>
          </div>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}
