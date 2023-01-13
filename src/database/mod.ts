// Database, thx Tri!
import { decode, encode, Kwik, KwikTable } from "https://deno.land/x/kwik@v1.3.1/mod.ts";
import { logger } from "../utils/logger.ts";

const log = logger({ name: "DB Manager" });

log.info("Initializing Database");

export const kwik = new Kwik();
export const db = {
  kwik,
  guilds: new KwikTable<GuildSettings>(kwik, "guilds"),
  users: new KwikTable<UserSettings>(kwik, "users"),
};

// Add BigInt Support
kwik.msgpackExtensionCodec.register({
  type: 0,
  encode: (object: unknown): Uint8Array | null => {
    if (typeof object === "bigint") {
      if (
        object <= Number.MAX_SAFE_INTEGER && object >= Number.MIN_SAFE_INTEGER
      ) {
        return encode(parseInt(object.toString(), 10), {});
      } else {
        return encode(object.toString(), {});
      }
    } else {
      return null;
    }
  },
  decode: (data: Uint8Array) => {
    return BigInt(decode(data, {}) as string);
  },
});

// Initialize the Database
await kwik.init();

log.info("Database Initialized!");

export interface GuildSettings {
  id: string;
  finishMonthlyChannelID?: string;
  finishMonthlyUserIDs?: string[];
}

export interface UserSettings {
  id: string;
  finishMonthlyEnabled?: boolean;
  finishMonthlyVerse?: number;
}
