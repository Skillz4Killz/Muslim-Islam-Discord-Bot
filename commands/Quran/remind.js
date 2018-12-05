const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['r'],
      description: 'Enable or disable the Quran reminders',
      extendedHelp: 'No extended help available.'
    })
  }

  async run (message, [surah, ayah]) {
    const enabled = message.author.settings.reminders.finishMonthly.enabled
    const { errors } = await message.author.settings.update('reminders.finishMonthly.enabled', !enabled)
    if (errors.length) this.client.emit('error', errors.join('\n'))

    return message.send(new MessageEmbed()
      .setColor('RANDOM')
      .setDescription(enabled ? 'You turned off the reminders to help you read the Quran every month.' : 'Alhumdulilah! You have enabled the reminders to help you complete reading the Quran every month.')
    )
  }
}
