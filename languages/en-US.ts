import { Language } from '../imports';

export default class extends Language {
  language = {
    AYAH_DESCRIPTION: 'Read a specific ayah.',
    AYAH_SURAH_AND_AYAH: (surah, ayah) => `Surah ${surah} Ayah #${ayah}`,
    INVITE: `To add this bot to your guild: <${
      this.client.invite
    }>. If you have an issue or need help please contact me at https://discord.gg/XHBgG7P`,
    QURAN_COM_CREDITS: 'Credits To Quran.com',
    REMIND_DESCRIPTION: 'Enable or disable the Quran reminders',
    REMIND_DISABLED:
      'You turned off the reminders to help you read the Quran every month.',
    REMIND_ENABLED:
      'Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month.',
    REMIND_NOT_SETUP:
      'The reminder channel has not been setup for this guild by a guild admin. Please ask a guild admin to use the **!setup reminder** command before I can send reminders.',
  };
}
