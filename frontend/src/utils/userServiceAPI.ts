import { UserData } from '@/app/types'

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/user`

export async function completeTask(
  taskId: number,
  expGain: number = 10
): Promise<UserData> {
  const res = await fetch(`${API_URL}/me/complete-task?expGain=${expGain}`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to complete task')
  return res.json()
}
