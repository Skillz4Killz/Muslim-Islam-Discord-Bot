import { Bot } from "../../bot.js";

Bot.events.guildCreate = (guild) => {
  console.info(
    `[EVENT=GuildCreate]: ${guild.name} with ${guild.memberCount} members.`
  );
};
