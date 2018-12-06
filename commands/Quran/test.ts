import { Command, CommandStore, KlasaClient, KlasaMessage } from '../../imports';

export default class extends Command {
	constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			description: 'Read a specific ayah.',
			extendedHelp: 'No extended help available.',
			quotedStringSupport: true,
		});
	}

	async run(message: KlasaMessage) {
		const allSurahs = await this.client.providers.default.getAll('quran');
		const full = await this.client.providers.default.create('quran', 'full', {});
		for (const surah of allSurahs) {
			const newObj = {};
			this.client.providers.default.update('quran', 'full', {});
		}
	}

}
