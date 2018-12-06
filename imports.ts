// Exporting necessary parts from dependencies
export { Command, CommandStore, Event, KlasaClient, util as KlasaUtil, KlasaMessage, Monitor, Stopwatch, Task, Type, } from 'klasa';
export { Client, Message, MessageEmbed, TextBasedChannel, TextChannel } from 'discord.js';
export { default as fetch } from 'node-fetch';
export { inspect } from 'util';

// Exporting project constant files
export { default as Configs } from './ecosystem.config';
export { default as Quran } from './quran';
// Exporting surahs
export { fatihah } from './lib/surahs/fatihah';
export { baqarah } from './lib/surahs/baqarah';
export { imran } from './lib/surahs/imran';
