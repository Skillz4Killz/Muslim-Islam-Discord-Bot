import { GuildSettings } from "../../../lib/types/settings/GuildSettings";
import { UserSettings } from "../../../lib/types/settings/UserSettings";
import { Command, CommandStore } from "klasa";
import { PermissionsFlags, Message } from "@klasa/core";
import { ChannelType } from "@klasa/dapi-types";

export default class extends Command {
  constructor(store: CommandStore, file: string, directory: string[]) {
    super(store, file, directory, {
      aliases: ["r"],
      description: (language) => language.get("REMIND_DESCRIPTION"),
      requiredPermissions: [PermissionsFlags.EmbedLinks],
      runIn: [ChannelType.GuildText, ChannelType.GuildNews],
    });
  }

  async run(message: Message) {
    const channelID = message.guild!.settings.get(
      GuildSettings.FinishMonthlyChannelID
    ) as GuildSettings.ChannelID | null;
    if (!channelID) return message.sendLocale(`REMIND_NOT_SETUP`);

    const enabled = message.author.settings.get(UserSettings.FinishMonthlyEnabled);

    await message.author.settings.update(UserSettings.FinishMonthlyEnabled, !enabled);

    await message.guild!.settings.update(GuildSettings.FinishMonthlyUserIDs, message.author.id);

    return message.sendLocale(enabled ? "REMIND_DISABLED" : "REMIND_ENABLED");
  }
}
