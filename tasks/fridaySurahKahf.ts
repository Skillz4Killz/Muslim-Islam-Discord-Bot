import { TextChannel } from 'discord.js';
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
  async run() {
    // Send reminder to all servers in their reminder channel
    for (const guild of this.client.guilds.values()) {
      try {
        const [channel] = (await guild.settings.resolve(
          GuildSettings.FridaySurahKahfChannelID
        )) as [TextChannel | null];
        if (!channel) continue;

        const reasonMessageSent = await channel.send(surahKahfReminder);
        if (!reasonMessageSent) continue;

        await channel.send(surahKahfFirstTenVerses);
      } catch (error) {
        this.client.console.error(
          `Failure to send Guild Reminder for ${guild.id} AKA ${
            guild.name
          } for Surah Kahf Reminder Task\n\n${error}.`
        );
      }
    }

    // Send reminder to all users in their DMs
    for (const user of this.client.users.values()) {
      try {
        const enabled = user.settings.get(UserSettings.FridaySurahKahfEnabled);
        if (!enabled) continue;

        const dmReminderSent = await user.send(surahKahfReminder);
        if (!dmReminderSent) continue;
        await user.send(surahKahfFirstTenVerses);
      } catch (error) {
        this.client.console.error(
          `Failure to send DM for ${
            user.id
          } for Surah Kahf Friday Reminder Task.\n\n${error}`
        );
      }
    }
  }
}
