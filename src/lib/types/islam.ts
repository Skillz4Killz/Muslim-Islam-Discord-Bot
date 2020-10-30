export interface Ayah {
  /** The specific ayah number in this surah. */
  number: number;
  image: string;
  text: string;
  /** The overall verse number in all the surahs. */
  verse: number;
}

export interface Surah {
  name: string;
  ayahs: Ayah[];
}
