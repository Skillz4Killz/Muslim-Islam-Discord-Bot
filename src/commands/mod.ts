import { Bot } from "../../bot.js";
import { Command } from "../types/commands.js";

export function createCommand(command: Command) {
  Bot.commands.set(command.name, command);
}
