export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
export type AdvancedPrayerName = "Tahajjud" | "Ishraq" | "Chasht" | "Awwabin";
export type AllPrayerName = PrayerName | AdvancedPrayerName;
export type PrayerStatus = "unmarked" | "single" | "jamaat" | "qaza";
export type TabName =
  | "home"
  | "qaza"
  | "adaa"
  | "grace"
  | "settings"
  | "analysis";

export interface PrayerTime {
  name: PrayerName;
  time: string; // "HH:MM" 24h format
}

export interface DailyLog {
  date: string; // "YYYY-MM-DD"
  prayers: Record<PrayerName, PrayerStatus>;
  advancedPrayers?: Record<AdvancedPrayerName, PrayerStatus>;
}

export interface QazaEntry {
  id: string;
  prayerName: PrayerName;
  missedDate: string;
  missedTime: string;
  status: "pending" | "resolved";
  resolvedAt?: string;
}

export interface AdaaRecord {
  id: string;
  prayerName: PrayerName;
  missedDate: string;
  resolvedAt: string;
}

export interface GracePeriodEntry {
  id: string;
  date: string;
  prayerName: PrayerName;
  expiresAt: string; // ISO string 24h after midnight of missed date
}

export interface AppState {
  prayerTimes: Record<PrayerName, string>;
  advancedPrayerTimes: Record<AdvancedPrayerName, string>;
  dailyLog: DailyLog | null;
  qazaVault: QazaEntry[];
  adaaRecords: AdaaRecord[];
  gracePeriod: GracePeriodEntry[];
  lastResetDate: string;
  profileName: string;
  isNormalMode: boolean;
  monthlyHistory: Record<string, DailyLog>;
  tasbihs: Record<string, number>; // date -> count
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}
