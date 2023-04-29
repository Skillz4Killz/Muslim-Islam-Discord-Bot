import { Interaction } from "../../../deps.js";
import { processReminderButton } from "./reminder.js";

export async function processButtonClick(interaction: Interaction) {
  await Promise.all([processReminderButton(interaction)]);
}
