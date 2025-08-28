import { Task } from "../app/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="flex items-center p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-sm group"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className="mr-3 cursor-grab">⋮⋮</div>

      <div className="flex-1 relative">
        {task.title}

        <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onEdit}
          >
            ✏️
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
