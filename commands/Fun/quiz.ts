import { Command, KlasaMessage } from 'klasa';

export default class extends Command {
  async run(message: KlasaMessage) {
		// Shuffle the array of questions to randomize the quiz
    const questions = this.client.helpers.constants.questionsData
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    for (const data of questions) {
			// Try and quiz on each question
      try {
        // Send the question to the user
        await message.reply(
          `${data.question}\n\n${data.choices
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

        // Check if the response is a number or a string and heck if the response was right or wrong
        const userChoice = parseInt(answer.content, 10);
        const isCorrect =
          Number.isNaN(userChoice) || userChoice >= data.choices.length
            ? answer.content === data.answer
            : data.choices[userChoice - 1] === data.answer;
        // React if the user is right or wrong
        await answer.react(isCorrect ? `✅` : `❌`).catch(() => null);
      } catch (error) {
        this.client.emit(`error`, error);
      }
    }
  }
}
