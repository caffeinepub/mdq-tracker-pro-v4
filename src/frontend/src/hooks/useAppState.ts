import { useCallback, useState } from "react";
import type {
  AdaaRecord,
  AppState,
  DailyLog,
  GracePeriodEntry,
  PrayerName,
  PrayerStatus,
  QazaEntry,
} from "../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const DEFAULT_PRAYER_TIMES: Record<PrayerName, string> = {
  Fajr: "05:00",
  Dhuhr: "13:00",
  Asr: "16:30",
  Maghrib: "19:00",
  Isha: "20:30",
};

const DEFAULT_PRAYERS: Record<PrayerName, PrayerStatus> = {
  Fajr: "unmarked",
  Dhuhr: "unmarked",
  Asr: "unmarked",
  Maghrib: "unmarked",
  Isha: "unmarked",
};

const STORAGE_KEYS = {
  prayerTimes: "mdq_prayer_times",
  dailyLog: "mdq_daily_log",
  qazaVault: "mdq_qaza_vault",
  adaaRecords: "mdq_adaa_records",
  gracePeriod: "mdq_grace_period",
  lastResetDate: "mdq_last_reset_date",
  profileName: "mdq_profile_name",
  isNormalMode: "mdq_is_normal_mode",
  monthlyHistory: "mdq_monthly_history",
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
    // ignore storage errors
  }
}

function initState(): AppState {
  const today = getToday();
  const lastResetDate = loadFromStorage<string>(STORAGE_KEYS.lastResetDate, "");
  const prayerTimes = loadFromStorage<Record<PrayerName, string>>(
    STORAGE_KEYS.prayerTimes,
    DEFAULT_PRAYER_TIMES,
  );
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

  // Initialize daily log for today if needed
  let dailyLog = savedDailyLog;
  if (!dailyLog || dailyLog.date !== today) {
    dailyLog = { date: today, prayers: { ...DEFAULT_PRAYERS } };
  }

  return {
    prayerTimes,
    dailyLog,
    qazaVault,
    adaaRecords,
    gracePeriod,
    lastResetDate,
    profileName,
    isNormalMode,
    monthlyHistory,
  };
}

export function useAppState() {
  const [state, setStateRaw] = useState<AppState>(initState);

  // Persist to localStorage on every change
  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setStateRaw((prev) => {
      const next = updater(prev);
      saveToStorage(STORAGE_KEYS.prayerTimes, next.prayerTimes);
      saveToStorage(STORAGE_KEYS.dailyLog, next.dailyLog);
      saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
      saveToStorage(STORAGE_KEYS.adaaRecords, next.adaaRecords);
      saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
      saveToStorage(STORAGE_KEYS.lastResetDate, next.lastResetDate);
      saveToStorage(STORAGE_KEYS.profileName, next.profileName);
      saveToStorage(STORAGE_KEYS.isNormalMode, next.isNormalMode);
      saveToStorage(STORAGE_KEYS.monthlyHistory, next.monthlyHistory);
      return next;
    });
  }, []);

  // Midnight reset logic
  const checkMidnightReset = useCallback(() => {
    const today = getToday();
    setStateRaw((prev) => {
      if (prev.lastResetDate === today) return prev;

      // Move unmarked prayers from yesterday to grace period
      const newGracePeriod = [...prev.gracePeriod];
      const newQazaVault = [...prev.qazaVault];

      if (prev.dailyLog && prev.dailyLog.date !== today) {
        const yesterday = prev.dailyLog.date;
        const expiresAt = new Date(yesterday);
        expiresAt.setDate(expiresAt.getDate() + 2); // 24h after midnight of missed date

        for (const pName of PRAYER_NAMES) {
          const status = prev.dailyLog!.prayers[pName];
          if (status === "unmarked") {
            // Check if grace period entry already exists
            const exists = newGracePeriod.some(
              (g) => g.date === yesterday && g.prayerName === pName,
            );
            if (!exists) {
              newGracePeriod.push({
                id: `${yesterday}-${pName}-${Date.now()}`,
                date: yesterday,
                prayerName: pName,
                expiresAt: expiresAt.toISOString(),
              });
            }
          }
        }
      }

      // Check expired grace period entries -> convert to qaza
      const now = new Date();
      const stillGrace: GracePeriodEntry[] = [];
      for (const entry of newGracePeriod) {
        if (new Date(entry.expiresAt) < now) {
          // Expired -> convert to qaza
          const alreadyInVault = newQazaVault.some(
            (q) =>
              q.missedDate === entry.date &&
              q.prayerName === entry.prayerName &&
              q.status === "pending",
          );
          if (!alreadyInVault) {
            newQazaVault.push({
              id: `qaza-${entry.date}-${entry.prayerName}-${Date.now()}`,
              prayerName: entry.prayerName,
              missedDate: entry.date,
              missedTime: prev.prayerTimes[entry.prayerName],
              status: "pending",
            });
          }
        } else {
          stillGrace.push(entry);
        }
      }

      // Save previous day to monthly history
      const newMonthlyHistory = { ...prev.monthlyHistory };
      if (prev.dailyLog && prev.dailyLog.date !== today) {
        newMonthlyHistory[prev.dailyLog.date] = prev.dailyLog;
      }

      const next: AppState = {
        ...prev,
        dailyLog: { date: today, prayers: { ...DEFAULT_PRAYERS } },
        gracePeriod: stillGrace,
        qazaVault: newQazaVault,
        lastResetDate: today,
        monthlyHistory: newMonthlyHistory,
      };

      // Persist immediately
      saveToStorage(STORAGE_KEYS.dailyLog, next.dailyLog);
      saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
      saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
      saveToStorage(STORAGE_KEYS.lastResetDate, next.lastResetDate);
      saveToStorage(STORAGE_KEYS.monthlyHistory, next.monthlyHistory);

      return next;
    });
  }, []);

  // Check for expired grace entries periodically
  const checkExpiredGrace = useCallback(() => {
    setStateRaw((prev) => {
      const now = new Date();
      const stillGrace: GracePeriodEntry[] = [];
      const newQazaVault = [...prev.qazaVault];

      for (const entry of prev.gracePeriod) {
        if (new Date(entry.expiresAt) < now) {
          const alreadyInVault = newQazaVault.some(
            (q) =>
              q.missedDate === entry.date &&
              q.prayerName === entry.prayerName &&
              q.status === "pending",
          );
          if (!alreadyInVault) {
            newQazaVault.push({
              id: `qaza-${entry.date}-${entry.prayerName}-${Date.now()}`,
              prayerName: entry.prayerName,
              missedDate: entry.date,
              missedTime: prev.prayerTimes[entry.prayerName],
              status: "pending",
            });
          }
        } else {
          stillGrace.push(entry);
        }
      }

      if (
        stillGrace.length === prev.gracePeriod.length &&
        newQazaVault.length === prev.qazaVault.length
      ) {
        return prev; // no change
      }

      const next = {
        ...prev,
        gracePeriod: stillGrace,
        qazaVault: newQazaVault,
      };
      saveToStorage(STORAGE_KEYS.gracePeriod, next.gracePeriod);
      saveToStorage(STORAGE_KEYS.qazaVault, next.qazaVault);
      return next;
    });
  }, []);

  // Mark a prayer
  const markPrayer = useCallback(
    (prayerName: PrayerName, status: PrayerStatus) => {
      const today = getToday();
      setState((prev) => {
        const currentLog = prev.dailyLog ?? {
          date: today,
          prayers: { ...DEFAULT_PRAYERS },
        };
        const newPrayers = { ...currentLog.prayers, [prayerName]: status };
        const newLog = { date: today, prayers: newPrayers };
        const newQazaVault = [...prev.qazaVault];

        if (status === "qaza") {
          const alreadyIn = newQazaVault.some(
            (q) =>
              q.missedDate === today &&
              q.prayerName === prayerName &&
              q.status === "pending",
          );
          if (!alreadyIn) {
            newQazaVault.push({
              id: `qaza-${today}-${prayerName}-${Date.now()}`,
              prayerName,
              missedDate: today,
              missedTime: prev.prayerTimes[prayerName],
              status: "pending",
            });
          }
        }

        return { ...prev, dailyLog: newLog, qazaVault: newQazaVault };
      });
    },
    [setState],
  );

  // Resolve a qaza entry (Adaa done)
  const resolveQaza = useCallback(
    (qazaId: string) => {
      const resolvedAt = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      setState((prev) => {
        const entry = prev.qazaVault.find((q) => q.id === qazaId);
        if (!entry) return prev;

        const updatedVault = prev.qazaVault.map((q) =>
          q.id === qazaId
            ? { ...q, status: "resolved" as const, resolvedAt }
            : q,
        );

        const newAdaaRecord: AdaaRecord = {
          id: `adaa-${qazaId}-${Date.now()}`,
          prayerName: entry.prayerName,
          missedDate: entry.missedDate,
          resolvedAt,
        };

        return {
          ...prev,
          qazaVault: updatedVault,
          adaaRecords: [newAdaaRecord, ...prev.adaaRecords],
        };
      });
    },
    [setState],
  );

  // Mark grace period prayer
  const markGracePrayer = useCallback(
    (entryId: string, _status: "single" | "jamaat") => {
      setState((prev) => {
        const newGrace = prev.gracePeriod.filter((g) => g.id !== entryId);
        return { ...prev, gracePeriod: newGrace };
      });
    },
    [setState],
  );

  // Convert expired grace to qaza
  const convertExpiredGraceToQaza = useCallback(
    (entryId: string) => {
      setState((prev) => {
        const entry = prev.gracePeriod.find((g) => g.id === entryId);
        if (!entry) return prev;

        const newGrace = prev.gracePeriod.filter((g) => g.id !== entryId);
        const alreadyInVault = prev.qazaVault.some(
          (q) =>
            q.missedDate === entry.date &&
            q.prayerName === entry.prayerName &&
            q.status === "pending",
        );

        const newQazaVault = alreadyInVault
          ? prev.qazaVault
          : [
              ...prev.qazaVault,
              {
                id: `qaza-${entry.date}-${entry.prayerName}-${Date.now()}`,
                prayerName: entry.prayerName,
                missedDate: entry.date,
                missedTime: prev.prayerTimes[entry.prayerName],
                status: "pending" as const,
              },
            ];

        return { ...prev, gracePeriod: newGrace, qazaVault: newQazaVault };
      });
    },
    [setState],
  );

  // Update prayer times
  const updatePrayerTimes = useCallback(
    (times: Record<PrayerName, string>) => {
      setState((prev) => ({ ...prev, prayerTimes: times }));
    },
    [setState],
  );

  // Update profile
  const updateProfile = useCallback(
    (name: string, isNormalMode: boolean) => {
      setState((prev) => ({ ...prev, profileName: name, isNormalMode }));
    },
    [setState],
  );

  return {
    state,
    checkMidnightReset,
    checkExpiredGrace,
    markPrayer,
    resolveQaza,
    markGracePrayer,
    convertExpiredGraceToQaza,
    updatePrayerTimes,
    updateProfile,
  };
}
