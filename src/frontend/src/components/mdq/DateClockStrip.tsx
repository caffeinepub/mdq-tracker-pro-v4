import { useEffect, useState } from "react";
import { getHijriDate } from "../../utils/hijri";

const URDU_DAYS = [
  "Itwar",
  "Peer",
  "Mangal",
  "Budh",
  "Jumerat",
  "Juma",
  "Hafta",
];
const ENG_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatClock(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} ${ampm}`;
}

export function DateClockStrip() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dayEng = now.toLocaleDateString("en-US", { weekday: "short" });
  const dateNum = now.getDate();
  const monthEng = ENG_MONTHS[now.getMonth()];
  const dayUrdu = URDU_DAYS[now.getDay()];

  const hijri = getHijriDate();
  const clock = formatClock(now);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        background: "rgba(255,255,255,0.97)",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
        gap: "4px",
      }}
    >
      {/* Left: Gregorian */}
      <div style={{ textAlign: "left", flex: 1 }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "#1a2035",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.2,
          }}
        >
          {dayEng}, {dateNum} {monthEng}
        </p>
        <p
          style={{
            fontSize: "9px",
            color: "#8a9bb0",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.2,
          }}
        >
          {now.getFullYear()}
        </p>
      </div>

      {/* Center: Live Clock */}
      <div style={{ textAlign: "center", flex: 1 }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "800",
            letterSpacing: "0.05em",
            fontFamily: "'Poppins', monospace",
            background: "linear-gradient(90deg, #b8941e, #D4AF37, #b8941e)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
          }}
        >
          {clock}
        </p>
      </div>

      {/* Right: Hijri/Urdu */}
      <div style={{ textAlign: "right", flex: 1 }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "#b8941e",
            fontFamily: "'Amiri', serif",
            lineHeight: 1.2,
            direction: "rtl",
          }}
        >
          {hijri.day} {hijri.monthUrdu}
        </p>
        <p
          style={{
            fontSize: "9px",
            color: "#8a9bb0",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.2,
            direction: "ltr",
          }}
        >
          {dayUrdu}
        </p>
      </div>
    </div>
  );
}

export default DateClockStrip;
