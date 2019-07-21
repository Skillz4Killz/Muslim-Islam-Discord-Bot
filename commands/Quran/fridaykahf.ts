import { Command, KlasaMessage } from 'klasa';
import { UserSettings } from '../../lib/types/settings/UserSettings';

export default class extends Command {
  async run(message: KlasaMessage) {
    const status = message.author.settings.get(
      UserSettings.FridaySurahKahfEnabled
    ) as boolean;
    await message.author.settings.update(
      UserSettings.FridaySurahKahfEnabled,
      !status
    );

    // If it is now enabled create a task that will remind them next week
    if (!status) await this.client.schedule.create(`fridaySurahKahf`, Date.now() + 604800000, { data: { guildID: message.guild.id, authorID: message.author.id }});

    return message.sendLocale(`FRIDAY_KAHF_TOGGLED`, [!status]);
  }
}
