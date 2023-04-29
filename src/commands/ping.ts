import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import { snowflakeToTimestamp } from "../utils/helpers.js";
import { createCommand } from "./mod.js";

createCommand({
  name: "ping",
  description: "Ping the Bot!",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    console.log('commands', ...Bot.commands.keys());
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `🏓 **Allahu Akbar!** The bot is online and responding in: \`${
            ping / 1000
          }s\``,
        },
      }
    ).catch(Bot.logger.error);
  },
});
