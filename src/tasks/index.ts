export async function loadTasks() {
    await import("./reminder.js");
    await import("./collectors.js");
}