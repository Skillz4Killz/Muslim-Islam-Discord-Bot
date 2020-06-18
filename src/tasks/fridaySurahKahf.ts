import { KlasaUser, Task, TaskData } from "klasa";
import { kahf } from "../../imports";
import { GuildSettings } from "../../lib/types/settings/GuildSettings";
import { UserSettings } from "../../lib/types/settings/UserSettings";
import { TextChannel } from "@klasa/core";

const surahKahfFirstTenVerses = [
  kahf.ayah_1.text,
  kahf.ayah_2.text,
  kahf.ayah_3.text,
  kahf.ayah_4.text,
  kahf.ayah_5.text,
  kahf.ayah_6.text,
  kahf.ayah_7.text,
  kahf.ayah_8.text,
  kahf.ayah_9.text,
  kahf.ayah_10.text,
].join("\n\n");

interface FridayKahfTaskData extends TaskData {
  guildID: string;
  authorID: string;
}

export default class extends Task {
  async run(data: FridayKahfTaskData) {
    const guild = this.client.guilds.get(data.guildID);
    if (!guild) {
      this.recreateAndCancel(data);
      return;
    }

    const [channel] = (await guild.settings.resolve(GuildSettings.FridaySurahKahfChannelID)) as [TextChannel | null];
    if (!channel || !channel.embedable) {
      this.recreateAndCancel(data);
      return;
    }

    const user = (await this.client.users.fetch(data.authorID).catch(() => null)) as KlasaUser | null;
    if (!user) return;

    const enabled = user.settings.get(UserSettings.FridaySurahKahfEnabled) as boolean;
    if (!enabled) return;

    try {
      const reasonMessageSent = await channel.send({ data: { content: `**Surah Kahf Friday Reminder**` } });
      if (!reasonMessageSent) {
        this.recreateAndCancel(data);
        return;
      }

      await channel.send({ data: { content: surahKahfFirstTenVerses } });
    } catch (error) {
      this.client.console.error(`Error: ${guild.id} - ${guild.name} for Kahf Task\n\n${error}.`);
    }
  }

  recreateAndCancel(data: FridayKahfTaskData) {
    this.client.schedule.create(this.name, Date.now() + 604800000, {
      data: { guildID: data.guildID, authorID: data.authorID },
    });
  }
}
