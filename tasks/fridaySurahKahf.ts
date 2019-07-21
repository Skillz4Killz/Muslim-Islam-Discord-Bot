import { TextChannel } from 'discord.js';
import { KlasaUser } from 'klasa';
import { kahf, Task } from '../imports';
import { GuildSettings } from '../lib/types/settings/GuildSettings';
import { UserSettings } from '../lib/types/settings/UserSettings';

const surahKahfFirstTenVerses = [
  kahf.ayah_1.text,
  kahf.ayah_2.text,
  kahf.ayah_3.text,
  kahf.ayah_4.text,
  kahf.ayah_5.text,
  kahf.ayah_6.text,
  kahf.ayah_7.text,
  kahf.ayah_8.text,
  kahf.ayah_9.text,
  kahf.ayah_10.text,
].join('\n\n');

const surahKahfReminder = `**Surah Kahf Friday Reminder**`;

export default class extends Task {
  async run(data) {
    const guild = this.client.guilds.get(data.guildID);
    if (!guild) return this.recreateAndCancel(data);

    const [channel] = (await guild.settings.resolve(
      GuildSettings.FridaySurahKahfChannelID
    )) as [TextChannel | null];
    if (!channel || !channel.embedable) return this.recreateAndCancel(data);

    const user = (await this.client.users
      .fetch(data.authorID)
      .catch(() => null)) as KlasaUser | null;
    if (!user) return null;

    const enabled = user.settings.get(
      UserSettings.FridaySurahKahfEnabled
    ) as boolean;
    if (!enabled) return null;

    try {
      const reasonMessageSent = await channel.send(surahKahfReminder);
      if (!reasonMessageSent) return this.recreateAndCancel(data);

      await channel.send(surahKahfFirstTenVerses);
    } catch (error) {
      this.client.console.error(
        `Error: ${guild.id} - ${guild.name} for Kahf Task\n\n${error}.`
      );
    }
  }

  recreateAndCancel(data) {
    return this.client.schedule.create(this.name, Date.now() + 604800000, data);
  }
}
