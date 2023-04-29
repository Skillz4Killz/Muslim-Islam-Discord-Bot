import { Bot } from "../../bot.js";
import { Message } from "../../deps.js";

const salamTerms = [
  "salam",
  "asalamoalaikum wa rahmatullahi wa barakatuhu",
  "asalamoalaikum",
];

const greetingTerms = [
  "hi",
  "hello",
  "morning",
  "good morning",
  "good day",
  "good afternoon",
  "good evening",
  "good night",
  "goodnight",
  "gn",
];

Bot.monitors.set("salam", {
  name: "salam",
  botChannelPermissions: ["SEND_MESSAGES"],
  /** The main code that will be run when this monitor is triggered. */
  execute: async function (message: Message) {
    if (!message.content.length) return;

    const content = message.content.toLowerCase();
    // if the message starts with a salam term reply
    for (const term of salamTerms) {
      if (content.startsWith(term)) {
        return await Bot.helpers.sendMessage(message.channelId, {
          content: `Walaikumasalam Wa Rahmatullahi Wa Barakatuhu`,
        });
      }
    }

    // if the message starts with non-salam greeting reply
    for (const term of greetingTerms) {
      if (
        term === "hi" &&
        content.startsWith(term) &&
        content.split(" ")[0] !== "hi"
      ) {
        continue;
      }
      if (content.startsWith(term)) {
        return await Bot.helpers.sendMessage(message.channelId, {
          content: `Asalamoalaikum Wa Rahmatullahi Wa Barakatuhu`,
        });
      }
    }

    return
  },
});
