import { addTask, advanceTask, filterByStatus } from "./model.js";
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const chips = document.querySelectorAll(".chip");
function visibleTasks() {
    return currentFilter === "all" ? tasks : filterByStatus(tasks, currentFilter);
}
function render() {
    list.innerHTML = "";
    const shown = visibleTasks();
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
function handleAdd() {
    const text = titleInput.value.trim();
    if (text === "")
        return;
    tasks = addTask(tasks, text);
    titleInput.value = "";
    titleInput.focus();
    render();
}
addBtn.addEventListener("click", handleAdd);
titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        handleAdd();
});
chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        currentFilter = chip.dataset.filter;
        render();
    });
});
render();
