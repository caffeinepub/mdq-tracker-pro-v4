import { useCallback, useEffect, useRef, useState } from "react";
import { AdaaRecords } from "./components/mdq/AdaaRecords";
import { BlogMode } from "./components/mdq/BlogMode";
import { BottomNav } from "./components/mdq/BottomNav";
import { DateClockStrip } from "./components/mdq/DateClockStrip";
import { DuaPage } from "./components/mdq/DuaPage";
import { DuaenModal } from "./components/mdq/DuaenModal";
import { Header } from "./components/mdq/Header";
import { HistoryPage } from "./components/mdq/HistoryPage";
import { Home } from "./components/mdq/Home";
import { JournalPage } from "./components/mdq/JournalPage";
import { MissingPage } from "./components/mdq/MissingPage";
import { MonthlyAnalysis } from "./components/mdq/MonthlyAnalysis";
import { NotificationOverlay } from "./components/mdq/NotificationOverlay";
import { QazaVault } from "./components/mdq/QazaVault";
import { Settings } from "./components/mdq/Settings";
import { SplashScreen } from "./components/mdq/SplashScreen";
import { TasbihPage } from "./components/mdq/TasbihPage";
import { Toast } from "./components/mdq/Toast";
import { useAppState } from "./hooks/useAppState";
import type {
  AdvancedPrayerName,
  NafilFormData,
  PrayerName,
  PrayerStatus,
  SunnahStatus,
  TabName,
} from "./types";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function timeStrToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTimeStr(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const hh = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
}

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [toast, setToast] = useState({ message: "", visible: false, id: "" });
  const [duaenOpen, setDuaenOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<{
    prayerName: string;
    timeStr: string;
    minutesBefore: number;
  } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const {
    state,
    checkMidnightReset,
    checkExpiredGrace,
    markPrayer,
    markAdvancedPrayer,
    resolveQaza,
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
  } = useAppState();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  useEffect(() => {
    checkMidnightReset();
    checkExpiredGrace();
    const interval = setInterval(() => {
      checkMidnightReset();
      checkExpiredGrace();
    }, 30_000);
    return () => clearInterval(interval);
  }, [checkMidnightReset, checkExpiredGrace]);

  // Notification scheduler
  useEffect(() => {
    for (const t of notifTimers.current) clearTimeout(t);
    notifTimers.current = [];

    if (!state.notificationSettings.enabled) return;

    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();

    for (const prayer of PRAYER_NAMES) {
      if (!state.notificationSettings.prayers[prayer]) continue;
      const prayerMins = timeStrToMinutes(state.prayerTimes[prayer]);
      const triggerMins = prayerMins - state.notificationSettings.minutesBefore;
      const delayMs = (triggerMins - nowMins) * 60 * 1000;
      if (delayMs <= 0) continue;
      const timer = setTimeout(() => {
        setActiveNotification({
          prayerName: prayer,
          timeStr: minutesToTimeStr(prayerMins),
          minutesBefore: state.notificationSettings.minutesBefore,
        });
      }, delayMs);
      notifTimers.current.push(timer);
    }

    return () => {
      for (const t of notifTimers.current) clearTimeout(t);
      notifTimers.current = [];
    };
  }, [state.prayerTimes, state.notificationSettings]);

  const showToast = useCallback((message: string) => {
    const id = generateId();
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, visible: true, id });
    toastTimer.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  }, []);

  const handleDismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleMarkPrayer = useCallback(
    (name: PrayerName, status: PrayerStatus) => {
      markPrayer(name, status);
      if (status === "jamaat")
        showToast("MaashaAllah, Alhamdulillah! Jamaat ke saath ada ki. 🤲");
      else if (status === "single")
        showToast("Taqabbal Allah. Agli baar InshaAllah Jamaat se. 🌙");
      else if (status === "qaza")
        showToast("Qaza Ada Karein, InshaAllah agli baar chhutne na paaye. ⏰");
    },
    [markPrayer, showToast],
  );

  const handleMarkSunnah = useCallback(
    (key: string, status: SunnahStatus) => {
      markSunnah(key, status);
      if (status === "done") showToast("Alhamdulillah! Sunnah ada ho gayi. ✨");
    },
    [markSunnah, showToast],
  );

  const handleMarkTaraweeh = useCallback(
    (count: number) => {
      markTaraweeh(count);
      showToast(`MaashaAllah! ${count} Rakat Taraweeh ada ki. 🌙`);
    },
    [markTaraweeh, showToast],
  );

  const handleMarkNafil = useCallback(
    (name: AdvancedPrayerName, status: "done") => {
      markAdvancedPrayer(name, status);
      showToast(`Alhamdulillah! ${name} ada ho gayi. Allah Qabool Farmaye. 🤲`);
    },
    [markAdvancedPrayer, showToast],
  );

  const handleSaveNafilForm = useCallback(
    (name: AdvancedPrayerName, data: NafilFormData) => {
      saveNafilForm(name, data);
    },
    [saveNafilForm],
  );

  const handleResolveQaza = useCallback(
    (id: string) => {
      resolveQaza(id);
      showToast("MaashaAllah! Qaza Ada Ho Gayi. Allah Qabool Farmaye. ✓");
    },
    [resolveQaza, showToast],
  );

  const handleMarkMissing = useCallback(
    (date: string, prayer: PrayerName, status: "single" | "jamaat") => {
      markMissingPrayer(date, prayer, status);
      showToast(`Alhamdulillah! ${prayer} fix ho gayi. 🤲`);
    },
    [markMissingPrayer, showToast],
  );

  const graceBadge = state.gracePeriod.length;

  const tabTitles: Record<TabName, string> = {
    home: "Daily Dashboard",
    qaza: "Qaza Vault",
    adaa: "Adaa Records",
    grace: "Chhuti Hui Namazein",
    settings: "Settings",
    analysis: "Monthly Analysis",
    history: "Prayer History",
    blog: "Islamic Blog",
    dua: "Dua Mode",
    tasbih: "Tasbih Mode",
    journal: "Daily Write",
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            state={state}
            onMark={handleMarkPrayer}
            onMarkSunnah={handleMarkSunnah}
            onMarkTaraweeh={handleMarkTaraweeh}
            onMarkNafil={handleMarkNafil}
            onSaveNafilForm={handleSaveNafilForm}
            onNavigate={setActiveTab}
          />
        );
      case "qaza":
        return (
          <QazaVault entries={state.qazaVault} onResolve={handleResolveQaza} />
        );
      case "adaa":
        return <AdaaRecords records={state.adaaRecords} />;
      case "grace":
        return (
          <MissingPage
            installDate={state.installDate}
            monthlyHistory={state.monthlyHistory}
            onMarkMissing={handleMarkMissing}
          />
        );
      case "settings":
        return (
          <Settings
            prayerTimes={state.prayerTimes}
            advancedPrayerTimes={state.advancedPrayerTimes}
            jamaatTimes={state.jamaatTimes}
            notificationSettings={state.notificationSettings}
            onSave={(times, advancedTimes, jTimes, notifSettings) => {
              updatePrayerTimes(times);
              updateAdvancedPrayerTimes(advancedTimes);
              updateJamaatTimes(jTimes);
              updateNotificationSettings(notifSettings);
            }}
          />
        );
      case "analysis":
        return (
          <MonthlyAnalysis
            monthlyHistory={state.monthlyHistory}
            qazaVault={state.qazaVault}
            adaaRecords={state.adaaRecords}
          />
        );
      case "history":
        return <HistoryPage monthlyHistory={state.monthlyHistory} />;
      case "blog":
        return (
          <BlogMode
            articles={state.blogArticles}
            onUpdate={updateBlogArticles}
          />
        );
      case "dua":
        return <DuaPage />;
      case "tasbih":
        return <TasbihPage />;
      case "journal":
        return <JournalPage />;
    }
  };

  return (
    <>
      {!splashDone && <SplashScreen onEnter={() => setSplashDone(true)} />}
      <div className="min-h-screen" style={{ background: "#F4F7F6" }}>
        <div
          className="mx-auto max-w-[430px] min-h-screen relative flex flex-col"
          style={{ background: "#F4F7F6" }}
        >
          <Header
            profileName={state.profileName}
            isNormalMode={state.isNormalMode}
            onProfileUpdate={updateProfile}
            onOpenDuaen={() => setDuaenOpen(true)}
          />

          <div
            className="fixed top-14 left-0 right-0 z-40"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <div className="mx-auto max-w-[430px]">
              <DateClockStrip />
              <div
                style={{
                  background: "rgba(244,247,246,0.97)",
                  borderBottom: "1px solid rgba(212,175,55,0.08)",
                  padding: "4px 16px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "rgba(184,148,30,0.5)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {tabTitles[activeTab]}
                </p>
              </div>
            </div>
          </div>

          <main
            className="flex-1 overflow-y-auto px-4 pb-24"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 118px)",
            }}
          >
            {renderTab()}
          </main>

          <BottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            graceBadge={graceBadge}
          />
          <Toast
            message={toast.message}
            visible={toast.visible}
            onDismiss={handleDismissToast}
          />
          <DuaenModal open={duaenOpen} onClose={() => setDuaenOpen(false)} />
        </div>
      </div>

      {/* Mid-screen Notification Overlay */}
      {activeNotification && (
        <NotificationOverlay
          prayerName={activeNotification.prayerName}
          timeStr={activeNotification.timeStr}
          minutesBefore={activeNotification.minutesBefore}
          onDismiss={() => setActiveNotification(null)}
        />
      )}
    </>
  );
}
