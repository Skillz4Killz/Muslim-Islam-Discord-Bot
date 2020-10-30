import { configs } from "../../configs.ts";
import { botCache } from "../../deps.ts";
import {
  ActivityType,
  cache,
  editBotsStatus,
  StatusTypes,
} from "../../deps.ts";
import { db } from "../database/database.ts";

botCache.eventHandlers.ready = async function () {
  editBotsStatus(
    StatusTypes.DoNotDisturb,
    "Discordeno Best Lib",
    ActivityType.Game,
  );

  console.info(`Loaded ${botCache.arguments.size} Argument(s)`);
  console.info(`Loaded ${botCache.commands.size} Command(s)`);
  console.info(`Loaded ${Object.keys(botCache.eventHandlers).length} Event(s)`);
  console.info(`Loaded ${botCache.inhibitors.size} Inhibitor(s)`);
  console.info(`Loaded ${botCache.monitors.size} Monitor(s)`);
  console.info(`Loaded ${botCache.tasks.size} Task(s)`);

  for (const task of botCache.tasks.values()) {
    task.execute();
    setInterval(() => task.execute(), task.interval);
  }

  const guilds = await db.guilds.findMany(() => true);
  for (const guild of guilds.values()) {
    if (guild.prefix !== configs.prefix) {
      botCache.guildPrefixes.set(guild.id, guild.prefix);
    }
  }

  console.log(
    `[READY] Bot is online and ready in ${cache.guilds.size} guild(s)!`,
  );
};
