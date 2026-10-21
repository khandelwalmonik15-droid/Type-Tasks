import { Task, TaskStatus, addTask, advanceTask, filterByStatus } from "./model.js";

type Filter = "all" | TaskStatus;

let tasks: Task[] = [];
let currentFilter: Filter = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const list = document.getElementById("list") as HTMLUListElement;
const empty = document.getElementById("empty") as HTMLParagraphElement;
const chips = document.querySelectorAll<HTMLButtonElement>(".chip");

function visibleTasks(): Task[] {
  return currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);
}

function render(): void {
  list.innerHTML = "";
  const shown: Task[] = visibleTasks();
  empty.hidden = shown.length > 0;

  for (const task of shown) {
    const li = document.createElement("li");
    li.className = "task";

    const title = document.createElement("span");
    title.className = "task-title" + (task.status === "done" ? " is-done" : "");
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `badge badge-${task.status}`;
    badge.textContent = task.status;

    const btn = document.createElement("button");
    btn.className = "advance";
    btn.disabled = task.status === "done";
    btn.textContent =
      task.status === "todo" ? "Start" : task.status === "in-progress" ? "Complete" : "Done ✓";
    btn.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      render();
    });

    li.append(title, badge, btn);
    list.appendChild(li);
  }

  chips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.filter === currentFilter);
  });
}

function handleAdd(): void {
  const text: string = titleInput.value.trim();
  if (text === "") return;
  tasks = addTask(tasks, text);
  titleInput.value = "";
  titleInput.focus();
  render();
}

addBtn.addEventListener("click", handleAdd);
titleInput.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") handleAdd();
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    currentFilter = chip.dataset.filter as Filter;
    render();
  });
});

render();