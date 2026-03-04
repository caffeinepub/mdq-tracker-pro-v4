import { useCallback, useEffect, useRef, useState } from "react";
import { AdaaRecords } from "./components/mdq/AdaaRecords";
import { BottomNav } from "./components/mdq/BottomNav";
import { DuaenModal } from "./components/mdq/DuaenModal";
import { GracePeriod } from "./components/mdq/GracePeriod";
import { Header } from "./components/mdq/Header";
import { Home } from "./components/mdq/Home";
import { MonthlyAnalysis } from "./components/mdq/MonthlyAnalysis";
import { QazaVault } from "./components/mdq/QazaVault";
import { Settings } from "./components/mdq/Settings";
import { Toast } from "./components/mdq/Toast";
import { useAppState } from "./hooks/useAppState";
import type { PrayerName, PrayerStatus, TabName } from "./types";

function getMaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  // Priority order: Urdu male, Hindi male, any male, fallback
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

    // Voices may not be loaded yet — wait if needed
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
  const [activeTab, setActiveTab] = useState<TabName>("home");
  const [toast, setToast] = useState({ message: "", visible: false, id: "" });
  const [duaenOpen, setDuaenOpen] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    state,
    checkMidnightReset,
    checkExpiredGrace,
    markPrayer,
    resolveQaza,
    markGracePrayer,
    convertExpiredGraceToQaza,
    updatePrayerTimes,
    updateProfile,
  } = useAppState();

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed, continue without it
      });
    }
  }, []);

  // Midnight reset check — runs every 30 seconds
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

  const graceBadge = state.gracePeriod.length;

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <Home state={state} onMark={handleMarkPrayer} />;
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
            onSave={updatePrayerTimes}
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
    }
  };

  const tabTitles: Record<TabName, string> = {
    home: "Daily Dashboard",
    qaza: "Qaza Vault",
    adaa: "Adaa Records",
    grace: "Grace Period",
    settings: "Settings",
    analysis: "Monthly Analysis",
  };

  return (
    <div
      className="min-h-screen star-bg"
      style={{
        background: "#0a0f1e",
        backgroundImage:
          "radial-gradient(ellipse at 20% 10%, rgba(212,175,55,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 85%, rgba(16,185,129,0.04) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.02) 0%, transparent 60%)",
      }}
    >
      {/* Centered container for desktop */}
      <div
        className="mx-auto max-w-[430px] min-h-screen relative flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(12,18,32,0.97) 0%, rgba(10,15,30,0.98) 35%, rgba(9,16,24,0.99) 100%)",
        }}
      >
        {/* Decorative floating star dots */}
        <div className="pointer-events-none fixed inset-0 max-w-[430px] mx-auto overflow-hidden z-0">
          {[
            {
              top: "8%",
              left: "12%",
              size: 2,
              delay: "0s",
              dur: "8s",
              color: "rgba(212,175,55,0.5)",
            },
            {
              top: "15%",
              left: "78%",
              size: 1.5,
              delay: "1.5s",
              dur: "11s",
              color: "rgba(255,255,255,0.4)",
            },
            {
              top: "28%",
              left: "45%",
              size: 1,
              delay: "3s",
              dur: "9s",
              color: "rgba(16,185,129,0.4)",
            },
            {
              top: "42%",
              left: "88%",
              size: 2,
              delay: "0.8s",
              dur: "13s",
              color: "rgba(212,175,55,0.5)",
            },
            {
              top: "60%",
              left: "6%",
              size: 1.5,
              delay: "2s",
              dur: "10s",
              color: "rgba(255,255,255,0.4)",
            },
            {
              top: "72%",
              left: "62%",
              size: 1,
              delay: "4s",
              dur: "7s",
              color: "rgba(16,185,129,0.4)",
            },
            {
              top: "85%",
              left: "30%",
              size: 2,
              delay: "1s",
              dur: "12s",
              color: "rgba(212,175,55,0.5)",
            },
            {
              top: "20%",
              left: "22%",
              size: 1,
              delay: "2.5s",
              dur: "9s",
              color: "rgba(255,255,255,0.4)",
            },
          ].map((star) => (
            <div
              key={`${star.top}-${star.left}`}
              style={{
                position: "absolute",
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: "50%",
                background: star.color,
                animation: `breathe ${star.dur} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
        {/* Header */}
        <Header
          profileName={state.profileName}
          isNormalMode={state.isNormalMode}
          onProfileUpdate={updateProfile}
          onOpenDuaen={() => setDuaenOpen(true)}
        />

        {/* Tab title strip */}
        <div
          className="fixed top-14 left-0 right-0 z-40"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <div
            className="mx-auto max-w-[430px] px-4 py-2"
            style={{
              background: "rgba(10,15,30,0.96)",
              borderBottom: "1px solid rgba(212,175,55,0.08)",
            }}
          >
            <p
              className="text-[10px] font-semibold uppercase text-center tracking-[0.25em]"
              style={{ color: "rgba(212,175,55,0.5)" }}
            >
              {tabTitles[activeTab]}
            </p>
          </div>
        </div>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto px-4 pb-24"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 88px)" }}
        >
          {renderTab()}
        </main>

        {/* Bottom Nav */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          graceBadge={graceBadge}
        />

        {/* Toast */}
        <Toast
          message={toast.message}
          visible={toast.visible}
          onDismiss={handleDismissToast}
        />

        {/* Duaen Modal */}
        <DuaenModal open={duaenOpen} onClose={() => setDuaenOpen(false)} />
      </div>
    </div>
  );
}
