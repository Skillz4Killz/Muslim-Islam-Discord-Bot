import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { Surah } from "../lib/types/islam.ts";
import { Quran, QuranCollection } from "../quran.ts";
import Embeds from "../utils/Embed.ts";
import { chooseRandom } from "../utils/helpers.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ayah",
  description: "Read an ayah(or more) of the glorious Qur'an",
  options: [
    {
      name: "surah",
      type: ApplicationCommandOptionTypes.String,
      required: false,
      description: "Pick a surah.",
      autocomplete: true,
    },
    {
      name: "ayah",
      type: ApplicationCommandOptionTypes.Integer,
      required: false,
      description: "Pick a ayah.",
      autocomplete: true,
    },
    {
      name: "lastayah",
      type: ApplicationCommandOptionTypes.Integer,
      required: false,
      description: "The ayah you would like to end at.",
      autocomplete: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  autocomplete: async (Bot, interaction) => {
    const focused = interaction.data?.options?.find((opt) => opt.focused);
    if (!focused) return;

    const surahOption = interaction.data?.options?.find((opt) =>
      opt.name === "surah"
    );
    if (!surahOption) return;

    const ayahOption = interaction.data?.options?.find((opt) =>
      opt.name === "ayah"
    );
    const lastayahOption = interaction.data?.options?.find((opt) =>
      opt.name === "lastayah"
    );

    const search = focused.value as string;
    const relevantSurah = QuranCollection.filter((surah, surahNumber) => {
      if (surahNumber.toString().startsWith(search)) return true;
      if (surah.name.toLowerCase().startsWith(search)) return true;
      if (surah.name.toLowerCase().includes(search)) return true;

      return false;
    });

    // User needs to pick a surah
    if (focused.name === "surah") {
      return await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
          data: {
            choices: relevantSurah.map((surah, surahNumber) => ({
              name: `${surahNumber} - Surah ${surah.name}`,
              value: surahNumber.toString(),
            })).slice(0, 25),
          },
        },
      );
    }

    const surah = QuranCollection.get(parseInt(surahOption.value as string));
    if (!surah) return;

    const ayahNumber = parseInt(focused.value as string);
    const firstAyah = focused.name === "lastayah" && ayahOption?.value &&
      parseInt(ayahOption.value as string);

    const relevantAyahs = search || firstAyah
      ? surah.ayahs.filter((ayah) => {
        if (firstAyah && ayah.number <= firstAyah) return false;

        if (ayah.number === ayahNumber) return true;
        if (
          (ayah.number).toString().startsWith(ayahNumber.toString())
        ) return true;
        if (
          ayah.text.toLowerCase().startsWith(search.toLowerCase())
        ) return true;
        if (ayah.text.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }

        return false;
      })
      : surah.ayahs;

    return await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ApplicationCommandAutocompleteResult,
        data: {
          choices: relevantAyahs.map((ayah) => ({
            name: `${ayah.number} - ${ayah.text}`.substring(0, 100),
            value: ayah.number,
          })).slice(0, 25),
        },
      },
    );
  },
  execute: async (Bot, interaction) => {
    let followup = false;
    const args = {
      surah: undefined as Surah | undefined,
      ayah: 1,
      lastayah: 0,
    };

    for (const option of interaction.data?.options ?? []) {
      // @ts-ignore this should work
      args[option.name] = option.value!;
    }

    if (!args.surah) {
      followup = true;
      await Bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `Finding random surah and ayah since none was provided.`,
          },
        },
      );
      args.surah = QuranCollection.random();
      if (args.surah) args.ayah = chooseRandom(args.surah.ayahs).number;
    } else if (Number(args.surah)) {
      args.surah = QuranCollection.get(Number(args.surah));
    } else {
      // @ts-ignore if its valid override properly
      if (Quran[args.surah]) args.surah = Quran[args.surah];
    }

    // If something was provided check if its a valid surah
    if (!args.surah) {
      return Bot.helpers.sendTextMessage(
        interaction.channelId!,
        `I was not able to find ${
          args.surah ?? "a"
        } surah. If you believe this is an mistake, please contact me on my server using the **invite** command.`,
      );
    }

    // Check if the end ayah is valid
    if (args.lastayah && args.lastayah < args.ayah) {
      return Bot.helpers.sendTextMessage(
        interaction.channelId!,
        `You can't have a ending ayah number smaller then the starting ayah number.`,
      );
    }

    // TODO: perm check
    // // if trying to quote too many prevent spam
    // if (
    //   args.lastayah && args.lastayah - args.ayah > 10 &&
    //   !memberIDHasPermission(
    //     message.author.id,
    //     message.guildID,
    //     ["MANAGE_ROLES"],
    //   )
    // ) {
    //   return sendResponse(
    //     message,
    //     `You can't have that many ayah sent at once please try a smaller range. Must be less than 10.`,
    //   );
    // }

    const embeds = new Embeds(Bot);

    const lastayah = args.lastayah || args.ayah;

    for (let i = args.ayah; i <= lastayah; i++) {
      const ayahToSend = args.surah.ayahs[i - 1];
      if (!ayahToSend) {
        followup = true;
        await Bot.helpers.sendInteractionResponse(
          interaction.id,
          interaction.token,
          {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              // flags: 64,
              content:
                `Are you sure you provided a valid ayah number? I can't find ${i} ayah for surah ${args.surah.name}`,
            },
          },
        );
        break;
      }

      embeds.addEmbed().setColor("RANDOM")
        .setAuthor(
          `Surah ${args.surah.name} Ayah #${ayahToSend.number}`,
          "https://i.imgur.com/EbtoXX8.jpeg",
        )
        .setDescription(ayahToSend.text)
        .setFooter("Credits To Quran.com");
      if (ayahToSend.image) embeds.setImage(ayahToSend.image);

      if (embeds.length === 10) {
        followup = true;
        if (followup) {
          await Bot.helpers.sendFollowupMessage(interaction.token, {
            type: InteractionResponseTypes.ChannelMessageWithSource,
            data: {
              embeds,
            },
          });
        } else {
          await Bot.helpers.sendInteractionResponse(
            interaction.id,
            interaction.token,
            {
              type: InteractionResponseTypes.ChannelMessageWithSource,
              data: {
                embeds,
              },
            },
          );
        }

        embeds.length = 0;
      }
    }

    if (!embeds.length) return;

    if (followup) {
      return await Bot.helpers.sendFollowupMessage(interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds,
        },
      });
    }

    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          embeds,
        },
      },
    );
  },
});
