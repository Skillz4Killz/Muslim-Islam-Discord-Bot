import { Event } from '../imports';

export default class extends Event {
  async run() {
    return this.client.user!.setActivity(
      `!help In ${this.client.guilds.size} Guilds.`,
      { type: 'LISTENING' }
    );
  }
}
