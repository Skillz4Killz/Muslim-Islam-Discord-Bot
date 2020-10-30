import { botCache, memberIDHasPermission } from "../../deps.ts";
import { Surah } from "../lib/types/islam.ts";
import { Embed } from "../utils/Embed.ts";
import { sendEmbed, sendResponse } from "../utils/helpers.ts";

botCache.commands.set("ayah", {
  name: "ayah",
  aliases: ["a"],
  cooldown: {
    seconds: 5,
    allowedUses: 2,
  },
  botChannelPermissions: ["EMBED_LINKS", "SEND_MESSAGES"],
  arguments: [
    { name: "surah", type: "surah" },
    { name: "ayah", type: "number" },
    { name: "lastAyah", type: "number", required: false },
  ],
  execute: async function (message, args: AyahArgs) {
    // Check if the end ayah is valid
    if (args.lastAyah && args.lastAyah < args.ayah) {
      return sendResponse(
        message,
        `You can't have a ending ayah number smaller then the starting ayah number.`,
      );
    }
    // if trying to quote too many prevent spam
    if (
      args.lastAyah && args.lastAyah - args.ayah > 10 &&
      !memberIDHasPermission(
        message.author.id,
        message.guildID,
        ["MANAGE_ROLES"],
      )
    ) {
      return sendResponse(
        message,
        `You can't have that many ayah sent at once please try a smaller range. Must be less than 10.`,
      );
    }

    const lastAyah = args.lastAyah || args.ayah;

    for (let i = args.ayah; i <= lastAyah; i++) {
      const ayahToSend = args.surah.ayahs[i - 1];
      if (!ayahToSend) {
        sendResponse(
          message,
          `Are you sure you provided a valid ayah number? I can't find ${i} ayah for surah ${args.surah.name}`,
        );
        break;
      }

      const embed = new Embed().setFooter("Credits To Quran.com");

      embed
        .setColor("RANDOM")
        .setAuthor(
          `Surah ${args.surah.name} Ayah #${ayahToSend.number}`,
          "https://i.imgur.com/EbtoXX8.jpeg",
        )
        .setDescription(ayahToSend.text)
        .setImage(ayahToSend.image);

      sendEmbed(message.channelID, embed);
    }
  },
});

interface AyahArgs {
  surah: Surah;
  ayah: number;
  lastAyah?: number;
}
