"use client";

import { useState, useEffect } from "react";
import TaskItem from "@/components/TaskItem";
import { Task } from "../app/types";
import { getTasks, createTask } from "@/services/taskService";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handle creating new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = await createTask(newTask);
      setTasks((prev) => [...prev, task]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const getTaskPos = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const oldIndex = getTaskPos(Number(active.id));
      const newIndex = getTaskPos(Number(over.id));
      if (oldIndex === -1 || newIndex === -1) return tasks;
      return arrayMove(tasks, oldIndex, newIndex);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <form onSubmit={handleCreateTask} className="flex gap-2 mb-6">
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
              onEdit={(t) => console.log("Edit", t)}
              onDelete={(t) => console.log("Delete", t)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
