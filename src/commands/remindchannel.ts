import { botCache, Channel } from "../../deps.ts";
import { db } from "../database/database.ts";
import { sendResponse } from "../utils/helpers.ts";

botCache.commands.set("remindchannel", {
  name: "remindchannel",
  aliases: ["rc"],
  cooldown: {
    seconds: 5,
    allowedUses: 2,
  },
  botChannelPermissions: ["SEND_MESSAGES"],
  arguments: [
    { name: "channel", type: "textchannel", required: false },
  ],
  execute: async function (message, args: RemindArgs, guild) {
    if (!args.channel) {
      db.guilds.update(message.guildID, { finishMonthlyChannelID: "" });
      return sendResponse(
        message,
        `The reminder channel has been removed. You will no longer get reminders in this guild.`,
      );
    }

    db.guilds.update(
      message.guildID,
      { finishMonthlyChannelID: args.channel.id },
    );

    sendResponse(
      message,
      `The reminder channel has been set to ${args.channel.mention} Alhumdulilah. Inshallah everyone will be able to finish the entire Quran every month now.`,
    );
  },
});

interface RemindArgs {
  channel?: Channel;
}
