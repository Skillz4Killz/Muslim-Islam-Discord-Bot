import fs from "fs";

export interface JuzAyah {
  /** The specific ayah number in this surah. */
  number: number;
  /** An image url for the arabic text. */
  image: string;
  /** The text in english. */
  text: string;
  /** The text in english letters on how to pronounce the arabic. */
  transliteration: string;
  /** The overall verse number in all the surahs. */
  verse: number;
  /** The juz which this ayah is part of. */
  juz: number;
  /** The surah which is ayah is part of. */
  surah: number;
  /** The surah name which this ayah is part of. */
  // surahName: string;
}

export async function fetchJuz(juz: number): Promise<JuzAyah[]> {
  if (juz > 30) return [];

  const Quran: JuzAyah[] = [];
  let page = 1;

  while (true) {
    const juzz = await fetch(
      `https://api.quran.com/api/v4/verses/by_juz/${juz}?language=en&words=true&page=${page}&per_page=50`
    ).then((res) => res.json());
    // Increase page by 1 for next request
    page++;

    for (const verse of juzz.verses ?? []) {
      let text: string[] = [];
      let transliteration: string[] = [];

      for (const word of verse.words ?? []) {
        text.push(word.translation.text);
        transliteration.push(word.transliteration.text);
      }

      const [surah] = verse.verse_key.split(":");

      Quran.push({
        number: verse.verse_number,
        image: verse.image_url ?? "",
        text: text.join(" "),
        transliteration: transliteration.join(" "),
        verse: verse.id,
        juz: verse.juz_number,
        surah: Number(surah),
      });
    }

    if (juzz.pagination.current_page === juzz.pagination.total_pages) break;
  }

  return Quran;
}

export async function fetchQuran() {
  const Quran: JuzAyah[] = [];

  for (let i = 1; i <= 30; i++) {
    console.log(`[Loading] Fetching Quran Juz #${i}`);
    Quran.push(...(await fetchJuz(i)));
    console.log(`[Loading] Fetched Quran Juz #${i}`);
  }

  // const firstSurahVerses = Quran.filter(verse => verse.surah === 1);


  fs.writeFileSync("./ayahs.ts", `export const AYAHS = ${JSON.stringify(Quran, null, 4)}`);

  console.log("[Loading] Quran loading completed.");
}
