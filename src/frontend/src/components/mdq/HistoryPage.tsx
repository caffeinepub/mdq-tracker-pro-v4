import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { DailyLog, PrayerName } from "../../types";

interface HistoryPageProps {
  monthlyHistory: Record<string, DailyLog>;
}

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

const STATUS_COLOR: Record<string, string> = {
  jamaat: "#059669",
  single: "#2563eb",
  qaza: "#dc2626",
  unmarked: "#b0bec5",
};

const STATUS_LABEL: Record<string, string> = {
  jamaat: "Jamaat",
  single: "Single",
  qaza: "Qaza",
  unmarked: "—",
};

function formatDisplayDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function HistoryPage({ monthlyHistory }: HistoryPageProps) {
  const [openDate, setOpenDate] = useState<string | null>(null);

  const sortedDates = Object.keys(monthlyHistory).sort((a, b) =>
    b.localeCompare(a),
  );

  if (sortedDates.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="history.empty_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(212,175,55,0.07)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🗓️</span>
        </div>
        <div className="text-center">
          <p
            className="text-base font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            No History Yet
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
          >
            Past prayer records will appear here after midnight reset.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-ocid="history.list">
      <div className="flex items-center gap-2 mb-3">
        <span style={{ fontSize: "1rem" }}>🗓️</span>
        <h2
          className="text-sm font-semibold"
          style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
        >
          Prayer History
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(212,175,55,0.08)",
            color: "#b8941e",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {sortedDates.length} days
        </span>
      </div>

      {sortedDates.map((date, idx) => {
        const log = monthlyHistory[date];
        // Ada = single OR jamaat
        const adaCount = PRAYER_NAMES.filter(
          (p) => log.prayers[p] === "single" || log.prayers[p] === "jamaat",
        ).length;
        const qazaCount = PRAYER_NAMES.filter(
          (p) => log.prayers[p] === "qaza",
        ).length;
        const isOpen = openDate === date;

        return (
          <div
            key={date}
            data-ocid={`history.item.${idx + 1}`}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(212,175,55,0.1)",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header -- clickable */}
            <button
              type="button"
              data-ocid={`history.toggle.${idx + 1}`}
              onClick={() => setOpenDate(isOpen ? null : date)}
              className="w-full flex items-center justify-between p-4 text-left transition-all active:scale-[0.99]"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold"
                    style={{
                      color: "#1a2035",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {formatDisplayDate(date)}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {adaCount > 0 && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "rgba(5,150,105,0.08)",
                          color: "#059669",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        ✓ {adaCount} Ada
                      </span>
                    )}
                    {qazaCount > 0 && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={{
                          background: "rgba(220,38,38,0.06)",
                          color: "#dc2626",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        ⚠ {qazaCount} Qaza
                      </span>
                    )}
                    {adaCount === 0 && qazaCount === 0 && (
                      <span
                        className="text-[10px]"
                        style={{
                          color: "#8a9bb0",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        No records
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ color: "#b8941e", flexShrink: 0 }}>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {/* Accordion content */}
            {isOpen && (
              <div className="px-4 pb-4 fade-in">
                <div
                  style={{
                    height: "1px",
                    background: "rgba(212,175,55,0.1)",
                    marginBottom: "12px",
                  }}
                />
                <div className="space-y-2">
                  {PRAYER_NAMES.map((prayer) => {
                    const status = log.prayers[prayer];
                    return (
                      <div
                        key={prayer}
                        className="flex items-center justify-between py-1.5 px-2 rounded-xl"
                        style={{ background: "rgba(0,0,0,0.02)" }}
                      >
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: "1.1rem" }}>
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
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            color: STATUS_COLOR[status],
                            background: `${STATUS_COLOR[status]}12`,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {STATUS_LABEL[status]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {log.journal && (
                  <div
                    className="mt-3 p-3 rounded-xl"
                    style={{
                      background: "rgba(212,175,55,0.04)",
                      border: "1px solid rgba(212,175,55,0.1)",
                    }}
                  >
                    <p
                      className="text-[10px] uppercase tracking-wider mb-1"
                      style={{
                        color: "#b8941e",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      📝 Journal
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "#4a5568",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {log.journal}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default HistoryPage;
