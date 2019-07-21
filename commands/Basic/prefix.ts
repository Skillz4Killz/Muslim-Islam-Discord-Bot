import { Command, CommandStore, KlasaMessage } from 'klasa';
import { GuildSettings } from '../../lib/types/settings/GuildSettings';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      permissionLevel: 1,
      usage: `<prefix:string>`,
    });
  }

  async run(message: KlasaMessage, [prefix]: [string]) {
    await message.guild.settings.update(GuildSettings.Prefix, prefix);

    return message.sendLocale(`PREFIX_CHANGED`, [prefix]);
  }
}
