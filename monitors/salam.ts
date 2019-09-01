import { KlasaMessage, Monitor } from './../imports';

const salamTerms = [
  'salam',
  'asalamoalaikum wa rahmatullahi wa barakatuhu',
  'asalamoalaikum',
];

const greetingTerms = [
  'hi',
  'hello',
  'morning',
  'good morning',
  'good day',
  'good afternoon',
  'good evening',
  'good night',
  'goodnight',
  'gn',
];
export default class extends Monitor {
  ignoreEdits = false;
  ignoreOthers = false;

  async run(message: KlasaMessage) {
    // If this is not a in a guild cancel out
    if (!message.guild || !message.content.length || !message.channel.postable) return null;

    const content = message.content.toLowerCase();
    // if the message starts with a salam term reply
    for (const term of salamTerms)
      if (content.startsWith(term))
        return message.reply('Walaikumasalam Wa Rahmatullahi Wa Barakatuhu');
    // if the message starts with non-salam greeting reply
    for (const term of greetingTerms)
      if (content.startsWith(term))
        return message.reply('Asalamoalaikum Wa Rahmatullahi Wa Barakatuhu');
    // Cancel out
    return null;
  }
}
