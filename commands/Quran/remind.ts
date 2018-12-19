import {
  Command,
  CommandStore,
  KlasaClient,
  KlasaMessage,
  MessageEmbed,
  UserSettings,
} from '../../imports';

export default class extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string
  ) {
    super(client, store, file, directory, {
      aliases: ['r'],
      description: 'Enable or disable the Quran reminders',
      extendedHelp: 'No extended help available.',
      requiredPermissions: ['EMBED_LINKS'],
    });
  }

  async run(message: KlasaMessage) {
    const enabled = (message.author.settings as UserSettings).reminders
      .finishMonthly.enabled;
    const { errors } = await message.author.settings.update(
      'reminders.finishMonthly.enabled',
      !enabled
    );
    if (errors.length) this.client.emit('error', errors.join('\n'));

    return message.send(
      new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          enabled
            ? 'You turned off the reminders to help you read the Quran every month.'
            : 'Alhumdulilah! You have enabled the reminders to help you complete reading the Quran every month.'
        )
    );
  }
}
