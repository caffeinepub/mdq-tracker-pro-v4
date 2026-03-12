import { useCallback, useEffect, useRef, useState } from "react";

const QUOTES = [
  "Allah tumhare dil ki baat janta hai. Likh do sab kuch.",
  "Har din ek naya mauqa hai — aaj ka safar likhte jao.",
  "Tumhara qalam aur tumhari dua dono qadr rakhti hain.",
  "Jo dil mein hai, likh do. Yeh safha tumhara hai.",
  "Roze ke alfaz kal ki rahnumai bante hain.",
  "Fikr karo, likhoo, shukr karo.",
];

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
  savedAt: string;
}

const MOODS = [
  { emoji: "😌", label: "Sukoon" },
  { emoji: "🤲", label: "Shukr" },
  { emoji: "😔", label: "Udaas" },
  { emoji: "💪", label: "Hosla" },
  { emoji: "🌙", label: "Fikr" },
  { emoji: "✨", label: "Khushi" },
];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDisplayDate(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const months = [
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
  return `${d} ${months[m - 1]} ${y}`;
}

export function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [todayText, setTodayText] = useState("");
  const [todayMood, setTodayMood] = useState("");
  const [saved, setSaved] = useState(false);
  const [viewMode, setViewMode] = useState<"write" | "history">("write");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const quoteIdx = useRef(Math.floor(Math.random() * QUOTES.length));
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const todayKey = getTodayKey();

  useEffect(() => {
    const raw = localStorage.getItem("journalEntries");
    if (raw) {
      const parsed: JournalEntry[] = JSON.parse(raw);
      setEntries(parsed);
      const todayEntry = parsed.find((e) => e.date === todayKey);
      if (todayEntry) {
        setTodayText(todayEntry.text);
        setTodayMood(todayEntry.mood);
      }
    }
  }, [todayKey]);

  const saveEntry = useCallback(
    (text: string, mood: string) => {
      setEntries((prev) => {
        const existing = prev.find((e) => e.date === todayKey);
        let updated: JournalEntry[];
        if (existing) {
          updated = prev.map((e) =>
            e.date === todayKey
              ? { ...e, text, mood, savedAt: new Date().toLocaleTimeString() }
              : e,
          );
        } else {
          updated = [
            ...prev,
            {
              id: Math.random().toString(36).slice(2),
              date: todayKey,
              text,
              mood,
              savedAt: new Date().toLocaleTimeString(),
            },
          ];
        }
        localStorage.setItem("journalEntries", JSON.stringify(updated));
        return updated;
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [todayKey],
  );

  const handleTextChange = useCallback(
    (val: string) => {
      setTodayText(val);
      setSaved(false);
      // Auto-save does NOT clear the textarea -- only manual save does
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
      autoSaveTimer.current = setTimeout(() => saveEntry(val, todayMood), 1500);
    },
    [saveEntry, todayMood],
  );

  const handleMoodSelect = useCallback(
    (mood: string) => {
      setTodayMood(mood);
      saveEntry(todayText, mood);
    },
    [saveEntry, todayText],
  );

  const handleManualSave = useCallback(() => {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    if (!todayText.trim()) return;
    saveEntry(todayText, todayMood);
    // Clear textarea after manual save
    setTodayText("");
    setTodayMood("");
    // Switch to history so user sees their saved entry
    setViewMode("history");
  }, [saveEntry, todayText, todayMood]);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem("journalEntries", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const sortedHistory = [...entries].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", paddingBottom: "32px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A0F2C, #1a2a5e)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <span style={{ fontSize: "28px" }}>✍️</span>
          <div>
            <h2
              style={{
                color: "#C9A84C",
                fontFamily: "'Amiri', serif",
                fontSize: "22px",
                fontWeight: "700",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Daily Write
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "11px",
                margin: 0,
              }}
            >
              {formatDisplayDate(todayKey)}
            </p>
          </div>
        </div>
        <div
          style={{
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: "12px",
            padding: "10px 14px",
          }}
        >
          <p
            style={{
              color: "rgba(201,168,76,0.9)",
              fontSize: "12px",
              margin: 0,
              fontStyle: "italic",
              lineHeight: 1.6,
            }}
          >
            &quot;{QUOTES[quoteIdx.current]}&quot;
          </p>
        </div>
      </div>

      {/* Tab Toggle */}
      <div
        style={{
          display: "flex",
          background: "rgba(0,0,0,0.05)",
          borderRadius: "12px",
          padding: "4px",
          marginBottom: "20px",
        }}
      >
        {[
          { key: "write", label: "Aaj Likho" },
          { key: "history", label: `History (${sortedHistory.length})` },
        ].map((tab) => (
          <button
            type="button"
            key={tab.key}
            data-ocid="journal.tab"
            onClick={() => setViewMode(tab.key as "write" | "history")}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "10px",
              border: "none",
              background: viewMode === tab.key ? "#fff" : "transparent",
              color: viewMode === tab.key ? "#0A0F2C" : "#9ca3af",
              fontWeight: viewMode === tab.key ? "700" : "500",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "'Poppins', sans-serif",
              boxShadow:
                viewMode === tab.key ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.2s",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {viewMode === "write" ? (
        <div>
          {/* Mood */}
          <div style={{ marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Aaj ka mood:
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.label}
                  data-ocid="journal.toggle"
                  onClick={() => handleMoodSelect(m.label)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "12px",
                    border:
                      todayMood === m.label
                        ? "2px solid #C9A84C"
                        : "1px solid rgba(0,0,0,0.1)",
                    background:
                      todayMood === m.label ? "rgba(201,168,76,0.1)" : "#fff",
                    cursor: "pointer",
                    fontSize: "12px",
                    color: todayMood === m.label ? "#b8941e" : "#4b5563",
                    fontWeight: todayMood === m.label ? "700" : "500",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              marginBottom: "16px",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            <textarea
              data-ocid="journal.textarea"
              value={todayText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Bismillah... aaj ka din likhna shuru karo. Kya hua? Kya mehsoos kiya? Kya shukar ada karna hai?"
              style={{
                width: "100%",
                minHeight: "220px",
                border: "none",
                outline: "none",
                resize: "none",
                fontFamily: "'Amiri', serif",
                fontSize: "17px",
                color: "#1a2035",
                lineHeight: "2",
                background: "transparent",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                {todayText.length} harf
              </span>
              {saved ? (
                <span
                  data-ocid="journal.success_state"
                  style={{
                    fontSize: "11px",
                    color: "#2d7d46",
                    fontWeight: "600",
                  }}
                >
                  ✓ Mahfooz ho gaya
                </span>
              ) : (
                <span style={{ fontSize: "11px", color: "#d4af37" }}>
                  Auto-save on...
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            data-ocid="journal.save_button"
            onClick={handleManualSave}
            disabled={!todayText.trim()}
            style={{
              width: "100%",
              padding: "14px",
              background: todayText.trim()
                ? "linear-gradient(135deg, #0A0F2C, #1a2a5e)"
                : "rgba(0,0,0,0.1)",
              border: "none",
              borderRadius: "14px",
              color: todayText.trim() ? "#C9A84C" : "#9ca3af",
              fontWeight: "700",
              fontSize: "14px",
              cursor: todayText.trim() ? "pointer" : "not-allowed",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.05em",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ✍️ Aaj ka Safha Mahfooz Karo
          </button>

          {todayText.trim().length > 50 && (
            <div
              style={{
                marginTop: "14px",
                background:
                  "linear-gradient(135deg, rgba(45,125,70,0.08), rgba(45,125,70,0.03))",
                border: "1px solid rgba(45,125,70,0.2)",
                borderRadius: "12px",
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#2d7d46",
                  fontSize: "12px",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                MaashaAllah! Aaj ka safha khoob likha. Yeh amal Allah ko pasand
                hai. Alhamdulillah! 🤲
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {sortedHistory.length === 0 ? (
            <div
              data-ocid="journal.empty_state"
              style={{
                textAlign: "center",
                padding: "40px 20px",
                background: "#fff",
                borderRadius: "20px",
                border: "1px dashed rgba(201,168,76,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                📖
              </span>
              <p style={{ color: "#9ca3af", fontSize: "13px" }}>
                Abhi koi purana safha nahi. Likhna shuru karo!
              </p>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {sortedHistory.map((entry, idx) => (
                <div
                  key={entry.id}
                  data-ocid={`journal.item.${idx + 1}`}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#1a2035",
                          fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        {formatDisplayDate(entry.date)}
                      </p>
                      {entry.mood && (
                        <span style={{ fontSize: "11px", color: "#b8941e" }}>
                          {MOODS.find((m) => m.label === entry.mood)?.emoji}{" "}
                          {entry.mood}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      data-ocid={`journal.delete_button.${idx + 1}`}
                      onClick={() => handleDeleteEntry(entry.id)}
                      style={{
                        background: "rgba(255,70,70,0.08)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "5px 10px",
                        color: "#ff5555",
                        fontSize: "11px",
                        cursor: "pointer",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      Mita do
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedEntry(
                        expandedEntry === entry.id ? null : entry.id,
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id,
                        );
                    }}
                    style={
                      {
                        fontFamily: "'Amiri', serif",
                        fontSize: "15px",
                        color: "#4b5563",
                        lineHeight: "1.8",
                        margin: 0,
                        display:
                          expandedEntry === entry.id ? "block" : "-webkit-box",
                        WebkitLineClamp:
                          expandedEntry === entry.id ? "unset" : 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        padding: 0,
                        textAlign: "left",
                        width: "100%",
                      } as React.CSSProperties
                    }
                  >
                    {entry.text}
                  </button>
                  {entry.text.length > 200 && (
                    <button
                      type="button"
                      data-ocid={`journal.secondary_button.${idx + 1}`}
                      onClick={() =>
                        setExpandedEntry(
                          expandedEntry === entry.id ? null : entry.id,
                        )
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#C9A84C",
                        fontSize: "11px",
                        fontWeight: "600",
                        cursor: "pointer",
                        padding: "4px 0",
                        fontFamily: "'Poppins', sans-serif",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {expandedEntry === entry.id
                        ? "Chhupa do ▲"
                        : "Pura padho ▼"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JournalPage;
