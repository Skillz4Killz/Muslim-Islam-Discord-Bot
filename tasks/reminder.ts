import { Message, MessageEmbed, Quran, Task } from '../imports';
import { GuildSettings } from '../lib/types/settings/GuildSettings';
import { UserSettings } from '../lib/types/settings/UserSettings';

export default class extends Task {

  async run() {
    this.client.emit('log', 'Reminder Task Running');

    for (const guild of this.client.guilds.values()) {
      const [channel] = await guild.settings.resolve(
        GuildSettings.FinishMonthlyChannelID
      );
      if (!channel) continue;

      // This channel has a valid reminder channel so fetch all members
      await guild.members.fetch();

      for (const member of guild.members.values()) {
        // For each member get the status and verse of their quran reminders
        const [enabled, nextVerse] = member.user.settings.pluck(
          UserSettings.FinishMonthlyEnabled,
          UserSettings.FinishMonthlyVerse
        );

        if (!enabled) continue;

        // Get the surah and ayah numbers to send based on the verse they are up to
        const verse = nextVerse || 1;
        let surah;
        let ayah = 'ayah_1';

        for (const surahKey of Object.keys(Quran)) {
          const surahValue = Quran[surahKey];
          for (const ayahKey of Object.keys(surahValue)) {
            if (surahValue[ayahKey].verse !== verse) continue;
            surah = surahValue;
            ayah = ayahKey;
          }
        }
        // Get the ayah object
        const ayahToSend = surah[ayah];
        // Create the embed to send
        const embed = new MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(
            `Surah ${surah.name} Ayah #${ayah.substring(5)}`,
            member.user.displayAvatarURL()
          )
          .setDescription(ayahToSend.text)
          .setImage(ayahToSend.image)
          .setTimestamp()
          .setFooter('Credits To Quran.com');

        // Send the reminder embed for the verse
        const sentReminder = await channel.send(member.user, {
          embed,
        }) as Message;
        // Add a reaction so the user can confirm they read it
        if (sentReminder) await sentReminder.react('✅');
        // Add 1 to the verse number or reset it if they are complete
        await member.user.settings.update(
          UserSettings.FinishMonthlyVerse,
          verse === 6105 ? 1 : verse + 1,
          { throwOnError: true }
        );
        // Log it
        this.client.emit(
          'log',
          `Reminded ${member.user.tag} of ${
            surah.name
          } ${ayah} in the reminder task.`
        );
      }
    }

    return;
  }
}
