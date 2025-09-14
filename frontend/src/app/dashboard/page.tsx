// app/dashboard/page.tsx
import Navbar from '@/components/Navbar'
import DashboardClient from './DashboardClient'
import { verifySession } from '@/utils/verifySession'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await verifySession()

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Not logged in</p>
        <Link className="text-indigo-600" href="/">
          Home page
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <DashboardClient user={user} /> {/* pass server-fetched user */}
    </div>
  )
}
