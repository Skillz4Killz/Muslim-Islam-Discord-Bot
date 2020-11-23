import {
  addReaction,
  botCache,
  cache,
  getMember,
  Member,
  sendMessage,
} from "../../deps.ts";
import { db } from "../database/database.ts";
import { QuranCollection } from "../quran.ts";
import { Embed } from "../utils/Embed.ts";

botCache.tasks.set("reminder", {
  name: "reminder",
  interval: 1000 * 60 * 60,
  execute: async function () {
    console.log("Reminder Task Running");

    // Gets all guilds settings that has a channel id
    const guildSettings = await db.guilds.findMany((value) =>
      Boolean(value.finishMonthlyChannelID) &&
      Boolean(value.finishMonthlyUserIDs?.length)
    );

    guildSettings.forEach(async (settings) => {
      const guild = cache.guilds.get(settings.id);
      if (!guild) return;

      settings.finishMonthlyUserIDs?.forEach(async (id) => {
        const member = guild.members.get(id) ||
          await getMember(guild.id, id).catch(() => null) as Member;
        if (!member) return;

        const usersettings = await db.users.get(id);
        if (!usersettings?.finishMonthlyEnabled) return;

        // Create the embed to send
        const embed = new Embed()
          .setColor("RANDOM")
          .setAuthor(`Finish Quran Every Month Reminder!`, member.avatarURL)
          .setTimestamp()
          .setFooter("Credits To Quran.com");

        // Get the surah and ayah numbers to send based on the verse they are up to
        let verse = usersettings.finishMonthlyVerse || 0;

        for (const surah of QuranCollection.values()) {
          if (embed.fields.length >= 3) break;

          const ayah = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah) continue;

          // Add the ayah to the embed
          embed.addField(`Surah ${surah.name} Ayah #${ayah.number}`, ayah.text);
          console.log(
            `Reminded ${member.tag} in ${settings.id} of ${surah.name} Ayah #${ayah.number} in the reminder task.`,
          );
          verse++;

          const ayah2 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah2) continue;

          // Add the ayah to the embed
          embed.addField(
            `Surah ${surah.name} Ayah #${ayah2.number}`,
            ayah2.text,
          );
          console.log(
            `Reminded ${member.tag} in ${settings.id} of ${surah.name} Ayah #${ayah2.number} in the reminder task.`,
          );
          verse++;

          const ayah3 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah3) continue;

          // Add the ayah to the embed
          embed.addField(
            `Surah ${surah.name} Ayah #${ayah3.number}`,
            ayah3.text,
          );
          console.log(
            `Reminded ${member.tag} in ${guild.name} #${settings.id} of ${surah.name} Ayah #${ayah3.number} in the reminder task.`,
          );
          verse++;

          const ayah4 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah4) continue;

          // Add the ayah to the embed
          embed.addField(
            `Surah ${surah.name} Ayah #${ayah4.number}`,
            ayah4.text,
          );
          console.log(
            `Reminded ${member.tag} in ${guild.name} #${settings.id} of ${surah.name} Ayah #${ayah4.number} in the reminder task.`,
          );
          verse++;


          const ayah5 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah5) continue;

          // Add the ayah to the embed
          embed.addField(
            `Surah ${surah.name} Ayah #${ayah5.number}`,
            ayah5.text,
          );
          console.log(
            `Reminded ${member.tag} in ${guild.name} #${settings.id} of ${surah.name} Ayah #${ayah5.number} in the reminder task.`,
          );
          verse++;


          const ayah6 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah6) continue;

          // Add the ayah to the embed
          embed.addField(
            `Surah ${surah.name} Ayah #${ayah6.number}`,
            ayah6.text,
          );
          console.log(
            `Reminded ${member.tag} in ${guild.name} #${settings.id} of ${surah.name} Ayah #${ayah6.number} in the reminder task.`,
          );
          verse++;
        }

        // Send the reminder embed for the verse
        const reminder = await sendMessage(
          settings.finishMonthlyChannelID,
          { embed, content: member.mention, mentions: { users: [member.id] } },
        );
        addReaction(reminder.channelID, reminder.id, "✅");
        // Add 1 to the verse number or reset it if they are complete
        db.users.update(
          member.id,
          { finishMonthlyVerse: verse === 6105 ? 1 : verse },
        );
      });
    });
  },
});
