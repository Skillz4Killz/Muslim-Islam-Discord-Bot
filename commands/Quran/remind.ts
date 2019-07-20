import {
  Command,
  CommandStore,
  KlasaMessage,
  MessageEmbed,
  Permissions,
} from '../../imports';

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, {
      aliases: ['r'],
      description: (language) => language.get('COMMAND_REMIND_DESCRIPTION'),
      requiredPermissions: [Permissions.FLAGS.EMBED_LINKS],
    });
  }

  async run(message: KlasaMessage) {
    const enabled = message.author.settings.get(
      `reminders.finishMonthly.enabled`
    );
    await message.author.settings.update(
      'reminders.finishMonthly.enabled',
      !enabled,
      { throwOnError: true }
    );

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
