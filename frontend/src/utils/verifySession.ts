import type { UserData } from '@/app/types'
import { cookies } from 'next/headers'
import 'server-only'

export const verifySession = async (): Promise<UserData | null> => {
  try {
    // Read the incoming JSESSIONID from the browser request
    const cookieStore = await cookies()
    const jsessionId = cookieStore.get('JSESSIONID')?.value

    if (!jsessionId) return null

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL
        : 'http://localhost:8080'

    // Forward cookie to backend
    // since it is server-side code, we need to fetch directly
    const res = await fetch(`${baseUrl}/api/user/me`, {
      headers: {
        cookie: `JSESSIONID=${jsessionId}`,
      },
      cache: 'no-store', // ensures fresh data
    })

    if (!res.ok) return null

    const userData: UserData = await res.json()
    return userData
  } catch (err) {
    console.error('verifySession failed', err)
    return null
  }
}
