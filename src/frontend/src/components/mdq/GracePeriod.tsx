import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import type { GracePeriodEntry } from "../../types";

interface GracePeriodProps {
  entries: GracePeriodEntry[];
  onMark: (id: string, status: "single" | "jamaat") => void;
  onConvertToQaza: (id: string) => void;
}

const PRAYER_EMOJI: Record<string, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

function getTimeRemaining(expiresAt: string): string {
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${mins}m remaining`;
  return `${mins}m remaining`;
}

export function GracePeriod({
  entries,
  onMark,
  onConvertToQaza,
}: GracePeriodProps) {
  if (entries.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="grace.empty_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(212,175,55,0.07)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <CheckCircle2 size={36} style={{ color: "#b8941e", opacity: 0.5 }} />
        </div>
        <div className="text-center">
          <p
            className="text-base font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            No Missing Prayers
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
          >
            Alhamdulillah! All prayers accounted for.
          </p>
          <p
            className="text-xs mt-2 italic"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Yesterday's unmarked prayers appear here for 24 hours.
          </p>
        </div>
      </div>
    );
  }

  const activeEntries = entries.filter((e) => !isExpired(e.expiresAt));
  const expiredEntries = entries.filter((e) => isExpired(e.expiresAt));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: "#b8941e" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Grace Period
          </h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(212,175,55,0.08)",
            color: "#b8941e",
            border: "1px solid rgba(212,175,55,0.2)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {entries.length} missing
        </span>
      </div>

      <div
        className="rounded-xl p-3 flex items-start gap-2"
        style={{
          background: "rgba(212,175,55,0.05)",
          border: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <Clock
          size={14}
          style={{ color: "#b8941e", marginTop: "2px", flexShrink: 0 }}
        />
        <p
          className="text-xs leading-relaxed"
          style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
        >
          Yesterday's unmarked prayers. Mark them within 24 hours before they
          convert to Qaza automatically.
        </p>
      </div>

      {activeEntries.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`grace.item.${index + 1}`}
          className="rounded-2xl p-4 fade-in"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(212,175,55,0.15)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(212,175,55,0.07)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                {PRAYER_EMOJI[entry.prayerName]}
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {entry.prayerName}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Date: {entry.date}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: "#b8941e",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  ⏱ {getTimeRemaining(entry.expiresAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              data-ocid={`grace.single.button.${index + 1}`}
              onClick={() => onMark(entry.id, "single")}
              className="btn-blue text-xs py-2.5 px-3 rounded-xl font-semibold transition-all active:scale-95"
              style={{
                minHeight: "44px",
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Single ✓
            </button>
            <button
              type="button"
              data-ocid={`grace.jamaat.button.${index + 1}`}
              onClick={() => onMark(entry.id, "jamaat")}
              className="btn-emerald text-xs py-2.5 px-3 rounded-xl font-semibold transition-all active:scale-95"
              style={{
                minHeight: "44px",
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Jamaat ✓
            </button>
          </div>
        </div>
      ))}

      {expiredEntries.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`grace.expired.item.${index + 1}`}
          className="rounded-2xl p-4 opacity-70"
          style={{
            background: "rgba(239,68,68,0.03)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(239,68,68,0.07)",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
              >
                {PRAYER_EMOJI[entry.prayerName]}
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {entry.prayerName}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Date: {entry.date}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <AlertTriangle size={11} style={{ color: "#dc2626" }} />
                  <p
                    className="text-xs"
                    style={{
                      color: "#dc2626",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Grace period expired
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            data-ocid={`grace.convert.button.${index + 1}`}
            onClick={() => onConvertToQaza(entry.id)}
            className="w-full btn-ruby text-xs py-2.5 px-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{
              minHeight: "44px",
              fontFamily: "'Poppins', sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <AlertTriangle size={14} />
            Move to Qaza Vault
          </button>
        </div>
      ))}
    </div>
  );
}

export default GracePeriod;
