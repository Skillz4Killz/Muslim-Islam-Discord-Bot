import { BotClient } from "../../bot.js";
import {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Interaction,
  Message,
} from "../../deps.js";

export interface Command {
  /** The name of this command. */
  name: string;
  /** What does this command do? */
  description: string;
  /** The type of command this is. */
  type: ApplicationCommandTypes;
  /** Whether or not this command is for the dev server only. */
  devOnly?: boolean;
  /** The options for this command */
  options?: ApplicationCommandOption[];
  /** This will be executed when the command is run. */
  execute: (bot: BotClient, interaction: Interaction) => unknown;
  /** Executed when an autocomplete request came through for this command. */
  autocomplete?: (bot: BotClient, interaction: Interaction) => unknown;
}

export interface Argument {
  name: string;
  execute: (
    argument: CommandArgument,
    parameters: string[],
    message: Message
  ) => unknown | Promise<unknown>;
}

export interface CommandArgument {
  lowercase: boolean;
}
