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
            background: "rgba(5,150,105,0.07)",
            border: "1px solid rgba(5,150,105,0.15)",
          }}
        >
          <CheckCircle size={36} style={{ color: "#059669", opacity: 0.5 }} />
        </div>
        <div className="text-center">
          <p
            className="text-base font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            No Adaa Records Yet
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
          >
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
          <TrendingUp size={16} style={{ color: "#059669" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Adaa Records
          </h2>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            background: "rgba(5,150,105,0.08)",
            color: "#059669",
            border: "1px solid rgba(5,150,105,0.2)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {records.length} resolved
        </span>
      </div>

      {records.map((record, index) => (
        <div
          key={record.id}
          data-ocid={`adaa.item.${index + 1}`}
          className="rounded-2xl p-4 fade-in"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(5,150,105,0.1)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            animationDelay: `${index * 0.04}s`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: "rgba(5,150,105,0.08)",
                  border: "1px solid rgba(5,150,105,0.15)",
                }}
              >
                {PRAYER_EMOJI[record.prayerName]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: "#1a2035",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {record.prayerName}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: "rgba(5,150,105,0.08)",
                      color: "#059669",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    ✓ Adaa
                  </span>
                </div>
                <div className="mt-1 space-y-0.5">
                  <p
                    className="text-xs"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <span style={{ color: "#b0bec5" }}>Missed: </span>
                    <span style={{ color: "#dc2626" }}>
                      {record.missedDate}
                    </span>
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <span style={{ color: "#b0bec5" }}>Resolved: </span>
                    <span style={{ color: "#059669" }}>
                      {record.resolvedAt}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(5,150,105,0.1)",
                  border: "1px solid rgba(5,150,105,0.2)",
                }}
              >
                <CheckCircle size={16} style={{ color: "#059669" }} />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-center py-4">
        <p
          className="text-xs italic"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          MaashaAllah! Keep striving to fulfill your prayers.
        </p>
      </div>
    </div>
  );
}

export default AdaaRecords;
