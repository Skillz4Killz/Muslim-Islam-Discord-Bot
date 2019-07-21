import { Language } from '../imports';

export default class extends Language {
  language = {
    AYAH_DESCRIPTION: 'Read a specific ayah.',
    AYAH_SURAH_AND_AYAH: (surah, ayah) => `Surah ${surah} Ayah #${ayah}`,
    FRIDAY_KAHF_TOGGLED: (enabled) =>
      enabled
        ? `The surah kahf reminder will be sent to you once a week. Remember you should only enable this reminder when it is a **Friday** on your time. Due to different timezones for each user it is impossible to know when to send it. So make sure you use this command on a friday.`
        : `The surah Kahf Friday reminder has been disabled for you.`,
    INVITE: () =>
      `To add this bot to your guild: <${
        this.client.invite
      }>. If you have an issue or need help please contact me at https://discord.gg/XHBgG7P`,
    PREFIX_CHANGED: (prefix) =>
      `The prefix on this server has been changed to ${prefix}`,
    QURAN_COM_CREDITS: 'Credits To Quran.com',
    REMINDCHANNEL_DESCRIPTION: `Sets or removes the finish quran monthly reminder channel.`,
    REMINDCHANNEL_EXTENDED: `**!remindchannel** removes the reminder channel.\n\n**!remindchannel #channel** sets the reminder channel.`,
    REMINDCHANNEL_RESET: `The reminder channel has been removed. You will no longer get reminders in this guild.`,
    REMINDCHANNEL_SET: (channel) =>
      `The reminder channel has been set to ${channel} Alhumdulilah. Inshallah everyone will be able to finish the entire Quran every month now.`,
    REMIND_DESCRIPTION: 'Enable or disable the Quran reminders',
    REMIND_DISABLED:
      'You turned off the reminders to help you read the Quran every month.',
    REMIND_ENABLED:
      'Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month.',
    REMIND_NOT_SETUP:
      'The reminder channel has not been setup for this guild by a guild admin. Please ask a guild admin to use the **!remindchannel** command before I can send reminders.',
  };
}
