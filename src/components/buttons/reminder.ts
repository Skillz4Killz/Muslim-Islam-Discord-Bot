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
import { Ayah, Surah } from "../../lib/types/islam.js";
import { QuranCollection } from "../../quran.js";
import Embeds from "../../utils/Embed.js";
import { humanizeMilliseconds } from "../../utils/helpers.js";

export async function processReminderButton(interaction: Interaction) {
  if (!interaction.data?.customId?.startsWith("reminder")) return;
  const [name, userID, verse] = interaction.data?.customId.split("-");
  let numberVerse = Number(verse);

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

  let surah: Surah | undefined = undefined;
  let aya: Ayah | undefined = undefined;

  let text = "";
  let ayahCounter = 0;

  for (const ayah of AYAHS) {
    if (ayah.verse < numberVerse) continue;
    if (text.length >= 300) break;

    surah = QuranCollection.get(ayah.surah);
    aya = ayah;
    text += `\n${ayah.text}`;
    ayahCounter++;
  }

  if (!surah || !aya) return;

  const juz = AYAHS.filter(a => a.juz === aya?.juz)

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
          `**${((aya.number / surah?.ayahs.length) * 100).toFixed(2)}%**`,
        true,
      )
      .addField(
        `Juz #${aya.juz} Progress`,
          `**${(
            (aya.number / juz.length) *
            100
          ).toFixed(2)}%**`,
        true,
      )
      .addField(
        "Quran Progress",
        `**${((aya.verse / AYAHS.length) * 100).toFixed(2)}%**`,
        true
      )
      .addField("Estimated Date Of Completion", [
        `Surah: ${humanizeMilliseconds((surah.ayahs.length - aya.number) * 600000)}`,
        `Juz: ${humanizeMilliseconds((juz.length - juz.findIndex(a => a.verse === aya?.verse) + 1) * 600000)}`,
        `Quran: ${humanizeMilliseconds((AYAHS.length - aya.verse) * 600000)}`
      ].join('\n'))
      .setTimestamp()
      .setTitle(`Surah ${surah.name} Ayah #${aya.number}`)
      .setDescription(text)
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
    data: { finishMonthlyVerse: aya.verse < AYAHS.length ? { increment: ayahCounter } : 0 },
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
