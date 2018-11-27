const { Command } = require('klasa')
const { MessageEmbed } = require('discord.js')

const Quran = require('../../quran.js')

module.exports = class extends Command {
  constructor (...args) {
    super(...args, {
      requiredPermissions: ['EMBED_LINKS'],
      aliases: ['a'],
      description: 'Read a specific ayah.',
      extendedHelp: 'No extended help available.',
      usage: '[surah:str] [ayah:int]',
      usageDelim: ' ',
      quotedStringSupport: true,
      subcommands: false
    })
  }

  async run (message, [surah, ayah]) {
    // Check if the surah provided is a number or a string
    if (surah) {
      const surahIsString = isNaN(surah)
      // TODO: create this function
      if (surahIsString) surah = this.surahNameToInit(surah)
    } else surah = this.getRandom()

    const ayahToSend = Quran[surah][ayah || this.getRandom(surah)]

    return message.send(new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Surah ${Quran[surah].name} Ayah #${ayah}`, message.author.displayAvatarURL())
      .setDescription(ayahToSend.text)
      .setImage(ayahToSend.image)
      .setFooter('Credits To Quran.com')
    )
  }

  getRandom (surah) {
    // TODO: once more surahs are added change the 1 at the end to 114
    return 1 + Math.floor(Math.random() * surah ? Object.keys(Quran[surah]).length : 1)
  }
}
