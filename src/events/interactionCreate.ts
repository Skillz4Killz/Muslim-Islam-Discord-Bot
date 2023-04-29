import { Bot } from "../../bot.js";
import { InteractionTypes } from "../../deps.js";
import { processButtonClick } from "../components/buttons/mod.js";
import log from "../utils/logger.js";

Bot.events.interactionCreate = (interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(
        `[Application Command] ${interaction.data.name} command executed.`
      );
      Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction);
      break;
    case InteractionTypes.ApplicationCommandAutocomplete:
      log.info(
        `[Interactions] Autocomplete ${interaction.data.name} executed.`,
        interaction
      );
      Bot.commands.get(interaction.data.name)?.autocomplete?.(Bot, interaction);
      break;
    case InteractionTypes.MessageComponent:
      log.info(`[Interactions] Message component interaction arrived.`);
      processButtonClick(interaction);
      break;
  }
};
