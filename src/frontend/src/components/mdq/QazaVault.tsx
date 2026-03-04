import { Archive, CheckCircle2, Clock } from "lucide-react";
import type { QazaEntry } from "../../types";

interface QazaVaultProps {
  entries: QazaEntry[];
  onResolve: (id: string) => void;
}

const PRAYER_EMOJI: Record<string, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

export function QazaVault({ entries, onResolve }: QazaVaultProps) {
  const pending = entries.filter((e) => e.status === "pending");

  if (pending.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="qaza.empty_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <CheckCircle2 size={36} className="emerald-text" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-white/80">
            Qaza Vault is Empty
          </p>
          <p className="text-sm text-white/40 mt-1">
            Alhamdulillah! No missed prayers.
          </p>
          <p className="text-xs text-white/25 mt-2 italic">
            May Allah accept all your prayers. Ameen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Archive size={16} className="ruby-text" />
          <h2 className="text-sm font-semibold text-white/80">Pending Qaza</h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(239,68,68,0.15)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          {pending.length} pending
        </span>
      </div>

      {pending.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`qaza.item.${index + 1}`}
          className="glass rounded-2xl p-4 fade-in"
          style={{
            border: "1px solid rgba(239,68,68,0.15)",
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex items-center justify-between">
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
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={11} className="text-white/30" />
                  <p className="text-xs text-white/40">
                    Missed: {entry.missedDate}
                  </p>
                </div>
                {entry.missedTime && (
                  <p className="text-xs text-white/30 mt-0.5">
                    Prayer time: {entry.missedTime}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              data-ocid={`qaza.adaa.button.${index + 1}`}
              onClick={() => onResolve(entry.id)}
              className="btn-emerald text-xs py-2.5 px-3 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
              style={{ minHeight: "44px", whiteSpace: "nowrap" }}
            >
              <CheckCircle2 size={14} />
              <span>Adaa done ✓</span>
            </button>
          </div>
        </div>
      ))}

      <div className="text-center py-4">
        <p className="text-xs text-white/25 italic">
          "Whoever misses a prayer, let them pray it when they remember it." —
          Prophet ﷺ
        </p>
      </div>
    </div>
  );
}

export default QazaVault;
