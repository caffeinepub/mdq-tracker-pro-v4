import type {
  AdvancedPrayerName,
  AppState,
  NafilFormData,
  PrayerName,
  PrayerStatus,
  SunnahStatus,
} from "../../types";
import type { TabName } from "../../types";
import { ActionButtons } from "./ActionButtons";
import { AnalysisCircles } from "./AnalysisCircles";
import { NafilSection } from "./NafilSection";
import { PrayerCard } from "./PrayerCard";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function useStreak(state: AppState): number {
  const today = new Date().toISOString().slice(0, 10);
  const prayers = state.dailyLog?.prayers ?? {};
  const allFarzDoneToday = PRAYER_NAMES.every(
    (p) => prayers[p] === "jamaat" || prayers[p] === "single",
  );

  let streak = 0;
  // Check yesterday and go back
  let checkDate = new Date();
  checkDate.setDate(checkDate.getDate() - 1);

  for (let i = 0; i < 365; i++) {
    const dateKey = checkDate.toISOString().slice(0, 10);
    const dayLog = state.monthlyHistory[dateKey];
    if (!dayLog) break;
    const allDone = PRAYER_NAMES.every(
      (p) => dayLog.prayers[p] === "jamaat" || dayLog.prayers[p] === "single",
    );
    if (!allDone) break;
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // If today all 5 done, include today
  if (allFarzDoneToday) streak++;

  // suppress unused variable lint
  void today;

  return streak;
}

interface HomeProps {
  state: AppState;
  onMark: (name: PrayerName, status: PrayerStatus) => void;
  onMarkSunnah: (key: string, status: SunnahStatus) => void;
  onMarkTaraweeh: (count: number) => void;
  onMarkNafil: (name: AdvancedPrayerName, status: "done") => void;
  onSaveNafilForm: (name: AdvancedPrayerName, data: NafilFormData) => void;
  onNavigate: (tab: TabName) => void;
}

export function Home({
  state,
  onMark,
  onMarkSunnah,
  onMarkTaraweeh,
  onMarkNafil,
  onSaveNafilForm,
  onNavigate,
}: HomeProps) {
  const prayers =
    state.dailyLog?.prayers ??
    ({
      Fajr: "unmarked",
      Dhuhr: "unmarked",
      Asr: "unmarked",
      Maghrib: "unmarked",
      Isha: "unmarked",
    } as Record<PrayerName, PrayerStatus>);

  const sunnahData = state.dailyLog?.sunnah ?? {};
  const taraweeh = state.dailyLog?.taraweeh ?? 0;
  const nafilForms = state.dailyLog?.nafilForms ?? {};
  const advancedPrayers =
    state.dailyLog?.advancedPrayers ??
    ({} as Record<AdvancedPrayerName, PrayerStatus>);

  const streak = useStreak(state);

  return (
    <div className="space-y-4">
      {/* Analysis Circles */}
      <AnalysisCircles state={state} />

      {/* Streak Card */}
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{
          background:
            streak >= 3
              ? "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(201,168,76,0.06) 100%)"
              : "rgba(255,255,255,0.7)",
          border:
            streak >= 3
              ? "1px solid rgba(212,175,55,0.3)"
              : "1px solid rgba(0,0,0,0.06)",
          boxShadow: streak >= 3 ? "0 2px 12px rgba(212,175,55,0.15)" : "none",
        }}
      >
        <span style={{ fontSize: "22px" }}>🔥</span>
        <div className="flex-1">
          {streak === 0 ? (
            <p
              className="text-xs"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Aaj se shuru karein! 💪
            </p>
          ) : (
            <>
              <p
                className="text-xs font-bold shimmer-gold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {streak} Din ka Streak
              </p>
              {streak >= 7 && (
                <p
                  className="text-[10px]"
                  style={{
                    color: "#059669",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  MaashaAllah! Ek hafte ka streak 🌟
                </p>
              )}
            </>
          )}
        </div>
        {streak > 0 && (
          <div
            className="px-2.5 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #C9A84C)",
            }}
          >
            <span
              className="text-[10px] font-bold"
              style={{ color: "white", fontFamily: "'Poppins', sans-serif" }}
            >
              {streak}🔥
            </span>
          </div>
        )}
      </div>

      {/* 4 Action Buttons */}
      <ActionButtons onNavigate={onNavigate} />

      {/* Section heading */}
      <div className="flex items-center gap-2 px-1">
        <div
          style={{
            height: "1px",
            flex: 1,
            background:
              "linear-gradient(90deg,rgba(184,148,30,0.3),transparent)",
          }}
        />
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{
            color: "rgba(184,148,30,0.6)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          🕌 Panch Waqt ki Namazein
        </p>
        <div
          style={{
            height: "1px",
            flex: 1,
            background:
              "linear-gradient(270deg,rgba(184,148,30,0.3),transparent)",
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
            sunnahData={sunnahData}
            taraweeh={taraweeh}
            onMark={onMark}
            onMarkSunnah={onMarkSunnah}
            onMarkTaraweeh={onMarkTaraweeh}
            index={i}
          />
        ))}
      </div>

      {/* Nafil Section */}
      <NafilSection
        advancedPrayers={advancedPrayers}
        nafilForms={nafilForms}
        onMarkNafil={onMarkNafil}
        onSaveNafilForm={onSaveNafilForm}
      />

      {/* Motivational footer */}
      <div className="text-center py-2">
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
          © {new Date().getFullYear()} • Crafted with ❤ by{" "}
          <span className="shimmer-gold font-bold">MDQ</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
