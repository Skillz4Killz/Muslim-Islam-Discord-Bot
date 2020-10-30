import { botCache } from "../../deps.ts";
import { PermissionLevels } from "../types/commands.ts";
import { createSubcommand, sendEmbed, sendResponse } from "../utils/helpers.ts";
import { parsePrefix } from "../monitors/commandHandler.ts";
import { Embed } from "../utils/Embed.ts";
import { db } from "../database/database.ts";

// This command will only execute if there was no valid sub command: !prefix
botCache.commands.set("prefix", {
  name: "prefix",
  arguments: [
    {
      name: "subcommmand",
      type: "subcommand",
    },
  ],
  guildOnly: true,
  permissionLevels: [PermissionLevels.MEMBER],
  execute: (message) => {
    const embed = new Embed()
      .setTitle("Prefix Information")
      .setDescription(`
            **Current Prefix**: \`${parsePrefix(message.guildID)}\`
      `)
      .setTimestamp();

    sendEmbed(message.channelID, embed);
  },
});

// Create a subcommand for when users do !prefix set $
createSubcommand("prefix", {
  name: "set",
  arguments: [
    {
      name: "prefix",
      type: "string",
      required: true,
      missing: (message) => {
        sendResponse(message, `please provide a prefix`);
      },
    },
  ],
  permissionLevels: [PermissionLevels.ADMIN],
  execute: (message, args) => {
    if (args.prefix.length > 3) {
      return sendResponse(message, "Prefix input too long");
    }

    const oldPrefix = parsePrefix(message.guildID);
    botCache.guildPrefixes.set(message.guildID, args.prefix);
    db.guilds.update(message.guildID, { prefix: args.prefix });

    const embed = new Embed()
      .setTitle("Success, prefix was changed")
      .setDescription(`
        **Old Prefix**: \`${oldPrefix}\`
        **New Prefix**: \`${args.prefix}\`
      `)
      .setTimestamp();

    return sendEmbed(message.channelID, embed);
  },
});
