import {
  Command,
  CommandStore,
  KlasaMessage,
  MessageEmbed,
  Permissions,
  Quran,
} from '../../imports';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      aliases: ['a'],
      description: (language) => language.get('COMMAND_AYAH_DESCRIPTION'),
      quotedStringSupport: true,
      requiredPermissions: [Permissions.FLAGS.EMBED_LINKS],
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
          message.language.get(
            'COMMAND_AYAH_SURAH_AND_AYAH',
            surahToUse.name,
            ayah
          ),
          message.author.displayAvatarURL()
        )
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image)
        .setFooter(message.language.get('QURAN_COM_CREDITS'))
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
