'use client'

import { useState } from 'react'
import TaskItem from '@/components/TaskItem'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  pointerWithin,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDragSensors } from '@/utils/dragDropUtil'
import { useTasks } from '@/hooks/useTasks'
import CompleteZone from '@/components/CompleteZone'
import AddTaskForm from '@/components/AddTaskForm'

export default function Tasks() {
  const { tasks, loading, createTask, deleteTask, updateTask, reorderTasks } =
    useTasks()
  const sensors = useDragSensors()

  // state to track if task is being dragged
  const [isDragging, setIsDragging] = useState(false)

  // state to track active task being dragged for the overlay
  const [activeTask, setActiveTask] = useState<null | {
    id: number
    title: string
  }>(null)

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true)

    // For the overlay
    const { active } = event
    const draggedTask = tasks.find((t) => t.id === Number(active.id))
    if (draggedTask) {
      setActiveTask({ id: draggedTask.id, title: draggedTask.title })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false)
    setActiveTask(null)

    const { active, over } = event

    if (!over) return

    // if dropping on the complete area, reward exp
    if (over.id === 'complete-zone') {
      console.log(
        `Task ${active.id} completed!`,
        tasks.find((t) => t.id === Number(active.id))
      )
      return
    }

    if (active.id !== over.id) {
      reorderTasks(active.id, over.id)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <AddTaskForm createTask={createTask} />

      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
          <CompleteZone isDragging={isDragging} />
        </div>

        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={updateTask}
              onDelete={deleteTask}
              isDragging={isDragging}
              isBeingDragged={activeTask?.id === task.id}
            />
          ))}
        </SortableContext>
        {/* Drag overlay shows the task being dragged */}
        <DragOverlay>
          {activeTask ? (
            <div className="flex items-center p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-md w-full max-w-md">
              <div className="mr-3">⋮⋮</div>
              <div>{activeTask.title}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
