import * as dotenv from 'dotenv';
import { PermissionLevels } from 'klasa';
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

KlasaClient.defaultUserSchema.add('reminders', (reminder) =>
  reminder
    .add('finishMonthly', (monthly) =>
      monthly
        .add('verse', 'integer', { default: 1 })
        .add('enabled', 'boolean')
        .add('guildID', 'guild')
    )
    .add('fridaySurahKahfEnabled', 'boolean')
);

KlasaClient.defaultGuildSchema.add('reminders', (reminder) =>
  reminder
    .add('fridaySurahKahfChannelID', 'textchannel')
    .add('finishMonthlyChannelID', 'textchannel')
    .add('finishMonthlyUserIDs', 'user', { array: true })
);

KlasaClient.use(require(`@kcp/functions`));

const Muslim = new KlasaClient({
  // Functions plugin
  aliasFunctions: { prefix: `helpers`, enabled: true },
  commandEditing: true,
  commandLogging: true,
  fetchAllMembers: false,
  noPrefixDM: true,
  permissionLevels: new PermissionLevels()
    .add(0, () => true)
    .add(1, (message) => message.member.hasPermission('ADMINISTRATOR'))
    .add(2, (message) => message.author.id === message.guild.ownerID)
    .add(9, (message) => message.client.owners.has(message.author), {
      break: true,
    })
    .add(10, (message) => message.client.owners.has(message.author)),
  prefix: '!',
  readyMessage: (client: KlasaClient) =>
    `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`,
  slowmode: 2000,
  slowmodeAggressive: true,
  typing: true,
  ws: {
    // @ts-ignore
    guild_subscriptions: false,
  },
});

// tslint:disable-next-line: no-console
Muslim.login(process.env.token).catch((error) => console.log(error));
