import { Settings } from 'klasa';

export type UserSettings = Settings & {
  reminders: {
    finishMonthly: {
      enabled: boolean;
      verse: number;
    };
  };
};

export type GuildSettings = Settings & {
  prefix: string;
  disableNaturalPrefix: boolean;
};
