import { Collection } from "./deps.ts";
import { Command } from "./src/types/commands.ts";
import { CustomEvents } from "./src/types/events.ts";
import { Monitor } from "./src/types/monitors.ts";
import { Task } from "./src/types/tasks.ts";

export const botCache = {
  commands: new Collection<string, Command>(),
  eventHandlers: {} as CustomEvents,
  guildPrefixes: new Collection<string, string>(),
  guildLanguages: new Collection<string, string>(),
  monitors: new Collection<string, Monitor>(),
  tasks: new Collection<string, Task>(),
  memberLastActive: new Collection<string, number>(),
};
