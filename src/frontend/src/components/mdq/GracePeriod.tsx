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
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <CheckCircle2 size={36} className="gold-text opacity-50" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-white/80">
            No Missing Prayers
          </p>
          <p className="text-sm text-white/40 mt-1">
            Alhamdulillah! All prayers accounted for.
          </p>
          <p className="text-xs text-white/25 mt-2 italic">
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
          <Clock size={16} className="gold-text" />
          <h2 className="text-sm font-semibold text-white/80">Grace Period</h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(212,175,55,0.1)",
            color: "#D4AF37",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          {entries.length} missing
        </span>
      </div>

      {/* Info banner */}
      <div
        className="rounded-xl p-3 flex items-start gap-2"
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.12)",
        }}
      >
        <Clock size={14} className="gold-text mt-0.5 flex-shrink-0" />
        <p className="text-xs text-white/60 leading-relaxed">
          Yesterday's unmarked prayers. Mark them within 24 hours before they
          convert to Qaza automatically.
        </p>
      </div>

      {/* Active grace entries */}
      {activeEntries.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`grace.item.${index + 1}`}
          className="glass rounded-2xl p-4 fade-in"
          style={{
            border: "1px solid rgba(212,175,55,0.15)",
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                {PRAYER_EMOJI[entry.prayerName]}
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  {entry.prayerName}
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Date: {entry.date}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#D4AF37" }}>
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
              style={{ minHeight: "44px" }}
            >
              Single ✓
            </button>
            <button
              type="button"
              data-ocid={`grace.jamaat.button.${index + 1}`}
              onClick={() => onMark(entry.id, "jamaat")}
              className="btn-emerald text-xs py-2.5 px-3 rounded-xl font-semibold transition-all active:scale-95"
              style={{ minHeight: "44px" }}
            >
              Jamaat ✓
            </button>
          </div>
        </div>
      ))}

      {/* Expired grace entries */}
      {expiredEntries.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`grace.expired.item.${index + 1}`}
          className="glass rounded-2xl p-4 opacity-70"
          style={{ border: "1px solid rgba(239,68,68,0.2)" }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {PRAYER_EMOJI[entry.prayerName]}
              </div>
              <div>
                <p className="font-semibold text-sm text-white">
                  {entry.prayerName}
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Date: {entry.date}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <AlertTriangle size={11} className="ruby-text" />
                  <p className="text-xs ruby-text">Grace period expired</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            data-ocid={`grace.convert.button.${index + 1}`}
            onClick={() => onConvertToQaza(entry.id)}
            className="w-full btn-ruby text-xs py-2.5 px-3 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{ minHeight: "44px" }}
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
