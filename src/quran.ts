// Exporting surahs
import { Collection } from "../deps.ts";
import { abasa } from "./lib/surahs/abasa.ts";
import { adiyat } from "./lib/surahs/adiyat.ts";
import { ahqaf } from "./lib/surahs/ahqaf.ts";
import { ahzab } from "./lib/surahs/ahzab.ts";
import { ala } from "./lib/surahs/ala.ts";
import { alaq } from "./lib/surahs/alaq.ts";
import { anam } from "./lib/surahs/anam.ts";
import { anbya } from "./lib/surahs/anbya.ts";
import { anfal } from "./lib/surahs/anfal.ts";
import { ankabut } from "./lib/surahs/ankabut.ts";
import { araf } from "./lib/surahs/araf.ts";
import { asr } from "./lib/surahs/asr.ts";
import { balad } from "./lib/surahs/balad.ts";
import { baqarah } from "./lib/surahs/baqarah.ts";
import { bayyinah } from "./lib/surahs/bayyinah.ts";
import { buruj } from "./lib/surahs/buruj.ts";
import { dhariyat } from "./lib/surahs/dhariyat.ts";
import { duhaa } from "./lib/surahs/duhaa.ts";
import { dukhan } from "./lib/surahs/dukhan.ts";
import { fajr } from "./lib/surahs/fajr.ts";
import { falaq } from "./lib/surahs/falaq.ts";
import { fath } from "./lib/surahs/fath.ts";
import { default as fatihah } from "./lib/surahs/fatihah.ts";
import { fatir } from "./lib/surahs/fatir.ts";
import { fil } from "./lib/surahs/fil.ts";
import { furqan } from "./lib/surahs/furqan.ts";
import { fussilat } from "./lib/surahs/fussilat.ts";
import { ghafir } from "./lib/surahs/ghafir.ts";
import { ghashiyah } from "./lib/surahs/ghashiyah.ts";
import { hadid } from "./lib/surahs/hadid.ts";
import { haj } from "./lib/surahs/haj.ts";
import { haqqah } from "./lib/surahs/haqqah.ts";
import { hashr } from "./lib/surahs/hashr.ts";
import { hijr } from "./lib/surahs/hijr.ts";
import { hud } from "./lib/surahs/hud.ts";
import { hujurat } from "./lib/surahs/hujurat.ts";
import { humazah } from "./lib/surahs/humazah.ts";
import { ibrahim } from "./lib/surahs/ibrahim.ts";
import { ikhlas } from "./lib/surahs/ikhlas.ts";
import { imran } from "./lib/surahs/imran.ts";
import { infitar } from "./lib/surahs/infitar.ts";
import { insan } from "./lib/surahs/insan.ts";
import { inshiqaq } from "./lib/surahs/inshiqaq.ts";
import { isra } from "./lib/surahs/isra.ts";
import { jathiyah } from "./lib/surahs/jathiyah.ts";
import { jinn } from "./lib/surahs/jinn.ts";
import { jumuah } from "./lib/surahs/jumuah.ts";
import { kafirun } from "./lib/surahs/kafirun.ts";
import { kahf } from "./lib/surahs/kahf.ts";
import { kawthar } from "./lib/surahs/kawthar.ts";
import { layl } from "./lib/surahs/layl.ts";
import { luqman } from "./lib/surahs/luqman.ts";
import { maarij } from "./lib/surahs/maarij.ts";
import { maidah } from "./lib/surahs/maidah.ts";
import { maryam } from "./lib/surahs/maryam.ts";
import { masad } from "./lib/surahs/masad.ts";
import { maun } from "./lib/surahs/maun.ts";
import { muddaththir } from "./lib/surahs/muddaththir.ts";
import { muhammad } from "./lib/surahs/muhammad.ts";
import { mujadila } from "./lib/surahs/mujadila.ts";
import { mulk } from "./lib/surahs/mulk.ts";
import { muminun } from "./lib/surahs/muminun.ts";
import { mumtahanah } from "./lib/surahs/mumtahanah.ts";
import { munafiqun } from "./lib/surahs/munafiqun.ts";
import { mursalat } from "./lib/surahs/mursalat.ts";
import { mutaffifin } from "./lib/surahs/mutaffifin.ts";
import { muzzammil } from "./lib/surahs/muzzammil.ts";
import { naba } from "./lib/surahs/naba.ts";
import { nahl } from "./lib/surahs/nahl.ts";
import { najm } from "./lib/surahs/najm.ts";
import { naml } from "./lib/surahs/naml.ts";
import { nas } from "./lib/surahs/nas.ts";
import { nasr } from "./lib/surahs/nasr.ts";
import { naziat } from "./lib/surahs/naziat.ts";
import { nisa } from "./lib/surahs/nisa.ts";
import { nuh } from "./lib/surahs/nuh.ts";
import { nur } from "./lib/surahs/nur.ts";
import { qadr } from "./lib/surahs/qadr.ts";
import { qaf } from "./lib/surahs/qaf.ts";
import { qalam } from "./lib/surahs/qalam.ts";
import { qamar } from "./lib/surahs/qamar.ts";
import { qariah } from "./lib/surahs/qariah.ts";
import { qasas } from "./lib/surahs/qasas.ts";
import { qiyamah } from "./lib/surahs/qiyamah.ts";
import { quraysh } from "./lib/surahs/quraysh.ts";
import { rad } from "./lib/surahs/rad.ts";
import { rahman } from "./lib/surahs/rahman.ts";
import { rum } from "./lib/surahs/rum.ts";
import { saba } from "./lib/surahs/saba.ts";
import { sad } from "./lib/surahs/sad.ts";
import { saf } from "./lib/surahs/saf.ts";
import { saffat } from "./lib/surahs/saffat.ts";
import { sajdah } from "./lib/surahs/sajdah.ts";
import { shams } from "./lib/surahs/shams.ts";
import { sharh } from "./lib/surahs/sharh.ts";
import { shuara } from "./lib/surahs/shuara.ts";
import { shuraa } from "./lib/surahs/shuraa.ts";
import { sin } from "./lib/surahs/sin.ts";
import { taghabun } from "./lib/surahs/taghabun.ts";
import { taha } from "./lib/surahs/taha.ts";
import { tahrim } from "./lib/surahs/tahrim.ts";
import { takathur } from "./lib/surahs/takathur.ts";
import { takwir } from "./lib/surahs/takwir.ts";
import { talaq } from "./lib/surahs/talaq.ts";
import { tariq } from "./lib/surahs/tariq.ts";
import { tawbah } from "./lib/surahs/tawbah.ts";
import { tin } from "./lib/surahs/tin.ts";
import { tur } from "./lib/surahs/tur.ts";
import { waqiah } from "./lib/surahs/waqiah.ts";
import { yunus } from "./lib/surahs/yunus.ts";
import { yusuf } from "./lib/surahs/yusuf.ts";
import { zalzalah } from "./lib/surahs/zalzalah.ts";
import { zukhruf } from "./lib/surahs/zukhruf.ts";
import { zumar } from "./lib/surahs/zumar.ts";
import { Surah } from "./lib/types/islam.ts";

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
