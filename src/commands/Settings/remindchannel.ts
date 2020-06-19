import { Command, CommandStore, Language } from "klasa";
import { GuildSettings } from "../../../lib/types/settings/GuildSettings";
import { GuildChannel, Message } from "@klasa/core";
import { ChannelType } from "@klasa/dapi-types";
import { sendTextMessage } from "../../../lib/utils/klasa";

export default class extends Command {
  constructor(store: CommandStore, file: string, directory: string[]) {
    super(store, file, directory, {
      description: (language: Language) => language.get(`REMINDCHANNEL_DESCRIPTION`),
      extendedHelp: (language: Language) => language.get(`REMINDCHANNEL_EXTENDED`),
      permissionLevel: 1,
      usage: `[channel:channel]`,
      usageDelim: ` `,
      runIn: [ChannelType.GuildText, ChannelType.GuildNews],
    });
  }

  async run(message: Message, [channel]: [GuildChannel | undefined]) {
    // If a channel was not provided reset the channel
    if (!channel) await message.guild!.settings.reset(GuildSettings.FinishMonthlyChannelID);
    // Otherwise set the channel to get reminders
    else if (channel.type !== ChannelType.GuildText)
      return sendTextMessage(message, `Invalid channel. I can only use text channels for this.`);
    else await message.guild!.settings.update(GuildSettings.FinishMonthlyChannelID, channel.id);

    return message.sendLocale(channel ? `REMINDCHANNEL_SET` : `REMINDCHANNEL_RESET`, [channel]);
  }
}
