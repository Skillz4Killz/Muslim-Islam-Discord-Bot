import { Message, MessageEmbed, Quran, Task, TextChannel } from '../imports';

export default class extends Task {

  private readonly reminderChannel = this.client.channels.get('517175884432801795') as TextChannel;

  async run() {
    this.client.emit('log', 'Reminder Task Running');
    // Find all users that have enabled the reminders
    const usersToRemind = this.client.users
      .filter((user) => user.settings.reminders.finishMonthly.enabled)
      .array();
    // If no users canncel
    if (!usersToRemind.length) return null;
    // Run a loop for each user
    for (const user of usersToRemind) {
      // Get the verse for this user or if it has none set it to 1
      const verse = user.settings.reminders.finishMonthly.verse || 1;
      // Get the surah and ayah numbers to send based on the verse they are up to
      const { surah, ayah } = this.getSurahAndAyah(verse);
      // Get the ayah object
      const ayahToSend = surah[ayah];

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(
          `Surah ${surah.name} Ayah #${ayah.substring(5)}`,
          user.displayAvatarURL()
        )
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image)
        .setTimestamp()
        .setFooter('Credits To Quran.com');

      const channel = this.reminderChannel;
      const sentReminder = await channel.send(user, { embed }) as Message;
      if (sentReminder) await sentReminder.react('✅');

      const { errors } = await user.settings.update(
        'reminders.finishMonthly.verse',
        verse === 6105 ? 1 : verse + 1
      );
      if (errors.length) this.client.emit('error', errors.join('\n'));
      this.client.emit('log', `Reminded ${user.tag} of ${surah.name} ${ayah} in the reminder task.`);
    }
  }

  getSurahAndAyah(verse) {

    for (const surah of Object.values(Quran))
      for (const ayah of Object.keys(surah)) if (surah[ayah].verse === verse) return { surah, ayah };
    this.client.emit('error', '');
  }
}
