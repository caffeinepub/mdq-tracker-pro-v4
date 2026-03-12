import { useState } from "react";
import type { AdvancedPrayerName, AppState, PrayerName } from "../../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const NAFIL_NAMES: AdvancedPrayerName[] = [
  "Tahajjud",
  "Ishraq",
  "Chasht",
  "Awwabin",
];

function Ring({
  size = 80,
  strokeWidth = 7,
  percent = 0,
  color = "#10b981",
  bg = "rgba(0,0,0,0.07)",
  label = "Progress ring",
  children,
}: {
  size?: number;
  strokeWidth?: number;
  percent?: number;
  color?: string;
  bg?: string;
  label?: string;
  children?: React.ReactNode;
}) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)" }}
      role="img"
      aria-label={label}
    >
      <title>{label}</title>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={bg}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <foreignObject
        x={0}
        y={0}
        width={size}
        height={size}
        style={{ transform: "rotate(90deg)", overflow: "visible" }}
      >
        <div
          style={{
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}

interface AnalysisCirclesProps {
  state: AppState;
}

export function AnalysisCircles({ state }: AnalysisCirclesProps) {
  const [monthlyExpanded, setMonthlyExpanded] = useState(false);

  const prayers = state.dailyLog?.prayers ?? ({} as Record<PrayerName, string>);
  const advancedPrayers =
    state.dailyLog?.advancedPrayers ??
    ({} as Record<AdvancedPrayerName, string>);

  const adaCount = PRAYER_NAMES.filter(
    (p) => prayers[p] === "jamaat" || prayers[p] === "single",
  ).length;
  const qazaCount = PRAYER_NAMES.filter((p) => prayers[p] === "qaza").length;
  const totalMarked = adaCount + qazaCount;
  const dailyPercent = (totalMarked / 5) * 100;

  const nafilDone = NAFIL_NAMES.filter(
    (n) => advancedPrayers[n] && advancedPrayers[n] !== "unmarked",
  ).length;
  const nafilPercent = (nafilDone / 4) * 100;

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);
  const monthDays = Object.entries(state.monthlyHistory).filter(([d]) =>
    d.startsWith(currentMonth),
  );
  let monthAdaTotal = 0;
  let monthQazaTotal = 0;
  let monthTotal = 0;
  for (const [, log] of monthDays) {
    for (const p of PRAYER_NAMES) {
      const s = log.prayers[p];
      if (s === "jamaat" || s === "single") {
        monthAdaTotal++;
        monthTotal++;
      } else if (s === "qaza") {
        monthQazaTotal++;
        monthTotal++;
      }
    }
  }
  for (const p of PRAYER_NAMES) {
    const s = prayers[p];
    if (s === "jamaat" || s === "single") {
      monthAdaTotal++;
      monthTotal++;
    } else if (s === "qaza") {
      monthQazaTotal++;
      monthTotal++;
    }
  }
  const daysInMonth = new Date().getDate();
  const monthPossible = daysInMonth * 5;
  const monthPercent =
    monthPossible > 0 ? Math.round((monthTotal / monthPossible) * 100) : 0;

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(212,175,55,0.12)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <p
        className="text-[9px] uppercase tracking-[0.2em] font-semibold text-center mb-3"
        style={{
          color: "rgba(184,148,30,0.5)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Aaj ki Ruhdad
      </p>
      <div className="grid grid-cols-3 gap-2">
        {/* Daily */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <Ring
              size={80}
              percent={dailyPercent}
              color={
                adaCount === 5
                  ? "#10b981"
                  : qazaCount > 0
                    ? "#ef4444"
                    : "#D4AF37"
              }
              label={`Daily: ${totalMarked} of 5 prayers`}
            >
              <div
                className="flex flex-col items-center"
                style={{ transform: "none" }}
              >
                <span
                  className="text-sm font-bold"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {totalMarked}/5
                </span>
              </div>
            </Ring>
            {adaCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[8px] font-bold px-1 py-0.5 rounded-full"
                style={{ background: "#10b981", color: "white" }}
              >
                {adaCount}
              </span>
            )}
            {qazaCount > 0 && (
              <span
                className="absolute -bottom-1 -right-1 text-[8px] font-bold px-1 py-0.5 rounded-full"
                style={{ background: "#ef4444", color: "white" }}
              >
                {qazaCount}
              </span>
            )}
          </div>
          <p
            className="text-[9px] font-semibold uppercase tracking-wide"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Daily
          </p>
          <div className="flex gap-1">
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Ada {adaCount}
            </span>
            {qazaCount > 0 && (
              <span
                className="text-[8px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  color: "#dc2626",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Qaza {qazaCount}
              </span>
            )}
          </div>
        </div>

        {/* Nafil */}
        <div className="flex flex-col items-center gap-1">
          <Ring
            size={80}
            percent={nafilPercent}
            color="#7c3aed"
            label={`Nafil: ${nafilDone} of 4`}
          >
            <div className="flex flex-col items-center">
              <span
                className="text-sm font-bold"
                style={{
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {nafilDone}/4
              </span>
            </div>
          </Ring>
          <p
            className="text-[9px] font-semibold uppercase tracking-wide"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Nafil
          </p>
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full"
            style={{
              background: "rgba(124,58,237,0.1)",
              color: "#7c3aed",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Aaj {nafilDone}
          </span>
        </div>

        {/* Monthly */}
        <button
          type="button"
          data-ocid="analysis.monthly.toggle"
          onClick={() => setMonthlyExpanded((v) => !v)}
          className="flex flex-col items-center gap-1"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <Ring
            size={80}
            percent={monthPercent}
            color="#D4AF37"
            label={`Monthly: ${monthPercent}%`}
          >
            <div className="flex flex-col items-center">
              <span
                className="text-sm font-bold"
                style={{
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {monthPercent}%
              </span>
            </div>
          </Ring>
          <p
            className="text-[9px] font-semibold uppercase tracking-wide"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Monthly
          </p>
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full"
            style={{
              background: "rgba(212,175,55,0.1)",
              color: "#b8941e",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Tap →
          </span>
        </button>
      </div>

      {monthlyExpanded && (
        <div
          className="mt-3 rounded-xl p-3 fade-in"
          style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        >
          <p
            className="text-[10px] font-semibold mb-2"
            style={{ color: "#b8941e", fontFamily: "'Poppins', sans-serif" }}
          >
            Is Mahine ka Jawab-dehi
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#10b981" }}
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color: "#059669",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Ada: {monthAdaTotal}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#ef4444" }}
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color: "#dc2626",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Qaza: {monthQazaTotal}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#8a9bb0" }}
              />
              <span
                className="text-xs font-semibold"
                style={{
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Missing: {monthPossible - monthTotal}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalysisCircles;
