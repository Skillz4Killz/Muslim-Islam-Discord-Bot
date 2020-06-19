import { Event } from "@klasa/core";

const tasksToCreate = [
  { name: "reminder", time: "*/20 * * * *" },
  { name: "changeProfilePicture", time: "@daily" },
  // { name: 'fridaySurahKahf', time: '@weekly' }
];

export default class extends Event {
  async run() {
    // For every task we will create them as needed
    for (const task of tasksToCreate) this.handleTaskCreation(task.name, task.time);

    return this.client.emit("log", "Klasa Ready Completed!");
  }

  handleTaskCreation(name: string, time: string) {
    const taskExists = this.client.schedule.tasks.find((task) => task.taskName === name);
    if (!taskExists) this.client.schedule.create(name, time);
  }
}
