import {
  ApplicationCommandTypes,
  ButtonStyles,
  InteractionResponseTypes,
  MessageComponentTypes,
} from "../../deps.js";
import { createCommand } from "./mod.js";

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
          components: [
            {
              type: MessageComponentTypes.ActionRow,
              components: [
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Link,
                  label: "Invite The Bot!",
                  emoji: {
                    id: BigInt("1099768803757400154"),
                    name: "Alhamdulilah",
                    animated: true,
                  },
                  url: `https://discordapp.com/oauth2/authorize?client_id=${Bot.id}&scope=bot&permissions=347200`,
                },
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Link,
                  label: "Need Help?",
                  emoji: {
                    id: BigInt("1099768806278176900"),
                    name: "Mashallah",
                    animated: true,
                  },
                  url: `https://discord.gg/BRwbdQExAB`,
                },
              ],
            },
          ],
          content: `**Alhamdulilah!**`,
        },
      }
    );
  },
});
