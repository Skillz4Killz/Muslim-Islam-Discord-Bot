import { Command, KlasaMessage } from 'klasa';

export default class extends Command {
  aliases = [`about`];

  async run(message: KlasaMessage) {
    return message.sendLocale('INVITE');
  }
}
