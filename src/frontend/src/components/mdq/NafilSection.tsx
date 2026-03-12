import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type {
  AdvancedPrayerName,
  NafilFormData,
  PrayerStatus,
} from "../../types";

const NAFIL_INFO: Record<
  AdvancedPrayerName,
  {
    emoji: string;
    label: string;
    arabic: string;
    time: string;
    fazilat: string;
    defaultRakaat: number;
  }
> = {
  Tahajjud: {
    emoji: "🌙",
    label: "Tahajjud",
    arabic: "التهجد",
    time: "Aakhri Raat (3 AM)",
    fazilat:
      "Tahajjud padhne wale logon ke dua Allah zaroor qabool karta hai. (Bukhari)",
    defaultRakaat: 8,
  },
  Ishraq: {
    emoji: "🌅",
    label: "Ishraq",
    arabic: "الإشراق",
    time: "Suraj Ugne ke 15 min baad",
    fazilat:
      "Jo Fajr ke baad Ishraq tak baithe, usse Hajj aur Umrah ka sawab milta hai. (Tirmizi)",
    defaultRakaat: 2,
  },
  Chasht: {
    emoji: "☀️",
    label: "Chasht / Duha",
    arabic: "صلاة الضحى",
    time: "Subah 9-10 baje",
    fazilat: "Chasht ki 2 rakat roz padhna 360 sadqon ke barabar hai. (Muslim)",
    defaultRakaat: 4,
  },
  Awwabin: {
    emoji: "🌇",
    label: "Awwabin",
    arabic: "صلاة الأوابين",
    time: "Maghrib ke baad",
    fazilat:
      "Awwabin 6 rakat padhna 12 saal ki ibadat ke barabar hai. (Ibn Majah)",
    defaultRakaat: 6,
  },
};

interface NafilSectionProps {
  advancedPrayers?: Record<AdvancedPrayerName, PrayerStatus>;
  nafilForms?: Partial<Record<AdvancedPrayerName, NafilFormData>>;
  onMarkNafil?: (name: AdvancedPrayerName, status: "done") => void;
  onSaveNafilForm?: (name: AdvancedPrayerName, data: NafilFormData) => void;
}

function NafilCard({
  name,
  status,
  formData,
  onMark,
  onSaveForm,
}: {
  name: AdvancedPrayerName;
  status: PrayerStatus;
  formData?: NafilFormData;
  onMark: (name: AdvancedPrayerName) => void;
  onSaveForm: (name: AdvancedPrayerName, data: NafilFormData) => void;
}) {
  const info = NAFIL_INFO[name];
  const isDone = status !== "unmarked";
  const [formOpen, setFormOpen] = useState(false);
  const [rakaat, setRakaat] = useState(formData?.rakaat ?? info.defaultRakaat);
  const [surah, setSurah] = useState(formData?.surah ?? "");
  const [duaTopic, setDuaTopic] = useState(formData?.duaTopic ?? "");

  const handleAlhamdulillah = () => {
    onMark(name);
    setFormOpen(true);
  };

  const handleSaveForm = () => {
    onSaveForm(name, { rakaat, surah, duaTopic });
    setFormOpen(false);
  };

  const rakaatId = `nafil-rakaat-${name}`;
  const surahId = `nafil-surah-${name}`;
  const duaTopicId = `nafil-dua-${name}`;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: isDone
          ? "1px solid rgba(16,185,129,0.25)"
          : "1px solid rgba(212,175,55,0.12)",
        background: isDone ? "rgba(16,185,129,0.03)" : "#ffffff",
        marginBottom: "8px",
      }}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{info.emoji}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {info.label}
                </p>
                <span
                  className="text-xs"
                  style={{
                    color: "rgba(184,148,30,0.5)",
                    fontFamily: "'Amiri', serif",
                  }}
                >
                  {info.arabic}
                </span>
              </div>
              <p
                className="text-[10px]"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {info.time}
              </p>
            </div>
          </div>
          {isDone && (
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              ✓ Ada
            </span>
          )}
        </div>
        <p
          className="text-[10px] leading-relaxed mt-2 italic"
          style={{ color: "#6b7280", fontFamily: "'Amiri', serif" }}
        >
          📖 {info.fazilat}
        </p>
        {!isDone && (
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              className="flex-1 text-[11px] py-2 rounded-xl font-medium transition-all active:scale-95"
              style={{
                background: "rgba(212,175,55,0.08)",
                color: "#b8941e",
                border: "1px solid rgba(212,175,55,0.2)",
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              InshaAllah
            </button>
            <button
              type="button"
              onClick={handleAlhamdulillah}
              className="flex-1 text-[11px] py-2 rounded-xl font-semibold transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg,#10b981,#059669)",
                color: "white",
                fontFamily: "'Poppins', sans-serif",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Alhamdulillah ✓
            </button>
          </div>
        )}
        {isDone && formData && (
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.rakaat && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  color: "#059669",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                🕌 {formData.rakaat} Rakaat
              </span>
            )}
            {formData.surah && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  color: "#2563eb",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                📖 {formData.surah}
              </span>
            )}
            {formData.duaTopic && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  color: "#b8941e",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                🤲 {formData.duaTopic}
              </span>
            )}
          </div>
        )}
      </div>
      {formOpen && (
        <div
          className="px-3 pb-3 fade-in"
          style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
        >
          <p
            className="text-[10px] font-semibold mt-2 mb-2"
            style={{ color: "#b8941e", fontFamily: "'Poppins', sans-serif" }}
          >
            Optional: Tafseel likhein (save hogi)
          </p>
          <div className="space-y-2">
            <div>
              <label
                htmlFor={rakaatId}
                className="text-[10px]"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Rakaat:
              </label>
              <input
                id={rakaatId}
                type="number"
                value={rakaat}
                onChange={(e) => setRakaat(Number(e.target.value))}
                className="w-full mt-0.5 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  border: "1px solid rgba(212,175,55,0.2)",
                  background: "rgba(212,175,55,0.04)",
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                htmlFor={surahId}
                className="text-[10px]"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Surah (optional):
              </label>
              <input
                id={surahId}
                type="text"
                value={surah}
                onChange={(e) => setSurah(e.target.value)}
                placeholder="Surah Al-Fatiha..."
                className="w-full mt-0.5 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  border: "1px solid rgba(212,175,55,0.2)",
                  background: "rgba(212,175,55,0.04)",
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                htmlFor={duaTopicId}
                className="text-[10px]"
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Dua Topic (optional):
              </label>
              <input
                id={duaTopicId}
                type="text"
                value={duaTopic}
                onChange={(e) => setDuaTopic(e.target.value)}
                placeholder="Rishte, sehat, rizq..."
                className="w-full mt-0.5 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  border: "1px solid rgba(212,175,55,0.2)",
                  background: "rgba(212,175,55,0.04)",
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                  outline: "none",
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="flex-1 text-[11px] py-2 rounded-xl font-medium"
                style={{
                  background: "rgba(0,0,0,0.06)",
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Skip
              </button>
              <button
                type="button"
                onClick={handleSaveForm}
                className="flex-1 text-[11px] py-2 rounded-xl font-semibold"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#b8941e)",
                  color: "white",
                  fontFamily: "'Poppins', sans-serif",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function NafilSection({
  advancedPrayers = {} as Record<AdvancedPrayerName, PrayerStatus>,
  nafilForms = {},
  onMarkNafil,
  onSaveNafilForm,
}: NafilSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const doneCount = (
    ["Tahajjud", "Ishraq", "Chasht", "Awwabin"] as AdvancedPrayerName[]
  ).filter(
    (n) => advancedPrayers[n] && advancedPrayers[n] !== "unmarked",
  ).length;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(212,175,55,0.2)",
        background: "#ffffff",
        boxShadow: "0 2px 12px rgba(212,175,55,0.06)",
      }}
    >
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg,#D4AF37,#059669,#D4AF37)",
        }}
      />
      <button
        type="button"
        data-ocid="nafil.section.toggle"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 transition-all"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background:
                "linear-gradient(135deg,rgba(212,175,55,0.12),rgba(16,185,129,0.08))",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            🌟
          </div>
          <div className="text-left">
            <p
              className="text-sm font-bold"
              style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
            >
              Nafil Namazein
            </p>
            <p
              className="text-[10px]"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              {doneCount > 0
                ? `${doneCount} ada ki gayi ✓`
                : "Tap karein aur sawab kamayen"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {doneCount > 0 && (
            <span
              className="text-xs font-bold px-2 py-1 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {doneCount}/4
            </span>
          )}
          {expanded ? (
            <ChevronUp size={16} style={{ color: "#b8941e" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "#8a9bb0" }} />
          )}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 fade-in">
          <div
            style={{
              height: "1px",
              background: "rgba(212,175,55,0.1)",
              marginBottom: "12px",
            }}
          />
          {(
            ["Tahajjud", "Ishraq", "Chasht", "Awwabin"] as AdvancedPrayerName[]
          ).map((name) => (
            <NafilCard
              key={name}
              name={name}
              status={advancedPrayers[name] ?? "unmarked"}
              formData={nafilForms[name]}
              onMark={(n) => onMarkNafil?.(n, "done")}
              onSaveForm={(n, data) => onSaveNafilForm?.(n, data)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NafilSection;
