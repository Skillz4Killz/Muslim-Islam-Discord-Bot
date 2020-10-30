import { botCache, botID, sendMessage } from "../../deps.ts";
import { sendResponse } from "../utils/helpers.ts";

botCache.commands.set(`invite`, {
  name: `invite`,
  execute: function (message) {
    sendResponse(
      message,
      `To add this bot to your guild: <https://discordapp.com/oauth2/authorize?client_id=${botID}&scope=bot&permissions=347200>. If you have an issue or need help please contact me at https://discord.gg/J4NqJ72`,
    );
  },
});
