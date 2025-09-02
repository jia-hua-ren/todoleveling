import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '@/utils/taskServiceAPI'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { Task } from '../app/types'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch tasks on mount
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Create new task
  const handleCreateTask = async (title: string) => {
    if (!title.trim()) return null

    try {
      const task = await createTask(title)
      setTasks((prev) => [...prev, task])
      return task
    } catch (err) {
      console.error(err)
      return null
    }
  }

  // Delete task
  const handleDeleteTask = async (task: Task) => {
    try {
      await deleteTask(task.id)
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
      return true
    } catch (error) {
      console.error('Failed to delete task:', error)
      return false
    }
  }

  // Reorder tasks
  const handleReorderTasks = (
    activeId: number | string,
    overId: number | string
  ) => {
    setTasks((tasks) => {
      const oldIndex = tasks.findIndex((task) => task.id === Number(activeId))
      const newIndex = tasks.findIndex((task) => task.id === Number(overId))
      if (oldIndex === -1 || newIndex === -1) return tasks
      return arrayMove(tasks, oldIndex, newIndex)
    })
  }

  const handleUpdateTask = async (task: Task) => {
    try {
      // Optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? task : t))
      )

      // Call API
      await updateTask(task)
      return true
    } catch (error) {
      console.error('Failed to update task:', error)
      // Revert on failure
      getTasks()
        .then(setTasks)
        .catch((err) => console.error(err))
      return false
    }
  }

  return {
    tasks,
    loading,
    createTask: handleCreateTask,
    deleteTask: handleDeleteTask,
    updateTask: handleUpdateTask,
    reorderTasks: handleReorderTasks,
  }
}
