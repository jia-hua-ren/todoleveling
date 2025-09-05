import { Task } from '../app/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash2, PenLine, Check } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { DeleteConfirm } from '@/components/DeleteConfirm'

type TaskItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  isDragging?: boolean
  isBeingDragged?: boolean
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  isDragging = false,
  isBeingDragged = false,
}: TaskItemProps) {
  // Sortable functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  // State
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Refs
  const editInputRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)

  // Effect: Auto-focus input when editing starts
  useEffect(() => {
    if (isEditing) editInputRef.current?.focus()
  }, [isEditing])

  // Actions
  const startEditing = () => {
    setEditedTitle(task.title)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setEditedTitle(task.title)
    setIsEditing(false)
  }

  const saveEdit = useCallback(() => {
    const trimmedTitle = editedTitle.trim()
    if (trimmedTitle && trimmedTitle !== task.title) {
      onEdit({ ...task, title: trimmedTitle })
    }
    setIsEditing(false)
  }, [editedTitle, task, onEdit])

  // Effect: Handle clicks outside active elements
  useEffect(() => {
    if (!isEditing && !showDeleteConfirm) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isEditing &&
        editInputRef.current &&
        !editInputRef.current.contains(e.target as Node)
      ) {
        saveEdit()
      }

      if (
        showDeleteConfirm &&
        confirmRef.current &&
        !confirmRef.current.contains(e.target as Node)
      ) {
        setShowDeleteConfirm(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isEditing, showDeleteConfirm, saveEdit])

  // Styles
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isBeingDragged ? 0 : isDragging ? 0.4 : 1,
  }

  return (
    <div className="relative">
      {/* Task Card */}
      <div
        className="flex items-center p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-sm group"
        ref={setNodeRef}
        style={style}
        {...(isEditing ? {} : attributes)}
        {...(isEditing ? {} : listeners)}
      >
        {/* Drag Handle */}
        <div className="mr-3 cursor-grab">{!isEditing && '⋮⋮'}</div>

        {/* Task Content */}
        <div className="flex-1 relative">
          {isEditing ? (
            /* Edit Mode */
            <div className="flex items-center w-full pr-8">
              <input
                ref={editInputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full py-1 px-0 bg-transparent border-0 border-b border-gray-300 focus:ring-0 focus:border-blue-500 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEdit()
                  if (e.key === 'Escape') cancelEditing()
                }}
              />
              <button
                className="absolute right-0 text-green-500 hover:text-green-600 p-1"
                onClick={saveEdit}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            /* View Mode */
            <>
              {task.title}

              {/* Action Buttons */}
              <div
                className={`
                  absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 z-10
                  ${
                    isDragging
                      ? 'opacity-0'
                      : 'opacity-0 group-hover:opacity-100'
                  } 
                  transition-opacity duration-200
                `}
              >
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
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
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
