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
      cooldown: 5,
      description: (language) => language.get('AYAH_DESCRIPTION'),
      promptLimit: Infinity,
      quotedStringSupport: true,
      requiredPermissions: [Permissions.FLAGS.EMBED_LINKS],
      usage: '(surah:surah) [ayah:integer{1,293}] [endingAyah:integer]',
      usageDelim: ' ',
    });

    this.createCustomResolver(
      `surah`,
      async(arg, _possible, message: KlasaMessage) => {
        if (!arg) {
          await message.send(`Finding random verse since none was provided.`);
          return this.getRandom();
        }
        // If something was provided check if its a valid surah
        const surah = Quran[`surah_${this.findSurah(arg)}`];
        if (!surah)
          throw `I was not able to find ${arg} surah. If you believe this is an mistake, please contact me on my server using the **invite** command.`;
        // The surah is valid so return the argument
        return arg;
      }
    );
  }

  async run(
    message: KlasaMessage,
    [surahName, ayahNumber, endAyah]: [
      string,
      number | undefined,
      number | undefined
    ]
  ) {
    // Check if the end ayah is valid
    if (endAyah && endAyah < ayahNumber)
      return message.send(
        `You can't have a ending ayah number smaller then the starting ayah number.`
      );
    // if trying to quote too many prevent spam
    if (endAyah - ayahNumber > 10 && !message.hasAtLeastPermissionLevel(1)) return message.send(`You can't have that many ayah sent at once please try a smaller range. Must be less than 10.`);

    const surahToFind = `surah_${this.findSurah(surahName)}`;
    const surahToUse = Quran[surahToFind];

    for (let i = ayahNumber; i <= endAyah; i++) {
      const ayahToSend =
        surahToUse[`ayah_${i}` || this.getRandom(surahToUse)];
      if (!ayahToSend) {
        await message.channel.send(
          `Are you sure you provided a valid ayah number? I can't find ${i} ayah for surah ${
            surahToUse.name
          }`
        );
        break;
      }

      await message.channel.send(
        new MessageEmbed()
          .setColor('RANDOM')
          .setAuthor(
            message.language.get(
              'AYAH_SURAH_AND_AYAH',
              surahToUse.name,
              ayahNumber
            ),
            message.author.displayAvatarURL()
          )
          .setDescription(ayahToSend.text)
          .setImage(ayahToSend.image)
          .setFooter(message.language.get('QURAN_COM_CREDITS'))
      );
    }
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
