import { configs } from "./configs.js";
import { Bot as BotType, Collection, Intents, createBot } from "./deps.js";
import { Command } from "./src/types/commands.js";
import { Monitor } from "./src/types/monitors.js";
import { Task } from "./src/types/tasks.js";

// MAKE THE BASIC BOT OBJECT
const bot = createBot({
  token: configs.token,
  events: {},
  intents: Intents.GuildMessages | Intents.Guilds | Intents.MessageContent,
});

export interface BotClient extends BotType {
  commands: Collection<string, Command>;
  monitors: Collection<string, Monitor>;
  tasks: Collection<string, Task>;
}

// THIS IS THE BOT YOU WANT TO USE EVERYWHERE IN YOUR CODE! IT HAS EVERYTHING BUILT INTO IT!
export const Bot = bot as BotClient;
// PREPARE COMMANDS HOLDER
Bot.commands = new Collection();
Bot.tasks = new Collection();
Bot.monitors = new Collection();

const props = Bot.transformers.desiredProperties;
props.interaction.id = true;
props.interaction.data = true;
props.interaction.guildId = true;
props.interaction.channelId = true;
props.interaction.member = true;
props.interaction.token = true;
props.interaction.type = true;
props.interaction.user = true;
props.member.permissions = true;
props.message.author = true;
props.message.content = true;
props.message.channelId = true;
props.message.guildId = true;
props.message.id = true;
props.user.avatar = true;
props.user.bot = true;
props.user.discriminator = true;
props.user.id = true;
props.user.username = true;
