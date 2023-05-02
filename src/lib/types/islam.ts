export interface Ayah {
  /** The specific ayah number in this surah. */
  number: number;
  image: string;
  text: string;
  transliteration: string;
  surah: number;
  /** The overall verse number in all the surahs. */
  verse: number;
  /** The juz which this ayah is part of. */
  juz: number;
}

export interface Surah {
  name: string;
  ayahs: Ayah[];
}
