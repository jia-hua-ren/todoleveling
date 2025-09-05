'use client'

import { useState } from 'react'
import { Task } from '../app/types'

type AddTaskFormProps = {
  createTask: (title: string) => Promise<Task | null>
}

export default function AddTaskForm({ createTask }: AddTaskFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    const newTask = await createTask(trimmed)
    if (newTask) setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-grow border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  )
}
