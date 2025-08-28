import Link from "next/link";
import { verifySession } from "@/services/verifySession";

export default async function GoogleLogIn() {
  const user = await verifySession();
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const logoutUrl = `${backendBase.replace(/\/+$/, "")}/logout`;

  if (user) {
    return (
      <>
        <li>
          <a href="/dashboard" className="navbarItem">
            Dashboard
          </a>
        </li>
        <li>
          <a href={logoutUrl} className="navbarItem">
            Logout
          </a>
        </li>
      </>
    );
  }

  const loginUrl = `${backendBase.replace(/\/+$/, "")}/auth/login`;

  return (
    <li>
      <a href={loginUrl} className="navbarItem">
        Login
      </a>
    </li>
  );
}
