interface CircularProgressProps {
  count: number;
  total?: number;
}

export function CircularProgress({ count, total = 5 }: CircularProgressProps) {
  const size = 190;
  const strokeWidth = 12;
  const outerGlowWidth = 22;
  const radius = (size - outerGlowWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? count / total : 0;
  const dashOffset = circumference * (1 - progress);
  const isComplete = count === total;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          role="img"
          aria-label="Jamaat prayer progress ring"
          style={{ overflow: "visible" }}
        >
          {/* Ambient glow ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius + 6}
            fill="none"
            stroke={
              isComplete ? "rgba(16,185,129,0.1)" : "rgba(212,175,55,0.08)"
            }
            strokeWidth={20}
          />
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.07)"
            strokeWidth={strokeWidth}
          />
          {/* Tick marks */}
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
            .slice(0, total)
            .map((p, i) => {
              const angle = (i / total) * 2 * Math.PI;
              const tickR1 = radius - strokeWidth / 2 - 2;
              const tickR2 = radius + strokeWidth / 2 + 2;
              const x1 = size / 2 + tickR1 * Math.cos(angle);
              const y1 = size / 2 + tickR1 * Math.sin(angle);
              const x2 = size / 2 + tickR2 * Math.cos(angle);
              const y2 = size / 2 + tickR2 * Math.sin(angle);
              return (
                <line
                  key={p}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1.5"
                />
              );
            })}
          {/* Complete pulse ring */}
          {isComplete && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius + 14}
              fill="none"
              stroke="rgba(16,185,129,0.35)"
              strokeWidth={2}
              strokeDasharray="6 8"
              className="ring-complete-pulse"
              style={{
                transformOrigin: `${size / 2}px ${size / 2}px`,
                animation:
                  "ringCompletePulse 2s ease-in-out infinite, orbitSpin 12s linear infinite",
              }}
            />
          )}
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isComplete ? "#059669" : "#D4AF37"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition:
                "stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.6s ease",
              filter: isComplete
                ? "drop-shadow(0 0 8px rgba(5,150,105,0.6))"
                : "drop-shadow(0 0 8px rgba(212,175,55,0.6))",
            }}
          />
          {/* Dot markers */}
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
            .slice(0, total)
            .map((p, i) => {
              const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
              const dotX = size / 2 + radius * Math.cos(angle);
              const dotY = size / 2 + radius * Math.sin(angle);
              const isFilled = i < count;
              return (
                <circle
                  key={p}
                  cx={dotX}
                  cy={dotY}
                  r={isFilled ? 6 : 4}
                  fill={
                    isFilled
                      ? isComplete
                        ? "#059669"
                        : "#D4AF37"
                      : "rgba(0,0,0,0.1)"
                  }
                  style={{
                    filter: isFilled
                      ? `drop-shadow(0 0 5px ${isComplete ? "rgba(5,150,105,0.8)" : "rgba(212,175,55,0.8)"})`
                      : "none",
                    transition: "fill 0.5s ease",
                  }}
                />
              );
            })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`block font-bold leading-none ${isComplete ? "" : "shimmer-gold"}`}
            style={{
              fontSize: "3.2rem",
              fontFamily: "'Poppins', sans-serif",
              color: isComplete ? "#059669" : "#D4AF37",
              textShadow: isComplete
                ? "0 0 20px rgba(5,150,105,0.4)"
                : "0 0 20px rgba(212,175,55,0.4)",
              transition: "color 0.5s ease",
            }}
          >
            {count}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            of {total}
          </span>
          <span
            className="block text-xs font-bold mt-1 tracking-wide"
            style={{
              color: isComplete ? "#059669" : "#b8941e",
              letterSpacing: "0.06em",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {isComplete ? "Mukammal ✦" : "Jamaat"}
          </span>
        </div>
      </div>

      <div className="mt-1 text-center">
        <p
          className="text-[11px] uppercase tracking-widest"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          Today's Jamaat Progress
        </p>
        {isComplete && (
          <p
            className="text-xs font-bold mt-1.5 fade-in"
            style={{ color: "#059669", fontFamily: "'Poppins', sans-serif" }}
          >
            MaashaAllah! Tamam Namazein ✦
          </p>
        )}
      </div>
    </div>
  );
}

export default CircularProgress;
