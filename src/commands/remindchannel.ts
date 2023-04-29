import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import { db } from "../database/mod.js";
import { createCommand } from "./mod.js";

createCommand({
  name: "remindchannel",
  description: "Set the channel to send reminders in.",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (
      !interaction.member?.permissions?.has("ADMINISTRATOR")
    ) {
      return await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            flags: 64,
            content: "Only server admins can use this command.",
          },
        }
      );
    }

    if (!interaction.guildId || !interaction.channelId) return;

    await db.guilds.upsert({
      where: { guildID: interaction.guildId.toString() },
      update: { finishMonthlyChannelID: interaction.channelId.toString() },
      create: { guildID: interaction.guildId.toString(), finishMonthlyChannelID: interaction.channelId.toString() }
    });

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `The reminder channel has been set to <#${interaction.channelId}> Alhamdulilah. Inshallah everyone will be able to finish the entire Quran every month now.`,
        },
      }
    );
  },
});
