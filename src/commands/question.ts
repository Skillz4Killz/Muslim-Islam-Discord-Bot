// import { botCache } from "../../deps.ts";
// import questions from "../lib/constants/questions.ts";
// import { needMessage } from "../utils/collectors.ts";
// import { sendResponse } from "../utils/helpers.ts";

// botCache.commands.set("question", {
//   name: "question",
//   execute: async function (message, args, guild) {
//     const randomQuestion =
//       questions[Math.floor(Math.random() * questions.length)];

//     try {
//       // Send the question to the user
//       sendResponse(
//         message,
//         `${randomQuestion.question}\n\n${
//           randomQuestion.choices
//             .map((choice, index) => `**${index + 1}.** ${choice}`)
//             .join(`\n`)
//         }`,
//       );
//       // Wait for a response from the user for about 2 minutes
//       const answer = await needMessage(message.author.id, message.channelID);
//       // if no response just cancel out
//       if (!answer) {
//         return sendResponse(
//           message,
//           "Cancelling questions Q&A session as no valid response was provided.",
//         );
//       }

//       const userChoice = parseInt(answer.content, 10);
//       // Check if the response is a number or a string and heck if the response was right or wrong
//       const isCorrect =
//         Number.isNaN(userChoice) || userChoice >= randomQuestion.choices.length
//           ? answer.content === randomQuestion.answer
//           : randomQuestion.choices[userChoice - 1] === randomQuestion.answer;

//       // Send the answer and the explanantion
//       let response = `${
//         isCorrect ? `Correct!` : `Wrong!`
//       } => The answer is: **${randomQuestion.answer}**.\n\n${randomQuestion.explanation}`;
//       if (response.length < 2000) return sendResponse(message, response);

//       while (response.length) {
//         const partial = response.substring(0, 2000);
//         sendResponse(message, partial);
//         response = response.substring(2000);
//       }
//     } catch (error) {
//       console.error(error);
//       return sendResponse(message, "Something went wrong in the command.");
//     }
//   },
// });
