import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useRef, useState } from "react";
import type {
  NafilFormData,
  PrayerName,
  PrayerStatus,
  SunnahStatus,
} from "../../types";

interface SunnahDef {
  key: string;
  label: string;
  rakaat: string;
  muakkadah: boolean;
}

const PRAYER_SUNNAH: Record<PrayerName, SunnahDef[]> = {
  Fajr: [
    {
      key: "Fajr_before",
      label: "Sunnah (Fajr se Pahle)",
      rakaat: "2",
      muakkadah: true,
    },
  ],
  Dhuhr: [
    {
      key: "Dhuhr_before",
      label: "Sunnah (Zohar se Pahle)",
      rakaat: "4",
      muakkadah: true,
    },
    {
      key: "Dhuhr_after",
      label: "Sunnah (Zohar ke Baad)",
      rakaat: "2",
      muakkadah: true,
    },
  ],
  Asr: [
    {
      key: "Asr_before",
      label: "Sunnah (Asr se Pahle)",
      rakaat: "4",
      muakkadah: false,
    },
  ],
  Maghrib: [
    {
      key: "Maghrib_after",
      label: "Sunnah (Maghrib ke Baad)",
      rakaat: "2",
      muakkadah: true,
    },
  ],
  Isha: [
    {
      key: "Isha_before",
      label: "Sunnah (Isha se Pahle)",
      rakaat: "4",
      muakkadah: false,
    },
    {
      key: "Isha_after",
      label: "Sunnah (Isha ke Baad)",
      rakaat: "2",
      muakkadah: true,
    },
    { key: "Isha_witr", label: "Witr", rakaat: "3", muakkadah: true },
  ],
};

const TARAWEEH_OPTIONS = [4, 8, 12, 16, 20];

interface PrayerCardProps {
  name: PrayerName;
  time: string;
  status: PrayerStatus;
  sunnahData?: Record<string, SunnahStatus>;
  taraweeh?: number;
  onMark: (name: PrayerName, status: PrayerStatus) => void;
  onMarkSunnah?: (key: string, status: SunnahStatus) => void;
  onMarkTaraweeh?: (count: number) => void;
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

const PRAYER_DESC: Record<PrayerName, string> = {
  Fajr: "Subah ki Namaz",
  Dhuhr: "Dopahar ki Namaz",
  Asr: "Sham se Pahle",
  Maghrib: "Sham ki Namaz",
  Isha: "Raat ki Namaz",
};

const STATUS_CONFIG = {
  jamaat: {
    label: "Jamaat",
    color: "#059669",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    glow: "rgba(16,185,129,0.1)",
    cardBg: "rgba(16,185,129,0.04)",
    icon: "✦",
  },
  single: {
    label: "Single",
    color: "#2563eb",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    glow: "rgba(59,130,246,0.1)",
    cardBg: "rgba(59,130,246,0.04)",
    icon: "✓",
  },
  qaza: {
    label: "Qaza",
    color: "#dc2626",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.1)",
    cardBg: "rgba(239,68,68,0.04)",
    icon: "⚑",
  },
  unmarked: {
    label: "",
    color: "",
    bg: "",
    border: "",
    glow: "",
    cardBg: "",
    icon: "",
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
  circle.style.cssText = `position:absolute;border-radius:50%;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;background:rgba(255,255,255,0.35);animation:ripple 0.55s ease-out forwards;pointer-events:none;transform:scale(0);`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

export function PrayerCard({
  name,
  time,
  status,
  sunnahData = {},
  taraweeh = 0,
  onMark,
  onMarkSunnah,
  onMarkTaraweeh,
  index = 0,
}: PrayerCardProps) {
  const locked = isPrayerLocked(time, status);
  const isMarked = status !== "unmarked";
  const statusConfig = STATUS_CONFIG[status];
  const cardRef = useRef<HTMLDivElement>(null);
  const delayClass = `card-enter card-enter-${Math.min(index + 1, 5)}`;
  const sunnahDefs = PRAYER_SUNNAH[name];
  const [taraweehOpen, setTaraweehOpen] = useState(false);

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl transition-all duration-300 ${delayClass}`}
      style={{
        background: isMarked
          ? statusConfig.cardBg
          : locked
            ? "rgba(0,0,0,0.03)"
            : "#ffffff",
        border: isMarked
          ? `1px solid ${statusConfig.border}`
          : locked
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(212,175,55,0.12)",
        boxShadow: isMarked
          ? `0 4px 20px ${statusConfig.glow}`
          : "0 2px 12px rgba(0,0,0,0.06)",
        opacity: locked ? 0.6 : 1,
        overflow: "hidden",
      }}
    >
      {/* Gold top border */}
      <div
        style={{
          height: "3px",
          background: isMarked
            ? status === "qaza"
              ? "linear-gradient(90deg,#ef4444,#dc2626)"
              : status === "jamaat"
                ? "linear-gradient(90deg,#10b981,#059669)"
                : "linear-gradient(90deg,#3b82f6,#2563eb)"
            : "linear-gradient(90deg,#D4AF37,#b8941e,#D4AF37)",
        }}
      />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                background: isMarked
                  ? statusConfig.bg
                  : "rgba(212,175,55,0.08)",
                border: isMarked
                  ? `1px solid ${statusConfig.border}`
                  : "1px solid rgba(212,175,55,0.15)",
              }}
            >
              {locked ? "🔒" : PRAYER_EMOJI[name]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className="font-semibold text-sm tracking-wide"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {name}
                </h3>
                <span
                  className="text-sm"
                  style={{
                    color: "rgba(184,148,30,0.5)",
                    fontFamily: "'Amiri', serif",
                  }}
                >
                  {PRAYER_ARABIC[name]}
                </span>
              </div>
              <p
                className="text-xs mt-0.5"
                style={{
                  color: isMarked ? statusConfig.color : "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {isMarked
                  ? formatTime(time)
                  : `${PRAYER_DESC[name]} • ${formatTime(time)}`}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            {locked && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.05)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Lock size={11} style={{ color: "#8a9bb0" }} />
                <span
                  className="text-[11px] font-medium"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Locked
                </span>
              </div>
            )}
            {isMarked && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: statusConfig.bg,
                  border: `1px solid ${statusConfig.border}`,
                }}
              >
                <span
                  className="text-xs font-bold"
                  style={{
                    color: statusConfig.color,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {statusConfig.icon} {statusConfig.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sunnah rows */}
        {!locked && sunnahDefs.length > 0 && (
          <div className="mb-3 space-y-2">
            <p
              className="text-[9px] uppercase tracking-widest font-semibold mb-1"
              style={{
                color: "rgba(184,148,30,0.5)",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Sunnah Namazein
            </p>
            {sunnahDefs.map((s) => {
              const done = sunnahData[s.key] === "done";
              return (
                <div
                  key={s.key}
                  className="flex items-center justify-between rounded-xl px-3 py-2"
                  style={{
                    background: done
                      ? "rgba(16,185,129,0.06)"
                      : "rgba(212,175,55,0.04)",
                    border: done
                      ? "1px solid rgba(16,185,129,0.2)"
                      : "1px solid rgba(212,175,55,0.1)",
                  }}
                >
                  <div>
                    <p
                      className="text-[11px] font-medium"
                      style={{
                        color: done ? "#059669" : "#4a5568",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="text-[9px]"
                      style={{
                        color: "#8a9bb0",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {s.rakaat} Rakat
                      {s.muakkadah ? " • Muakkadah" : " • Ghair Muakkadah"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onMarkSunnah?.(s.key, done ? "unmarked" : "unmarked")
                      }
                      className="text-[10px] px-2 py-1 rounded-lg font-medium transition-all active:scale-95"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        color: "#b8941e",
                        border: "1px solid rgba(212,175,55,0.2)",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                        minWidth: "60px",
                        textAlign: "center",
                      }}
                    >
                      InshaAllah
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onMarkSunnah?.(s.key, done ? "unmarked" : "done")
                      }
                      className="text-[10px] px-2 py-1 rounded-lg font-medium transition-all active:scale-95"
                      style={{
                        background: done
                          ? "linear-gradient(135deg,#10b981,#059669)"
                          : "rgba(16,185,129,0.08)",
                        color: done ? "white" : "#059669",
                        border: done
                          ? "none"
                          : "1px solid rgba(16,185,129,0.25)",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                        minWidth: "70px",
                        textAlign: "center",
                      }}
                    >
                      {done ? "✓ Alhamdulillah" : "Alhamdulillah"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Divider before Farz */}
        <div className="mb-3 flex items-center gap-2">
          <div
            style={{ height: "1px", flex: 1, background: "rgba(0,0,0,0.06)" }}
          />
          <p
            className="text-[9px] uppercase tracking-widest font-semibold"
            style={{
              color: "rgba(184,148,30,0.6)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Farz
          </p>
          <div
            style={{ height: "1px", flex: 1, background: "rgba(0,0,0,0.06)" }}
          />
        </div>

        {/* Farz Action Buttons */}
        {!isMarked && !locked && (
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                s: "single" as PrayerStatus,
                cls: "btn-blue",
                label: "Single",
                ocid: `prayer.${name.toLowerCase()}.single.button`,
              },
              {
                s: "jamaat" as PrayerStatus,
                cls: "btn-emerald",
                label: "Jamaat",
                ocid: `prayer.${name.toLowerCase()}.jamaat.button`,
              },
              {
                s: "qaza" as PrayerStatus,
                cls: "btn-ruby",
                label: "Qaza",
                ocid: `prayer.${name.toLowerCase()}.qaza.button`,
              },
            ].map(({ s, cls, label, ocid }) => (
              <button
                key={s}
                type="button"
                data-ocid={ocid}
                onClick={(e) => {
                  createRipple(e);
                  onMark(name, s);
                }}
                className={`${cls} text-xs py-2.5 px-2 font-semibold transition-all active:scale-95 relative overflow-hidden`}
                style={{
                  minHeight: "44px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {isMarked && (
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                color: "#2563eb",
                bg: "rgba(59,130,246,0.06)",
                label: "Single",
              },
              {
                color: "#059669",
                bg: "rgba(16,185,129,0.06)",
                label: "Jamaat",
              },
              { color: "#dc2626", bg: "rgba(239,68,68,0.06)", label: "Qaza" },
            ].map(({ color, bg, label }) => (
              <button
                key={label}
                type="button"
                disabled
                className="text-[11px] py-2.5 px-2 rounded-xl font-semibold opacity-30 cursor-not-allowed"
                style={{
                  background: bg,
                  color,
                  minHeight: "44px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Taraweeh (Isha only) */}
        {name === "Isha" && !locked && (
          <div className="mt-3">
            <button
              type="button"
              data-ocid="prayer.isha.taraweeh.toggle"
              onClick={() => setTaraweehOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all active:scale-95"
              style={{
                background:
                  taraweeh > 0 ? "rgba(212,175,55,0.1)" : "rgba(0,0,0,0.03)",
                border:
                  taraweeh > 0
                    ? "1px solid rgba(212,175,55,0.3)"
                    : "1px solid rgba(0,0,0,0.07)",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                className="text-[11px] font-semibold"
                style={{
                  color: taraweeh > 0 ? "#b8941e" : "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                🌙 Taraweeh {taraweeh > 0 ? `(${taraweeh} Rakaat ✓)` : ""}
              </span>
              {taraweehOpen ? (
                <ChevronUp size={14} style={{ color: "#b8941e" }} />
              ) : (
                <ChevronDown size={14} style={{ color: "#8a9bb0" }} />
              )}
            </button>
            {taraweehOpen && (
              <div className="mt-2 grid grid-cols-5 gap-1.5 fade-in">
                {TARAWEEH_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    data-ocid={`prayer.isha.taraweeh.${n}.button`}
                    onClick={() => {
                      onMarkTaraweeh?.(n);
                      setTaraweehOpen(false);
                    }}
                    className="py-2 rounded-xl text-[11px] font-bold transition-all active:scale-95"
                    style={{
                      background:
                        taraweeh === n
                          ? "linear-gradient(135deg,#D4AF37,#b8941e)"
                          : "rgba(212,175,55,0.08)",
                      color: taraweeh === n ? "white" : "#b8941e",
                      border:
                        taraweeh === n
                          ? "none"
                          : "1px solid rgba(212,175,55,0.2)",
                      boxShadow:
                        taraweeh === n
                          ? "0 2px 8px rgba(212,175,55,0.4)"
                          : "none",
                      fontFamily: "'Poppins', sans-serif",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrayerCard;
