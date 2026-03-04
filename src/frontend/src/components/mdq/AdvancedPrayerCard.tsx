import { useRef } from "react";
import type { AdvancedPrayerName, PrayerStatus } from "../../types";

interface AdvancedPrayerCardProps {
  name: AdvancedPrayerName;
  time: string;
  status: PrayerStatus;
  onMark: (name: AdvancedPrayerName, status: "single" | "jamaat") => void;
  index?: number;
}

function isPrayerLocked(prayerTime: string, status: PrayerStatus): boolean {
  if (status !== "unmarked") return false;
  const [ph, pm] = prayerTime.split(":").map(Number);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const prayerMins = ph * 60 + pm;
  return nowMins < prayerMins;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}

const ADVANCED_INFO: Record<
  AdvancedPrayerName,
  { arabic: string; emoji: string; rakaat: string; desc: string }
> = {
  Tahajjud: {
    arabic: "تهجد",
    emoji: "🌙",
    rakaat: "2-8 Rakaat",
    desc: "Raat ki nafl namaz — Allah ke qareeb hone ka behtareen zariya",
  },
  Ishraq: {
    arabic: "اشراق",
    emoji: "🌅",
    rakaat: "2-4 Rakaat",
    desc: "Fajr ke baad suraj nikalne ke ~20 min baad padhi jaati hai",
  },
  Chasht: {
    arabic: "چاشت",
    emoji: "☀️",
    rakaat: "2-12 Rakaat",
    desc: "Chasht ki namaz — dinh ke waqt ki nafl namaz",
  },
  Awwabin: {
    arabic: "اوابین",
    emoji: "🌇",
    rakaat: "6 Rakaat",
    desc: "Maghrib ke baad padhi jaane wali nafl namaz",
  },
};

function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const existing = btn.querySelector(".ripple-el");
  if (existing) existing.remove();
  const circle = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  circle.className = "ripple-el";
  circle.style.cssText = `
    position:absolute;border-radius:50%;width:${size}px;height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;
    background:rgba(255,255,255,0.2);animation:ripple 0.55s ease-out forwards;
    pointer-events:none;transform:scale(0);
  `;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

export function AdvancedPrayerCard({
  name,
  time,
  status,
  onMark,
  index = 0,
}: AdvancedPrayerCardProps) {
  const locked = isPrayerLocked(time, status);
  const isMarked = status !== "unmarked";
  const info = ADVANCED_INFO[name];
  const cardRef = useRef<HTMLDivElement>(null);

  const delayStyle = { animationDelay: `${index * 0.08}s` };

  return (
    <div
      ref={cardRef}
      className={`card-enter glass rounded-2xl p-4 transition-all duration-300 ${
        locked ? "opacity-40 pointer-events-none" : ""
      } ${isMarked ? "spring-pop" : ""}`}
      style={{
        ...delayStyle,
        border: isMarked
          ? "1px solid rgba(16,185,129,0.35)"
          : locked
            ? "1px solid rgba(255,255,255,0.04)"
            : "1px solid rgba(16,185,129,0.15)",
        boxShadow: isMarked
          ? "0 4px 24px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "none",
        background: isMarked
          ? "rgba(16,185,129,0.04)"
          : "rgba(255,255,255,0.025)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        {/* Left: Icon + Name */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: isMarked
                ? "rgba(16,185,129,0.15)"
                : "rgba(255,255,255,0.04)",
              border: isMarked
                ? "1px solid rgba(16,185,129,0.3)"
                : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {locked ? "🔒" : info.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm">{name}</h3>
              <span
                className="text-sm text-white/25"
                style={{ fontFamily: "serif" }}
              >
                {info.arabic}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p
                className="text-[10px]"
                style={{
                  color: isMarked ? "#10b981" : "rgba(255,255,255,0.35)",
                }}
              >
                {formatTime(time)}
              </p>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  color: "rgba(212,175,55,0.5)",
                  border: "1px solid rgba(212,175,55,0.12)",
                }}
              >
                {info.rakaat}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Status */}
        {isMarked && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <span
              className="text-[11px] font-bold"
              style={{ color: "#10b981" }}
            >
              ✦ {status === "jamaat" ? "Jamaat" : "Padh Li"}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className="text-[10px] mb-3 leading-relaxed px-1"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {info.desc}
      </p>

      {/* Divider */}
      <div
        className="mb-3"
        style={{ height: "1px", background: "rgba(16,185,129,0.08)" }}
      />

      {/* Action Buttons */}
      {!isMarked && !locked && (
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              s: "single" as const,
              label: "Akele Padha",
              color: "#3b82f6",
              bg: "rgba(59,130,246,0.1)",
              border: "rgba(59,130,246,0.25)",
              ocid: `advanced.${name.toLowerCase()}.single.button`,
            },
            {
              s: "jamaat" as const,
              label: "Jamaat Se",
              color: "#10b981",
              bg: "rgba(16,185,129,0.1)",
              border: "rgba(16,185,129,0.25)",
              ocid: `advanced.${name.toLowerCase()}.jamaat.button`,
            },
          ].map(({ s, label, color, bg, border, ocid }) => (
            <button
              key={s}
              type="button"
              data-ocid={ocid}
              onClick={(e) => {
                createRipple(e);
                onMark(name, s);
              }}
              className="text-xs py-2.5 px-2 rounded-xl font-semibold transition-all active:scale-95 relative overflow-hidden"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                color,
                minHeight: "40px",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Frozen */}
      {isMarked && (
        <div className="grid grid-cols-2 gap-2">
          {["Akele Padha", "Jamaat Se"].map((label) => (
            <button
              key={label}
              type="button"
              disabled
              className="text-[11px] py-2.5 px-2 rounded-xl font-semibold opacity-20 cursor-not-allowed"
              style={{
                background: "rgba(16,185,129,0.06)",
                color: "#10b981",
                minHeight: "40px",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdvancedPrayerCard;
