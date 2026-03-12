import { BookOpen, Plus, Search, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_META, DUA_DATA, type Dua } from "./duasData";

const STORAGE_KEY = "mdq_custom_duas";

type Lang = "arabic" | "roman" | "urdu" | "telugu";

function loadCustomDuas(): Dua[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Dua[]) : [];
  } catch {
    return [];
  }
}

function saveCustomDuas(duas: Dua[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(duas));
}

export function DuaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("subah");
  const [activeLang, setActiveLang] = useState<Lang>("arabic");
  const [searchQuery, setSearchQuery] = useState("");
  const [customDuas, setCustomDuas] = useState<Dua[]>(loadCustomDuas);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Add form state
  const [form, setForm] = useState({
    arabic: "",
    romanUrdu: "",
    urdu: "",
    telugu: "",
    source: "",
  });

  useEffect(() => {
    saveCustomDuas(customDuas);
  }, [customDuas]);

  const allDuas = useMemo(() => [...DUA_DATA, ...customDuas], [customDuas]);

  const filteredDuas = useMemo(() => {
    const byCategory = allDuas.filter((d) => d.category === activeCategory);
    if (!searchQuery.trim()) return byCategory;
    const q = searchQuery.toLowerCase();
    return byCategory.filter(
      (d) =>
        d.arabic.includes(q) ||
        d.romanUrdu.toLowerCase().includes(q) ||
        d.urdu.includes(q) ||
        d.telugu.includes(q),
    );
  }, [allDuas, activeCategory, searchQuery]);

  const handleAddDua = () => {
    if (!form.arabic.trim() && !form.romanUrdu.trim()) return;
    const newDua: Dua = {
      id: `custom_${Date.now()}`,
      category: activeCategory as Dua["category"],
      arabic: form.arabic.trim(),
      romanUrdu: form.romanUrdu.trim(),
      urdu: form.urdu.trim(),
      telugu: form.telugu.trim(),
      source: form.source.trim() || undefined,
      isCustom: true,
    };
    setCustomDuas((prev) => [...prev, newDua]);
    setForm({ arabic: "", romanUrdu: "", urdu: "", telugu: "", source: "" });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setCustomDuas((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
  };

  const getLangText = (dua: Dua): string => {
    if (activeLang === "arabic") return dua.arabic;
    if (activeLang === "roman") return dua.romanUrdu;
    if (activeLang === "urdu") return dua.urdu;
    return dua.telugu;
  };

  const langButtons: { key: Lang; label: string }[] = [
    { key: "arabic", label: "عربی" },
    { key: "roman", label: "Roman" },
    { key: "urdu", label: "اردو" },
    { key: "telugu", label: "తెలుగు" },
  ];

  const categories = Object.entries(CATEGORY_META);

  return (
    <div
      className="relative min-h-screen pb-28"
      style={{ background: "#F8F4EF", WebkitTapHighlightColor: "transparent" }}
    >
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-30"
        style={{
          background: "rgba(248,244,239,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.18)",
        }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "26px" }}>🤲</span>
            <div>
              <h1
                style={{
                  fontFamily: "'Amiri', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #C9A84C 0%, #f0cc5e 50%, #C9A84C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.2,
                }}
              >
                Dua Mode
              </h1>
              <p
                style={{
                  fontSize: "11px",
                  color: "#8a9bb0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {filteredDuas.length} Duas —{" "}
                {CATEGORY_META[activeCategory]?.emoji}{" "}
                {CATEGORY_META[activeCategory]?.label}
              </p>
            </div>
          </div>

          {/* Language toggle */}
          <div
            className="flex gap-1 rounded-xl p-1"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            {langButtons.map((lb) => (
              <button
                type="button"
                key={lb.key}
                data-ocid={`dua.lang.${lb.key}.toggle`}
                onClick={() => setActiveLang(lb.key)}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  fontSize:
                    lb.key === "arabic" || lb.key === "urdu" ? "13px" : "10px",
                  fontFamily:
                    lb.key === "telugu"
                      ? "sans-serif"
                      : lb.key === "arabic" || lb.key === "urdu"
                        ? "'Amiri', serif"
                        : "'Poppins', sans-serif",
                  fontWeight: activeLang === lb.key ? 700 : 400,
                  padding: "4px 8px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background:
                    activeLang === lb.key
                      ? "linear-gradient(135deg,#C9A84C,#e8c055)"
                      : "transparent",
                  color: activeLang === lb.key ? "#fff" : "#8a9bb0",
                  boxShadow:
                    activeLang === lb.key
                      ? "0 2px 8px rgba(201,168,76,0.35)"
                      : "none",
                }}
              >
                {lb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div
          className="flex gap-2 px-4 pb-3 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map(([catKey, meta]) => (
            <button
              type="button"
              key={catKey}
              data-ocid={`dua.category.${catKey}.tab`}
              onClick={() => {
                setActiveCategory(catKey);
                setSearchQuery("");
              }}
              style={{
                WebkitTapHighlightColor: "transparent",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 14px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: activeCategory === catKey ? 700 : 500,
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                border:
                  activeCategory === catKey
                    ? "1.5px solid transparent"
                    : "1.5px solid rgba(201,168,76,0.25)",
                background:
                  activeCategory === catKey
                    ? `linear-gradient(135deg,${meta.color}dd,${meta.color}aa)`
                    : "rgba(255,255,255,0.7)",
                color: activeCategory === catKey ? "#fff" : "#4a5568",
                boxShadow:
                  activeCategory === catKey
                    ? `0 3px 12px ${meta.color}44`
                    : "none",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(201,168,76,0.2)",
              boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            }}
          >
            <Search size={15} color="#8a9bb0" />
            <input
              data-ocid="dua.search_input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dua search karo..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "13px",
                fontFamily: "'Poppins', sans-serif",
                color: "#1a2035",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <X size={14} color="#8a9bb0" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Dua Cards ── */}
      <div className="px-4 pt-3 space-y-4">
        <AnimatePresence mode="wait">
          {filteredDuas.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16"
              data-ocid="dua.empty_state"
            >
              <span style={{ fontSize: "48px", marginBottom: "12px" }}>🤲</span>
              <p
                style={{
                  color: "#8a9bb0",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Is category mein koi dua nahi mili.
                <br />
                <span style={{ color: "#C9A84C", fontWeight: 600 }}>
                  + button
                </span>{" "}
                se apni dua add karo!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + activeLang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {filteredDuas.map((dua, idx) => (
                <DuaCard
                  key={dua.id}
                  dua={dua}
                  index={idx + 1}
                  activeLang={activeLang}
                  translationText={getLangText(dua)}
                  onDelete={
                    dua.isCustom ? () => setDeleteConfirm(dua.id) : undefined
                  }
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── FAB ── */}
      <motion.button
        data-ocid="dua.add.open_modal_button"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowAddModal(true)}
        className="fixed z-40 flex items-center gap-2"
        style={{
          bottom: "96px",
          right: "20px",
          background:
            "linear-gradient(135deg,#C9A84C 0%,#e8c055 50%,#C9A84C 100%)",
          backgroundSize: "200% 100%",
          borderRadius: "999px",
          padding: "13px 20px",
          boxShadow:
            "0 4px 24px rgba(201,168,76,0.5), 0 2px 8px rgba(0,0,0,0.12)",
          border: "none",
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          color: "#fff",
          fontFamily: "'Poppins',sans-serif",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>Dua Add Karo</span>
      </motion.button>

      {/* ── Add Dua Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <AddDuaModal
            form={form}
            setForm={setForm}
            onAdd={handleAddDua}
            onClose={() => setShowAddModal(false)}
            activeCategory={activeCategory}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirm ── */}
      <AnimatePresence>
        {deleteConfirm && (
          <DeleteConfirmDialog
            onConfirm={() => handleDelete(deleteConfirm)}
            onCancel={() => setDeleteConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Dua Card Component ──
function DuaCard({
  dua,
  index,
  activeLang,
  translationText,
  onDelete,
}: {
  dua: Dua;
  index: number;
  activeLang: Lang;
  translationText: string;
  onDelete?: () => void;
}) {
  const meta = CATEGORY_META[dua.category];
  const isArabic = activeLang === "arabic";
  const isUrdu = activeLang === "urdu";
  const isRtl = isArabic || isUrdu;

  return (
    <motion.div
      data-ocid={`dua.item.${index}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.3) }}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(255,252,240,0.94) 100%)",
        borderRadius: "20px",
        border: "1px solid rgba(201,168,76,0.15)",
        boxShadow:
          "0 2px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(201,168,76,0.05)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Gold top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${meta?.color ?? "#C9A84C"}, transparent)`,
          opacity: 0.4,
        }}
      />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#C9A84C,#e8c055)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Poppins',sans-serif",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(201,168,76,0.35)",
            }}
          >
            {index}
          </div>

          <div className="flex items-center gap-2">
            {dua.source && (
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "'Poppins',sans-serif",
                  background: "rgba(201,168,76,0.12)",
                  color: "#b8941e",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                📖 {dua.source}
              </span>
            )}
            {dua.isCustom && (
              <span
                style={{
                  fontSize: "10px",
                  fontFamily: "'Poppins',sans-serif",
                  background: "rgba(99,102,241,0.1)",
                  color: "#6366f1",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                ✨ Meri Dua
              </span>
            )}
            {onDelete && (
              <button
                type="button"
                data-ocid={`dua.delete_button.${index}`}
                onClick={onDelete}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px",
                  padding: "4px 6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Trash2 size={13} color="#dc2626" />
              </button>
            )}
          </div>
        </div>

        {/* Main text */}
        <div
          style={{
            direction: isRtl ? "rtl" : "ltr",
            fontFamily: isArabic
              ? "'Amiri', Georgia, serif"
              : isUrdu
                ? "'Amiri', Georgia, serif"
                : "'Poppins', sans-serif",
            fontSize: isArabic ? "26px" : isUrdu ? "20px" : "15px",
            lineHeight: isArabic ? 1.9 : 1.7,
            color: isArabic ? "#C9A84C" : "#1a2035",
            fontWeight: isArabic ? 400 : 500,
            textAlign: isRtl ? "right" : "left",
            wordBreak: "break-word",
            letterSpacing: isArabic ? "0.02em" : "normal",
          }}
        >
          {translationText}
        </div>

        {/* Show Arabic below if non-arabic lang selected */}
        {!isArabic && dua.arabic && (
          <>
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
                margin: "12px 0",
              }}
            />
            <div
              style={{
                direction: "rtl",
                fontFamily: "'Amiri', Georgia, serif",
                fontSize: "18px",
                lineHeight: 1.9,
                color: "#C9A84C",
                opacity: 0.65,
                textAlign: "right",
                letterSpacing: "0.01em",
              }}
            >
              {dua.arabic}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Add Dua Modal ──
function AddDuaModal({
  form,
  setForm,
  onAdd,
  onClose,
  activeCategory,
}: {
  form: {
    arabic: string;
    romanUrdu: string;
    urdu: string;
    telugu: string;
    source: string;
  };
  setForm: (f: {
    arabic: string;
    romanUrdu: string;
    urdu: string;
    telugu: string;
    source: string;
  }) => void;
  onAdd: () => void;
  onClose: () => void;
  activeCategory: string;
}) {
  const meta = CATEGORY_META[activeCategory];
  const canSubmit = form.arabic.trim() || form.romanUrdu.trim();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        data-ocid="dua.add.dialog"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-lg"
        style={{
          background: "linear-gradient(180deg, #fff 0%, #fffdf6 100%)",
          borderRadius: "28px 28px 0 0",
          padding: "24px",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2
              style={{
                fontFamily: "'Amiri',Georgia,serif",
                fontSize: "20px",
                fontWeight: 700,
                background: "linear-gradient(135deg,#C9A84C,#e8c055)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ✨ Apni Dua Add Karo
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: "#8a9bb0",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              {meta?.emoji} {meta?.label} — Personal collection
            </p>
          </div>
          <button
            type="button"
            data-ocid="dua.add.cancel_button"
            onClick={onClose}
            style={{
              WebkitTapHighlightColor: "transparent",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.06)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#4a5568" />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-3">
          {(
            [
              {
                key: "arabic",
                label: "عربی متن",
                placeholder: "Arabic text (optional)",
                rtl: true,
                font: "'Amiri',serif",
              },
              {
                key: "romanUrdu",
                label: "Roman Urdu",
                placeholder: "Roman urdu mein likho...",
                rtl: false,
                font: "'Poppins',sans-serif",
              },
              {
                key: "urdu",
                label: "اردو ترجمہ",
                placeholder: "اردو ترجمہ",
                rtl: true,
                font: "'Amiri',serif",
              },
              {
                key: "telugu",
                label: "తెలుగు",
                placeholder: "Telugu arth...",
                rtl: false,
                font: "sans-serif",
              },
              {
                key: "source",
                label: "Source",
                placeholder: "e.g. Bukhari, Muslim, Quran (optional)",
                rtl: false,
                font: "'Poppins',sans-serif",
              },
            ] as const
          ).map(({ key, label, placeholder, rtl, font }) => (
            <div key={key}>
              <p
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontFamily: "'Poppins',sans-serif",
                  color: "#8a9bb0",
                  marginBottom: "4px",
                  fontWeight: 600,
                }}
              >
                {label}
              </p>
              <input
                data-ocid={`dua.add.${key}.input`}
                type="text"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(201,168,76,0.2)",
                  background: "rgba(248,244,239,0.7)",
                  fontSize: rtl ? "17px" : "14px",
                  fontFamily: font,
                  direction: rtl ? "rtl" : "ltr",
                  color: "#1a2035",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "14px",
              border: "1.5px solid rgba(201,168,76,0.25)",
              background: "transparent",
              color: "#8a9bb0",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            data-ocid="dua.add.submit_button"
            onClick={onAdd}
            disabled={!canSubmit}
            style={{
              flex: 2,
              padding: "13px",
              borderRadius: "14px",
              border: "none",
              background: canSubmit
                ? "linear-gradient(135deg,#C9A84C 0%,#e8c055 100%)"
                : "rgba(201,168,76,0.3)",
              color: canSubmit ? "#fff" : "#b8941e",
              fontFamily: "'Poppins',sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: canSubmit ? "pointer" : "not-allowed",
              boxShadow: canSubmit ? "0 3px 16px rgba(201,168,76,0.4)" : "none",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.2s",
            }}
          >
            <BookOpen
              size={14}
              style={{ display: "inline", marginRight: "6px" }}
            />
            Dua Save Karo
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Delete Confirm ──
function DeleteConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 320 }}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(0,0,0,0.16)",
          maxWidth: "320px",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>🗑️</div>
        <h3
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "#1a2035",
            marginBottom: "8px",
          }}
        >
          Dua Delete Karna Chahte Ho?
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#8a9bb0",
            fontFamily: "'Poppins',sans-serif",
            marginBottom: "20px",
          }}
        >
          Yeh action undo nahi hoga.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            data-ocid="dua.add.cancel_button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              border: "1.5px solid rgba(0,0,0,0.1)",
              background: "#f8f8f8",
              fontSize: "14px",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              color: "#4a5568",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            data-ocid="dua.add.confirm_button"
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "11px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg,#ef4444,#dc2626)",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 3px 12px rgba(239,68,68,0.35)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DuaPage;
