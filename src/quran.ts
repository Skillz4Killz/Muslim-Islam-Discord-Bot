// Exporting surahs
import { Collection } from "../deps.js";
import { abasa } from "./lib/surahs/abasa.js";
import { adiyat } from "./lib/surahs/adiyat.js";
import { ahqaf } from "./lib/surahs/ahqaf.js";
import { ahzab } from "./lib/surahs/ahzab.js";
import { ala } from "./lib/surahs/ala.js";
import { alaq } from "./lib/surahs/alaq.js";
import { anam } from "./lib/surahs/anam.js";
import { anbya } from "./lib/surahs/anbya.js";
import { anfal } from "./lib/surahs/anfal.js";
import { ankabut } from "./lib/surahs/ankabut.js";
import { araf } from "./lib/surahs/araf.js";
import { asr } from "./lib/surahs/asr.js";
import { balad } from "./lib/surahs/balad.js";
import { baqarah } from "./lib/surahs/baqarah.js";
import { bayyinah } from "./lib/surahs/bayyinah.js";
import { buruj } from "./lib/surahs/buruj.js";
import { dhariyat } from "./lib/surahs/dhariyat.js";
import { duhaa } from "./lib/surahs/duhaa.js";
import { dukhan } from "./lib/surahs/dukhan.js";
import { fajr } from "./lib/surahs/fajr.js";
import { falaq } from "./lib/surahs/falaq.js";
import { fath } from "./lib/surahs/fath.js";
import { default as fatihah } from "./lib/surahs/fatihah.js";
import { fatir } from "./lib/surahs/fatir.js";
import { fil } from "./lib/surahs/fil.js";
import { furqan } from "./lib/surahs/furqan.js";
import { fussilat } from "./lib/surahs/fussilat.js";
import { ghafir } from "./lib/surahs/ghafir.js";
import { ghashiyah } from "./lib/surahs/ghashiyah.js";
import { hadid } from "./lib/surahs/hadid.js";
import { haj } from "./lib/surahs/haj.js";
import { haqqah } from "./lib/surahs/haqqah.js";
import { hashr } from "./lib/surahs/hashr.js";
import { hijr } from "./lib/surahs/hijr.js";
import { hud } from "./lib/surahs/hud.js";
import { hujurat } from "./lib/surahs/hujurat.js";
import { humazah } from "./lib/surahs/humazah.js";
import { ibrahim } from "./lib/surahs/ibrahim.js";
import { ikhlas } from "./lib/surahs/ikhlas.js";
import { imran } from "./lib/surahs/imran.js";
import { infitar } from "./lib/surahs/infitar.js";
import { insan } from "./lib/surahs/insan.js";
import { inshiqaq } from "./lib/surahs/inshiqaq.js";
import { isra } from "./lib/surahs/isra.js";
import { jathiyah } from "./lib/surahs/jathiyah.js";
import { jinn } from "./lib/surahs/jinn.js";
import { jumuah } from "./lib/surahs/jumuah.js";
import { kafirun } from "./lib/surahs/kafirun.js";
import { kahf } from "./lib/surahs/kahf.js";
import { kawthar } from "./lib/surahs/kawthar.js";
import { layl } from "./lib/surahs/layl.js";
import { luqman } from "./lib/surahs/luqman.js";
import { maarij } from "./lib/surahs/maarij.js";
import { maidah } from "./lib/surahs/maidah.js";
import { maryam } from "./lib/surahs/maryam.js";
import { masad } from "./lib/surahs/masad.js";
import { maun } from "./lib/surahs/maun.js";
import { muddaththir } from "./lib/surahs/muddaththir.js";
import { muhammad } from "./lib/surahs/muhammad.js";
import { mujadila } from "./lib/surahs/mujadila.js";
import { mulk } from "./lib/surahs/mulk.js";
import { muminun } from "./lib/surahs/muminun.js";
import { mumtahanah } from "./lib/surahs/mumtahanah.js";
import { munafiqun } from "./lib/surahs/munafiqun.js";
import { mursalat } from "./lib/surahs/mursalat.js";
import { mutaffifin } from "./lib/surahs/mutaffifin.js";
import { muzzammil } from "./lib/surahs/muzzammil.js";
import { naba } from "./lib/surahs/naba.js";
import { nahl } from "./lib/surahs/nahl.js";
import { najm } from "./lib/surahs/najm.js";
import { naml } from "./lib/surahs/naml.js";
import { nas } from "./lib/surahs/nas.js";
import { nasr } from "./lib/surahs/nasr.js";
import { naziat } from "./lib/surahs/naziat.js";
import { nisa } from "./lib/surahs/nisa.js";
import { nuh } from "./lib/surahs/nuh.js";
import { nur } from "./lib/surahs/nur.js";
import { qadr } from "./lib/surahs/qadr.js";
import { qaf } from "./lib/surahs/qaf.js";
import { qalam } from "./lib/surahs/qalam.js";
import { qamar } from "./lib/surahs/qamar.js";
import { qariah } from "./lib/surahs/qariah.js";
import { qasas } from "./lib/surahs/qasas.js";
import { qiyamah } from "./lib/surahs/qiyamah.js";
import { quraysh } from "./lib/surahs/quraysh.js";
import { rad } from "./lib/surahs/rad.js";
import { rahman } from "./lib/surahs/rahman.js";
import { rum } from "./lib/surahs/rum.js";
import { saba } from "./lib/surahs/saba.js";
import { sad } from "./lib/surahs/sad.js";
import { saf } from "./lib/surahs/saf.js";
import { saffat } from "./lib/surahs/saffat.js";
import { sajdah } from "./lib/surahs/sajdah.js";
import { shams } from "./lib/surahs/shams.js";
import { sharh } from "./lib/surahs/sharh.js";
import { shuara } from "./lib/surahs/shuara.js";
import { shuraa } from "./lib/surahs/shuraa.js";
import { sin } from "./lib/surahs/sin.js";
import { taghabun } from "./lib/surahs/taghabun.js";
import { taha } from "./lib/surahs/taha.js";
import { tahrim } from "./lib/surahs/tahrim.js";
import { takathur } from "./lib/surahs/takathur.js";
import { takwir } from "./lib/surahs/takwir.js";
import { talaq } from "./lib/surahs/talaq.js";
import { tariq } from "./lib/surahs/tariq.js";
import { tawbah } from "./lib/surahs/tawbah.js";
import { tin } from "./lib/surahs/tin.js";
import { tur } from "./lib/surahs/tur.js";
import { waqiah } from "./lib/surahs/waqiah.js";
import { yunus } from "./lib/surahs/yunus.js";
import { yusuf } from "./lib/surahs/yusuf.js";
import { zalzalah } from "./lib/surahs/zalzalah.js";
import { zukhruf } from "./lib/surahs/zukhruf.js";
import { zumar } from "./lib/surahs/zumar.js";
import { Surah } from "./lib/types/islam.js";

export const Quran: Record<string, Surah> = {
  fatihah,
  baqarah,
  imran,
  nisa,
  maidah,
  anam,
  araf,
  anfal,
  tawbah,
  yunus,
  hud,
  yusuf,
  rad,
  ibrahim,
  hijr,
  nahl,
  isra,
  kahf,
  maryam,
  taha,
  anbya,
  haj,
  muminun,
  nur,
  furqan,
  shuara,
  naml,
  qasas,
  ankabut,
  rum,
  luqman,
  sajdah,
  ahzab,
  saba,
  fatir,
  sin,
  saffat,
  sad,
  zumar,
  ghafir,
  fussilat,
  shuraa,
  zukhruf,
  dukhan,
  jathiyah,
  ahqaf,
  muhammad,
  fath,
  hujurat,
  qaf,
  dhariyat,
  tur,
  najm,
  qamar,
  rahman,
  waqiah,
  hadid,
  mujadila,
  hashr,
  mumtahanah,
  saf,
  jumuah,
  munafiqun,
  taghabun,
  talaq,
  tahrim,
  mulk,
  qalam,
  haqqah,
  maarij,
  nuh,
  jinn,
  muzzammil,
  muddaththir,
  qiyamah,
  insan,
  mursalat,
  naba,
  naziat,
  abasa,
  takwir,
  infitar,
  mutaffifin,
  inshiqaq,
  buruj,
  tariq,
  ala,
  ghashiyah,
  fajr,
  balad,
  shams,
  layl,
  duhaa,
  sharh,
  tin,
  alaq,
  qadr,
  bayyinah,
  zalzalah,
  adiyat,
  qariah,
  takathur,
  asr,
  humazah,
  fil,
  quraysh,
  maun,
  kawthar,
  kafirun,
  nasr,
  masad,
  ikhlas,
  falaq,
  nas,
};

export const QuranCollection = new Collection<number, Surah>([
  [1, fatihah],
  [2, baqarah],
  [3, imran],
  [4, nisa],
  [5, maidah],
  [6, anam],
  [7, araf],
  [8, anfal],
  [9, tawbah],
  [10, yunus],
  [11, hud],
  [12, yusuf],
  [13, rad],
  [14, ibrahim],
  [15, hijr],
  [16, nahl],
  [17, isra],
  [18, kahf],
  [19, maryam],
  [20, taha],
  [21, anbya],
  [22, haj],
  [23, muminun],
  [24, nur],
  [25, furqan],
  [26, shuara],
  [27, naml],
  [28, qasas],
  [29, ankabut],
  [30, rum],
  [31, luqman],
  [32, sajdah],
  [33, ahzab],
  [34, saba],
  [35, fatir],
  [36, sin],
  [37, saffat],
  [38, sad],
  [39, zumar],
  [40, ghafir],
  [41, fussilat],
  [42, shuraa],
  [43, zukhruf],
  [44, dukhan],
  [45, jathiyah],
  [46, ahqaf],
  [47, muhammad],
  [48, fath],
  [49, hujurat],
  [50, qaf],
  [51, dhariyat],
  [52, tur],
  [53, najm],
  [54, qamar],
  [55, rahman],
  [56, waqiah],
  [57, hadid],
  [58, mujadila],
  [59, hashr],
  [60, mumtahanah],
  [61, saf],
  [62, jumuah],
  [63, munafiqun],
  [64, taghabun],
  [65, talaq],
  [66, tahrim],
  [67, mulk],
  [68, qalam],
  [69, haqqah],
  [70, maarij],
  [71, nuh],
  [72, jinn],
  [73, muzzammil],
  [74, muddaththir],
  [75, qiyamah],
  [76, insan],
  [77, mursalat],
  [78, naba],
  [79, naziat],
  [80, abasa],
  [81, takwir],
  [82, infitar],
  [83, mutaffifin],
  [84, inshiqaq],
  [85, buruj],
  [86, tariq],
  [87, ala],
  [88, ghashiyah],
  [89, fajr],
  [90, balad],
  [91, shams],
  [92, layl],
  [93, duhaa],
  [94, sharh],
  [95, tin],
  [96, alaq],
  [97, qadr],
  [98, bayyinah],
  [99, zalzalah],
  [100, adiyat],
  [101, qariah],
  [102, takathur],
  [103, asr],
  [104, humazah],
  [105, fil],
  [106, quraysh],
  [107, maun],
  [108, kawthar],
  [109, kafirun],
  [110, nasr],
  [111, masad],
  [112, ikhlas],
  [113, falaq],
  [114, nas],
]);
