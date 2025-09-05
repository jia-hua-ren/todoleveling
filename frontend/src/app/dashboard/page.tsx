import Image from 'next/image'
import Tasks from '@/components/Tasks'
import { verifySession } from '@/utils/verifySession'
import { Navbar } from '@/components/Navbar'

export default async function DashboardPage() {
  const user = await verifySession()

  if (!user) return <p>Not logged in.</p>

  return (
    <div>
      <Navbar />

      {/* <h1 className="" >Welcome, {user.name} 👋</h1>
      <Image src={user.picture} alt={user.name} width={64} height={64} />
      <p>Email: {user.email}</p>
      <p>Google sub: {user.id}</p> */}

      <Tasks />
    </div>
  )
}
