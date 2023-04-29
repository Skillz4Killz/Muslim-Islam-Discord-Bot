// This task will help remove un-used collectors to help keep our cache optimized.
import { Bot } from "../../bot.js";
import { messageCollectors } from "../utils/collectors.js";
import { Milliseconds } from "../utils/constants/time.js";

Bot.tasks.set(`collectors`, {
  name: `collectors`,
  // Runs this function once a minute
  interval: Milliseconds.MINUTE,
  execute: async function () {
    const now = Date.now();

    messageCollectors.forEach((collector, key) => {
      // This collector has not finished yet.
      if (collector.createdAt + collector.duration > now) return;

      // Remove the collector
      messageCollectors.delete(key);
      // Reject the promise so code can continue in commands.
      return collector.reject();
    });
  },
});
