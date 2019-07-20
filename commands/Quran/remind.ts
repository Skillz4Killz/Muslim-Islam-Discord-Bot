import {
  Command,
  CommandStore,
  KlasaMessage,
  Permissions,
} from '../../imports';
import { GuildSettings } from '../../lib/types/settings/GuildSettings';
import { UserSettings } from '../../lib/types/settings/UserSettings';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      aliases: ['r'],
      description: (language) => language.get('REMIND_DESCRIPTION'),
      requiredPermissions: [Permissions.FLAGS.EMBED_LINKS],
    });
  }

  async run(message: KlasaMessage) {
    const channelID = message.guild.settings.get(
      GuildSettings.FinishMonthlyChannelID
    ) as GuildSettings.ChannelID | null;
    if (!channelID) return message.sendLocale(`REMIND_NOT_SETUP`);

    const enabled = message.author.settings.get(
      UserSettings.FinishMonthlyEnabled
    );

    await message.author.settings.update(
      UserSettings.FinishMonthlyEnabled,
      !enabled,
      { throwOnError: true }
    );

    return message.sendLocale(enabled ? 'REMIND_DISABLED' : 'REMIND_ENABLED');
  }
}
