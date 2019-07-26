import { Function } from '@kcp/functions';
import { MuslimQuestion } from './muslim';

declare class ConstantsFunction extends Function {
  questionsData: MuslimQuestion[];
}

declare class Functions {
  constants: ConstantsFunction;
}

declare module 'discord.js' {
  interface Client {
    helpers: Functions;
  }
}
