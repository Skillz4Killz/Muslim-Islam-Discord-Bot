const { Client } = require('klasa');
const { token } = require('./ecosystem.config');

new Client({
    fetchAllMembers: false,
    prefix: '!',
    commandEditing: true,
    commandLogging: true,
    noPrefixDM: true,
    typing: true,
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.size} guilds.`
}).login(token);