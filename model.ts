export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const id: number = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  return [...tasks, { id, title, status: "todo" }];
}

export function advanceTask(tasks: Task[], id: number): Task[] {
  const next: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "done",
  };
  return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}