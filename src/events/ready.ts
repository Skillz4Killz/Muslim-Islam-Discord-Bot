import { Bot } from "../../bot.js";
import log from "../utils/logger.js";

Bot.events.ready = (payload) => {
  log.info(
    `[READY] Shard ID ${payload.shardId} of ${Bot.gateway.shards.size} shards is ready!`
  );

  if (payload.shardId + 1 === Bot.gateway.totalShards) {
    botFullyReady();
  }
};

// This function lets you run custom code when all your bot's shards are online.
function botFullyReady() {
  log.info(`Loaded ${Bot.commands.size} Command(s)`);
  log.info(`Loaded ${Object.keys(Bot.events).length} Event(s)`);
  log.info(`Loaded ${Bot.monitors.size} Monitor(s)`);
  log.info(`Loaded ${Bot.tasks.size} Task(s)`);
  log.info("[READY] Bot is fully online.");
}
