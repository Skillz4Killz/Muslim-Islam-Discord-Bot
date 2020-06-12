import { ImageConstants } from "../../imports";
import { Task } from "klasa";
import { PermissionsFlags } from "@klasa/core";

export default class extends Task {
  async run() {
    this.client.emit("log", "Changing Profile Picture Task Running");
    const randomImageUrl =
      ImageConstants.profilePictures[Math.floor(Math.random() * ImageConstants.profilePictures.length)];

    // Set the bots profile picture
    this.client
      .user!.setAvatar(randomImageUrl)
      .catch((error) => this.client.emit("error", `Change Profile Picture Task Set Avatar: \n${error.stack || error}`));
    // Set the servers logo if the guild exists and the bot has permissions
    if (!process.env.mainGuildID) return;

    const mainGuild = this.client.guilds.get(process.env.mainGuildID);
    if (!mainGuild) return;
    if (!mainGuild.me?.permissions.has(PermissionsFlags.ManageGuild)) return;

    mainGuild
      .modify({ icon: randomImageUrl })
      .catch((error) =>
        this.client.emit("error", `Tasks Change Profile Picture Server Logo: \n ${error.stack || error}`)
      );
  }
}
