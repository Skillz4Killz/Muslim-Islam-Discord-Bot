import { Event } from '../imports';

export default class extends Event {
  async run() {
    // If reminder task doesnt exist on startup create it every 10 minutes
    if (!this.client.schedule.tasks.find((t) => t.taskName === 'reminder'))
      await this.client.schedule.create('reminder', '*/10 * * * *');
    // If the profile picture task doesnt exist on startup create it for every 2 hrs
    if (
      !this.client.schedule.tasks.find(
        (t) => t.taskName === 'changeProfilePicture'
      )
    )
      await this.client.schedule.create('changeProfilePicture', '0 */2 * * *');

    return this.client.emit('log', 'Klasa Ready Completed!');
  }
}
