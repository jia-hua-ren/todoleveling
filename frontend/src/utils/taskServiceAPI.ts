import { Task } from '@/app/types'
import { getCsrfToken } from '@/utils/csrf'

const API_URL = '/api/proxy/tasks'

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(title: string): Promise<Task> {
  const csrfToken = await getCsrfToken()
  const res = await fetch(`${API_URL}?title=${encodeURIComponent(title)}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': csrfToken || '',
    },
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function deleteTask(id: number): Promise<void> {
  const csrfToken = await getCsrfToken()
  const res = await fetch(`${API_URL}/${id}/delete`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': csrfToken || '',
    },
  })
  if (!res.ok) throw new Error('Failed to delete task')
}

export async function updateTask(task: Task): Promise<void> {
  const csrfToken = await getCsrfToken()
  const res = await fetch(`${API_URL}/${task.id}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': csrfToken || '',
    },
    body: JSON.stringify({ title: task.title }),
    credentials: 'include',
  })

  if (!res.ok) throw new Error('Failed to update task')
}
