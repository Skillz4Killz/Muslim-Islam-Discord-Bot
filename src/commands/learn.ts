import { Bot } from "../../bot.js";
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import questions from "../lib/constants/questions.js";
import { needMessage } from "../utils/collectors.js";
import { createCommand } from "./mod.js";

createCommand({
  name: "learn",
  description: "Learn more about Islam one question at a time!",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (_, interaction) => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)]!;

    try {
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `${randomQuestion.question}\n\n${randomQuestion.choices
              .map((choice, index) => `**${index + 1}.** ${choice}`)
              .join(`\n`)}`,
          },
        }
      );

      interaction.acknowledged = true;

      // Wait for a response from the user for about 2 minutes
      const answer = await needMessage(
        interaction.user.id,
        interaction.channelId!
      );
      // if no response just cancel out
      if (!answer) {
        return interaction.respond(
          "Cancelling questions Q&A session as no valid response was provided.",
          { private: false }
        );
      }

      const userChoice = parseInt(answer.content, 10);
      // Check if the response is a number or a string and heck if the response was right or wrong
      const isCorrect =
        Number.isNaN(userChoice) || userChoice >= randomQuestion.choices.length
          ? answer.content === randomQuestion.answer
          : randomQuestion.choices[userChoice - 1] === randomQuestion.answer;

      // Send the answer and the explanantion
      let response = `${
        isCorrect ? `Correct!` : `Wrong!`
      } => The answer is: **${randomQuestion.answer}**.\n\n${
        randomQuestion.explanation
      }`;
      if (response.length < 2000)
        return interaction.respond(response, { private: false });

      while (response.length) {
        const partial = response.substring(0, 2000);
        interaction.respond(partial, { private: false });
        response = response.substring(2000);
      }
    } catch (error) {
      console.error(error);
      return interaction.respond("Something went wrong in the command.", {
        private: false,
      });
    }
  },
});
