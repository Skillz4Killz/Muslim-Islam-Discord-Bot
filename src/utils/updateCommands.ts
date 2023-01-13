import { Bot } from "../../bot.ts";
import { configs } from "../../configs.ts";

export async function updateApplicationCommands() {
  await Bot.helpers.upsertGlobalApplicationCommands(
    Bot.commands
      .filter((command) => !command.devOnly)
      .array(),
  );

  await Bot.helpers.upsertGuildApplicationCommands(
    configs.supportServerID,
    Bot.commands
      .filter((command) => !!command.devOnly)
      .array(),
  );
}
