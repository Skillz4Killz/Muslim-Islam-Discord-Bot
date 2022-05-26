// import { botCache, createBot, startBot } from "./deps.ts";
// import { configs } from "./configs.ts";
// import { importDirectory } from "./src/utils/helpers.ts";

// console.info(
//   "Beginning Bot Startup Process. This can take a little bit depending on your system. Loading now...",
// );

// // Always require these files be processed before anything else
// await Promise.all([
//   "./src/customizations/structures",
// ].map(
//   (path) => importDirectory(Deno.realPathSync(path)),
// ));

// // Forces deno to read all the files which will fill the commands/inhibitors cache etc.
// await Promise.all(
//   [
//     "./src/commands",
//     "./src/inhibitors",
//     "./src/events",
//     "./src/arguments",
//     "./src/monitors",
//     "./src/tasks",
//     "./src/permissionLevels",
//     "./src/events",
//   ].map(
//     (path) => importDirectory(Deno.realPathSync(path)),
//   ),
// );

// await import("./src/database/database.ts");

// const bot = createBot({
//   token: configs.token,
//   botId: BigInt(atob(configs.token.split(".")[0])),
//   intents: ["Guilds", "GuildMessages", "MessageContent"],
//   events: botCache.eventHandlers,
// });

// await startBot(bot);

import { bgBlue, bgYellow, black, startBot } from "./deps.ts";
import log from "./src/utils/logger.ts";
import { fileLoader, importDirectory } from "./src/utils/loader.ts";
import { updateApplicationCommands } from "./src/utils/updateCommands.ts";
// setup db
import "./src/database/mod.ts";
import { Bot } from "./bot.ts";
import { getTime } from "./src/utils/helpers.ts";

log.info("Starting bot...");

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    "./src/commands",
    "./src/events",
    "./src/tasks",
  ].map((path) => importDirectory(Deno.realPathSync(path))),
);
await fileLoader();

// UPDATES YOUR COMMANDS TO LATEST COMMANDS
await updateApplicationCommands();

// STARTS THE CONNECTION TO DISCORD
await startBot(Bot);

// Start tasks
Bot.tasks.forEach((task) => {
  setTimeout(async () => {
    console.log(
      `${bgBlue(`[${getTime()}]`)} => [TASK: ${
        bgYellow(black(task.name))
      }] Started.`,
    );
    try {
      await task.execute();
    } catch (error) {
      console.log(error);
    }

    setInterval(async () => {
      console.log(
        `${bgBlue(`[${getTime()}]`)} => [TASK: ${
          bgYellow(black(task.name))
        }] Started.`,
      );
      try {
        await task.execute();
      } catch (error) {
        console.log(error);
      }
    }, task.interval);
  }, Date.now() % task.interval);
});
