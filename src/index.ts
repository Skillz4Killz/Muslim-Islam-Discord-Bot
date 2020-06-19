import { KlasaClient } from "klasa";
import config from "../configs";
import { Intents } from "@klasa/ws";

KlasaClient.defaultUserSchema.add("reminders", (reminder) =>
  reminder
    .add("finishMonthly", (monthly) =>
      monthly.add("verse", "integer", { default: 1 }).add("enabled", "boolean").add("guildID", "guild")
    )
    .add("fridaySurahKahfEnabled", "boolean")
);

KlasaClient.defaultGuildSchema.add("reminders", (reminder) =>
  reminder
    .add("fridaySurahKahfChannelID", "textchannel")
    .add("finishMonthlyChannelID", "textchannel")
    .add("finishMonthlyUserIDs", "user", { array: true })
);

const client = new KlasaClient({
  commands: {
    prefix: "!",
    logging: true,
    editing: true,
    messageLifetime: 600000,
  },
  rest: {
    offset: 0,
  },
  consoleEvents: {
    debug: true,
  },
  cache: {
    messageLifetime: 300000,
    messageSweepInterval: 60000,
  },
  ws: {
    intents: Intents.FLAGS.GUILD_MESSAGES | Intents.FLAGS.GUILDS,
  },
});

client.token = config.token;

client.connect().catch(console.error);
