/**
 * Pure algorithmic Gregorian-to-Hijri date conversion
 * Uses the Julian Day Number method
 */

export interface HijriDate {
  day: number;
  month: number;
  monthArabic: string;
  monthUrdu: string;
  year: number;
}

const HIJRI_MONTHS: { arabic: string; urdu: string }[] = [
  { arabic: "محرم", urdu: "Muharram" },
  { arabic: "صفر", urdu: "Safar" },
  { arabic: "ربیع الاول", urdu: "Rabi al-Awwal" },
  { arabic: "ربیع الثانی", urdu: "Rabi al-Thani" },
  { arabic: "جمادی الاول", urdu: "Jumada al-Awwal" },
  { arabic: "جمادی الثانی", urdu: "Jumada al-Thani" },
  { arabic: "رجب", urdu: "Rajab" },
  { arabic: "شعبان", urdu: "Sha'ban" },
  { arabic: "رمضان", urdu: "Ramadan" },
  { arabic: "شوال", urdu: "Shawwal" },
  { arabic: "ذوالقعدہ", urdu: "Dhul Qa'dah" },
  { arabic: "ذوالحجہ", urdu: "Dhul Hijjah" },
];

/**
 * Convert a Gregorian date to Hijri using the Julian Day Number algorithm
 */
export function getHijriDate(date?: Date): HijriDate {
  const d = date ?? new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  // Calculate Julian Day Number
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  // Julian Day Number; subtract 1 to align with actual moon-sighting based Hijri calendar
  let jdn =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045 -
    1;

  // Convert JDN to Hijri
  const l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const ll = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - ll) / 5316) * Math.floor((50 * ll) / 17719) +
    Math.floor(ll / 5670) * Math.floor((43 * ll) / 15238);
  const lll =
    ll -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  const hijriMonth = Math.floor((24 * lll) / 709);
  const hijriDay = lll - Math.floor((709 * hijriMonth) / 24);
  const hijriYear = 30 * n + j - 30;

  const monthIndex = Math.max(0, Math.min(11, hijriMonth - 1));

  return {
    day: hijriDay,
    month: hijriMonth,
    monthArabic: HIJRI_MONTHS[monthIndex].arabic,
    monthUrdu: HIJRI_MONTHS[monthIndex].urdu,
    year: hijriYear,
  };
}

/**
 * Convert a number to Arabic-Indic numerals
 */
export function toArabicIndic(n: number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n)
    .split("")
    .map((d) => arabicNumerals[Number.parseInt(d)] ?? d)
    .join("");
}
