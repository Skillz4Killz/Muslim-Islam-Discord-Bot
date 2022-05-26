// import { addReaction, botCache } from "../../deps.ts";
// import questionData from "../lib/constants/questions.ts";
// import { needMessage } from "../utils/collectors.ts";
// import { sendResponse } from "../utils/helpers.ts";

// botCache.commands.set("quiz", {
//   name: "quiz",
//   execute: async function (message, args, guild) {
//     // Shuffle the array of questions to randomize the quiz
//     const questions = questionData
//       .map((a) => ({ sort: Math.random(), value: a }))
//       .sort((a, b) => a.sort - b.sort)
//       .map((a) => a.value);

//     let correctAnswer = 0;
//     for (const data of questions) {
//       // Try and quiz on each question
//       try {
//         // Send the question to the user
//         await sendResponse(
//           message,
//           `${data.question}\n\n${
//             data.choices
//               .map((choice, index) => `**${index + 1}.** ${choice}`)
//               .join(`\n`)
//           }`,
//         );
//         // Wait for a response from the user for about 2 minutes
//         const answer = await needMessage(message.author.id, message.channelID);
//         // if no response just cancel out
//         if (!answer) {
//           return sendResponse(
//             message,
//             "Cancelling the quiz, as there was no response provided.",
//           );
//         }

//         // Check if the response is a number or a string and heck if the response was right or wrong
//         const userChoice = parseInt(answer.content, 10);
//         const isCorrect =
//           Number.isNaN(userChoice) || userChoice >= data.choices.length
//             ? answer.content === data.answer
//             : data.choices[userChoice - 1] === data.answer;
//         if (isCorrect) correctAnswer++;
//         // React if the user is right or wrong
//         addReaction(message.channelID, answer.id, isCorrect ? `✅` : `❌`).catch(
//           () => null,
//         );
//       } catch (error) {
//         console.error(error);
//         return sendResponse(
//           message,
//           "Something went wrong while conducting the quiz.",
//         );
//       }
//     }

//     sendResponse(
//       message,
//       `You got **${correctAnswer}** out of ${questions.length} correct!`,
//     );
//   },
// });
