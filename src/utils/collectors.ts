import { Collection, Message } from "@discordeno/bot";

export const messageCollectors = new Collection<bigint, MessageCollector>();

export async function needMessage(
  memberId: bigint,
  channelId: bigint,
  options: MessageCollectorOptions & { amount?: 1 }
): Promise<Message>;
export async function needMessage(
  memberId: bigint,
  channelId: bigint,
  options: MessageCollectorOptions & { amount?: number }
): Promise<Message[]>;
export async function needMessage(
  memberId: bigint,
  channelId: bigint
): Promise<Message>;
export async function needMessage(
  memberId: bigint,
  channelId: bigint,
  options?: MessageCollectorOptions
) {
  const messages = await collectMessages({
    key: memberId,
    channelId,
    createdAt: Date.now(),
    filter: options?.filter || ((msg) => memberId === msg.author.id),
    amount: options?.amount || 1,
    duration: options?.duration || 60000 * 5,
  });

  return (options?.amount || 1) > 1 ? messages : messages[0];
}

export function collectMessages(
  options: CollectMessagesOptions
): Promise<Message[]> {
  return new Promise((resolve, reject) => {
    messageCollectors
      .get(options.key)
      ?.reject(
        "A new collector began before the user responded to the previous one."
      );

    messageCollectors.set(options.key, {
      ...options,
      messages: [],
      resolve,
      reject,
    });
  });
}

export function processMessageCollectors(message: Message) {
  // IGNORE DMS
  if (!message.guildId) return;

  const collector = messageCollectors.get(message.author.id);
  // This user has no collectors pending or the message is in a different channel
  if (!collector || message.channelId !== collector.channelId) return;
  // This message is a response to a collector. Now running the filter function.
  if (!collector.filter(message)) return;

  // If the necessary amount has been collected
  if (
    collector.amount === 1 ||
    collector.amount === collector.messages.length + 1
  ) {
    // Remove the collector
    messageCollectors.delete(message.author.id);
    // Resolve the collector
    return collector.resolve([...collector.messages, message]);
  }
  // More messages still need to be collected
  collector.messages.push(message);
}

export interface BaseCollectorOptions {
  /** The amount of messages to collect before resolving. Defaults to 1 */
  amount?: number;
  /** The amount of milliseconds this should collect for before expiring. Defaults to 5 minutes. */
  duration?: number;
}

export interface MessageCollectorOptions extends BaseCollectorOptions {
  /** Function that will filter messages to determine whether to collect this message. Defaults to making sure the message is sent by the same member. */
  filter?: (message: Message) => boolean;
  /** The amount of messages to collect before resolving. Defaults to 1 */
  amount?: number;
  /** The amount of milliseconds this should collect for before expiring. Defaults to 5 minutes. */
  duration?: number;
}

export interface MessageCollector extends CollectMessagesOptions {
  resolve: (value: Message[] | PromiseLike<Message[]>) => void;
  // deno-lint-ignore no-explicit-any
  reject: (reason?: any) => void;
  /** Where the messages are stored if the amount to collect is more than 1. */
  messages: Message[];
}

export interface CollectMessagesOptions extends BaseCollectorCreateOptions {
  /** The channel Id where this is listening to */
  channelId: bigint;
  /** Function that will filter messages to determine whether to collect this message */
  filter: (message: Message) => boolean;
}

export interface BaseCollectorCreateOptions {
    /** The unique key that will be used to get responses for this. Ideally, meant to be for member id. */
    key: bigint
    /** The amount of messages to collect before resolving. */
    amount: number
    /** The timestamp when this collector was created */
    createdAt: number
    /** The duration in milliseconds how long this collector should last. */
    duration: number
  }
