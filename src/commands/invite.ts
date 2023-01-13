import {
  ApplicationCommandTypes,
  ButtonStyles,
  InteractionResponseTypes,
  MessageComponentTypes,
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
          components: [
            {
              type: MessageComponentTypes.ActionRow,
              components: [
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Link,
                  label: "Invite The Bot!",
                  emoji: {
                    id: BigInt("759279852389269525"),
                    name: "Alhamdulilah",
                    animated: true,
                  },
                  url:
                    `https://discordapp.com/oauth2/authorize?client_id=${Bot.id}&scope=bot&permissions=347200`,
                },
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Link,
                  label: "Need Help?",
                  emoji: {
                    id: BigInt("821594383915941936"),
                    name: "Mashallah",
                    animated: true,
                  },
                  url: `https://discord.gg/J4NqJ72`,
                },
              ],
            },
          ],
          content: `**Alhamdulilah!**`,
        },
      },
    );
  },
});
