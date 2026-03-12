import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import type { DailyLog, PrayerName } from "../../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

interface MissingPageProps {
  installDate: string;
  monthlyHistory: Record<string, DailyLog>;
  onMarkMissing: (
    date: string,
    prayer: PrayerName,
    status: "single" | "jamaat",
  ) => void;
}

function getDatesBetween(
  startDate: string,
  endDateExclusive: string,
): string[] {
  const dates: string[] = [];
  const current = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDateExclusive}T00:00:00`);
  while (current < end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function hasMissingFarz(
  date: string,
  monthlyHistory: Record<string, DailyLog>,
): boolean {
  const log = monthlyHistory[date];
  if (!log) return true;
  return PRAYER_NAMES.some((p) => log.prayers[p] === "unmarked");
}

function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDateFull(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function MissingPage({
  installDate,
  monthlyHistory,
  onMarkMissing,
}: MissingPageProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fixingPrayer, setFixingPrayer] = useState<PrayerName | null>(null);

  const today = getToday();
  const yesterday = getYesterday();

  const allDates =
    installDate <= yesterday ? getDatesBetween(installDate, today) : [];
  const missingDates = allDates.filter((d) =>
    hasMissingFarz(d, monthlyHistory),
  );

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid rgba(212,175,55,0.12)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  };

  if (missingDates.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="missing.empty_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(5,150,105,0.07)",
            border: "1px solid rgba(5,150,105,0.2)",
          }}
        >
          <CheckCircle2 size={36} style={{ color: "#059669", opacity: 0.7 }} />
        </div>
        <div className="text-center px-6">
          <p
            className="text-lg font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Alhamdulillah! 🤲
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
          >
            Koi bhi Farz namaz chhuti nahi hai.
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Aaj bhi sab waqt par padhte rahein, InshaAllah.
          </p>
        </div>
      </div>
    );
  }

  const displayDate =
    selectedDate ?? (missingDates.length === 1 ? missingDates[0] : null);

  const renderPrayerList = (date: string) => {
    const log = monthlyHistory[date];
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="text-base font-semibold"
              style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
            >
              {formatDateFull(date)}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Chhuti hui Farz namazein theek karein
            </p>
          </div>
          {missingDates.length > 1 && (
            <button
              type="button"
              data-ocid="missing.close_button"
              onClick={() => {
                setSelectedDate(null);
                setFixingPrayer(null);
              }}
              className="text-xs px-3 py-1.5 rounded-xl font-medium"
              style={{
                background: "rgba(212,175,55,0.08)",
                color: "#b8941e",
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              ← Waapis
            </button>
          )}
        </div>

        <div className="space-y-3" data-ocid="missing.list">
          {PRAYER_NAMES.map((prayer, idx) => {
            const status = log?.prayers[prayer] ?? "unmarked";
            const isDone = status === "single" || status === "jamaat";
            const isQaza = status === "qaza";
            const isFixing = fixingPrayer === prayer;

            return (
              <div
                key={prayer}
                data-ocid={`missing.item.${idx + 1}`}
                className="rounded-2xl p-4"
                style={{
                  background: isDone
                    ? "rgba(5,150,105,0.04)"
                    : isQaza
                      ? "rgba(37,99,235,0.04)"
                      : "#ffffff",
                  border: isDone
                    ? "1px solid rgba(5,150,105,0.15)"
                    : isQaza
                      ? "1px solid rgba(37,99,235,0.15)"
                      : "1px solid rgba(220,38,38,0.15)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: isDone
                          ? "rgba(5,150,105,0.08)"
                          : isQaza
                            ? "rgba(37,99,235,0.08)"
                            : "rgba(220,38,38,0.06)",
                      }}
                    >
                      {PRAYER_EMOJI[prayer]}
                    </span>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{
                          color: "#1a2035",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {prayer}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: isDone
                            ? "#059669"
                            : isQaza
                              ? "#2563eb"
                              : "#dc2626",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {isDone
                          ? `✓ Ada (${status === "jamaat" ? "Jamaat" : "Single"})`
                          : isQaza
                            ? "Qaza"
                            : "Chhut gayi"}
                      </p>
                    </div>
                  </div>

                  {isDone ? (
                    <CheckCircle2
                      size={22}
                      style={{ color: "#059669", flexShrink: 0 }}
                    />
                  ) : isQaza ? (
                    <span
                      className="text-xs px-2 py-1 rounded-lg font-medium"
                      style={{
                        background: "rgba(37,99,235,0.08)",
                        color: "#2563eb",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Qaza
                    </span>
                  ) : !isFixing ? (
                    <button
                      type="button"
                      data-ocid={`missing.edit_button.${idx + 1}`}
                      onClick={() => setFixingPrayer(prayer)}
                      className="text-sm px-3 py-1.5 rounded-xl font-semibold transition-all active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #b8941e)",
                        color: "#ffffff",
                        fontFamily: "'Poppins', sans-serif",
                        minHeight: "36px",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      Fix ✏
                    </button>
                  ) : (
                    <XCircle
                      size={22}
                      style={{ color: "#dc2626", flexShrink: 0 }}
                    />
                  )}
                </div>

                {isFixing && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      data-ocid={`missing.single.button.${idx + 1}`}
                      onClick={() => {
                        onMarkMissing(date, prayer, "single");
                        setFixingPrayer(null);
                      }}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      style={{
                        background: "rgba(37,99,235,0.08)",
                        color: "#2563eb",
                        border: "1px solid rgba(37,99,235,0.2)",
                        minHeight: "44px",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      ☑ Single
                    </button>
                    <button
                      type="button"
                      data-ocid={`missing.jamaat.button.${idx + 1}`}
                      onClick={() => {
                        onMarkMissing(date, prayer, "jamaat");
                        setFixingPrayer(null);
                      }}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      style={{
                        background: "rgba(5,150,105,0.08)",
                        color: "#059669",
                        border: "1px solid rgba(5,150,105,0.2)",
                        minHeight: "44px",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      🕌 Jamaat
                    </button>
                    <button
                      type="button"
                      data-ocid={`missing.cancel_button.${idx + 1}`}
                      onClick={() => setFixingPrayer(null)}
                      className="col-span-2 py-2 px-3 rounded-xl text-xs font-medium transition-all active:scale-95"
                      style={{
                        background: "rgba(0,0,0,0.04)",
                        color: "#8a9bb0",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontSize: "1rem" }}>📅</span>
        <h2
          className="text-sm font-semibold"
          style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
        >
          Chhuti Hui Namazein
        </h2>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(220,38,38,0.08)",
            color: "#dc2626",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {missingDates.length} din
        </span>
      </div>

      {displayDate ? (
        <div className="rounded-2xl p-4" style={cardStyle}>
          {renderPrayerList(displayDate)}
        </div>
      ) : (
        <div className="space-y-2" data-ocid="missing.list">
          <p
            className="text-xs px-1"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Kaunsa din theek karna chahte hain?
          </p>
          {missingDates.map((date, idx) => {
            const log = monthlyHistory[date];
            const missingCount = PRAYER_NAMES.filter(
              (p) => !log || log.prayers[p] === "unmarked",
            ).length;
            const fixedCount = PRAYER_NAMES.filter(
              (p) =>
                log?.prayers[p] === "single" || log?.prayers[p] === "jamaat",
            ).length;

            return (
              <button
                type="button"
                key={date}
                data-ocid={`missing.item.${idx + 1}`}
                onClick={() => {
                  setSelectedDate(date);
                  setFixingPrayer(null);
                }}
                className="w-full rounded-2xl p-4 flex items-center justify-between text-left transition-all active:scale-[0.99]"
                style={{
                  ...cardStyle,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: "rgba(220,38,38,0.06)",
                      border: "1px solid rgba(220,38,38,0.1)",
                    }}
                  >
                    📅
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "#1a2035",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {formatDate(date)}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {missingCount > 0 && (
                        <span
                          className="text-[10px]"
                          style={{
                            color: "#dc2626",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          ✗ {missingCount} chhuti
                        </span>
                      )}
                      {fixedCount > 0 && (
                        <span
                          className="text-[10px]"
                          style={{
                            color: "#059669",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          ✓ {fixedCount} ada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span style={{ color: "#b8941e", fontSize: "1.1rem" }}>›</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MissingPage;
