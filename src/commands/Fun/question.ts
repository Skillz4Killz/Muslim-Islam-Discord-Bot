import { Command } from "klasa";
import questions from "../../../lib/constants/questions";
import { Message } from "@klasa/core";
import { sendTextMessage } from "../../../lib/utils/klasa";

export default class extends Command {
  async run(message: Message) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    try {
      // Send the question to the user
      await sendTextMessage(
        message,
        `${message.author}, ${randomQuestion.question}\n\n${randomQuestion.choices
          .map((choice, index) => `**${index + 1}.** ${choice}`)
          .join(`\n`)}`
      );
      // Wait for a response from the user for about 2 minutes
      const messages = await message.channel.awaitMessages({
        idle: 120000,
        limit: 1,
        filter: ([response]) => response.author.id === message.author.id,
      });
      // if no response just cancel out
      // Find the response since it returns a collection.
      const answer = messages.firstValue;
      if (!answer)
        return sendTextMessage(message, "Cancelling questions Q&A session as no valid response was provided.");

      const userChoice = parseInt(answer.content, 10);
      // Check if the response is a number or a string and heck if the response was right or wrong
      const isCorrect =
        Number.isNaN(userChoice) || userChoice >= randomQuestion.choices.length
          ? answer.content === randomQuestion.answer
          : randomQuestion.choices[userChoice - 1] === randomQuestion.answer;

      // Send the answer and the explanantion
      return message.send(
        {
          data: {
            content: `${message.author}, ${isCorrect ? `Correct!` : `Wrong!`} => The answer is: **${
              randomQuestion.answer
            }**.\n\n${randomQuestion.explanation}`,
          },
        },
        { maxLength: 2000, char: " " }
      );
    } catch (error) {
      this.client.emit(`error`, error);
      return sendTextMessage(message, "Something went wrong in the command.");
    }
  }
}
