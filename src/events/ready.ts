// import { configs } from "../../configs.ts";
// import { botCache } from "../../deps.ts";
// import {
//   ActivityType,
//   cache,
//   editBotsStatus,
//   StatusTypes,
// } from "../../deps.ts";
// import { db } from "../database/database.ts";

// botCache.eventHandlers.ready = async function () {
//   editBotsStatus(
//     StatusTypes.DoNotDisturb,
//     "Discordeno Best Lib",
//     ActivityType.Game,
//   );

//   console.info(`Loaded ${botCache.arguments.size} Argument(s)`);
//   console.info(`Loaded ${botCache.commands.size} Command(s)`);
//   console.info(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
//   console.info(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
//   console.info(`Loaded ${botCache.monitors.size} Monitor(s)`);
//   console.info(`Loaded ${botCache.tasks.size} Task(s)`);

//   for (const task of botCache.tasks.values()) {
//     task.execute();
//     setInterval(() => task.execute(), task.interval);
//   }

//   const guilds = await db.guilds.findMany(() => true);
//   for (const guild of guilds.values()) {
//     if (guild.prefix !== configs.prefix) {
//       botCache.guildPrefixes.set(guild.id, guild.prefix);
//     }
//   }

//   console.log(
//     `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
//   );
// };

import { Bot } from "../../bot.ts";
import log from "../utils/logger.ts";

Bot.events.ready = (_, payload) => {
  log.info(`[READY] Shard ID ${payload.shardId} of ${Bot.gateway.maxShards} shards is ready!`);

  if (payload.shardId + 1 === Bot.gateway.maxShards) {
    botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
function botFullyReady() {
  // DO STUFF YOU WANT HERE ONCE BOT IS FULLY ONLINE.
  log.info("[READY] Bot is fully online.");
}