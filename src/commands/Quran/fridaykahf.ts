import { Command, CommandStore, Language } from "klasa";
import { UserSettings } from "../../../lib/types/settings/UserSettings";
import { Message } from "@klasa/core";
import { ChannelType } from '@klasa/dapi-types'

export default class extends Command {
  constructor(store: CommandStore, file: string, directory: string[]) {
    super(store, file, directory, {
      description: (language: Language) => language.get(`FRIDAYKAHF_DESCRIPTION`),
      extendedHelp: (language: Language) => language.get(`FRIDAYKAHF_EXTENDED`),
      usage: `[days:integer{0,7}]`,
      runIn: [ChannelType.GuildText, ChannelType.GuildNews]
    });
  }

  async run(message: Message, [days = 0]) {
    const status = message.author.settings.get(UserSettings.FridaySurahKahfEnabled) as boolean;
    await message.author.settings.update(UserSettings.FridaySurahKahfEnabled, !status);

    // If it is now enabled create a task that will remind them next week
    if (!status)
      await this.client.schedule.create(
        `fridaySurahKahf`,
        // Now + a week + the number of days to skip
        Date.now() + 604800000 + days * 86400000,
        { data: { guildID: message.guild?.id, authorID: message.author.id } }
      );

    return message.sendLocale(`FRIDAY_KAHF_TOGGLED`, [!status]);
  }
}
