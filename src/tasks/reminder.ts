import { Bot } from "../../bot.ts";
import { db } from "../database/mod.ts";
import { QuranCollection } from "../quran.ts";
import Embeds from "../utils/Embed.ts";

Bot.tasks.set("reminder", {
  name: "reminder",
  interval: 1000 * 60 * 60,
  execute: async function () {
    console.log("Reminder Task Running");

    // Gets all guilds settings that has a channel id
    const guildSettings = await db.guilds.getAll();

    guildSettings.forEach((settings) => {
      if (!settings.finishMonthlyChannelID) return;

      const guild = Bot.guilds.get(Bot.transformers.snowflake(settings.id));

      settings.finishMonthlyUserIDs?.forEach(async (id) => {
        const usersettings = await db.users.get(id);
        if (!usersettings?.finishMonthlyEnabled) return;

        const user = Bot.users.get(Bot.transformers.snowflake(id)) ??
          await Bot.helpers.getUser(Bot.transformers.snowflake(id));
        const tag = `${user.username}#${user.discriminator}`;

        // Create the embed to send
        const embeds = new Embeds(Bot);

        // Get the surah and ayah numbers to send based on the verse they are up to
        let verse = usersettings.finishMonthlyVerse || 0;

        for (const surah of QuranCollection.values()) {
          if ((embeds.length ?? 0) >= 6) break;

          const ayah = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah) continue;

          // Add the ayah to the embed
          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah.number}`)
            .setDescription(ayah.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${settings.id} of ${surah.name} Ayah #${ayah.number} in the reminder task.`,
          );
          verse++;

          const ayah2 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah2) continue;

          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah2.number}`)
            .setDescription(ayah2.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${settings.id} of ${surah.name} Ayah #${ayah2.number} in the reminder task.`,
          );
          verse++;

          const ayah3 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah3) continue;

          // Add the ayah to the embed
          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah3.number}`)
            .setDescription(ayah3.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${guild
              ?.name} #${settings.id} of ${surah.name} Ayah #${ayah3.number} in the reminder task.`,
          );
          verse++;

          const ayah4 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah4) continue;

          // Add the ayah to the embed
          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah4.number}`)
            .setDescription(ayah4.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${guild
              ?.name} #${settings.id} of ${surah.name} Ayah #${ayah4.number} in the reminder task.`,
          );
          verse++;

          const ayah5 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah5) continue;

          // Add the ayah to the embed
          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah5.number}`)
            .setDescription(ayah5.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${guild
              ?.name} #${settings.id} of ${surah.name} Ayah #${ayah5.number} in the reminder task.`,
          );
          verse++;

          const ayah6 = surah.ayahs?.find((a) => a.verse === verse + 1);
          if (!ayah6) continue;

          // Add the ayah to the embed
          embeds.addEmbed().setColor("RANDOM")
            .setAuthor(
              `Finish Quran Every Month Reminder!`,
              Bot.helpers.avatarURL(user.id, user.discriminator, {
                avatar: user.avatar,
              }),
            )
            .setTitle(`Surah ${surah.name} Ayah #${ayah6.number}`)
            .setDescription(ayah6.text)
            .setTimestamp()
            .setFooter("Credits To Quran.com");
          console.log(
            `Reminded ${tag} in ${guild
              ?.name} #${settings.id} of ${surah.name} Ayah #${ayah6.number} in the reminder task.`,
          );
          verse++;
        }

        // Send the reminder embed for the verse
        const reminder = await Bot.helpers.sendMessage(
          Bot.transformers.snowflake(settings.finishMonthlyChannelID!),
          { embeds, content: `<@${user.id}>` },
        );
        Bot.helpers.addReaction(reminder.channelId, reminder.id, "✅");
        // Add 1 to the verse number or reset it if they are complete
        db.users.update(
          user.id.toString(),
          {
            id: user.id.toString(),
            finishMonthlyVerse: verse === 6105 ? 1 : verse,
          },
        );
      });
    });
  },
});
