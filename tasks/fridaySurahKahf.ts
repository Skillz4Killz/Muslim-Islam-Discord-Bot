import { TextChannel } from 'discord.js';
import { kahf, Task } from '../imports';
// import { UserSettings } from '../lib/types/klasa';

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
      const [enabled, channelID] = guild.settings.pluck(
        'fridaySurahKahf.enabled',
        'fridaySurahKahf.channelID'
      );
      if (!enabled || !channelID) continue;

      const reminderChannel = guild.channels.get(channelID) as
        | TextChannel
        | undefined;
      if (!reminderChannel) continue;

      const reasonMessageSent = await reminderChannel
        .send(surahKahfReminder)
        .catch(() => null);
      if (!reasonMessageSent) continue;

      await reminderChannel
        .send(surahKahfFirstTenVerses)
        .catch((error: any) =>
          this.client.console.error(
            `Failure to send Guild Reminder for ${guild.id} AKA ${
              guild.name
            } for Surah Kahf Reminder Task\n\n${error}.`
          )
        );
    }

    // Send reminder to all users in their DMs
    for (const user of this.client.users.values()) {
      const enabled = user.settings.get('fridaySurahKahf.enabled');
      if (!enabled) continue;

      const dmReminderSent = await user
        .send(surahKahfReminder)
        .catch(() => null);
      if (!dmReminderSent) continue;

      await user
        .send(surahKahfFirstTenVerses)
        .catch((error: any) =>
          this.client.console.error(
            `Failure to send DM for ${
              user.id
            } for Surah Kahf Friday Reminder Task.\n\n${error}`
          )
        );
    }
  }
}
