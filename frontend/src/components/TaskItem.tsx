import { Task } from '../app/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2, PenLine, Check } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { DeleteConfirm } from '@/components/DeleteConfirm'

type TaskItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

function TaskContent({
  isEditing,
  editedTitle,
  setEditedTitle,
  task,
  editInputRef,
  handleSaveEdit,
  startEditing,
  cancelEditing,
  openDeleteConfirm,
}: {
  isEditing: boolean
  editedTitle: string
  setEditedTitle: (v: string) => void
  task: Task
  editInputRef: React.RefObject<HTMLInputElement | null>
  handleSaveEdit: () => void
  startEditing: () => void
  cancelEditing: () => void
  openDeleteConfirm: () => void
}) {
  return (
    <div className="flex-1 relative">
      {isEditing ? (
        <div className="flex items-center w-full pr-8">
          <input
            ref={editInputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full py-1 px-0 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-500 outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit()
              if (e.key === 'Escape') cancelEditing()
            }}
          />
          <button
            className="absolute right-0 text-green-500 hover:text-green-600 p-1"
            onClick={handleSaveEdit}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Check size={18} />
          </button>
        </div>
      ) : (
        <>
          {task.title}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              className="text-gray-500 hover:text-gray-700 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={startEditing}
            >
              <PenLine size={18} />
            </button>
            <button
              className="text-red-500 hover:text-red-700 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={openDeleteConfirm}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const confirmRef = useRef<HTMLDivElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const editInputRef = useRef<HTMLInputElement>(null)

  // Autofocus input when entering edit mode
  useEffect(() => {
    if (isEditing) editInputRef.current?.focus()
  }, [isEditing])

  // Save edit changes
  const handleSaveEdit = useCallback(() => {
    const trimmedTitle = editedTitle.trim()
    if (trimmedTitle && trimmedTitle !== task.title) {
      onEdit({ ...task, title: trimmedTitle })
    }
    setIsEditing(false)
  }, [editedTitle, onEdit, task])

  // Close on outside click
  useClickOutside(
    confirmRef,
    () => setShowDeleteConfirm(false),
    showDeleteConfirm
  )
  useClickOutside(editInputRef, handleSaveEdit, isEditing)

  const style = { transition, transform: CSS.Transform.toString(transform) }

  return (
    <div className="relative">
      <div
        className="flex items-center p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-sm group"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="mr-3 cursor-grab">⋮⋮</div>

        <TaskContent
          isEditing={isEditing}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          task={task}
          editInputRef={editInputRef}
          handleSaveEdit={handleSaveEdit}
          startEditing={() => {
            setEditedTitle(task.title)
            setIsEditing(true)
          }}
          cancelEditing={() => {
            setEditedTitle(task.title)
            setIsEditing(false)
          }}
          openDeleteConfirm={() => setShowDeleteConfirm(true)}
        />
      </div>

      {showDeleteConfirm && (
        <DeleteConfirm
          confirmRef={confirmRef}
          onConfirm={() => {
            onDelete(task)
            setShowDeleteConfirm(false)
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  )
}
