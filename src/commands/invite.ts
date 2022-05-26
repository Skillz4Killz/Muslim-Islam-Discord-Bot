import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "invite",
  description: "Invite the Bot!",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content:
            `To add this bot to your guild: <https://discordapp.com/oauth2/authorize?client_id=${Bot.id}&scope=bot&permissions=347200>. If you have an issue or need help please contact me at https://discord.gg/J4NqJ72`,
        },
      },
    );
  },
});
