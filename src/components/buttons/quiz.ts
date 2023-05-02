import { Bot } from "../../../bot.js";
import { Interaction, InteractionResponseTypes } from "../../../deps.js";
import { messageCollectors } from "../../utils/collectors.js";

export async function processQuizButton(interaction: Interaction) {
  console.log("quiz button", 1);
  if (!interaction.data?.customId?.startsWith("quizAnswer")) return;
  console.log("quiz button", 2);
  const [_, userId, answerIndex] = interaction.data?.customId.split("-");

  if (userId !== interaction.user.id.toString()) {
    console.log("quiz button", 2);
    return await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `This message has been sent for a different user. This button will not work for you.`,
        },
      }
    );
  }

  console.log("quiz button", 3);
  const collector = messageCollectors.get(interaction.user.id);
  // This user has no collectors pending or the message is in a different channel
  if (!collector || interaction.channelId !== collector.channelId) return;
  console.log("quiz button", 4);
  // Remove the collector
  messageCollectors.delete(interaction.user.id);
  // Resolve the collector
  // @ts-ignore
  return collector.resolve([{ id: 0n, content: answerIndex!, interaction }]);
}
