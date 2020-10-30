import { botCache } from "../../deps.ts";
import { db } from "../database/database.ts";
import { sendResponse } from "../utils/helpers.ts";

botCache.commands.set("remind", {
  name: "remind",
  cooldown: {
    seconds: 5,
    allowedUses: 2,
  },
  botChannelPermissions: ["SEND_MESSAGES"],
  arguments: [
    { name: "enable", type: "boolean" },
  ],
  execute: async function (message, args: RemindArgs, guild) {
    const settings = await db.guilds.get(message.guildID);
    if (!settings?.finishMonthlyChannelID) {
      return sendResponse(
        message,
        "The reminder channel has not been setup for this guild by a guild admin. Please ask a guild admin to use the **!remindchannel** command before I can send reminders.",
      );
    }

    db.users.update(message.author.id, { finishMonthlyEnabled: args.enable });

    if (args.enable) {
      if (!settings.finishMonthlyUserIDs?.includes(message.author.id)) {
        db.guilds.update(
          message.guildID,
          {
            finishMonthlyUserIDs: settings
              ? [...(settings.finishMonthlyUserIDs || []), message.author.id]
              : [message.author.id],
          },
        );
      }
    } else {
      if (settings?.finishMonthlyUserIDs?.includes(message.author.id)) {
        db.guilds.update(
          message.guildID,
          {
            finishMonthlyUserIDs: settings.finishMonthlyUserIDs.filter((id) =>
              id !== message.author.id
            ),
          },
        );
      }
    }

    return sendResponse(
      message,
      args.enable
        ? "Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month."
        : "You turned off the reminders to help you read the Quran every month.",
    );
  },
});

interface RemindArgs {
  enable: boolean;
}
