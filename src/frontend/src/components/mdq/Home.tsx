import type {
  AdvancedPrayerName,
  AppState,
  PrayerName,
  PrayerStatus,
} from "../../types";
import { getHijriDate, toArabicIndic } from "../../utils/hijri";
import { AdvancedPrayerCard } from "./AdvancedPrayerCard";
import { CircularProgress } from "./CircularProgress";
import { PrayerCard } from "./PrayerCard";
import { TasbiHCounter } from "./TasbiHCounter";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

interface HomeProps {
  state: AppState;
  onMark: (name: PrayerName, status: PrayerStatus) => void;
  onMarkAdvanced: (
    name: AdvancedPrayerName,
    status: "single" | "jamaat",
  ) => void;
  onIncrementTasbih: () => void;
  onResetTasbih: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Assalamu Alaikum 🌅";
  if (h < 17) return "Assalamu Alaikum ☀️";
  if (h < 20) return "Assalamu Alaikum 🌇";
  return "Assalamu Alaikum 🌙";
}

export function Home({
  state,
  onMark,
  onMarkAdvanced,
  onIncrementTasbih,
  onResetTasbih,
}: HomeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const prayers = state.dailyLog?.prayers ?? {
    Fajr: "unmarked",
    Dhuhr: "unmarked",
    Asr: "unmarked",
    Maghrib: "unmarked",
    Isha: "unmarked",
  };
  const advancedPrayers = state.dailyLog?.advancedPrayers ?? {
    Tahajjud: "unmarked",
    Ishraq: "unmarked",
    Chasht: "unmarked",
    Awwabin: "unmarked",
  };

  const jamaatCount = PRAYER_NAMES.filter(
    (p) => prayers[p] === "jamaat",
  ).length;
  const markedCount = PRAYER_NAMES.filter(
    (p) => prayers[p] !== "unmarked",
  ).length;
  const todayTasbih = state.tasbihs?.[today] ?? 0;
  const isAdvancedMode = !state.isNormalMode;
  const hijri = getHijriDate();

  return (
    <div className="space-y-4">
      {/* Premium Date & Greeting Card */}
      <div
        className="rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(212,175,55,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Gregorian date */}
        <p
          className="text-[10px] uppercase tracking-[0.3em] text-center mb-3"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {formatDate(today)}
        </p>

        {/* Gold divider */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
            marginBottom: "14px",
          }}
        />

        {/* Hijri Arabic -- BIG */}
        <p
          className="text-center shimmer-gold mb-1"
          style={{
            fontSize: "2rem",
            fontFamily: "'Amiri', 'Georgia', serif",
            fontWeight: "700",
            direction: "rtl",
            lineHeight: "1.7",
            textShadow: "0 0 24px rgba(212,175,55,0.4)",
            letterSpacing: "0.04em",
          }}
        >
          {toArabicIndic(hijri.day)} {hijri.monthArabic}{" "}
          {toArabicIndic(hijri.year)}
        </p>

        {/* Hijri Roman Urdu */}
        <p
          className="text-center text-sm font-semibold mb-4"
          style={{
            color: "rgba(212,175,55,0.7)",
            letterSpacing: "0.05em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {hijri.day} {hijri.monthUrdu} {hijri.year} AH
        </p>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
            marginBottom: "12px",
          }}
        />

        {/* Greeting */}
        <p
          className="text-center text-sm font-medium tracking-wide"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {getGreeting()}
        </p>
      </div>

      {/* Circular Progress */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(212,175,55,0.12)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <CircularProgress count={jamaatCount} total={5} />
        <div
          className="grid grid-cols-3 gap-3 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="text-center">
            <p
              className="text-xs mb-1"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Marked
            </p>
            <p
              className="font-bold text-lg"
              style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
            >
              {markedCount}/5
            </p>
          </div>
          <div className="text-center">
            <p
              className="text-xs mb-1"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Jamaat
            </p>
            <p
              className="font-bold text-lg"
              style={{ color: "#059669", fontFamily: "'Poppins', sans-serif" }}
            >
              {jamaatCount}
            </p>
          </div>
          <div className="text-center">
            <p
              className="text-xs mb-1"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Remaining
            </p>
            <p
              className="font-bold text-lg"
              style={{
                color: 5 - markedCount > 0 ? "#b8941e" : "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {5 - markedCount}
            </p>
          </div>
        </div>
      </div>

      {/* Tasbih Counter */}
      <TasbiHCounter
        count={todayTasbih}
        onIncrement={onIncrementTasbih}
        onReset={onResetTasbih}
      />

      {/* Section heading */}
      <div className="flex items-center gap-2 px-1">
        <div
          style={{
            height: "1px",
            flex: 1,
            background:
              "linear-gradient(90deg, rgba(184,148,30,0.3), transparent)",
          }}
        />
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{
            color: "rgba(184,148,30,0.6)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          🕌 Farz Namazein
        </p>
        <div
          style={{
            height: "1px",
            flex: 1,
            background:
              "linear-gradient(270deg, rgba(184,148,30,0.3), transparent)",
          }}
        />
      </div>

      {/* Prayer Cards */}
      <div className="space-y-3">
        {PRAYER_NAMES.map((name, i) => (
          <PrayerCard
            key={name}
            name={name}
            time={state.prayerTimes[name]}
            status={prayers[name]}
            onMark={onMark}
            index={i}
          />
        ))}
      </div>

      {/* Advanced Mode Nafl Prayers */}
      {isAdvancedMode && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1 mt-2">
            <div
              style={{
                height: "1px",
                flex: 1,
                background:
                  "linear-gradient(90deg, rgba(16,185,129,0.3), transparent)",
              }}
            />
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{
                color: "rgba(5,150,105,0.7)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              ✨ Nafl Namazein
            </p>
            <div
              style={{
                height: "1px",
                flex: 1,
                background:
                  "linear-gradient(270deg, rgba(16,185,129,0.3), transparent)",
              }}
            />
          </div>

          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{
              background: "rgba(16,185,129,0.04)",
              border: "1px solid rgba(16,185,129,0.1)",
            }}
          >
            <p
              className="text-[10px] leading-relaxed"
              style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
            >
              Yeh namazein nafl hain — inhe padhna sawab ka bais hai.
            </p>
          </div>

          {(
            ["Tahajjud", "Ishraq", "Chasht", "Awwabin"] as AdvancedPrayerName[]
          ).map((name, i) => (
            <AdvancedPrayerCard
              key={name}
              name={name}
              time={state.advancedPrayerTimes[name]}
              status={advancedPrayers[name] ?? "unmarked"}
              onMark={onMarkAdvanced}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Motivational footer */}
      <div className="text-center py-4">
        <p
          className="text-xs italic"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          &quot;Verily, Salah is prescribed for the believers at fixed
          times.&quot; (4:103)
        </p>
      </div>

      {/* Branding */}
      <div className="text-center pb-6">
        <p
          className="text-[10px]"
          style={{ color: "#b0bec5", fontFamily: "'Poppins', sans-serif" }}
        >
          © {new Date().getFullYear()} • Crafted with ♥ by{" "}
          <span className="shimmer-gold font-bold">MDQ</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
