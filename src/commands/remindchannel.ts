import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { db } from "../database/mod.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "remindchannel",
  description: "Set the channel to send reminders in.",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    if (!interaction.guildId || !interaction.channelId || !interaction.member) {
      return;
    }
    if (
      !interaction.member.permissions || !(interaction.member.permissions & 8n)
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
        },
      );
    }

    db.guilds.update(
      interaction.guildId.toString(),
      {
        id: interaction.guildId.toString(),
        finishMonthlyChannelID: interaction.channelId.toString(),
      },
    );

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content:
            `The reminder channel has been set to <#${interaction.channelId}> Alhumdulilah. Inshallah everyone will be able to finish the entire Quran every month now.`,
        },
      },
    );
  },
});
