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

  return (
    <div className="space-y-4">
      {/* Analysis Circles */}
      <AnalysisCircles state={state} />

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
