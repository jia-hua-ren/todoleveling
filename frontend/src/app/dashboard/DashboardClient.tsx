'use client'

import { useState } from 'react'
import Tasks from '@/components/Tasks'
import ExpBar from '@/components/ExpBar'
import Image from 'next/image'
import { UserData } from '@/app/types'

type Props = {
  user: UserData
}

export default function DashboardClient({ user: initialUser }: Props) {
  const [user, setUser] = useState<UserData>(initialUser)

  // handles exp gain or loss. Loss is only in the case of backend failing.
  const handleExpGain = (expGained: number) => {
    setUser((prev) => {
      if (!prev) return prev

      let newExp = prev.exp + expGained
      let newLevel = prev.level

      // Level up
      while (newExp >= 100) {
        newExp -= 100
        newLevel++
      }

      // Level down
      while (newExp < 0 && newLevel > 1) {
        newExp += 100
        newLevel--
      }

      // Clamp at level 1, 0 EXP
      if (newLevel === 1 && newExp < 0) {
        newExp = 0
      }

      return {
        ...prev,
        exp: newExp,
        level: newLevel,
      }
    })
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          {user.picture && (
            <div className="relative">
              <Image
                src={user.picture}
                alt={user.name || 'User'}
                width={80}
                height={80}
                className="rounded-full border-2 border-blue-500"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {user.level}
              </div>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-2xl font-bold">Welcome, {user.name} 👋</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-3 w-full max-w-md">
              <ExpBar exp={user.exp} level={user.level} />
            </div>
          </div>
        </div>
      </div>

      <Tasks onExpGain={handleExpGain} />
    </div>
  )
}
