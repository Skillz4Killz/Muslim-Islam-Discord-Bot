import { Snowflake } from 'discord.js';

export namespace GuildSettings {
	export type ChannelID = Snowflake;
	export const FinishMonthlyChannelID = 'reminders.finishMonthlyChannelID';
	export const FinishMonthlyUserIDs = 'reminders.finishMonthlyUserIDs';
	export const FridaySurahKahfChannelID = 'reminders.fridaySurahKahfChannelID';
	export const Prefix = 'prefix';
}
