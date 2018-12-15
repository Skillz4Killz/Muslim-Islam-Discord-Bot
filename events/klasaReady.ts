import { Event } from '../imports';

export default class extends Event {

	async run() {
		if (!this.client.schedule.tasks.find((t) => t.taskName === 'reminder')) await this.client.schedule.create('reminder', '*/10 * * * *');
		return this.client.emit('log', `Reminder Task Started`);
	}

}
