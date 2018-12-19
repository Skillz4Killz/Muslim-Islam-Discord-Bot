import { Settings } from 'klasa';

export type UserSettings = Settings & {
  reminders: {
    finishMonthly: {
      enabled: boolean;
      verse: number;
    };
  };
};
