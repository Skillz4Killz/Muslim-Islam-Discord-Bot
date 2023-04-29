import { Bot } from "../../bot.js";
import { ButtonStyles, MessageComponentTypes, avatarUrl } from "../../deps.js";
import { db } from "../database/mod.js";
import { QuranCollection } from "../quran.js";
import Embeds from "../utils/Embed.js";

Bot.tasks.set("reminder", {
  name: "reminder",
  interval: 60000,
  execute: async function () {
    Bot.logger.info("Reminder Task Running");

    // Gets all guilds settings that has a channel id
    const guildSettings = await db.guilds.findMany({
      where: {
        finishMonthlyChannelID: { not: null },
        finishMonthlyUserIDs: { isEmpty: false },
      },
    });
    const userIds = new Set<string>();

    for (const setting of guildSettings) {
      for (const userId of setting.finishMonthlyUserIDs) {
        userIds.add(userId);
      }
    }

    const users = await db.users.findMany({
      where: {
        userID: { in: [...userIds.values()] },
        finishMonthlyEnabled: true,
      },
    });

    Bot.logger.info(
      `[Task: Reminder] ${guildSettings.length} guilds found with ${users.length} users found.`
    );

    guildSettings.forEach((settings) => {
      settings.finishMonthlyUserIDs.forEach(async (id) => {
        const usersettings = users.find((user) => user.userID === id);
        if (!usersettings?.finishMonthlyEnabled) return;

        const user = await Bot.helpers.getUser(id);

        // Get the surah and ayah numbers to send based on the verse they are up to
        let verse = usersettings.finishMonthlyVerse || 1;

        const surah = QuranCollection.find((sura) =>
          sura.ayahs.some((ayah) => ayah.verse === verse)
        );
        const ayah = surah?.ayahs.find((a) => a.verse === verse);

        if (!surah || !ayah) return;

        const progress = new Embeds(Bot)
          .setColor("RANDOM")
          .setAuthor(
            `Finish Quran Every Month Reminder!`,
            avatarUrl(user.id, user.discriminator, {
              avatar: user.avatar,
            })
          )
          .setTitle(`Monthly Tracker`)
          .addField(
            "Surah Progress",
            [
              `Surah ${surah.name} Verse ${ayah.number}`,
              `**${((ayah.number / surah?.ayahs.length) * 100).toFixed(2)}%**`,
            ].join("\n")
          )
          .addField("Juz Progress", `Coming Soon! Inshallah!`)
          .addField(
            "Quran Progress",
            `**${((verse / 6105) * 100).toFixed(2)}%**`
          )
          .addField("Estimated Date Of Completion", "Soon!")
          .setTimestamp();

        progress
          .addEmbed()
          .setColor("RANDOM")
          .setAuthor(
            `Finish Quran Every Month Reminder!`,
            avatarUrl(user.id, user.discriminator, {
              avatar: user.avatar,
            })
          )
          .setTitle(`Surah ${surah.name} Ayah #${ayah.number}`)
          .setDescription(ayah.text)
          .setTimestamp()
          .setFooter("Credits To Quran.com");
        Bot.logger.info(
          `Reminded ${user.id} in ${settings.id} of ${surah.name} Ayah #${ayah.number} in the reminder task.`
        );

        // Send the reminder embed for the verse
        await Bot.helpers.sendMessage(settings.finishMonthlyChannelID!, {
          embeds: progress,
          content: `<@${user.id}>`,
          components: [
            {
              type: MessageComponentTypes.ActionRow,
              components: [
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Primary,
                  label: "Mark As Read",
                  emoji: {
                    name: "Alhamdulilah",
                    id: BigInt("1099768803757400154"),
                    animated: false,
                  },
                  customId: `reminder-${user.id}-${verse}-${surah.name}-${ayah.number}`,
                },
              ],
            },
          ],
        });
      });
    });
  },
});
