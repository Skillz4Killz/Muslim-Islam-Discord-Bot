import log from "./src/utils/logger.js";
import { updateApplicationCommands } from "./src/utils/updateCommands.js";
// setup db
import { Bot } from "./bot.js";
import { loadEvents } from "./src/events/index.js";
import { loadCommands } from "./src/commands/index.js";
import { loadMonitors } from "./src/monitors/index.js";
import { loadTasks } from "./src/tasks/index.js";
// import { fetchQuran } from "./src/lib/quran.com/index.js";

log.info("Starting bot...");

// Sets the event handlers before starting the bot
await loadCommands();
await loadEvents();
await loadMonitors();
await loadTasks();

// UPDATES YOUR COMMANDS TO LATEST COMMANDS
await updateApplicationCommands();

// This is only for when we see there is a translation fix or something. This will refill the constants.
// await fetchQuran();

// STARTS THE CONNECTION TO DISCORD
await Bot.start();

// Start tasks
Bot.tasks.forEach((task) => {
  setTimeout(async () => {
    Bot.logger.info(`[TASK: ${task.name}] Started.`)
    try {
      await task.execute();
    } catch (error) {
      console.log(error);
    }

    setInterval(async () => {
      Bot.logger.info(`[TASK: ${task.name}] Started.`)
      try {
        await task.execute();
      } catch (error) {
        console.log(error);
      }
      Bot.logger.info(`[TASK: ${task.name}] Finished.`)
    }, task.interval);
  }, Date.now() % task.interval);
});

process.on('unhandledRejection', Bot.logger.error);