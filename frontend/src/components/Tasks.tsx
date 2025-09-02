'use client'

import { useState } from 'react'
import TaskItem from '@/components/TaskItem'
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDragSensors } from '@/utils/dragDropUtil'
import { useTasks } from '@/hooks/useTasks'

export default function Tasks() {
  const { tasks, loading, createTask, deleteTask, updateTask, reorderTasks } =
    useTasks()
  const [newTask, setNewTask] = useState('')
  const sensors = useDragSensors()

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const task = await createTask(newTask)
    if (task) setNewTask('')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    reorderTasks(active.id, over.id)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <form onSubmit={handleCreateTaskSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-grow border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
