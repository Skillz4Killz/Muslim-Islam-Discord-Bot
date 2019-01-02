import {
  Command,
  CommandStore,
  KlasaClient,
  KlasaMessage,
  MessageEmbed,
  Quran,
} from '../../imports';

export default class extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string
  ) {
    super(client, store, file, directory, {
      aliases: ['a'],
      description: 'Read a specific ayah.',
      extendedHelp: 'No extended help available.',
      quotedStringSupport: true,
      requiredPermissions: ['EMBED_LINKS'],
      usage: '[surah:str] [ayah:str]',
      usageDelim: ' ',
    });
  }

  async run(message: KlasaMessage, [surah, ayah]: [string, string]) {
    const surahToUse = Quran[`surah_${this.findSurah(surah)}`];
    const ayahToSend = surahToUse[`ayah_${ayah}` || this.getRandom(surah)];

    return message.send(
      new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(
          `Surah ${surahToUse.name} Ayah #${ayah}`,
          message.author.displayAvatarURL()
        )
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image)
        .setFooter('Credits To Quran.com')
    );
  }

  findSurah(surah: string) {
    // TODO: add all the remaining surahs
    switch (surah) {
      case 'fatihah':
        return '1';
      case 'baqarah':
        return '2';
      case 'imran':
        return '3';
      default:
        return surah;
    }
  }

  getRandom(surah?: string) {
    return (
      Math.floor(
        Math.random() *
          (surah ? Object.keys(Quran[`surah_${surah}`]).length - 1 : 114)
      ) + 1
    );
  }
}
