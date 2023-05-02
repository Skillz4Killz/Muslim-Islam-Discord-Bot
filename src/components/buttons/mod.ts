import { Interaction } from "../../../deps.js";
import { processQuizButton } from "./quiz.js";
import { processReminderButton } from "./reminder.js";

export async function processButtonClick(interaction: Interaction) {
  await Promise.all([
    processReminderButton(interaction),
    processQuizButton(interaction),
  ]);
}
