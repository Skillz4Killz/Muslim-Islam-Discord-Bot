import { Command, CommandStore, KlasaClient, KlasaMessage, MessageEmbed, Quran } from '../../imports';

export default class extends Command {
  constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
    super(client, store, file, directory, {
      aliases: ['a'],
      description: 'Read a specific ayah.',
      extendedHelp: 'No extended help available.',
      quotedStringSupport: true,
      requiredPermissions: ['EMBED_LINKS'],
      usage: '[surah:int|surah:str] [ayah:int]',
      usageDelim: ' ',
    });
  }

  async run(message: KlasaMessage, [surah, ayah]: [number | string, number]) {
    // Check if the surah provided is a number or a string
    surah = typeof surah === 'string' ? this.surahNameToInt(surah) : this.getRandom();

    const ayahToSend = Quran[surah][ayah || this.getRandom(surah)];

    return message.send(new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Surah ${Quran[surah].name} Ayah #${ayah}`, message.author.displayAvatarURL())
      .setDescription(ayahToSend.text)
      .setImage(ayahToSend.image)
      .setFooter('Credits To Quran.com')
    );
  }

  surahNameToInt(surah: string) {
    // TODO: add all the remaining surahs
    switch (surah) {
      case 'fatihah': return 1;
      case 'baqarah': return 2;
      case 'imran': return 3;
      default: throw 'No surah found with that name.';
    }
  }

  getRandom(surah?: number) {
    return Math.floor(Math.random() * (surah ? Object.keys(Quran[surah]).length : 114)) + 1;
  }
}
