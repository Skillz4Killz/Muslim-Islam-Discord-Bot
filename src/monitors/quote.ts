import { Bot } from "../../bot.js";
import { Message } from "../../deps.js";
import Embeds from "../utils/Embed.js";

Bot.monitors.set("quote", {
  name: "quote",
  botChannelPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  /** The main code that will be run when this monitor is triggered. */
  execute: async function (message: Message) {
    if (!message.content.length) return;

    const words = message.content.split(" ");

    for (const word of words) {
      if (!word.startsWith("https://discord.com/channels/")) continue;

      const [_, guildId, channelId, messageId] = word
        .substring(word.indexOf("channels/"))
        .split("/");

      if (!guildId || !channelId || !messageId) continue;

      const quotedMessage = await Bot.helpers.getMessage(channelId, messageId);
      const quotedMessageEmbed = quotedMessage.embeds?.[0] ?? null;

      const embeds = new Embeds(Bot)
        .setAuthor(quotedMessage.author.tag, quotedMessage.author)
        .setColor(`RANDOM`)
        .setTimestamp(quotedMessage.timestamp)
        .setDescription(
          [`[Jump To Message](${word})`, "", quotedMessage.content].join("\n")
        )
        .setImage(quotedMessage.attachments?.[0]?.url ?? "");

      if (quotedMessageEmbed) embeds.addEmbed(quotedMessageEmbed);

      await Bot.helpers.sendMessage(channelId, {
        embeds,
      });
    }
  },
});
