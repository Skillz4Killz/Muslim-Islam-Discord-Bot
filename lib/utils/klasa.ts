import { Message } from "@klasa/core";
import { APIEmbedData } from '@klasa/dapi-types'
export function sendTextMessage(message: Message, content: string) {
  return message.send({ data: { content } });
}

export function sendEmbedMessage(message: Message, embed: APIEmbedData) {
  return message.send({ data: { embed } });
}

export function randomColor() {
  return Math.floor(Math.random() * (0xffffff + 1));
}
