import {
  Command,
  CommandStore,
  KlasaClient,
  KlasaMessage,
  MessageEmbed,
  Permissions,
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
      description: (language) => language.get('COMMAND_REMIND_DESCRIPTION'),
      requiredPermissions: [Permissions.FLAGS.EMBED_LINKS],
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
            ? message.language.get('COMMAND_REMIND_DISABLED')
            : message.language.get('COMMAND_REMIND_ENABLED')
        )
    );
  }
}
