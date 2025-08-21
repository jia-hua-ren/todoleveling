import Link from "next/link";
import { verifySession } from "@/dal/dal";

export default async function GoogleLogIn() {
  const user = await verifySession();

  if (user) {
    return (
      <div>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="http://localhost:8080/logout">Logout</Link>
      </div>
    );
  }

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const loginUrl = `${backendBase.replace(/\/+$/, "")}/auth/login`;

  return <Link href={loginUrl}>Login</Link>;
}
