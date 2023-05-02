import { Bot } from "../../bot.js";
import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.js";
import questionData from "../lib/constants/questions.js";
import { Components } from "../utils/Components.js";
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
          const components = new Components();
          for (const [index] of data.choices.entries()) {
            components.addButton(
              `${index + 1}`,
              "Primary",
              `quizAnswer-${interaction.user.id}-${index + 1}`
            );
          }

          await Bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
              type: InteractionResponseTypes.ChannelMessageWithSource,
              data: {
                content: `${data.question}\n\n${data.choices
                  .map((choice, index) => `**${index + 1}.** ${choice}`)
                  .join(`\n`)}`,
                components,
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
        console.log("quiz button msg", 1);
        // if no response just cancel out
        if (!answer || answer.content === "quit") {
          console.log("quiz button msg", 2);
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

        console.log("quiz button msg", 3);
        // React if the user is right or wrong
        // answer.id doesnt exist for button responses
        if (answer.id) {
          console.log("quiz button msg", 4);
          await Bot.helpers
            .addReaction(
              interaction.channelId!,
              answer.id,
              isCorrect ? `✅` : `❌`
            )
            .catch(() => null);
        } else {
          console.log("quiz button msg", 5);
          // @ts-ignore
          if (answer.interaction) interaction = answer.interaction;
        }
      } catch (error) {
        console.error(error);
        return interaction.respond(
          "Something went wrong while conducting the quiz.",
          { private: true }
        );
      }
    }

    console.log("quiz button msg", 6);
    if (interaction.acknowledged)
      await interaction.respond(
        `You got **${correctAnswer}** out of ${questions.length} correct!`,
        { private: false }
      );
    else {
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `You got **${correctAnswer}** out of ${questions.length} correct!`,
          },
        }
      );
    }
  },
});
