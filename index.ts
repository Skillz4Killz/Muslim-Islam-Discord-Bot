import { Configs, KlasaClient } from './imports';

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
}).login(Configs.token);
