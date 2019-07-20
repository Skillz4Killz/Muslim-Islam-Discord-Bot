import { Language } from '../imports';

export default class extends Language {
  language = {
    COMMAND_AYAH_DESCRIPTION: 'Read a specific ayah.',
    COMMAND_AYAH_SURAH_AND_AYAH: (surah, ayah) =>
      `Surah ${surah} Ayah #${ayah}`,
    COMMAND_REMIND_DESCRIPTION: 'Enable or disable the Quran reminders',
    COMMAND_REMIND_DISABLED:
      'You turned off the reminders to help you read the Quran every month.',
    COMMAND_REMIND_ENABLED:
      'Alhumdulillah! You have enabled the reminders to help you complete reading the Quran every month.',
    QURAN_COM_CREDITS: 'Credits To Quran.com',
  };
}
