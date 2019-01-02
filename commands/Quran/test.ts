import fetch from 'chainfetch';
import { Command, CommandStore, KlasaClient } from '../../imports';

export default class extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string
  ) {
    super(client, store, file, directory, {
      aliases: ['t'],
      requiredPermissions: ['EMBED_LINKS'],
    });
  }

  async run() {
    let counter = 1;
    // tslint:disable-next-line:curly
    for (const hadiths of ['bukhari']) {
      for (let book = 1; book <= 97; book++) {
        const data = await fetch
          .get(`https://sunnah.com/${hadiths}/${book}`)
          .catch(() => null);
        if (!data) continue;

        const strData = data.body.toString();

        const titleStartIndex = strData.indexOf('<title>');
        const titleEndIndex = strData.indexOf(
          ' - \tSunnah.com - Sayings and Teachings of Prophet Muhammad'
        );

        const title = strData
          .substring(titleStartIndex, titleEndIndex)
          .substring(9);
        const bookName = title.substring(8, title.indexOf(' - '));
        this.client.console.log(
          titleStartIndex,
          title,
          bookName,
          titleEndIndex
        );

        const cleaned = strData.substring(data.body.indexOf('<body>'));
        const count = cleaned.split('Narrated').length - 1;

        let mutableString = cleaned;
        const allHadiths = [];
        for (let hadith = 1; hadith <= count; hadith++) {
          const hadithName = `hadith_${hadith}`;
          const narratedIndex = mutableString.indexOf('Narrated');
          const stopNarrationIndex = mutableString.indexOf(
            '</div><div class=text_details>'
          );
          const nextNarrated = mutableString
            .substring(narratedIndex, stopNarrationIndex)
            .replace(/\n/gi, '')
            .replace(/\r/gi, '')
            .replace(/'/gi, `\'`)
            .replace(/<p>/gi, '');
          const cleanedNarration = mutableString.substring(
            stopNarrationIndex + 30
          );
          // // this.client.console.log(
          // cleanedNarration.substring(0, cleanedNarration.indexOf('</b></div>'));
          // // );
          allHadiths.push(
            `${hadithName}: { image: '', text: '${nextNarrated}${cleanedNarration
              .substring(0, cleanedNarration.indexOf('</b></div>'))
              .replace(/\n/gi, '')
              .replace(/ {1,}/g, ' ')
              .replace(/'/gi, `\\'`)
              .replace(/\r/gi, '')
              .replace(/<p>/gi, '')}', verse: ${counter}, }`
          );
          counter++;
          this.client.console.log(
            `Book #${book} Hadith #${hadith} has been added to the database.`
          );
          mutableString = mutableString
            .substring(mutableString.indexOf('</b></div>'))
            .substring(10);
        }
        this.client.console.log(bookName);
        await this.client.providers.default.create(
          'hadith',
          bookName.toLowerCase(),
          {
            ts: `import ${bookName} from '../types/hadith';export const ${bookName.toLowerCase()}: ${bookName} = {${allHadiths.join(
              ','
            )}, name: '${title}',};`,
          }
        );

        // await KlasaUtil.sleep(5000);
      }
    }
    return null;
  }
}
