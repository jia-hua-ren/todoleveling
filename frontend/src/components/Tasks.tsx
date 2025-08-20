"use client";

import { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/tasks", {
      credentials: "include", // send cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handle creating new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks?title=${encodeURIComponent(newTask)}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to create task");

      const task: Task = await res.json();
      setTasks((prev) => [...prev, task]);
      setNewTask("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* Create new task */}
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

      {/* Task cards */}
      <div className="grid gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 border rounded shadow-sm flex justify-between items-center"
          >
            <span>{task.title}</span>
            <span className="text-sm text-gray-500">
              {task.completed ? "✅ Done" : "⌛ Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
