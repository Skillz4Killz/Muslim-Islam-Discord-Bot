import { Bot } from "../../bot.ts";
import { InteractionTypes } from "../../deps.ts";
import log from "../utils/logger.ts";

Bot.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(
        `[Application Command] ${interaction.data.name} command executed.`,
      );
      Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction);
      break;
    case InteractionTypes.ApplicationCommandAutocomplete:
      log.info(`[Interactions] Autocomplete ${interaction.data.name} executed.`, interaction)
      Bot.commands.get(interaction.data.name)?.autocomplete?.(Bot, interaction)
      break;
    case InteractionTypes.MessageComponent:
      log.info(`[Interactions] Message component interaction arrived.`);
      
  }
};