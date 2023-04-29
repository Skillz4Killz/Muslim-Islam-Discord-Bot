import { Collection } from "./deps.js";
import { Command } from "./src/types/commands.js";
import { CustomEvents } from "./src/types/events.js";
import { Monitor } from "./src/types/monitors.js";
import { Task } from "./src/types/tasks.js";

export const botCache = {
  commands: new Collection<string, Command>(),
  eventHandlers: {} as CustomEvents,
  guildPrefixes: new Collection<string, string>(),
  guildLanguages: new Collection<string, string>(),
  monitors: new Collection<string, Monitor>(),
  tasks: new Collection<string, Task>(),
  memberLastActive: new Collection<string, number>(),
};
