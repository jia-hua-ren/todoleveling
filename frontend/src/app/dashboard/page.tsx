// app/dashboard/page.tsx
import Navbar from '@/components/Navbar'
import DashboardClient from './DashboardClient'
import { verifySession } from '@/utils/verifySession'

export default async function DashboardPage() {
  const user = await verifySession() // ✅ server fetch

  if (!user) {
    return <p className="p-8 text-center">Not logged in</p>
  }

  return (
    <div>
      <Navbar />
      <DashboardClient user={user} /> {/* pass server-fetched user */}
    </div>
  )
}
