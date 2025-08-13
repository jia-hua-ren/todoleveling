"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { User } from "@/app/types";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/user", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.push("/");
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Not logged in.</p>;

  console.log("User data:", user);

  return (
    <div>
      <h1>Welcome, {user.principal.attributes.given_name} 👋</h1>
      <Image
        src={user.principal.attributes.picture}
        alt={user.principal.attributes.name}
        width={64}
        height={64}
      />
      <p>Email: {user.principal.attributes.email}</p>
    </div>
  );
}
