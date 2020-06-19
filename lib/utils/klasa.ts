import { Message, User, MessageData, isTextBasedChannel } from "@klasa/core";
import { APIEmbedData } from "@klasa/dapi-types";
import { client } from "../../src";

export function sendTextMessage(message: Message, content: string) {
  return message.send({ data: { content } });
}

export function sendEmbedMessage(message: Message, embed: APIEmbedData) {
  return message.send({ data: { embed } });
}

export async function sendMessage(channelID: string, data: MessageData) {
  const channel = client.channels.get(channelID);
  if (!channel || !isTextBasedChannel(channel)) return [];

  return channel.send({ data });
}

export function randomColor() {
  return Math.floor(Math.random() * (0xffffff + 1));
}

export function displayAvatarURL(user: User) {
  return user.avatar
    ? user.client.api.cdn.userAvatar(user.id, user.avatar)
    : user.client.api.cdn.defaultAvatar(Number(user.discriminator));
}
