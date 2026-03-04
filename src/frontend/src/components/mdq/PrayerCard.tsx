import { Lock } from "lucide-react";
import { useRef } from "react";
import type { PrayerName, PrayerStatus } from "../../types";

interface PrayerCardProps {
  name: PrayerName;
  time: string;
  status: PrayerStatus;
  onMark: (name: PrayerName, status: PrayerStatus) => void;
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

const PRAYER_ARABIC: Record<PrayerName, string> = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

const STATUS_CONFIG = {
  jamaat: {
    label: "Jamaat",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.35)",
    glow: "rgba(16,185,129,0.15)",
    icon: "✦",
  },
  single: {
    label: "Single",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    glow: "rgba(59,130,246,0.15)",
    icon: "✓",
  },
  qaza: {
    label: "Qaza",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    glow: "rgba(239,68,68,0.15)",
    icon: "⚑",
  },
  unmarked: { label: "", color: "", bg: "", border: "", glow: "", icon: "" },
};

const nameLower = (name: PrayerName) => name.toLowerCase();

// Ripple effect on button click
function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const existing = btn.querySelector(".ripple-el");
  if (existing) existing.remove();

  const circle = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  circle.className = "ripple-el";
  circle.style.cssText = `
    position:absolute;
    border-radius:50%;
    width:${size}px;
    height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY - rect.top - size / 2}px;
    background:rgba(255,255,255,0.25);
    animation:ripple 0.55s ease-out forwards;
    pointer-events:none;
    transform:scale(0);
  `;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

export function PrayerCard({
  name,
  time,
  status,
  onMark,
  index = 0,
}: PrayerCardProps) {
  const locked = isPrayerLocked(time, status);
  const isMarked = status !== "unmarked";
  const statusConfig = STATUS_CONFIG[status];
  const cardRef = useRef<HTMLDivElement>(null);

  const delayClass = `card-enter card-enter-${Math.min(index + 1, 5)}`;

  return (
    <div
      ref={cardRef}
      className={`glass-premium rounded-2xl p-4 transition-all duration-300 ${delayClass} ${
        locked ? "opacity-40 pointer-events-none" : ""
      } ${isMarked ? "spring-pop" : ""}`}
      style={{
        border: isMarked
          ? `1px solid ${statusConfig.border}`
          : locked
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid rgba(255,255,255,0.09)",
        boxShadow: isMarked
          ? `0 4px 24px ${statusConfig.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        {/* Left: Icon + Name + Time */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300"
            style={{
              background: isMarked
                ? `${statusConfig.bg}`
                : "rgba(255,255,255,0.05)",
              border: isMarked
                ? `1px solid ${statusConfig.border}`
                : "1px solid rgba(255,255,255,0.07)",
              boxShadow: isMarked ? `0 0 14px ${statusConfig.glow}` : "none",
            }}
          >
            {locked ? "🔒" : PRAYER_EMOJI[name]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-white text-sm tracking-wide"
                style={{ letterSpacing: "0.03em" }}
              >
                {name}
              </h3>
              <span
                className="text-sm text-white/25"
                style={{ fontFamily: "serif", letterSpacing: "0.01em" }}
              >
                {PRAYER_ARABIC[name]}
              </span>
            </div>
            <p
              className="text-xs mt-0.5"
              style={{
                color: isMarked ? statusConfig.color : "rgba(255,255,255,0.35)",
              }}
            >
              {formatTime(time)}
            </p>
          </div>
        </div>

        {/* Right: Status or Lock Badge */}
        <div className="flex-shrink-0">
          {locked && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Lock size={11} className="text-white/30" />
              <span className="text-[11px] text-white/30 font-medium">
                Locked
              </span>
            </div>
          )}
          {isMarked && !locked && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.border}`,
                boxShadow: `0 0 10px ${statusConfig.glow}`,
              }}
            >
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: statusConfig.color }}
              >
                {statusConfig.icon} {statusConfig.label}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-3"
        style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
      />

      {/* Action Buttons — unmarked + unlocked */}
      {!isMarked && !locked && (
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              status: "single" as PrayerStatus,
              cls: "btn-blue",
              label: "Single",
              ocid: `prayer.${nameLower(name)}.single.button`,
            },
            {
              status: "jamaat" as PrayerStatus,
              cls: "btn-emerald",
              label: "Jamaat",
              ocid: `prayer.${nameLower(name)}.jamaat.button`,
            },
            {
              status: "qaza" as PrayerStatus,
              cls: "btn-ruby",
              label: "Qaza",
              ocid: `prayer.${nameLower(name)}.qaza.button`,
            },
          ].map(({ status: s, cls, label, ocid }) => (
            <button
              key={s}
              type="button"
              data-ocid={ocid}
              onClick={(e) => {
                createRipple(e);
                onMark(name, s);
              }}
              className={`${cls} text-xs py-2.5 px-2 font-semibold transition-all active:scale-95 relative overflow-hidden`}
              style={{ minHeight: "44px" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Frozen state — already marked */}
      {isMarked && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", label: "Single" },
            { color: "#10b981", bg: "rgba(16,185,129,0.08)", label: "Jamaat" },
            { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "Qaza" },
          ].map(({ color, bg, label }) => (
            <button
              key={label}
              type="button"
              disabled
              className="text-[11px] py-2.5 px-2 rounded-xl font-semibold opacity-25 cursor-not-allowed"
              style={{ background: bg, color, minHeight: "44px" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PrayerCard;
