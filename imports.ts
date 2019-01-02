// Exporting necessary parts from dependencies
export {
  Command,
  CommandStore,
  Event,
  KlasaClient,
  util as KlasaUtil,
  KlasaMessage,
  Monitor,
  MonitorStore,
  Stopwatch,
  Task,
  Type,
} from 'klasa';
export {
  Client,
  Message,
  MessageEmbed,
  TextBasedChannel,
  TextChannel,
} from 'discord.js';
export { inspect } from 'util';

// Exporting types
export * from './lib/types/klasa';
export * from './lib/types/islam';
export * from 'dotenv';

// Exporting project constant files

export { Quran } from './quran';
// Exporting surahs
export { abasa } from './lib/surahs/abasa';
export { adiyat } from './lib/surahs/adiyat';
export { ahqaf } from './lib/surahs/ahqaf';
export { ahzab } from './lib/surahs/ahzab';
export { ala } from './lib/surahs/ala';
export { alaq } from './lib/surahs/alaq';
export { anam } from './lib/surahs/anam';
export { anbya } from './lib/surahs/anbya';
export { anfal } from './lib/surahs/anfal';
export { ankabut } from './lib/surahs/ankabut';
export { araf } from './lib/surahs/araf';
export { asr } from './lib/surahs/asr';
export { balad } from './lib/surahs/balad';
export { baqarah } from './lib/surahs/baqarah';
export { bayyinah } from './lib/surahs/bayyinah';
export { buruj } from './lib/surahs/buruj';
export { dhariyat } from './lib/surahs/dhariyat';
export { duhaa } from './lib/surahs/duhaa';
export { dukhan } from './lib/surahs/dukhan';
export { fajr } from './lib/surahs/fajr';
export { falaq } from './lib/surahs/falaq';
export { fath } from './lib/surahs/fath';
export { default as fatihah } from './lib/surahs/fatihah';
export { fatir } from './lib/surahs/fatir';
export { fil } from './lib/surahs/fil';
export { fussilat } from './lib/surahs/fussilat';
export { furqan } from './lib/surahs/furqan';
export { ghafir } from './lib/surahs/ghafir';
export { ghashiyah } from './lib/surahs/ghashiyah';
export { hadid } from './lib/surahs/hadid';
export { haj } from './lib/surahs/haj';
export { haqqah } from './lib/surahs/haqqah';
export { hashr } from './lib/surahs/hashr';
export { hijr } from './lib/surahs/hijr';
export { hud } from './lib/surahs/hud';
export { hujurat } from './lib/surahs/hujurat';
export { humazah } from './lib/surahs/humazah';
export { ibrahim } from './lib/surahs/ibrahim';
export { ikhlas } from './lib/surahs/ikhlas';
export { imran } from './lib/surahs/imran';
export { infitar } from './lib/surahs/infitar';
export { insan } from './lib/surahs/insan';
export { inshiqaq } from './lib/surahs/inshiqaq';
export { isra } from './lib/surahs/isra';
export { jathiyah } from './lib/surahs/jathiyah';
export { jinn } from './lib/surahs/jinn';
export { jumuah } from './lib/surahs/jumuah';
export { kafirun } from './lib/surahs/kafirun';
export { kahf } from './lib/surahs/kahf';
export { kawthar } from './lib/surahs/kawthar';
export { layl } from './lib/surahs/layl';
export { luqman } from './lib/surahs/luqman';
export { maarij } from './lib/surahs/maarij';
export { maidah } from './lib/surahs/maidah';
export { maryam } from './lib/surahs/maryam';
export { masad } from './lib/surahs/masad';
export { maun } from './lib/surahs/maun';
export { muddaththir } from './lib/surahs/muddaththir';
export { muhammad } from './lib/surahs/muhammad';
export { mujadila } from './lib/surahs/mujadila';
export { mulk } from './lib/surahs/mulk';
export { muminun } from './lib/surahs/muminun';
export { mumtahanah } from './lib/surahs/mumtahanah';
export { munafiqun } from './lib/surahs/munafiqun';
export { mursalat } from './lib/surahs/mursalat';
export { mutaffifin } from './lib/surahs/mutaffifin';
export { muzzammil } from './lib/surahs/muzzammil';
export { naba } from './lib/surahs/naba';
export { nahl } from './lib/surahs/nahl';
export { najm } from './lib/surahs/najm';
export { naml } from './lib/surahs/naml';
export { nas } from './lib/surahs/nas';
export { nasr } from './lib/surahs/nasr';
export { naziat } from './lib/surahs/naziat';
export { nisa } from './lib/surahs/nisa';
export { nuh } from './lib/surahs/nuh';
export { nur } from './lib/surahs/nur';
export { qadr } from './lib/surahs/qadr';
export { qaf } from './lib/surahs/qaf';
export { qalam } from './lib/surahs/qalam';
export { qamar } from './lib/surahs/qamar';
export { qariah } from './lib/surahs/qariah';
export { qasas } from './lib/surahs/qasas';
export { qiyamah } from './lib/surahs/qiyamah';
export { quraysh } from './lib/surahs/quraysh';
export { rad } from './lib/surahs/rad';
export { rahman } from './lib/surahs/rahman';
export { rum } from './lib/surahs/rum';
export { saba } from './lib/surahs/saba';
export { sad } from './lib/surahs/sad';
export { saf } from './lib/surahs/saf';
export { saffat } from './lib/surahs/saffat';
export { sajdah } from './lib/surahs/sajdah';
export { shams } from './lib/surahs/shams';
export { sharh } from './lib/surahs/sharh';
export { shuara } from './lib/surahs/shuara';
export { shuraa } from './lib/surahs/shuraa';
export { sin } from './lib/surahs/sin';
export { taha } from './lib/surahs/taha';
export { taghabun } from './lib/surahs/taghabun';
export { tahrim } from './lib/surahs/tahrim';
export { takathur } from './lib/surahs/takathur';
export { takwir } from './lib/surahs/takwir';
export { talaq } from './lib/surahs/talaq';
export { tariq } from './lib/surahs/tariq';
export { tawbah } from './lib/surahs/tawbah';
export { tin } from './lib/surahs/tin';
export { tur } from './lib/surahs/tur';
export { waqiah } from './lib/surahs/waqiah';
export { yunus } from './lib/surahs/yunus';
export { yusuf } from './lib/surahs/yusuf';
export { zalzalah } from './lib/surahs/zalzalah';
export { zukhruf } from './lib/surahs/zukhruf';
export { zumar } from './lib/surahs/zumar';
