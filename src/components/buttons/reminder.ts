import { AYAHS } from "../../../ayahs.js";
import { Bot } from "../../../bot.js";
import {
  ButtonStyles,
  Interaction,
  InteractionResponseTypes,
  MessageComponentTypes,
  avatarUrl,
} from "../../../deps.js";
import { db } from "../../database/mod.js";
import { QuranCollection } from "../../quran.js";
import Embeds from "../../utils/Embed.js";

export async function processReminderButton(interaction: Interaction) {
  if (!interaction.data?.customId?.startsWith("reminder")) return;
  const [name, userID, verse] = interaction.data?.customId.split("-");
  let numberVerse = Number(verse);

  const surah = QuranCollection.find((sura) =>
    sura.ayahs.some((ayah) => ayah.verse === numberVerse)
  );
  const aya = surah?.ayahs.find((a) => a.verse === numberVerse);

  if (!surah || !aya) return;

  if (BigInt(userID!) !== interaction.user.id) {
    return await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `This message has been sent for a different user. This button will not work for you.`,
        },
      }
    );
  }

  // User pressed next button to read next ayah
  if (name === "reminderNext") {
    const progress = new Embeds(Bot)
      .setColor("RANDOM")
      .setAuthor(
        `Finish Quran Every Month Reminder!`,
        avatarUrl(interaction.user.id, interaction.user.discriminator, {
          avatar: interaction.user.avatar,
        })
      )
      .setTitle(`Monthly Tracker`)
      .addField(
        "Surah Progress",
        [
          `Surah ${surah.name} Verse ${aya.number}`,
          `**${((aya.number / surah?.ayahs.length) * 100).toFixed(2)}%**`,
        ].join("\n")
      )
      // .addField("Juz Progress", `Coming Soon! Inshallah!`)
      .addField("Juz Progress", [
        `Juz #${aya.juz}`,
        `**${((aya.number / AYAHS.filter(a => a.juz === aya.juz).length) * 100).toFixed(2)}%**`,
      ].join("\n"))
      .addField(
        "Quran Progress",
        `**${((numberVerse / 6105) * 100).toFixed(2)}%**`
      )
      .addField("Estimated Date Of Completion", "Soon!")
      .setTimestamp();

    progress
      .addEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `Finish Quran Every Month Reminder!`,
        avatarUrl(interaction.user.id, interaction.user.discriminator, {
          avatar: interaction.user.avatar,
        })
      )
      .setTitle(`Surah ${surah.name} Ayah #${aya.number}`)
      .setDescription(aya.text)
      .setTimestamp()
      .setFooter("Credits To Quran.com");
    Bot.logger.info(
      `Reminded ${interaction.user.id} in ${interaction.guildId} of ${surah.name} Ayah #${aya.number} in the reminder button.`
    );

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.UpdateMessage,
        data: {
          components: [
            {
              type: MessageComponentTypes.ActionRow,
              components: [
                {
                  type: MessageComponentTypes.Button,
                  style: ButtonStyles.Primary,
                  label: "Read",
                  emoji: {
                    name: "🎉",
                    animated: false,
                  },
                  disabled: true,
                  customId: `reminder-read`,
                },
              ],
            },
          ],
        },
      }
    );

    // Send the reminder embed for the verse
    return await Bot.helpers.sendMessage(interaction.channelId!, {
      embeds: progress,
      content: `<@${interaction.user.id}>`,
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
              customId: `reminder-${interaction.user.id}-${verse}-${surah.name}-${aya.number}`,
            },
          ],
        },
      ],
    });
  }

  await db.users.update({
    where: { userID },
    data: { finishMonthlyVerse: numberVerse < 6105 ? { increment: 1 } : 0 },
  });

  await Bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.UpdateMessage,
    data: {
      components: [
        {
          type: MessageComponentTypes.ActionRow,
          components: [
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Primary,
              label: "Read Next",
              emoji: {
                name: "Alhamdulilah",
                id: BigInt("1099768803757400154"),
                animated: false,
              },
              customId: `reminderNext-${userID}-${numberVerse + 1}-${
                surah.name
              }-${aya.number}`,
            },
            {
              type: MessageComponentTypes.Button,
              style: ButtonStyles.Primary,
              label: "Read",
              emoji: {
                name: "🎉",
                animated: false,
              },
              disabled: true,
              customId: `reminder-read`,
            },
          ],
        },
      ],
    },
  });
}
