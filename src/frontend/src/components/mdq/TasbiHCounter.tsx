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
  if (count >= 1000) return { label: "MaashaAllah! 1000+ ✦", color: "#b8941e" };
  if (count >= 500) return { label: "SubhanAllah! 500+ 🌟", color: "#b8941e" };
  if (count >= 300)
    return { label: "Alhamdulillah! 300+ ✨", color: "#059669" };
  if (count >= 100) return { label: "Baarak Allah! 100 ✓", color: "#059669" };
  if (count >= 99) return { label: "Tasbih Mukammal! 99 🤲", color: "#059669" };
  if (count >= 66)
    return { label: "Do Tihaye Mukammal! 66 🌙", color: "#2563eb" };
  if (count >= 33)
    return { label: "Ek Tihaya Mukammal! 33 ✦", color: "#b8941e" };
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
      className="rounded-2xl p-4"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(212,175,55,0.15)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
      data-ocid="tasbih.card"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3
            className="font-bold text-sm shimmer-gold tracking-wide"
            style={{ fontFamily: "'Amiri', 'Georgia', serif" }}
          >
            💿 Tasbih Counter
          </h3>
          <p
            className="text-[10px] mt-0.5"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
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
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
            WebkitTapHighlightColor: "transparent",
          }}
          title="Reset"
        >
          <RotateCcw size={13} style={{ color: "rgba(220,38,38,0.6)" }} />
        </button>
      </div>

      <div className="flex items-center gap-5">
        {/* Ring */}
        <div className="relative flex-shrink-0">
          <svg
            width="88"
            height="88"
            className="-rotate-90"
            role="img"
            aria-label="Tasbih progress ring"
          >
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="5"
            />
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke={ringProgress >= 1 ? "#059669" : "#D4AF37"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${circumference}`}
              style={{
                transition: "stroke-dasharray 0.3s ease",
                filter: `drop-shadow(0 0 5px ${ringProgress >= 1 ? "rgba(5,150,105,0.5)" : "rgba(212,175,55,0.4)"})`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-bold leading-none"
              style={{
                fontSize:
                  count >= 1000 ? "1rem" : count >= 100 ? "1.2rem" : "1.5rem",
                color: "#b8941e",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {count}
            </span>
            <span
              className="text-[8px] mt-0.5"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              tasbih
            </span>
          </div>
        </div>

        <div className="flex-1">
          {milestone && (
            <div
              className="mb-3 px-3 py-1.5 rounded-lg text-center"
              style={{
                background: `${milestone.color}12`,
                border: `1px solid ${milestone.color}25`,
              }}
            >
              <p
                className="text-[11px] font-semibold"
                style={{
                  color: milestone.color,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {milestone.label}
              </p>
            </div>
          )}
          {!milestone && (
            <div className="mb-3">
              <p
                className="text-[10px] mb-1"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Agli milestone:
              </p>
              <div className="flex gap-1 flex-wrap">
                {TASBIH_MILESTONES.filter((m) => m > count)
                  .slice(0, 3)
                  .map((m) => (
                    <span
                      key={m}
                      className="text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.08)",
                        color: "#b8941e",
                        border: "1px solid rgba(212,175,55,0.15)",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {m}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className="space-y-1 mb-3">
            {[
              { text: "سُبْحَانَ اللَّهِ", urdu: "33x" },
              { text: "اَلْحَمْدُ لِللَّهِ", urdu: "33x" },
              { text: "اَللَّهُ أَكْبَرُ", urdu: "33x" },
            ].map((t) => (
              <div key={t.text} className="flex items-center justify-between">
                <p
                  className="text-xs"
                  style={{
                    color: "#b8941e",
                    fontFamily: "'Amiri', serif",
                    direction: "rtl",
                  }}
                >
                  {t.text}
                </p>
                <span
                  className="text-[9px]"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {t.urdu}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            data-ocid="tasbih.increment.button"
            onClick={onIncrement}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.06) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#b8941e",
              boxShadow: "0 2px 12px rgba(212,175,55,0.1)",
              letterSpacing: "0.05em",
              fontFamily: "'Poppins', sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            💿 Tap — Subhanallah
          </button>
        </div>
      </div>
    </div>
  );
}

export default TasbiHCounter;
