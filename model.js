export function addTask(tasks, title) {
    const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    return [...tasks, { id, title, status: "todo" }];
}
export function advanceTask(tasks, id) {
    const next = {
        "todo": "in-progress",
        "in-progress": "done",
        "done": "done",
    };
    return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
