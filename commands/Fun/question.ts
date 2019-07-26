import { Command, KlasaMessage } from 'klasa';

export default class extends Command {
  async run(message: KlasaMessage) {
    const randomQuestion =
      this.client.helpers.constants.questionsData[Math.floor(Math.random() * this.client.helpers.constants.questionsData.length)];

    try {
      // Send the question to the user
      await message.reply(
        `${randomQuestion.question}\n\n${randomQuestion.choices
          .map((choice, index) => `**${index + 1}.** ${choice}`)
          .join(`\n`)}`
      );
      // Wait for a response from the user for about 2 minutes
      const messages = await message.channel.awaitMessages(
        (response) => response.author === message.author,
        { time: 120000, max: 1 }
      );
      // if no response just cancel out
      if (messages.size === 0) return null;
      // Find the response since it returns a collection.
      const answer = messages.first();

      const userChoice = parseInt(answer.content, 10);
      // Check if the response is a number or a string and heck if the response was right or wrong
      const isCorrect =
        Number.isNaN(userChoice) || userChoice >= randomQuestion.choices.length
          ? answer.content === randomQuestion.answer
          : randomQuestion.choices[userChoice - 1] === randomQuestion.answer;
      // Send the answer and the explanantion
      await message.reply(
        `${isCorrect ? `Correct!` : `Wrong!`} => The answer is: **${
          randomQuestion.answer
        }**.\n\n${randomQuestion.explanation}`,
        { split: true }
      );
    } catch (error) {
      this.client.emit(`error`, error);
    }
  }
}
