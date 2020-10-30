import { botCache } from "../../deps.ts";
import { sendResponse } from "../utils/helpers.ts";
import { Quran, QuranCollection } from "../quran.ts";

botCache.arguments.set("surah", {
  name: "surah",
  execute: async function (_argument, parameters, message) {
    const [arg] = parameters;
    if (!arg) return;

    if (!arg) {
      sendResponse(message, `Finding random surah since none was provided.`);
      return QuranCollection.random();
    }

    // If something was provided check if its a valid surah
    const surah = QuranCollection.get(Number(arg)) || Quran[arg];
    if (!surah) {
      throw `I was not able to find ${arg} surah. If you believe this is an mistake, please contact me on my server using the **invite** command.`;
    }

    // The surah is valid so return the argument
    return surah;
  },
});
