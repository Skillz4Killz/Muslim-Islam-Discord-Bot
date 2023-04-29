import { Bot } from "../../bot.js";
import { Message } from "../../deps.js";
import { processMessageCollectors } from "../utils/collectors.js";

Bot.monitors.set("collectors", {
  name: "collectors",
  /** The main code that will be run when this monitor is triggered. */
  execute: async function (message: Message) {
    if (!message.content.length) return;

    processMessageCollectors(message);
  },
});
