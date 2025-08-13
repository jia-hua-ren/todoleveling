import Link from "next/link";

export default function Home() {
  const backendBase = process.env.NEXT_PUBLIC_BACKEND_BASE_URL ?? "";
  const loginUrl = `${backendBase.replace(/\/+$/, "")}/auth/login`;

  return (
    <div>
      <h1>Home Page</h1>
      <Link href={loginUrl}>Login</Link>
    </div>
  );
}
