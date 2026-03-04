import { RotateCcw } from "lucide-react";

interface TasbiHCounterProps {
  count: number;
  onIncrement: () => void;
  onReset: () => void;
}

const TASBIH_MILESTONES = [33, 66, 99, 100, 300, 500, 1000];

function getMilestoneLabel(
  count: number,
): { label: string; color: string } | null {
  if (count >= 1000) return { label: "MaashaAllah! 1000+ ✦", color: "#D4AF37" };
  if (count >= 500) return { label: "SubhanAllah! 500+ 🌟", color: "#D4AF37" };
  if (count >= 300)
    return { label: "Alhamdulillah! 300+ ✨", color: "#10b981" };
  if (count >= 100) return { label: "Baarak Allah! 100 ✓", color: "#10b981" };
  if (count >= 99) return { label: "Tasbih Mukammal! 99 🤲", color: "#10b981" };
  if (count >= 66)
    return { label: "Do Tihaye Mukammal! 66 🌙", color: "#3b82f6" };
  if (count >= 33)
    return { label: "Ek Tihaya Mukammal! 33 ✦", color: "#D4AF37" };
  return null;
}

export function TasbiHCounter({
  count,
  onIncrement,
  onReset,
}: TasbiHCounterProps) {
  const milestone = getMilestoneLabel(count);
  const ringProgress = Math.min((count % 99) / 99, 1);
  const circumference = 2 * Math.PI * 38;
  const strokeDash = ringProgress * circumference;

  return (
    <div
      className="glass-premium rounded-2xl p-4"
      style={{
        border: "1px solid rgba(212,175,55,0.18)",
        boxShadow: "0 4px 24px rgba(212,175,55,0.06)",
      }}
      data-ocid="tasbih.card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="font-bold text-sm shimmer-gold tracking-wide"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            📿 Tasbih Counter
          </h3>
          <p className="text-[10px] text-white/30 mt-0.5">
            Aaj ka tasbih —{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          type="button"
          data-ocid="tasbih.reset.button"
          onClick={onReset}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
          title="Reset"
        >
          <RotateCcw size={13} style={{ color: "rgba(239,68,68,0.6)" }} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        {/* Ring progress */}
        <div className="relative flex-shrink-0">
          <svg
            width="88"
            height="88"
            className="-rotate-90"
            role="img"
            aria-label="Tasbih progress ring"
          >
            {/* Background ring */}
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="5"
            />
            {/* Progress ring */}
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke={ringProgress >= 1 ? "#10b981" : "#D4AF37"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              style={{
                transition: "stroke-dasharray 0.3s ease",
                filter: `drop-shadow(0 0 6px ${ringProgress >= 1 ? "rgba(16,185,129,0.5)" : "rgba(212,175,55,0.4)"})`,
              }}
            />
          </svg>
          {/* Center count */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-bold leading-none"
              style={{
                fontSize:
                  count >= 1000 ? "1rem" : count >= 100 ? "1.2rem" : "1.5rem",
                color: "#D4AF37",
                textShadow: "0 0 12px rgba(212,175,55,0.4)",
              }}
            >
              {count}
            </span>
            <span className="text-[8px] text-white/25 mt-0.5">tasbih</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1">
          {/* Milestone */}
          {milestone && (
            <div
              className="mb-3 px-3 py-1.5 rounded-lg text-center"
              style={{
                background: `${milestone.color}15`,
                border: `1px solid ${milestone.color}30`,
              }}
            >
              <p
                className="text-[11px] font-semibold"
                style={{ color: milestone.color }}
              >
                {milestone.label}
              </p>
            </div>
          )}

          {/* Next milestone */}
          {!milestone && (
            <div className="mb-3">
              <p className="text-[10px] text-white/25 mb-1">Agli milestone:</p>
              <div className="flex gap-1 flex-wrap">
                {TASBIH_MILESTONES.filter((m) => m > count)
                  .slice(0, 3)
                  .map((m) => (
                    <span
                      key={m}
                      className="text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.08)",
                        color: "rgba(212,175,55,0.5)",
                        border: "1px solid rgba(212,175,55,0.12)",
                      }}
                    >
                      {m}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Tasbih text hints */}
          <div className="space-y-1 mb-3">
            {[
              { text: "سُبْحَانَ اللَّهِ", urdu: "33x" },
              { text: "اَلْحَمْدُ لِلَّهِ", urdu: "33x" },
              { text: "اَللَّهُ أَكْبَرُ", urdu: "33x" },
            ].map((t) => (
              <div key={t.text} className="flex items-center justify-between">
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(212,175,55,0.55)",
                    fontFamily: "serif",
                    direction: "rtl",
                  }}
                >
                  {t.text}
                </p>
                <span className="text-[9px] text-white/20">{t.urdu}</span>
              </div>
            ))}
          </div>

          {/* Main tap button */}
          <button
            type="button"
            data-ocid="tasbih.increment.button"
            onClick={onIncrement}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)",
              border: "1px solid rgba(212,175,55,0.35)",
              color: "#D4AF37",
              boxShadow: "0 0 16px rgba(212,175,55,0.12)",
              letterSpacing: "0.05em",
            }}
          >
            📿 Tap — Subhanallah
          </button>
        </div>
      </div>
    </div>
  );
}

export default TasbiHCounter;
