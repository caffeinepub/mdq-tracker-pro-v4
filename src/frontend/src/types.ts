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
  | "analysis"
  | "history"
  | "blog";

export interface PrayerTime {
  name: PrayerName;
  time: string;
}

export interface DailyLog {
  date: string;
  prayers: Record<PrayerName, PrayerStatus>;
  advancedPrayers?: Record<AdvancedPrayerName, PrayerStatus>;
  journal?: string;
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
  expiresAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  isBookmarked?: boolean;
  readProgress?: number; // 0-100
  createdAt: string;
  isUserAdded?: boolean;
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
  tasbihs: Record<string, number>;
  blogArticles: BlogArticle[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}
