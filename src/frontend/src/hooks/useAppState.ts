import { useCallback, useState } from "react";
import type {
  AdaaRecord,
  AdvancedPrayerName,
  AppState,
  BlogArticle,
  DailyLog,
  GracePeriodEntry,
  NafilFormData,
  NotificationSettings,
  PrayerName,
  PrayerStatus,
  QazaEntry,
  SunnahStatus,
} from "../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const DEFAULT_PRAYER_TIMES: Record<PrayerName, string> = {
  Fajr: "05:00",
  Dhuhr: "13:00",
  Asr: "16:30",
  Maghrib: "19:00",
  Isha: "20:30",
};

const DEFAULT_JAMAAT_TIMES: Record<PrayerName, string> = {
  Fajr: "05:15",
  Dhuhr: "13:15",
  Asr: "16:45",
  Maghrib: "19:10",
  Isha: "20:45",
};

const DEFAULT_ADVANCED_PRAYER_TIMES: Record<AdvancedPrayerName, string> = {
  Tahajjud: "03:00",
  Ishraq: "06:30",
  Chasht: "09:00",
  Awwabin: "21:00",
};

const DEFAULT_PRAYERS: Record<PrayerName, PrayerStatus> = {
  Fajr: "unmarked",
  Dhuhr: "unmarked",
  Asr: "unmarked",
  Maghrib: "unmarked",
  Isha: "unmarked",
};

const DEFAULT_ADVANCED_PRAYERS: Record<AdvancedPrayerName, PrayerStatus> = {
  Tahajjud: "unmarked",
  Ishraq: "unmarked",
  Chasht: "unmarked",
  Awwabin: "unmarked",
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: false,
  minutesBefore: 10,
  prayers: {
    Fajr: true,
    Dhuhr: true,
    Asr: true,
    Maghrib: true,
    Isha: true,
  },
};

const STORAGE_KEYS = {
  prayerTimes: "mdq_prayer_times",
  advancedPrayerTimes: "mdq_advanced_prayer_times",
  dailyLog: "mdq_daily_log",
  qazaVault: "mdq_qaza_vault",
  adaaRecords: "mdq_adaa_records",
  gracePeriod: "mdq_grace_period",
  lastResetDate: "mdq_last_reset_date",
  profileName: "mdq_profile_name",
  isNormalMode: "mdq_is_normal_mode",
  monthlyHistory: "mdq_monthly_history",
  tasbihs: "mdq_tasbihs",
  blogArticles: "mdq_blog_articles",
  jamaatTimes: "mdq_jamaat_times",
  installDate: "mdq_install_date",
  notificationSettings: "mdq_notification_settings",
};

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function initState(): AppState {
  const today = getToday();
  const lastResetDate = loadFromStorage<string>(STORAGE_KEYS.lastResetDate, "");
  const prayerTimes = loadFromStorage<Record<PrayerName, string>>(
    STORAGE_KEYS.prayerTimes,
    DEFAULT_PRAYER_TIMES,
  );
  const advancedPrayerTimes = loadFromStorage<
    Record<AdvancedPrayerName, string>
  >(STORAGE_KEYS.advancedPrayerTimes, DEFAULT_ADVANCED_PRAYER_TIMES);
  const savedDailyLog = loadFromStorage<AppState["dailyLog"]>(
    STORAGE_KEYS.dailyLog,
    null,
  );
  const qazaVault = loadFromStorage<QazaEntry[]>(STORAGE_KEYS.qazaVault, []);
  const adaaRecords = loadFromStorage<AdaaRecord[]>(
    STORAGE_KEYS.adaaRecords,
    [],
  );
  const gracePeriod = loadFromStorage<GracePeriodEntry[]>(
    STORAGE_KEYS.gracePeriod,
    [],
  );
  const profileName = loadFromStorage<string>(
    STORAGE_KEYS.profileName,
    "Muslim User",
  );
  const isNormalMode = loadFromStorage<boolean>(
    STORAGE_KEYS.isNormalMode,
    true,
  );
  const monthlyHistory = loadFromStorage<Record<string, DailyLog>>(
    STORAGE_KEYS.monthlyHistory,
    {},
  );
  const tasbihs = loadFromStorage<Record<string, number>>(
    STORAGE_KEYS.tasbihs,
    {},
  );
  const blogArticles = loadFromStorage<BlogArticle[]>(
    STORAGE_KEYS.blogArticles,
    [],
  );
  const jamaatTimes = loadFromStorage<Record<PrayerName, string>>(
    STORAGE_KEYS.jamaatTimes,
    DEFAULT_JAMAAT_TIMES,
  );
  const notificationSettings = loadFromStorage<NotificationSettings>(
    STORAGE_KEYS.notificationSettings,
    DEFAULT_NOTIFICATION_SETTINGS,
  );

  // installDate: set once and never overwrite
  let installDate = loadFromStorage<string>(STORAGE_KEYS.installDate, "");
  if (!installDate) {
    installDate = today;
    saveToStorage(STORAGE_KEYS.installDate, installDate);
  }

  let dailyLog = savedDailyLog;
  if (!dailyLog || dailyLog.date !== today) {
    dailyLog = {
      date: today,
      prayers: { ...DEFAULT_PRAYERS },
      advancedPrayers: { ...DEFAULT_ADVANCED_PRAYERS },
      sunnah: {},
      taraweeh: 0,
      nafilForms: {},
    };
  } else {
    if (!dailyLog.advancedPrayers)
      dailyLog = {
        ...dailyLog,
        advancedPrayers: { ...DEFAULT_ADVANCED_PRAYERS },
      };
    if (!dailyLog.sunnah) dailyLog = { ...dailyLog, sunnah: {} };
    if (dailyLog.taraweeh === undefined)
      dailyLog = { ...dailyLog, taraweeh: 0 };
    if (!dailyLog.nafilForms) dailyLog = { ...dailyLog, nafilForms: {} };
  }

  return {
    prayerTimes,
    advancedPrayerTimes,
    dailyLog,
    qazaVault,
    adaaRecords,
    gracePeriod,
    lastResetDate,
    profileName,
    isNormalMode,
    monthlyHistory,
    tasbihs,
    blogArticles,
    jamaatTimes,
    installDate,
    notificationSettings,
  };
}

export function useAppState() {
  const [state, setStateRaw] = useState<AppState>(initState);

  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setStateRaw((prev) => {
      const next = updater(prev);
      saveToStorage(STORAGE_KEYS.prayerTimes, next.prayerTimes);
      saveToStorage(STORAGE_KEYS.advancedPrayerTimes, next.advancedPrayerTimes);
      saveToStorage(STORAGE_KEYS.dailyLog, next.dailyLog);
      saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
      saveToStorage(STORAGE_KEYS.adaaRecords, next.adaaRecords);
      saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
      saveToStorage(STORAGE_KEYS.lastResetDate, next.lastResetDate);
      saveToStorage(STORAGE_KEYS.profileName, next.profileName);
      saveToStorage(STORAGE_KEYS.isNormalMode, next.isNormalMode);
      saveToStorage(STORAGE_KEYS.monthlyHistory, next.monthlyHistory);
      saveToStorage(STORAGE_KEYS.tasbihs, next.tasbihs);
      saveToStorage(STORAGE_KEYS.blogArticles, next.blogArticles);
      saveToStorage(STORAGE_KEYS.jamaatTimes, next.jamaatTimes);
      saveToStorage(STORAGE_KEYS.installDate, next.installDate);
      saveToStorage(
        STORAGE_KEYS.notificationSettings,
        next.notificationSettings,
      );
      return next;
    });
  }, []);

  const checkMidnightReset = useCallback(() => {
    const today = getToday();
    setStateRaw((prev) => {
      if (prev.lastResetDate === today) return prev;
      const newGracePeriod = [...prev.gracePeriod];
      const newQazaVault = [...prev.qazaVault];

      if (prev.dailyLog && prev.dailyLog.date !== today) {
        const yesterday = prev.dailyLog.date;
        const expiresAt =
          new Date(`${yesterday}T23:59:59`).getTime() + 24 * 60 * 60 * 1000;
        const expiresAtStr = new Date(expiresAt).toISOString();

        for (const p of PRAYER_NAMES) {
          if (prev.dailyLog && prev.dailyLog.prayers[p] === "unmarked") {
            newGracePeriod.push({
              id: Math.random().toString(36).slice(2),
              date: yesterday,
              prayerName: p,
              expiresAt: expiresAtStr,
            });
          }
        }

        const newHistory = {
          ...prev.monthlyHistory,
          [yesterday]: prev.dailyLog,
        };
        const newDailyLog: DailyLog = {
          date: today,
          prayers: { ...DEFAULT_PRAYERS },
          advancedPrayers: { ...DEFAULT_ADVANCED_PRAYERS },
          sunnah: {},
          taraweeh: 0,
          nafilForms: {},
        };

        const next: AppState = {
          ...prev,
          dailyLog: newDailyLog,
          gracePeriod: newGracePeriod,
          qazaVault: newQazaVault,
          monthlyHistory: newHistory,
          lastResetDate: today,
        };
        saveToStorage(STORAGE_KEYS.dailyLog, next.dailyLog);
        saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
        saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
        saveToStorage(STORAGE_KEYS.monthlyHistory, next.monthlyHistory);
        saveToStorage(STORAGE_KEYS.lastResetDate, next.lastResetDate);
        return next;
      }

      const next = { ...prev, lastResetDate: today };
      saveToStorage(STORAGE_KEYS.lastResetDate, today);
      return next;
    });
  }, []);

  const checkExpiredGrace = useCallback(() => {
    setStateRaw((prev) => {
      const now = new Date();
      const expired = prev.gracePeriod.filter(
        (e) => new Date(e.expiresAt) < now,
      );
      if (expired.length === 0) return prev;

      const newQazaVault = [...prev.qazaVault];
      for (const e of expired) {
        newQazaVault.push({
          id: Math.random().toString(36).slice(2),
          prayerName: e.prayerName,
          missedDate: e.date,
          missedTime: "",
          status: "pending",
        });
      }

      const remaining = prev.gracePeriod.filter(
        (e) => new Date(e.expiresAt) >= now,
      );
      const next = { ...prev, gracePeriod: remaining, qazaVault: newQazaVault };
      saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
      saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
      return next;
    });
  }, []);

  const markPrayer = useCallback(
    (name: PrayerName, status: PrayerStatus) => {
      setState((prev) => {
        if (!prev.dailyLog) return prev;
        const newLog = {
          ...prev.dailyLog,
          prayers: { ...prev.dailyLog.prayers, [name]: status },
        };
        return { ...prev, dailyLog: newLog };
      });
    },
    [setState],
  );

  const markAdvancedPrayer = useCallback(
    (name: AdvancedPrayerName, _status: "done") => {
      setState((prev) => {
        if (!prev.dailyLog) return prev;
        const newLog = {
          ...prev.dailyLog,
          advancedPrayers: {
            ...(prev.dailyLog.advancedPrayers ?? DEFAULT_ADVANCED_PRAYERS),
            [name]: "single" as PrayerStatus,
          },
        };
        return { ...prev, dailyLog: newLog };
      });
    },
    [setState],
  );

  const markSunnah = useCallback(
    (key: string, status: SunnahStatus) => {
      setState((prev) => {
        if (!prev.dailyLog) return prev;
        const newLog = {
          ...prev.dailyLog,
          sunnah: { ...(prev.dailyLog.sunnah ?? {}), [key]: status },
        };
        return { ...prev, dailyLog: newLog };
      });
    },
    [setState],
  );

  const markTaraweeh = useCallback(
    (count: number) => {
      setState((prev) => {
        if (!prev.dailyLog) return prev;
        const newLog = { ...prev.dailyLog, taraweeh: count };
        return { ...prev, dailyLog: newLog };
      });
    },
    [setState],
  );

  const saveNafilForm = useCallback(
    (name: AdvancedPrayerName, data: NafilFormData) => {
      setState((prev) => {
        if (!prev.dailyLog) return prev;
        const newLog = {
          ...prev.dailyLog,
          nafilForms: { ...(prev.dailyLog.nafilForms ?? {}), [name]: data },
        };
        return { ...prev, dailyLog: newLog };
      });
    },
    [setState],
  );

  const resolveQaza = useCallback(
    (id: string) => {
      setState((prev) => {
        const entry = prev.qazaVault.find((e) => e.id === id);
        if (!entry) return prev;
        const newVault = prev.qazaVault.map((e) =>
          e.id === id
            ? {
                ...e,
                status: "resolved" as const,
                resolvedAt: new Date().toISOString(),
              }
            : e,
        );
        const newAdaa: AdaaRecord[] = [
          ...prev.adaaRecords,
          {
            id: Math.random().toString(36).slice(2),
            prayerName: entry.prayerName,
            missedDate: entry.missedDate,
            resolvedAt: new Date().toISOString(),
          },
        ];
        return { ...prev, qazaVault: newVault, adaaRecords: newAdaa };
      });
    },
    [setState],
  );

  const markGracePrayer = useCallback(
    (id: string, status: "single" | "jamaat") => {
      setState((prev) => {
        const entry = prev.gracePeriod.find((e) => e.id === id);
        if (!entry) return prev;
        const remaining = prev.gracePeriod.filter((e) => e.id !== id);
        const newHistory = { ...prev.monthlyHistory };
        const dateLog = newHistory[entry.date] ?? {
          date: entry.date,
          prayers: { ...DEFAULT_PRAYERS },
        };
        newHistory[entry.date] = {
          ...dateLog,
          prayers: { ...dateLog.prayers, [entry.prayerName]: status },
        };
        return { ...prev, gracePeriod: remaining, monthlyHistory: newHistory };
      });
    },
    [setState],
  );

  const convertExpiredGraceToQaza = useCallback(
    (id: string) => {
      setState((prev) => {
        const entry = prev.gracePeriod.find((e) => e.id === id);
        if (!entry) return prev;
        const remaining = prev.gracePeriod.filter((e) => e.id !== id);
        const newVault: QazaEntry[] = [
          ...prev.qazaVault,
          {
            id: Math.random().toString(36).slice(2),
            prayerName: entry.prayerName,
            missedDate: entry.date,
            missedTime: "",
            status: "pending",
          },
        ];
        return { ...prev, gracePeriod: remaining, qazaVault: newVault };
      });
    },
    [setState],
  );

  const updatePrayerTimes = useCallback(
    (times: Record<PrayerName, string>) => {
      setState((prev) => ({ ...prev, prayerTimes: times }));
    },
    [setState],
  );

  const updateAdvancedPrayerTimes = useCallback(
    (times: Record<AdvancedPrayerName, string>) => {
      setState((prev) => ({ ...prev, advancedPrayerTimes: times }));
    },
    [setState],
  );

  const updateJamaatTimes = useCallback(
    (times: Record<PrayerName, string>) => {
      setState((prev) => ({ ...prev, jamaatTimes: times }));
    },
    [setState],
  );

  const updateNotificationSettings = useCallback(
    (settings: NotificationSettings) => {
      setState((prev) => ({ ...prev, notificationSettings: settings }));
    },
    [setState],
  );

  const updateProfile = useCallback(
    (name: string, isNormal: boolean) => {
      setState((prev) => ({
        ...prev,
        profileName: name,
        isNormalMode: isNormal,
      }));
    },
    [setState],
  );

  const updateBlogArticles = useCallback(
    (articles: BlogArticle[]) => {
      setState((prev) => ({ ...prev, blogArticles: articles }));
    },
    [setState],
  );

  const markMissingPrayer = useCallback(
    (date: string, prayer: PrayerName, status: "single" | "jamaat") => {
      setState((prev) => {
        const newHistory = { ...prev.monthlyHistory };
        const existingLog = newHistory[date];
        if (existingLog) {
          newHistory[date] = {
            ...existingLog,
            prayers: { ...existingLog.prayers, [prayer]: status },
          };
        } else {
          newHistory[date] = {
            date,
            prayers: {
              Fajr: "unmarked",
              Dhuhr: "unmarked",
              Asr: "unmarked",
              Maghrib: "unmarked",
              Isha: "unmarked",
              [prayer]: status,
            },
          };
        }
        return { ...prev, monthlyHistory: newHistory };
      });
    },
    [setState],
  );

  return {
    state,
    checkMidnightReset,
    checkExpiredGrace,
    markPrayer,
    markAdvancedPrayer,
    resolveQaza,
    markGracePrayer,
    convertExpiredGraceToQaza,
    updatePrayerTimes,
    updateAdvancedPrayerTimes,
    updateJamaatTimes,
    updateNotificationSettings,
    updateProfile,
    markSunnah,
    markTaraweeh,
    saveNafilForm,
    updateBlogArticles,
    markMissingPrayer,
  };
}
