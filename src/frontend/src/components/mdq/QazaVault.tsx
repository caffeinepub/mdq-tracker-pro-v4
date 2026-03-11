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
            background: "rgba(5,150,105,0.08)",
            border: "1px solid rgba(5,150,105,0.2)",
          }}
        >
          <CheckCircle2 size={36} style={{ color: "#059669" }} />
        </div>
        <div className="text-center">
          <p
            className="text-base font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Qaza Vault is Empty
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
          >
            Alhamdulillah! No missed prayers.
          </p>
          <p
            className="text-xs mt-2 italic"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
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
          <Archive size={16} style={{ color: "#dc2626" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Pending Qaza
          </h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(239,68,68,0.08)",
            color: "#dc2626",
            border: "1px solid rgba(239,68,68,0.2)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {pending.length} pending
        </span>
      </div>

      {pending.map((entry, index) => (
        <div
          key={entry.id}
          data-ocid={`qaza.item.${index + 1}`}
          className="rounded-2xl p-4 fade-in"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(239,68,68,0.12)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(239,68,68,0.06)",
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
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={11} style={{ color: "#8a9bb0" }} />
                  <p
                    className="text-xs"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Missed: {entry.missedDate}
                  </p>
                </div>
                {entry.missedTime && (
                  <p
                    className="text-xs mt-0.5"
                    style={{
                      color: "#b0bec5",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
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
              style={{
                minHeight: "44px",
                whiteSpace: "nowrap",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <CheckCircle2 size={14} />
              <span>Adaa done ✓</span>
            </button>
          </div>
        </div>
      ))}

      <div className="text-center py-4">
        <p
          className="text-xs italic"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          &quot;Whoever misses a prayer, let them pray it when they remember
          it.&quot; — Prophet ﷺ
        </p>
      </div>
    </div>
  );
}

export default QazaVault;
