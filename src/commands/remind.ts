// import { botCache } from "../../deps.ts";
// import { db } from "../database/database.ts";
// import { sendResponse } from "../utils/helpers.ts";

// botCache.commands.set("remind", {
//   name: "remind",
//   cooldown: {
//     seconds: 5,
//     allowedUses: 2,
//   },
//   botChannelPermissions: ["SEND_MESSAGES"],
//   arguments: [
//     { name: "enable", type: "boolean" },
//   ],
//   execute: async function (message, args: RemindArgs, guild) {
//     const settings = await db.guilds.get(guildID);
//     if (!settings?.finishMonthlyChannelID) {
//       return sendResponse(
//         message,
//         "The reminder channel has not been setup for this guild by a guild admin. Please ask a guild admin to use the **!remindchannel** command before I can send reminders.",
//       );
//     }

//     db.users.update(userID, { finishMonthlyEnabled: args.enable });

//     if (args.enable) {
//       if (!settings.finishMonthlyUserIDs?.includes(userID)) {
//         db.guilds.update(
//           guildID,
//           {
//             finishMonthlyUserIDs: settings
//               ? [...(settings.finishMonthlyUserIDs || []), userID]
//               : [userID],
//           },
//         );
//       }
//     } else {
//       if (settings?.finishMonthlyUserIDs?.includes(userID)) {
//         db.guilds.update(
//           guildID,
//           {
//             finishMonthlyUserIDs: settings.finishMonthlyUserIDs.filter((id) =>
//               id !== userID
//             ),
//           },
//         );
//       }
//     }

//     return sendResponse(
//       message,
//       args.enable
//         ? "Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month."
//         : "You turned off the reminders to help you read the Quran every month.",
//     );
//   },
// });

// interface RemindArgs {
//   enable: boolean;
// }

import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { db } from "../database/mod.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "remind",
  description: "Create reminders to read the Qur'an.",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (!interaction.guildId) return;

    const userID = interaction.user.id.toString();
    const guildID = interaction.guildId.toString();
    const settings = await db.guilds.get(guildID);
    if (!settings?.finishMonthlyChannelID) {
      return await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            flags: 64,
            content:
              "The reminder channel has not been setup for this guild by a guild admin. Please ask a guild admin to use the **!remindchannel** command before I can send reminders.",
          },
        },
      );
    }

    const userSettings = await db.users.get(userID);
    const enabled = !userSettings?.finishMonthlyEnabled;
    db.users.update(userID, {
      id: userID,
      finishMonthlyEnabled: enabled,
    });

    if (enabled) {
      if (!settings.finishMonthlyUserIDs?.includes(userID)) {
        db.guilds.update(
          guildID,
          {
            id: guildID,
            finishMonthlyUserIDs: settings
              ? [...(settings.finishMonthlyUserIDs || []), userID]
              : [userID],
          },
        );
      }
    } else {
      if (settings?.finishMonthlyUserIDs?.includes(userID)) {
        db.guilds.update(
          guildID,
          {
            id: guildID,
            finishMonthlyUserIDs: settings.finishMonthlyUserIDs.filter((id) =>
              id !== userID
            ),
          },
        );
      }
    }

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: enabled
            ? "Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month."
            : "You turned off the reminders to help you read the Quran every month.",
        },
      },
    );
  },
});
