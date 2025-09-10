'use client'

import { UserData } from '@/app/types'

type Props = { user: UserData | null }

export default function GoogleLogIn({ user }: Props) {
  const handleLogout = async () => {
    await fetch('/logout', {
      method: 'POST',
      credentials: 'include',
    })

    window.location.href = '/' // or wherever you want to redirect
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

  const loginUrl = `/auth/login`

  return (
    <li>
      <a href={loginUrl} className="navbarItem">
        Login
      </a>
    </li>
  )
}
