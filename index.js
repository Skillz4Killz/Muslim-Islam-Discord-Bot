const { Client } = require('klasa')
const { token } = require('./ecosystem.config')

Client.defaultUserSchema
  .add('reminders', reminder => reminder
    .add('finishMonthly', monthly => monthly
      .add('verse', 'integer', { default: 1 })
      .add('enabled', 'boolean')
    )
  )

new Client({
  fetchAllMembers: false,
  prefix: '!',
  commandEditing: true,
  commandLogging: true,
  noPrefixDM: true,
  typing: true,
  readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token)
