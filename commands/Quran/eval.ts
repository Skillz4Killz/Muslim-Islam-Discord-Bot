// Copyright (c) 2017-2018 dirigeants. All rights reserved. MIT license.
import { Command, CommandStore, inspect, KlasaClient, KlasaMessage, KlasaUtil, Stopwatch, Type } from '../../imports';

export default class extends Command {
  timeout!: 30000;

  constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
    super(client, store, file, directory, {
      aliases: ['ev'],
      description: (language) => language.get('COMMAND_EVAL_DESCRIPTION'),
      extendedHelp: (language) => language.get('COMMAND_EVAL_EXTENDED'),
      guarded: true,
      permissionLevel: 10,
      usage: '<expression:str>',
    });
  }

  async run(message: KlasaMessage, [code]: [string]) {
    const flagTime = 'no-timeout' in message.flags ? 'wait' in message.flags ? Number(message.flags.wait) : this.timeout : Infinity;
    const language = message.flags.lang || message.flags.language || (message.flags.json ? 'json' : 'js');
    const { success, result, time, type } = await this.timedEval(message, code, flagTime);

    if (message.flags.silent) {
      if (!success && result) this.client.emit('error', result);
      return null;
    }

    const footer = KlasaUtil.codeBlock('ts', type);
    const sendAs = message.flags.output || message.flags['output-to'] || (message.flags.log ? 'log' : null);
    return this.handleMessage(message, { sendAs, hastebinUnavailable: false, url: null }, { success, result, time, footer, language });
  }

  async handleMessage(message: KlasaMessage, options: any, { success, result, time, footer, language }: { success: boolean; result: any; time: string; footer: string; language: string }): Promise<any> {
    switch (options.sendAs) {
      case 'file': {
        if (message.channel.attachable) return message.channel.sendFile(Buffer.from(result), 'output.txt', message.language.get('COMMAND_EVAL_OUTPUT_FILE', time, footer));
        await this.getTypeOutput(message, options);
        return this.handleMessage(message, options, { success, result, time, footer, language });
      }
      // case 'haste':
      // case 'hastebin': {
      //   if (!options.url) options.url = await this.getHaste(result, language).catch(() => null);
      //   if (options.url) return message.sendMessage(message.language.get('COMMAND_EVAL_OUTPUT_HASTEBIN', time, options.url, footer));
      //   options.hastebinUnavailable = true;
      //   await this.getTypeOutput(message, options);
      //   return this.handleMessage(message, options, { success, result, time, footer, language });
      // }
      case 'console':
      case 'log': {
        this.client.emit('log', result);
        return message.sendMessage(message.language.get('COMMAND_EVAL_OUTPUT_CONSOLE', time, footer));
      }
      case 'none':
        return null;
      default: {
        if (result.length > 2000) {
          await this.getTypeOutput(message, options);
          return this.handleMessage(message, options, { success, result, time, footer, language });
        }
        return message.sendMessage(message.language.get(success ? 'COMMAND_EVAL_OUTPUT' : 'COMMAND_EVAL_ERROR',
          time, KlasaUtil.codeBlock(language, result), footer));
      }
    }
  }

  async getTypeOutput(message: KlasaMessage, options: any) {
    const _options = ['log'];
    if (message.channel.attachable) _options.push('file');
    if (!options.hastebinUnavailable) _options.push('hastebin');
    let _choice;
    do _choice = await message.prompt(`Choose one of the following options: ${_options.join(', ')}`).catch(() => ({ content: 'none' }));
    while (!['file', 'haste', 'hastebin', 'console', 'log', 'default', 'none', null].includes(_choice.content));
    options.sendAs = _choice.content;
  }

  timedEval(message: KlasaMessage, code: string, flagTime: number) {
    if (flagTime === Infinity || flagTime === 0) return this.eval(message, code);
    return Promise.race([
      KlasaUtil.sleep(flagTime).then(() => ({
        result: message.language.get('COMMAND_EVAL_TIMEOUT', flagTime / 1000),
        success: false,
        time: '⏱ ...',
        type: 'EvalTimeoutError',
      })),
      this.eval(message, code),
    ]);
  }

  // Eval the input
  async eval(message: KlasaMessage, code: string) {
    const stopwatch = new Stopwatch();
    let success, syncTime, asyncTime, result;
    let thenable = false;
    let type;
    try {
      if (message.flags.async) code = `(async () => {\n${code}\n})();`;
      result = eval(code);
      syncTime = stopwatch.toString();
      type = new Type(result);
      if (KlasaUtil.isThenable(result)) {
        thenable = true;
        stopwatch.restart();
        result = await result;
        asyncTime = stopwatch.toString();
      }
      success = true;
    } catch (error) {
      if (!syncTime) syncTime = stopwatch.toString();
      if (thenable && !asyncTime) asyncTime = stopwatch.toString();
      if (!type) type = new Type(error);
      result = error;
      success = false;
    }

    stopwatch.stop();
    if (typeof result !== 'string') result = result instanceof Error ? result.stack : message.flags.json ? JSON.stringify(result, null, 4) : inspect(result, {
      depth: message.flags.depth ? parseInt(message.flags.depth) || 0 : 0,
      showHidden: Boolean(message.flags.showHidden),
    });

    return { success, type, time: this.formatTime(syncTime, asyncTime), result: KlasaUtil.clean(result) };
  }

  formatTime(syncTime: string, asyncTime: string | undefined) {
    return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
  }

  // async getHaste(evalResult, language) {
  //   const key = await fetch('https://hastebin.com/documents', { method: 'POST', body: evalResult })
  //     .then((response) => response.json())
  //     .then((body) => body.key);
  //   return `https://hastebin.com/${key}.${language}`;
  // }
}
