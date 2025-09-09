'use client'

import { UserData } from '@/app/types'
import { getCsrfToken } from '@/utils/csrf'

type Props = { user: UserData | null }

export default function GoogleLogIn({ user }: Props) {
  const backendBase =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL?.replace(/\/+$/, '') ?? ''

  const handleLogout = async () => {
    try {
      await fetch('/api/proxy/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-XSRF-TOKEN': (await getCsrfToken()) || '',
        },
      })

      // redirect to frontend home after logout
      window.location.href = '/'
    } catch (err) {
      console.error('Logout failed', err)
    }
  }
  if (user) {
    return (
      <>
        <li>
          <a href="/dashboard" className="navbarItem">
            Dashboard
          </a>
        </li>
        <li>
          <button onClick={handleLogout} className="navbarItem">
            Logout
          </button>
        </li>
      </>
    )
  }

  const loginUrl = `${backendBase}/auth/login`

  return (
    <li>
      <a href={loginUrl} className="navbarItem">
        Login
      </a>
    </li>
  )
}
