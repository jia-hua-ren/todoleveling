import { UserData } from '@/app/types'
import { getCsrfToken } from '@/utils/csrf'

const API_URL = '/api/user'

export async function completeTask(
  taskId: number,
  expGain: number = 10
): Promise<UserData> {
  const csrfToken = await getCsrfToken()

  const res = await fetch(`${API_URL}/me/complete-task?expGain=${expGain}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': csrfToken || '', // send CSRF token
    },
  })

  if (!res.ok) throw new Error('Failed to complete task')
  return res.json()
}
