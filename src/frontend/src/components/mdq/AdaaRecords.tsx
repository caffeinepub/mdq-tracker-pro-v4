import { CheckCircle, TrendingUp } from "lucide-react";
import type { AdaaRecord } from "../../types";

interface AdaaRecordsProps {
  records: AdaaRecord[];
}

const PRAYER_EMOJI: Record<string, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

export function AdaaRecords({ records }: AdaaRecordsProps) {
  if (records.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="adaa.empty_state"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.15)",
          }}
        >
          <CheckCircle size={36} className="emerald-text opacity-40" />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-white/80">
            No Adaa Records Yet
          </p>
          <p className="text-sm text-white/40 mt-1">
            Resolved prayers will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="emerald-text" />
          <h2 className="text-sm font-semibold text-white/80">Adaa Records</h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(16,185,129,0.15)",
            color: "#10b981",
            border: "1px solid rgba(16,185,129,0.3)",
          }}
        >
          {records.length} resolved
        </span>
      </div>

      {records.map((record, index) => (
        <div
          key={record.id}
          data-ocid={`adaa.item.${index + 1}`}
          className="glass rounded-2xl p-4 fade-in"
          style={{
            border: "1px solid rgba(16,185,129,0.12)",
            animationDelay: `${index * 0.04}s`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                {PRAYER_EMOJI[record.prayerName]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-white">
                    {record.prayerName}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium emerald-text"
                    style={{ background: "rgba(16,185,129,0.1)" }}
                  >
                    ✓ Adaa
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p className="text-xs text-white/40">
                    <span className="text-white/30">Missed: </span>
                    <span className="text-ruby">{record.missedDate}</span>
                  </p>
                  <p className="text-xs text-white/40 truncate">
                    <span className="text-white/30">Resolved: </span>
                    <span className="emerald-text">{record.resolvedAt}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <CheckCircle size={16} className="emerald-text" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center py-4">
        <p className="text-xs text-white/25 italic">
          MaashaAllah! Keep striving to fulfill your prayers.
        </p>
      </div>
    </div>
  );
}

export default AdaaRecords;
