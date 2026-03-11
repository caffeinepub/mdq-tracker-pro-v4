import { useRef, useState } from "react";
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

interface AdvancedInfo {
  arabic: string;
  emoji: string;
  rakaat: string;
  desc: string;
  fazilat: string[];
  hadithSource: string;
  waqt: string;
}

const ADVANCED_INFO: Record<AdvancedPrayerName, AdvancedInfo> = {
  Tahajjud: {
    arabic: "تَهَجُّد",
    emoji: "🌙",
    rakaat: "2-8 Rakaat",
    waqt: "Aadhi raat ke baad — Fajr se pehle",
    desc: "Raat ki sabse afzal nafl namaz — Allah ke sabse qareeb hone ka waqt",
    fazilat: [
      "Rasulullah ﷺ ne farmaya: 'Tahajjud parhne wala jannat mein salamati ke saath daakhil hoga.' (Ibn Majah)",
      "'Farz ke baad afzal namaz Tahajjud hai.' (Muslim)",
      "Ramzan ke ilawa bhi Allah Ta'ala raat ke aakhri tehai mein nazil hota hai aur farmata hai: 'Kaun hai jo dua kare?' (Bukhari & Muslim)",
      "'Jo shaks Tahajjud ki namaz qaim kare, uske liye jannat mein ek mahal tayar kiya jaayega.' (Tirmizi)",
    ],
    hadithSource: "Bukhari, Muslim, Tirmizi",
  },
  Ishraq: {
    arabic: "اِشْرَاق",
    emoji: "🌅",
    rakaat: "2-4 Rakaat",
    waqt: "Suraj nikalne ke 15-20 min baad",
    desc: "Fajr ke baad baithkar zikr karo, phir suraj nikalne ke baad 2-4 rakat paro",
    fazilat: [
      "Rasulullah ﷺ ne farmaya: 'Jo Fajr jamaat se parhe, phir Allah ka zikr karta rahe suraj nikalne tak, phir do rakat parhe — toh usse hajj aur umrah ka sawab milega.' (Tirmizi)",
      "'Ishraq ki namaz se banda Allah ki hifazat mein rehta hai poore din.' (Abu Dawud)",
    ],
    hadithSource: "Tirmizi, Abu Dawud",
  },
  Chasht: {
    arabic: "چَاشْت",
    emoji: "☀️",
    rakaat: "2-12 Rakaat",
    waqt: "Suraj taali par pahunchne ke baad, Dhuhr se 30 min pehle tak",
    desc: "Salat-ul-Duha — din ke chadhtay waqt ki nafl namaz",
    fazilat: [
      "Rasulullah ﷺ ne farmaya: 'Insaan ke jism mein 360 jod hain, har jod ka sadqa lagta hai — aur Chasht ki do rakat un tamam sadqon ke liye kaafi hai.' (Muslim)",
      "'Jo roz Chasht ki 4 rakat parhe, Allah uska din ka kaam aasaan kar deta hai.' (Tirmizi)",
    ],
    hadithSource: "Muslim, Bukhari, Tirmizi",
  },
  Awwabin: {
    arabic: "اَوَّابِیْن",
    emoji: "🌇",
    rakaat: "6 Rakaat (2-2 ya 3 salaam se)",
    waqt: "Maghrib ke baad — Isha se pehle",
    desc: "Taaib aur Allah ki taraf rujoo karne walon ki namaz",
    fazilat: [
      "Rasulullah ﷺ ne farmaya: 'Jo Maghrib ke baad 6 rakat parhe — usse 12 saal ki ibadat ka sawab milega.' (Tirmizi)",
      "'Awwabin woh log hain jo gunah ke baad tawba karte hain aur ibadat ki taraf laut aate hain.'",
    ],
    hadithSource: "Tirmizi, Ibn Majah",
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
    background:rgba(255,255,255,0.3);animation:ripple 0.55s ease-out forwards;
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
  const [showFazilat, setShowFazilat] = useState(false);
  const locked = isPrayerLocked(time, status);
  const isMarked = status !== "unmarked";
  const info = ADVANCED_INFO[name];
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={`card-enter rounded-2xl p-4 transition-all duration-300 ${
        locked ? "opacity-50 pointer-events-none" : ""
      } ${isMarked ? "spring-pop" : ""}`}
      style={{
        animationDelay: `${index * 0.08}s`,
        background: isMarked ? "rgba(5,150,105,0.04)" : "#ffffff",
        border: isMarked
          ? "1px solid rgba(5,150,105,0.25)"
          : locked
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(5,150,105,0.12)",
        boxShadow: isMarked
          ? "0 4px 20px rgba(5,150,105,0.1)"
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: isMarked
                ? "rgba(5,150,105,0.1)"
                : "rgba(212,175,55,0.07)",
              border: isMarked
                ? "1px solid rgba(5,150,105,0.2)"
                : "1px solid rgba(212,175,55,0.15)",
            }}
          >
            {locked ? "🔒" : info.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="font-semibold text-sm"
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
                  fontFamily: "'Amiri', serif",
                  color: "rgba(184,148,30,0.6)",
                  direction: "rtl",
                }}
              >
                {info.arabic}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p
                className="text-[10px]"
                style={{
                  color: isMarked ? "#059669" : "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {formatTime(time)}
              </p>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.07)",
                  color: "#b8941e",
                  border: "1px solid rgba(212,175,55,0.12)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {info.rakaat}
              </span>
            </div>
          </div>
        </div>
        {isMarked && (
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(5,150,105,0.08)",
              border: "1px solid rgba(5,150,105,0.2)",
            }}
          >
            <span
              className="text-[11px] font-bold"
              style={{ color: "#059669", fontFamily: "'Poppins', sans-serif" }}
            >
              ✦ {status === "jamaat" ? "Jamaat" : "Padh Li"}
            </span>
          </div>
        )}
      </div>

      <p
        className="text-[10px] mb-1 leading-relaxed px-1"
        style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
      >
        🕐 {info.waqt}
      </p>
      <p
        className="text-[10px] mb-3 leading-relaxed px-1"
        style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
      >
        {info.desc}
      </p>

      {/* Fazilat Toggle */}
      <button
        type="button"
        onClick={() => setShowFazilat((v) => !v)}
        className="w-full text-left mb-3 px-3 py-2 rounded-xl flex items-center justify-between transition-all active:scale-95"
        style={{
          background: showFazilat
            ? "rgba(212,175,55,0.08)"
            : "rgba(212,175,55,0.04)",
          border: "1px solid rgba(212,175,55,0.12)",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span
          className="text-[10px] font-semibold"
          style={{ color: "#b8941e", fontFamily: "'Poppins', sans-serif" }}
        >
          ✨ Fazilat & Hadith dekhein
        </span>
        <span className="text-[10px]" style={{ color: "#b8941e" }}>
          {showFazilat ? "▲" : "▼"}
        </span>
      </button>

      {showFazilat && (
        <div
          className="mb-3 rounded-xl p-3 space-y-2"
          style={{
            background: "rgba(212,175,55,0.03)",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        >
          <p
            className="text-[9px] uppercase tracking-wider mb-2"
            style={{ color: "#b8941e", fontFamily: "'Poppins', sans-serif" }}
          >
            Hadith — {info.hadithSource}
          </p>
          {info.fazilat.map((f, i) => (
            <div key={f.slice(0, 30)} className="flex items-start gap-2">
              <span
                className="text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{ color: "#b8941e" }}
              >
                {i + 1}.
              </span>
              <p
                className="text-[10px] leading-relaxed"
                style={{
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {f}
              </p>
            </div>
          ))}
        </div>
      )}

      <div
        className="mb-3"
        style={{ height: "1px", background: "rgba(5,150,105,0.08)" }}
      />

      {!isMarked && !locked && (
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              s: "single" as const,
              label: "Akele Padha",
              color: "#2563eb",
              bg: "rgba(59,130,246,0.08)",
              border: "rgba(59,130,246,0.2)",
              ocid: `advanced.${name.toLowerCase()}.single.button`,
            },
            {
              s: "jamaat" as const,
              label: "Jamaat Se",
              color: "#059669",
              bg: "rgba(5,150,105,0.08)",
              border: "rgba(5,150,105,0.2)",
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
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {isMarked && (
        <div className="grid grid-cols-2 gap-2">
          {["Akele Padha", "Jamaat Se"].map((label) => (
            <button
              key={label}
              type="button"
              disabled
              className="text-[11px] py-2.5 px-2 rounded-xl font-semibold opacity-25 cursor-not-allowed"
              style={{
                background: "rgba(5,150,105,0.06)",
                color: "#059669",
                minHeight: "40px",
                fontFamily: "'Poppins', sans-serif",
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
