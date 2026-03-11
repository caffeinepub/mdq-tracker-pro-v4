import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { AdaaRecord, DailyLog, PrayerName, QazaEntry } from "../../types";

interface MonthlyAnalysisProps {
  monthlyHistory: Record<string, DailyLog>;
  qazaVault: QazaEntry[];
  adaaRecords: AdaaRecord[];
}

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const URDU_MONTHS = [
  "Janwari",
  "Farwari",
  "March",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "Sitambar",
  "Aktoobar",
  "Nawambar",
  "Disambar",
];

function getPrayerColor(prayer: PrayerName): string {
  const colors: Record<PrayerName, string> = {
    Fajr: "#D4AF37",
    Dhuhr: "#059669",
    Asr: "#2563eb",
    Maghrib: "#f97316",
    Isha: "#a855f7",
  };
  return colors[prayer];
}

interface MonthStats {
  totalMarked: number;
  jamaatCount: number;
  singleCount: number;
  qazaCount: number;
  adaaCount: number;
  perPrayer: Record<
    PrayerName,
    { jamaat: number; single: number; qaza: number }
  >;
  longestJamaatStreak: number;
  daysTracked: number;
}

function computeStats(
  year: number,
  month: number,
  monthlyHistory: Record<string, DailyLog>,
  qazaVault: QazaEntry[],
  adaaRecords: AdaaRecord[],
): MonthStats {
  const monthStr = `${year}-${String(month).padStart(2, "0")}`;
  const relevantLogs = Object.entries(monthlyHistory)
    .filter(([date]) => date.startsWith(monthStr))
    .map(([, log]) => log);
  const perPrayer: Record<
    PrayerName,
    { jamaat: number; single: number; qaza: number }
  > = {
    Fajr: { jamaat: 0, single: 0, qaza: 0 },
    Dhuhr: { jamaat: 0, single: 0, qaza: 0 },
    Asr: { jamaat: 0, single: 0, qaza: 0 },
    Maghrib: { jamaat: 0, single: 0, qaza: 0 },
    Isha: { jamaat: 0, single: 0, qaza: 0 },
  };
  for (const log of relevantLogs) {
    for (const name of PRAYER_NAMES) {
      const status = log.prayers[name];
      if (status === "jamaat") perPrayer[name].jamaat++;
      else if (status === "single") perPrayer[name].single++;
      else if (status === "qaza") perPrayer[name].qaza++;
    }
  }
  const totalMarked = PRAYER_NAMES.reduce(
    (acc, p) =>
      acc + perPrayer[p].jamaat + perPrayer[p].single + perPrayer[p].qaza,
    0,
  );
  const jamaatCount = PRAYER_NAMES.reduce(
    (acc, p) => acc + perPrayer[p].jamaat,
    0,
  );
  const singleCount = PRAYER_NAMES.reduce(
    (acc, p) => acc + perPrayer[p].single,
    0,
  );
  const qazaCount = qazaVault.filter((q) =>
    q.missedDate.startsWith(monthStr),
  ).length;
  const adaaCount = adaaRecords.filter(
    (r) =>
      r.resolvedAt.includes(`${year}`) && r.missedDate.startsWith(monthStr),
  ).length;
  const daysInMonth = new Date(year, month, 0).getDate();
  let longestStreak = 0;
  let currentStreak = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${monthStr}-${String(d).padStart(2, "0")}`;
    const log = monthlyHistory[dateStr];
    if (log) {
      const hasJamaat = PRAYER_NAMES.some((p) => log.prayers[p] === "jamaat");
      if (hasJamaat) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    } else {
      currentStreak = 0;
    }
  }
  return {
    totalMarked,
    jamaatCount,
    singleCount,
    qazaCount,
    adaaCount,
    perPrayer,
    longestJamaatStreak: longestStreak,
    daysTracked: relevantLogs.length,
  };
}

export function MonthlyAnalysis({
  monthlyHistory,
  qazaVault,
  adaaRecords,
}: MonthlyAnalysisProps) {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const goToPrev = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };
  const goToNext = () => {
    const isCurrentMonth =
      selectedMonth === now.getMonth() + 1 &&
      selectedYear === now.getFullYear();
    if (isCurrentMonth) return;
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };
  const isCurrentMonth =
    selectedMonth === now.getMonth() + 1 && selectedYear === now.getFullYear();
  const stats = computeStats(
    selectedYear,
    selectedMonth,
    monthlyHistory,
    qazaVault,
    adaaRecords,
  );
  const hasData = stats.daysTracked > 0;

  const summaryCards = [
    {
      label: "Total",
      value: stats.totalMarked,
      color: "#b8941e",
      bg: "rgba(212,175,55,0.08)",
      border: "rgba(212,175,55,0.18)",
      emoji: "📊",
    },
    {
      label: "Jamaat",
      value: stats.jamaatCount,
      color: "#059669",
      bg: "rgba(5,150,105,0.08)",
      border: "rgba(5,150,105,0.18)",
      emoji: "🕌",
    },
    {
      label: "Single",
      value: stats.singleCount,
      color: "#2563eb",
      bg: "rgba(37,99,235,0.08)",
      border: "rgba(37,99,235,0.18)",
      emoji: "🙏",
    },
    {
      label: "Qaza",
      value: stats.qazaCount,
      color: "#dc2626",
      bg: "rgba(220,38,38,0.08)",
      border: "rgba(220,38,38,0.18)",
      emoji: "⏰",
    },
    {
      label: "Adaa",
      value: stats.adaaCount,
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.08)",
      border: "rgba(124,58,237,0.18)",
      emoji: "✅",
    },
  ];

  return (
    <div className="space-y-4" data-ocid="analysis.page">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">📈</span>
        <h2
          className="text-sm font-semibold"
          style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
        >
          Monthly Analysis
        </h2>
      </div>

      {/* Month Selector */}
      <div
        className="rounded-2xl p-4 flex items-center justify-between"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
        data-ocid="analysis.panel"
      >
        <button
          type="button"
          data-ocid="analysis.pagination_prev"
          onClick={goToPrev}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "rgba(212,175,55,0.07)",
            border: "1px solid rgba(212,175,55,0.2)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <ChevronLeft size={18} style={{ color: "#b8941e" }} />
        </button>
        <div className="text-center">
          <p
            className="font-bold text-base shimmer-gold"
            style={{
              fontFamily: "'Amiri', 'Georgia', serif",
              letterSpacing: "0.06em",
            }}
          >
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </p>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            {URDU_MONTHS[selectedMonth - 1]} {selectedYear}
          </p>
        </div>
        <button
          type="button"
          data-ocid="analysis.pagination_next"
          onClick={goToNext}
          disabled={isCurrentMonth}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
          style={{
            background: "rgba(212,175,55,0.07)",
            border: "1px solid rgba(212,175,55,0.2)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <ChevronRight size={18} style={{ color: "#b8941e" }} />
        </button>
      </div>

      {!hasData ? (
        <div
          className="card-enter rounded-2xl p-8 text-center"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.07)",
          }}
          data-ocid="analysis.empty_state"
        >
          <p className="text-4xl mb-3">📭</p>
          <p
            className="font-semibold text-base mb-1"
            style={{ color: "#b8941e", fontFamily: "'Poppins', sans-serif" }}
          >
            Is mahine ka data nahi mila
          </p>
          <p
            className="text-xs"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear} ke liye koi record
            nahi hai
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            {summaryCards.slice(0, 3).map((card) => (
              <div
                key={card.label}
                className="card-enter rounded-xl p-3 text-center"
                style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                }}
              >
                <p className="text-lg mb-0.5">{card.emoji}</p>
                <p
                  className="font-bold text-xl leading-none"
                  style={{
                    color: card.color,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {card.value}
                </p>
                <p
                  className="text-[9px] mt-1 uppercase tracking-wider"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {card.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {summaryCards.slice(3).map((card) => (
              <div
                key={card.label}
                className="card-enter rounded-xl p-3 text-center"
                style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                }}
              >
                <p className="text-lg mb-0.5">{card.emoji}</p>
                <p
                  className="font-bold text-xl leading-none"
                  style={{
                    color: card.color,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {card.value}
                </p>
                <p
                  className="text-[9px] mt-1 uppercase tracking-wider"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          {/* Streak */}
          <div
            className="card-enter rounded-2xl p-4 flex items-center gap-4"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              🔥
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-0.5"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Longest Jamaat Streak
              </p>
              <p
                className="font-bold text-2xl leading-none shimmer-gold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {stats.longestJamaatStreak}{" "}
                <span
                  className="text-sm font-normal"
                  style={{ color: "#8a9bb0" }}
                >
                  din
                </span>
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Lagataar jamaat ke saath namaz
              </p>
            </div>
          </div>

          {/* Per-prayer breakdown */}
          <div
            className="card-enter rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
            data-ocid="analysis.table"
          >
            <div
              className="px-4 py-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Namaz ke Hisab se Breakdown
              </p>
            </div>
            <div>
              {PRAYER_NAMES.map((prayer, i) => {
                const data = stats.perPrayer[prayer];
                const total = data.jamaat + data.single + data.qaza;
                const jamaatPct = total > 0 ? (data.jamaat / total) * 100 : 0;
                const color = getPrayerColor(prayer);
                return (
                  <div
                    key={prayer}
                    className="px-4 py-3"
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none",
                    }}
                    data-ocid="analysis.row"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {PRAYER_EMOJI[prayer]}
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: "#1a2035",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {prayer}
                        </span>
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: "#8a9bb0",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {total} total
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full mb-2 overflow-hidden"
                      style={{ background: "rgba(0,0,0,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${jamaatPct}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                        }}
                      />
                    </div>
                    <div className="flex gap-3">
                      {[
                        { label: "Jamaat", val: data.jamaat, color: "#059669" },
                        { label: "Single", val: data.single, color: "#2563eb" },
                        { label: "Qaza", val: data.qaza, color: "#dc2626" },
                      ].map(({ label, val, color: c }) => (
                        <span
                          key={label}
                          className="flex items-center gap-1 text-[10px]"
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: c }}
                          />
                          <span
                            style={{
                              color: "#8a9bb0",
                              fontFamily: "'Poppins', sans-serif",
                            }}
                          >
                            {label}:
                          </span>
                          <span
                            className="font-bold"
                            style={{
                              color: c,
                              fontFamily: "'Poppins', sans-serif",
                            }}
                          >
                            {val}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="card-enter rounded-xl p-3 flex items-center justify-between"
            style={{
              background: "rgba(212,175,55,0.05)",
              border: "1px solid rgba(212,175,55,0.1)",
            }}
          >
            <p
              className="text-xs"
              style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
            >
              Is mahine record kiye gaye din
            </p>
            <p
              className="font-bold text-sm shimmer-gold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {stats.daysTracked} din
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MonthlyAnalysis;
