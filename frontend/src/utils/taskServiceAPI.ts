import { Task } from '@/app/types'

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/tasks`

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${API_URL}?title=${encodeURIComponent(title)}`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}/delete`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to delete task')
}

export async function updateTask(task: Task): Promise<void> {
  // const res = await fetch(`${API_URL}/${task.id}`, {
  //   method: 'PATCH',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ title: task.title }),
  //   credentials: 'include',
  // })
  console.log('updateTask called with', task)

  // if (!res.ok) throw new Error('Failed to update task')
  // return res.json()
}
