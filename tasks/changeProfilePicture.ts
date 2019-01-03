import { ImageConstants, Task, Permissions } from '../imports';

export default class extends Task {
  async run() {
    this.client.emit('log', 'Changing Profile Picture Task Running');
    const randomImageUrl =
      ImageConstants.profilePictures[
        Math.floor(Math.random() * ImageConstants.profilePictures.length - 1)
      ];

    // Set the bots profile picture
    this.client
      .user!.setAvatar(randomImageUrl)
      .catch((error) =>
        this.client.emit(
          'error',
          `Change Profile Picture Task Set Avatar: \n${error.stack || error}`
        )
      );
    // Set the servers logo if the guild exists and the bot has permissions
    if (process.env.mainGuildID) {
      const mainGuild = this.client.guilds.get(process.env.mainGuildID);
      if (
        mainGuild &&
        mainGuild.me.hasPermission(Permissions.FLAGS.MANAGE_GUILD)
      )
        mainGuild
          .setIcon(randomImageUrl)
          .catch((error) =>
            this.client.emit(
              'error',
              `Tasks Change Profile Picture Server Logo: \n ${error.stack ||
                error}`
            )
          );
    }
  }

  async init() {
    // Leave this so this.client is available
  }
}
