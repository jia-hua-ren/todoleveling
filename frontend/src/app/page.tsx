"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const loginUrl = `${backendBase.replace(/\/+$/, "")}/auth/login`;

  useEffect(() => {
    fetch("http://localhost:8080/user/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          console.warn("User not logged in (401).");
          setLoggedIn(false);
        } else if (res.ok) {
          console.warn("User logged in.");
          setLoggedIn(true);
        } else {
          console.error("Unexpected response status:", res.status);
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        setLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Home Page</h1>
      {loggedIn ? (
        <div>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="http://localhost:8080/logout">Logout</Link>
        </div>
      ) : (
        <Link href={loginUrl}>Login</Link>
      )}
    </div>
  );
}
