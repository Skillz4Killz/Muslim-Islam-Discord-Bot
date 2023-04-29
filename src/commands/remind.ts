import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import { db } from "../database/mod.js";
import { createCommand } from "./mod.js";

createCommand({
  name: "remind",
  description: "Create reminders to read the Qur'an.",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (!interaction.guildId) return;

    const userID = interaction.user.id.toString();
    const guildID = interaction.guildId.toString();
    const settings = await db.guilds.findUnique({ where: { guildID } });
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
        }
      );
    }

    const userSettings = await db.users.findUnique({ where: { userID } });
    const enabled = !userSettings?.finishMonthlyEnabled;
    await db.users.upsert({
      where: { userID },
      update: { finishMonthlyEnabled: enabled },
      create: { userID, finishMonthlyEnabled: true }
    });

    if (enabled) {
      if (!settings.finishMonthlyUserIDs?.includes(userID)) {
        await db.guilds.update({
          where: { guildID },
          data: {
            finishMonthlyUserIDs: { push: userID }
          },
        });
      }
    } else {
      if (settings.finishMonthlyUserIDs?.includes(userID)) {
        await db.guilds.update({
          where: { guildID },
          data: {
            finishMonthlyUserIDs: settings.finishMonthlyUserIDs.filter(
              (id) => id !== userID
            ),
          },
        });
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
      }
    );
  },
});
