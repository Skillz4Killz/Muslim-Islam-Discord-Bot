const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

const Quran = require('../../quran.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      enabled: true,
      runIn: ['text', 'dm', 'group'],
      requiredPermissions: [],
      requiredSettings: [],
      aliases: [],
      autoAliases: true,
      bucket: 1,
      cooldown: 0,
      promptLimit: 0,
      promptTime: 30000,
      deletable: false,
      guarded: false,
      nsfw: false,
      permissionLevel: 0,
      description: '',
      extendedHelp: 'No extended help available.',
      usage: '[surah:str] [ayah:int]',
      usageDelim: ' ',
      quotedStringSupport: true,
      subcommands: false
    });
  }

  async run(message, [surah, ayah]) {
    // Check if the surah provided is a number or a string
    const surahIsString = isNaN(surah);
    // 
    if (surahIsString) surah = surahNameToInit(surah);

    return message.send(new MessageEmbed().setColor('RANDOM').setDescription(Quran[surah][ayah].text).setImage(Quran[surah][ayah].image));
  }

};
