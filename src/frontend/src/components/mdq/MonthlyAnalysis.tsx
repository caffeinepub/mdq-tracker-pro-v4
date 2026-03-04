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
    Dhuhr: "#10b981",
    Asr: "#3b82f6",
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
  month: number, // 1-indexed
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
  const qazaCount =
    qazaVault.filter(
      (q) => q.missedDate.startsWith(monthStr) && q.status === "pending",
    ).length +
    qazaVault.filter(
      (q) => q.missedDate.startsWith(monthStr) && q.status === "resolved",
    ).length;

  const adaaCount = adaaRecords.filter(
    (r) =>
      r.resolvedAt.includes(`${year}`) && r.missedDate.startsWith(monthStr),
  ).length;

  // Compute longest jamaat streak
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
    if (isCurrentMonth) return; // can't go beyond current month
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
      label: "Total Marked",
      value: stats.totalMarked,
      color: "#D4AF37",
      bg: "rgba(212,175,55,0.1)",
      border: "rgba(212,175,55,0.2)",
      emoji: "📊",
    },
    {
      label: "Jamaat",
      value: stats.jamaatCount,
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
      emoji: "🕌",
    },
    {
      label: "Single",
      value: stats.singleCount,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.2)",
      emoji: "🙏",
    },
    {
      label: "Qaza",
      value: stats.qazaCount,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.2)",
      emoji: "⏰",
    },
    {
      label: "Adaa",
      value: stats.adaaCount,
      color: "#a855f7",
      bg: "rgba(168,85,247,0.1)",
      border: "rgba(168,85,247,0.2)",
      emoji: "✅",
    },
  ];

  return (
    <div className="space-y-4" data-ocid="analysis.page">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base">📈</span>
        <h2 className="text-sm font-semibold text-white/80">
          Monthly Analysis
        </h2>
      </div>

      {/* Month Selector */}
      <div
        className="glass-premium rounded-2xl p-4 flex items-center justify-between"
        style={{ border: "1px solid rgba(212,175,55,0.15)" }}
        data-ocid="analysis.panel"
      >
        <button
          type="button"
          data-ocid="analysis.pagination_prev"
          onClick={goToPrev}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 hover:bg-white/10"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <ChevronLeft size={18} className="gold-text" />
        </button>

        <div className="text-center">
          <p
            className="font-bold text-base shimmer-gold"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: "0.06em",
            }}
          >
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </p>
          <p className="text-[10px] text-white/35 mt-0.5">
            {URDU_MONTHS[selectedMonth - 1]} {selectedYear}
          </p>
        </div>

        <button
          type="button"
          data-ocid="analysis.pagination_next"
          onClick={goToNext}
          disabled={isCurrentMonth}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 hover:bg-white/10 disabled:opacity-30"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <ChevronRight size={18} className="gold-text" />
        </button>
      </div>

      {/* No data state */}
      {!hasData ? (
        <div
          className="card-enter glass rounded-2xl p-8 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          data-ocid="analysis.empty_state"
        >
          <p className="text-4xl mb-3">📭</p>
          <p
            className="font-semibold text-base mb-1"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            Is mahine ka data nahi mila
          </p>
          <p className="text-xs text-white/30">
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear} ke liye koi record
            nahi hai
          </p>
        </div>
      ) : (
        <>
          {/* Stats Summary Cards */}
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
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <p className="text-[9px] text-white/40 mt-1 uppercase tracking-wider">
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
                  style={{ color: card.color }}
                >
                  {card.value}
                </p>
                <p className="text-[9px] text-white/40 mt-1 uppercase tracking-wider">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          {/* Streak card */}
          <div
            className="card-enter glass rounded-2xl p-4 flex items-center gap-4"
            style={{
              border: "1px solid rgba(212,175,55,0.15)",
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, rgba(16,185,129,0.04) 100%)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "1px solid rgba(212,175,55,0.25)",
              }}
            >
              🔥
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                Longest Jamaat Streak
              </p>
              <p
                className="font-bold text-2xl leading-none shimmer-gold"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {stats.longestJamaatStreak}
                <span className="text-sm font-normal text-white/40 ml-1">
                  {stats.longestJamaatStreak === 1 ? "din" : "din"}
                </span>
              </p>
              <p className="text-[10px] text-white/30 mt-0.5">
                Lagataar jamaat ke saath namaz
              </p>
            </div>
          </div>

          {/* Per-prayer breakdown */}
          <div
            className="card-enter glass rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            data-ocid="analysis.table"
          >
            <div
              className="px-4 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Namaz ke Hisab se Breakdown
              </p>
            </div>

            <div className="divide-y divide-white/5">
              {PRAYER_NAMES.map((prayer) => {
                const data = stats.perPrayer[prayer];
                const total = data.jamaat + data.single + data.qaza;
                const jamaatPct = total > 0 ? (data.jamaat / total) * 100 : 0;
                const color = getPrayerColor(prayer);

                return (
                  <div
                    key={prayer}
                    className="px-4 py-3"
                    data-ocid="analysis.row"
                  >
                    {/* Prayer name row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {PRAYER_EMOJI[prayer]}
                        </span>
                        <span className="text-sm font-medium text-white/80">
                          {prayer}
                        </span>
                      </div>
                      <span className="text-xs text-white/30">
                        {total} total
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="h-1.5 rounded-full mb-2 overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${jamaatPct}%`,
                          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                          boxShadow: `0 0 8px ${color}60`,
                        }}
                      />
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-3">
                      <span className="flex items-center gap-1 text-[10px]">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "#10b981" }}
                        />
                        <span className="text-white/50">Jamaat:</span>
                        <span
                          style={{ color: "#10b981" }}
                          className="font-bold"
                        >
                          {data.jamaat}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "#3b82f6" }}
                        />
                        <span className="text-white/50">Single:</span>
                        <span
                          style={{ color: "#3b82f6" }}
                          className="font-bold"
                        >
                          {data.single}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "#ef4444" }}
                        />
                        <span className="text-white/50">Qaza:</span>
                        <span
                          style={{ color: "#ef4444" }}
                          className="font-bold"
                        >
                          {data.qaza}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Days tracked */}
          <div
            className="card-enter rounded-xl p-3 flex items-center justify-between"
            style={{
              background: "rgba(212,175,55,0.05)",
              border: "1px solid rgba(212,175,55,0.1)",
            }}
          >
            <p className="text-xs text-white/40">
              Is mahine record kiye gaye din
            </p>
            <p className="font-bold text-sm gold-text">
              {stats.daysTracked} din
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default MonthlyAnalysis;
