import 'server-only'

import type { UserData } from '@/app/types'
import { cookies } from 'next/headers'

// https://nextjs.org/docs/app/building-your-application/authentication#creating-a-data-access-layer-dal
export const verifySession = async () => {
  const cookieStore = await cookies()

  async function getUser() {
    try {
      const authResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user/me`,
        {
          method: 'GET',
          headers: {
            Cookie: `JSESSIONID=${cookieStore.get('JSESSIONID')?.value}`,
          },
        }
      )

      if (!authResponse.ok) {
        // If backend says 401, treat as logged out
        return null
      }
      return await authResponse.json()
    } catch {
      return null
    }
  }

  if (
    cookieStore.has('JSESSIONID') &&
    cookieStore.get('JSESSIONID')?.value != ''
  ) {
    const account: UserData = await getUser()

    return account
  }

  return null
}
