const { Task } = require('klasa')
const Quran = require('../quran')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Task {
  async run () {
    this.client.emit('log', 'Reminder Task Running')
    const usersToRemind = this.client.users
      .filter(user => user.settings.reminders.finishMonthly.enabled)
      .array()
    if (!usersToRemind.length) return null
    for (const user of usersToRemind) {
      const { verse } = user.settings.reminders.finishMonthly

      const { surah, ayah } = this.getSurahAndAyah(verse)

      const ayahToSend = surah[ayah]

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(
          `Surah ${surah.name} Ayah #${ayah.substring(5)}`,
          user.displayAvatarURL()
        )
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image)
        .setTimestamp()
        .setFooter('Credits To Quran.com')

      const sentReminder = await this.client.channels
        .get('517175884432801795')
        .send(user, { embed })
      if (sentReminder) await sentReminder.react('✅')

      const { errors } = await user.settings.update(
        'reminders.finishMonthly.verse',
        verse === 6105 ? 1 : verse + 1
      )
      if (errors) this.client.emit('error', errors.join('\n'))
      return null
    }
  }

  getSurahAndAyah (verse) {
    for (const surah of Object.values(Quran)) {
      for (const ayah of Object.keys(surah)) {
        if (surah[ayah].verse === verse) return { surah, ayah }
      }
    }
  }
}
