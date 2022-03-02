import { botCache, createBot, startBot } from "./deps.ts";
import { configs } from "./configs.ts";
import { importDirectory } from "./src/utils/helpers.ts";

console.info(
  "Beginning Bot Startup Process. This can take a little bit depending on your system. Loading now...",
);

// Always require these files be processed before anything else
await Promise.all([
  "./src/customizations/structures",
].map(
  (path) => importDirectory(Deno.realPathSync(path)),
));

// Forces deno to read all the files which will fill the commands/inhibitors cache etc.
await Promise.all(
  [
    "./src/commands",
    "./src/inhibitors",
    "./src/events",
    "./src/arguments",
    "./src/monitors",
    "./src/tasks",
    "./src/permissionLevels",
    "./src/events",
  ].map(
    (path) => importDirectory(Deno.realPathSync(path)),
  ),
);

await import("./src/database/database.ts");

const bot = createBot({
  token: configs.token,
  botId: BigInt(atob(configs.token.split(".")[0])),
  intents: ["Guilds", "GuildMessages"],
  events: botCache.eventHandlers,
});

await startBot(bot);
