export type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";
export type AdvancedPrayerName = "Tahajjud" | "Ishraq" | "Chasht" | "Awwabin";
export type AllPrayerName = PrayerName | AdvancedPrayerName;
export type PrayerStatus = "unmarked" | "single" | "jamaat" | "qaza";
export type SunnahStatus = "unmarked" | "done" | "inshallah";
export type TabName =
  | "home"
  | "qaza"
  | "adaa"
  | "grace"
  | "settings"
  | "analysis"
  | "history"
  | "blog"
  | "dua"
  | "tasbih"
  | "journal"
  | "introduction";

export interface PrayerTime {
  name: PrayerName;
  time: string;
}

export interface NafilFormData {
  rakaat?: number;
  surah?: string;
  duaTopic?: string;
}

export interface DailyLog {
  date: string;
  prayers: Record<PrayerName, PrayerStatus>;
  advancedPrayers?: Record<AdvancedPrayerName, PrayerStatus>;
  journal?: string;
  sunnah?: Record<string, SunnahStatus>;
  taraweeh?: number;
  nafilForms?: Partial<Record<AdvancedPrayerName, NafilFormData>>;
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
  readProgress?: number;
  createdAt: string;
  isUserAdded?: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  minutesBefore: number;
  prayers: Record<PrayerName, boolean>;
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
  jamaatTimes: Record<PrayerName, string>;
  installDate: string;
  notificationSettings: NotificationSettings;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "info" | "warning";
}
