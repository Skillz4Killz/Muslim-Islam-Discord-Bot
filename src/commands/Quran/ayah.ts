import { Quran, surahNamesToNumber, sendTextMessage } from "../../../imports";
import { Command, CommandStore } from "klasa";
import { PermissionsFlags, Message, Embed } from "@klasa/core";
import { randomColor, sendEmbedMessage } from "../../../lib/utils/klasa";

export default class extends Command {
  constructor(store: CommandStore, file: string, directory: string[]) {
    super(store, file, directory, {
      aliases: ["a"],
      cooldown: 5,
      description: (language) => language.get("AYAH_DESCRIPTION"),
      promptLimit: Infinity,
      quotedStringSupport: true,
      requiredPermissions: [PermissionsFlags.EmbedLinks],
      usage: "(surah:surah) [ayah:integer{1,293}] [endingAyah:integer]",
      usageDelim: " ",
    });

    this.createCustomResolver(`surah`, async (arg, _possible, message: Message) => {
      if (!arg) {
        sendTextMessage(message, `Finding random verse since none was provided.`);
        return this.getRandom();
      }
      // If something was provided check if its a valid surah
      const surah = Quran[`surah_${this.findSurah(arg)}`];
      if (!surah)
        throw `I was not able to find ${arg} surah. If you believe this is an mistake, please contact me on my server using the **invite** command.`;
      // The surah is valid so return the argument
      return arg;
    });
  }

  async run(message: Message, [surahName, ayahNumber = 1, endAyah = 1]: [string, number, number]) {
    // Check if the end ayah is valid
    if (endAyah && endAyah < ayahNumber)
      return sendTextMessage(message, `You can't have a ending ayah number smaller then the starting ayah number.`);
    // if trying to quote too many prevent spam
    if (endAyah - ayahNumber > 10 && !message.hasAtLeastPermissionLevel(1))
      return sendTextMessage(
        message,
        `You can't have that many ayah sent at once please try a smaller range. Must be less than 10.`
      );

    const surahToFind = `surah_${this.findSurah(surahName)}`;
    const surahToUse = Quran[surahToFind];

    const lastAyah = endAyah || ayahNumber;

    const embed = new Embed().setFooter(message.language.get("QURAN_COM_CREDITS"));

    for (let i = ayahNumber; i <= lastAyah; i++) {
      const ayahToSend = surahToUse[`ayah_${i}`];
      if (!ayahToSend) {
        sendTextMessage(
          message,
          `Are you sure you provided a valid ayah number? I can't find ${i} ayah for surah ${surahToUse.name}`
        );
        break;
      }

      embed
        .setColor(randomColor())
        .setAuthor(message.language.get("AYAH_SURAH_AND_AYAH", surahToUse.name, i), message.author.displayAvatarURL())
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image);

      if (i !== lastAyah) sendEmbedMessage(message, embed);
    }

    return sendEmbedMessage(message, embed)
  }

  findSurah(surah: string) {
    // @ts-ignore
    const surahValue = surahNamesToNumber[surah];
    return surahValue || surah;
  }

  getRandom(surah?: string) {
    return Math.floor(Math.random() * (surah ? Object.keys(Quran[`surah_${surah}`]).length - 1 : 114)) + 1;
  }
}
