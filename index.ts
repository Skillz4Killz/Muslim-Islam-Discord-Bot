import * as dotenv from 'dotenv';
import { KlasaClient } from './imports';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}
dotenv.config({ path });

KlasaClient.defaultUserSchema
  .add('reminders', (reminder) => reminder
    .add('finishMonthly', (monthly) => monthly
      .add('verse', 'integer', { default: 1 })
      .add('enabled', 'boolean')
    )
  );

new KlasaClient({
  commandEditing: true,
  commandLogging: true,
  fetchAllMembers: false,
  noPrefixDM: true,
  prefix: '!',
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`,
  typing: true,
}).login(process.env.token);
