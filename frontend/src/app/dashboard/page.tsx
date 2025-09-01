import Image from "next/image";
import Link from "next/link";
import Tasks from "@/components/Tasks";
import { verifySession } from "@/utils/verifySession";

export default async function DashboardPage() {
  const user = await verifySession();

  if (!user) return <p>Not logged in.</p>;

  console.log("User data:", user);

  return (
    <div>
      <Link href="/"> Home Page</Link>
      <h1>Welcome, {user.name} 👋</h1>
      <Image src={user.picture} alt={user.name} width={64} height={64} />
      <p>Email: {user.email}</p>
      <p>Google sub: {user.id}</p>

      <Tasks />
    </div>
  );
}
