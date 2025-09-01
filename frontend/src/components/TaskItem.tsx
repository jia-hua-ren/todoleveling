import { Task } from "../app/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, PenLine } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  // DnD Kit Sortable setup
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Close confirmation when clicking outside
  useEffect(() => {
    if (!showDeleteConfirm) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        confirmRef.current &&
        !confirmRef.current.contains(e.target as Node)
      ) {
        setShowDeleteConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDeleteConfirm]);

  // DnD Kit necessary styles
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

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

        <div className="flex-1 relative">
          {task.title}

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              className="text-gray-500 hover:text-gray-700 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => onEdit(task)}
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
        </div>
      </div>

      {/* Delete confirmation overlay */}
      {showDeleteConfirm && (
        <div
          ref={confirmRef}
          className="absolute right-0 top-0 z-10 bg-white rounded-md shadow-md border border-gray-200 p-3 w-56"
        >
          <p className="text-sm font-medium mb-2">Are you sure?</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded"
              onClick={() => {
                onDelete(task);
                setShowDeleteConfirm(false);
              }}
            >
              Delete
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-1 px-3 rounded"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
