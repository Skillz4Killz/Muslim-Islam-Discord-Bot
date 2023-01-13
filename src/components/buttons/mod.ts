import { Interaction } from "../../../deps.ts";
import { processReminderButton } from "./reminder.ts";

export async function processButtonClick(interaction: Interaction) {
    await Promise.all([
        processReminderButton(interaction)
    ])
}