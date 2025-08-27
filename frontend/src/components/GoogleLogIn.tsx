import Link from "next/link";
import { verifySession } from "@/dal/dal";

export default async function GoogleLogIn() {
  const user = await verifySession();

  if (user) {
    return (
      <>
        <li>
          <a href="/dashboard" className="navbarItem">
            Dashboard
          </a>
        </li>
        <li>
          <a href="http://localhost:8080/logout" className="navbarItem">
            Logout
          </a>
        </li>
      </>
    );
  }

  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const loginUrl = `${backendBase.replace(/\/+$/, "")}/auth/login`;

  return (
    <li>
      <a href={loginUrl} className="navbarItem">
        Login
      </a>
    </li>
  );
}
