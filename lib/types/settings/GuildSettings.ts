import { Snowflake } from 'discord.js';

export namespace GuildSettings {
	export type ChannelID = Snowflake;
	export const FinishMonthlyChannelID = 'reminders.finishMonthlyChannelID';
	export const FridaySurahKahfChannelID = 'reminders.fridaySurahKahfChannelID';
}
