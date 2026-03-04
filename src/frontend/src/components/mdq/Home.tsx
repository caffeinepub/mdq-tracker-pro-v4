import type { AppState, PrayerName, PrayerStatus } from "../../types";
import { getHijriDate, toArabicIndic } from "../../utils/hijri";
import { CircularProgress } from "./CircularProgress";
import { PrayerCard } from "./PrayerCard";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

interface HomeProps {
  state: AppState;
  onMark: (name: PrayerName, status: PrayerStatus) => void;
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

export function Home({ state, onMark }: HomeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const prayers = state.dailyLog?.prayers ?? {
    Fajr: "unmarked",
    Dhuhr: "unmarked",
    Asr: "unmarked",
    Maghrib: "unmarked",
    Isha: "unmarked",
  };

  const jamaatCount = PRAYER_NAMES.filter(
    (p) => prayers[p] === "jamaat",
  ).length;
  const markedCount = PRAYER_NAMES.filter(
    (p) => prayers[p] !== "unmarked",
  ).length;

  return (
    <div className="space-y-4">
      {/* Premium Date & Greeting Card */}
      {(() => {
        const hijri = getHijriDate();
        return (
          <div
            className="glass-premium rounded-2xl p-5"
            style={{
              border: "1px solid rgba(212,175,55,0.25)",
              boxShadow:
                "0 8px 32px rgba(212,175,55,0.08), 0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            {/* Gregorian date — small, uppercase */}
            <p className="text-[10px] text-white/35 uppercase tracking-[0.3em] text-center mb-3">
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

            {/* Hijri Arabic — BIG & prominent */}
            <p
              className="text-center shimmer-gold mb-1"
              style={{
                fontSize: "2rem",
                fontFamily:
                  "'Georgia', 'Palatino Linotype', 'Times New Roman', serif",
                fontWeight: "700",
                direction: "rtl",
                lineHeight: "1.7",
                textShadow:
                  "0 0 24px rgba(212,175,55,0.4), 0 0 48px rgba(212,175,55,0.15)",
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
                color: "rgba(212,175,55,0.65)",
                letterSpacing: "0.05em",
              }}
            >
              {hijri.day} {hijri.monthUrdu} {hijri.year} AH
            </p>

            {/* Gold divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
                marginBottom: "12px",
              }}
            />

            {/* Greeting */}
            <p className="text-center text-sm font-medium text-white/70 tracking-wide">
              {getGreeting()}
            </p>
          </div>
        );
      })()}

      {/* Circular Progress */}
      <div
        className="glass rounded-2xl p-4"
        style={{ border: "1px solid rgba(212,175,55,0.15)" }}
      >
        <CircularProgress count={jamaatCount} total={5} />
        {/* Progress summary */}
        <div
          className="grid grid-cols-3 gap-3 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-center">
            <p className="text-xs text-white/30 mb-1">Marked</p>
            <p className="font-bold text-lg text-white">{markedCount}/5</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/30 mb-1">Jamaat</p>
            <p className="font-bold text-lg emerald-text">{jamaatCount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/30 mb-1">Remaining</p>
            <p
              className="font-bold text-lg"
              style={{ color: 5 - markedCount > 0 ? "#D4AF37" : "#10b981" }}
            >
              {5 - markedCount}
            </p>
          </div>
        </div>
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

      {/* Motivational footer */}
      <div className="text-center py-4">
        <p className="text-xs text-white/25 italic">
          &quot;Verily, Salah is prescribed for the believers at fixed
          times.&quot; (4:103)
        </p>
      </div>

      {/* Branding */}
      <div className="text-center pb-6">
        <p className="text-[10px] text-white/15">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/30 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export default Home;
