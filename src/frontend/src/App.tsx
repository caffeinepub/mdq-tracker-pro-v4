import { useCallback, useEffect, useRef, useState } from "react";
import { AdaaRecords } from "./components/mdq/AdaaRecords";
import { BlogMode } from "./components/mdq/BlogMode";
import { BottomNav } from "./components/mdq/BottomNav";
import { DateClockStrip } from "./components/mdq/DateClockStrip";
import { DuaenModal } from "./components/mdq/DuaenModal";
import { GracePeriod } from "./components/mdq/GracePeriod";
import { Header } from "./components/mdq/Header";
import { HistoryPage } from "./components/mdq/HistoryPage";
import { Home } from "./components/mdq/Home";
import { MonthlyAnalysis } from "./components/mdq/MonthlyAnalysis";
import { QazaVault } from "./components/mdq/QazaVault";
import { Settings } from "./components/mdq/Settings";
import { SplashScreen } from "./components/mdq/SplashScreen";
import { Toast } from "./components/mdq/Toast";
import { useAppState } from "./hooks/useAppState";
import type {
  AdvancedPrayerName,
  PrayerName,
  PrayerStatus,
  TabName,
} from "./types";

function getMaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const malePriority = [
    (v: SpeechSynthesisVoice) =>
      v.lang.startsWith("ur") && v.name.toLowerCase().includes("male"),
    (v: SpeechSynthesisVoice) =>
      v.lang.startsWith("hi") && v.name.toLowerCase().includes("male"),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("ur"),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("hi"),
    (v: SpeechSynthesisVoice) =>
      !v.name.toLowerCase().includes("female") &&
      !v.name.toLowerCase().includes("woman") &&
      !v.name.toLowerCase().includes("girl") &&
      !v.name.toLowerCase().includes("zira") &&
      !v.name.toLowerCase().includes("victoria") &&
      !v.name.toLowerCase().includes("karen") &&
      !v.name.toLowerCase().includes("samantha") &&
      !v.name.toLowerCase().includes("moira") &&
      !v.name.toLowerCase().includes("tessa"),
  ];
  for (const matcher of malePriority) {
    const found = voices.find(matcher);
    if (found) return found;
  }
  return voices[0] ?? null;
}

function speak(text: string) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ur-PK";
    utter.rate = 0.85;
    utter.pitch = 0.9;
    utter.volume = 1.0;
    const trySpeak = () => {
      const voice = getMaleVoice();
      if (voice) utter.voice = voice;
      window.speechSynthesis.speak(utter);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        trySpeak();
      };
    } else {
      trySpeak();
    }
  } catch {
    // Speech synthesis not available
  }
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [toast, setToast] = useState({ message: "", visible: false, id: "" });
  const [duaenOpen, setDuaenOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
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
    updateProfile,
    incrementTasbih,
    resetTasbih,
    updateBlogArticles,
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
      if (status === "jamaat") {
        speak("Alhamdulillah");
        showToast("MaashaAllah, Alhamdulillah bol kar niyat bandhein. 🤲");
      } else if (status === "single") {
        speak("Allah qabool farmaye");
        showToast("Taqabbal Allah, Agli baar InshaAllah Jamaat se. 🌙");
      } else if (status === "qaza") {
        speak("InshaAllah");
        showToast("Qaza Ada Karein, InshaAllah agli baar chhutne na paaye. ⏰");
      }
    },
    [markPrayer, showToast],
  );

  const handleResolveQaza = useCallback(
    (id: string) => {
      resolveQaza(id);
      speak("Alhamdulillah");
      showToast("MaashaAllah! Qaza Ada Ho Gayi. Allah Qabool Farmaye. ✓");
    },
    [resolveQaza, showToast],
  );

  const handleMarkGrace = useCallback(
    (id: string, status: "single" | "jamaat") => {
      markGracePrayer(id, status);
      if (status === "jamaat") {
        speak("Alhamdulillah");
        showToast("MaashaAllah, Alhamdulillah bol kar niyat bandhein. 🤲");
      } else {
        speak("Allah qabool farmaye");
        showToast("Taqabbal Allah, Agli baar InshaAllah Jamaat se. 🌙");
      }
    },
    [markGracePrayer, showToast],
  );

  const handleConvertToQaza = useCallback(
    (id: string) => {
      convertExpiredGraceToQaza(id);
      showToast("Qaza Vault mein add kar diya gaya. InshaAllah ada karein. 📋");
    },
    [convertExpiredGraceToQaza, showToast],
  );

  const handleMarkAdvanced = useCallback(
    (name: AdvancedPrayerName, status: "single" | "jamaat") => {
      markAdvancedPrayer(name, status);
      speak("Alhamdulillah");
      showToast(`MaashaAllah! ${name} ada ho gayi. Allah Qabool Farmaye. 🤲`);
    },
    [markAdvancedPrayer, showToast],
  );

  const graceBadge = state.gracePeriod.length;

  const tabTitles: Record<TabName, string> = {
    home: "Daily Dashboard",
    qaza: "Qaza Vault",
    adaa: "Adaa Records",
    grace: "Grace Period",
    settings: "Settings",
    analysis: "Monthly Analysis",
    history: "Prayer History",
    blog: "Islamic Blog",
  };

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <Home
            state={state}
            onMark={handleMarkPrayer}
            onMarkAdvanced={handleMarkAdvanced}
            onIncrementTasbih={incrementTasbih}
            onResetTasbih={resetTasbih}
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
          <GracePeriod
            entries={state.gracePeriod}
            onMark={handleMarkGrace}
            onConvertToQaza={handleConvertToQaza}
          />
        );
      case "settings":
        return (
          <Settings
            prayerTimes={state.prayerTimes}
            advancedPrayerTimes={state.advancedPrayerTimes}
            onSave={(times, advancedTimes) => {
              updatePrayerTimes(times);
              updateAdvancedPrayerTimes(advancedTimes);
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
    }
  };

  return (
    <>
      {/* Splash Screen -- shown every time */}
      {!splashDone && <SplashScreen onEnter={() => setSplashDone(true)} />}

      {/* Main App */}
      <div className="min-h-screen" style={{ background: "#F4F7F6" }}>
        <div
          className="mx-auto max-w-[430px] min-h-screen relative flex flex-col"
          style={{ background: "#F4F7F6" }}
        >
          {/* Fixed Header */}
          <Header
            profileName={state.profileName}
            isNormalMode={state.isNormalMode}
            onProfileUpdate={updateProfile}
            onOpenDuaen={() => setDuaenOpen(true)}
          />

          {/* Fixed sub-header: DateClockStrip + tab title */}
          <div
            className="fixed top-14 left-0 right-0 z-40"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <div className="mx-auto max-w-[430px]">
              {/* Date + Clock + Hijri strip */}
              <DateClockStrip />
              {/* Tab title */}
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

          {/* Main content -- padded for header + strip + tab title */}
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
    </>
  );
}
