import GoogleLogIn from './GoogleLogIn'
import { verifySession } from '@/utils/verifySession'
import Link from 'next/link'

export default async function Navbar() {
  const user = await verifySession() // server fetch

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link className="text-2xl font-bold text-indigo-600" href="/">
          ToDo Leveling
        </Link>
        <ul className="flex space-x-6 font-medium">
          <GoogleLogIn user={user} />
        </ul>
      </div>
    </nav>
  )
}
