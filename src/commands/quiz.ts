import { Bot } from "../../bot.js";
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import questionData from "../lib/constants/questions.js";
import { needMessage } from "../utils/collectors.js";

Bot.commands.set("quiz", {
  name: "quiz",
  description: "Test your knowledge of Islam!",
  type: ApplicationCommandTypes.ChatInput,
  execute: async function (_, interaction) {
    // Shuffle the array of questions to randomize the quiz
    const questions = questionData
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    let correctAnswer = 0;
    for (const data of questions) {
      // Try and quiz on each question
      try {
        // Send the question to the user
        if (interaction.acknowledged)
          await interaction.respond(
            `${data.question}\n\n${data.choices
              .map((choice, index) => `**${index + 1}.** ${choice}`)
              .join(`\n`)}`,
            { private: false }
          );
        else {
          await Bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
              type: InteractionResponseTypes.ChannelMessageWithSource,
              data: {
                content: `${data.question}\n\n${data.choices
                  .map((choice, index) => `**${index + 1}.** ${choice}`)
                  .join(`\n`)}`,
              },
            }
          );
        }

        interaction.acknowledged = true;

        // Wait for a response from the user for about 2 minutes
        const answer = await needMessage(
          interaction.user.id,
          interaction.channelId!
        );
        // if no response just cancel out
        if (!answer) {
          return interaction.respond(
            "Cancelling the quiz, as there was no response provided.",
            { private: false }
          );
        }

        // Check if the response is a number or a string and heck if the response was right or wrong
        const userChoice = parseInt(answer.content, 10);
        const isCorrect =
          Number.isNaN(userChoice) || userChoice >= data.choices.length
            ? answer.content === data.answer
            : data.choices[userChoice - 1] === data.answer;
        if (isCorrect) correctAnswer++;

        // React if the user is right or wrong
        await Bot.helpers
          .addReaction(
            interaction.channelId!,
            answer.id,
            isCorrect ? `✅` : `❌`
          )
          .catch(() => null);
      } catch (error) {
        console.error(error);
        return interaction.respond(
          "Something went wrong while conducting the quiz.",
          { private: true }
        );
      }
    }

    await interaction.respond(
      `You got **${correctAnswer}** out of ${questions.length} correct!`,
      { private: false }
    );
  },
});
