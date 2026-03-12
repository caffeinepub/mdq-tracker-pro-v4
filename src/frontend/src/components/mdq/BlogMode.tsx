import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  Globe,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import type { BlogArticle } from "../../types";
import { BLOG_ARTICLES } from "./blogArticlesData";

interface BlogModeProps {
  articles: BlogArticle[];
  onUpdate: (articles: BlogArticle[]) => void;
}

type LangMode = "romanUrdu" | "urdu" | "telugu";

function ArticleContent({
  content,
  isUrdu,
}: { content: string; isUrdu: boolean }) {
  const parts = content.split("\n");
  return (
    <>
      {parts.map((para, i) => {
        const key = `${i}-${para.slice(0, 15)}`;
        return para.trim() ? (
          <p
            key={key}
            className="mb-4 leading-loose"
            style={{
              color: "#2d3748",
              fontSize: "15px",
              fontFamily: isUrdu
                ? "'Amiri', 'Noto Nastaliq Urdu', serif"
                : "'Poppins', sans-serif",
              direction: isUrdu ? "rtl" : "ltr",
              textAlign: isUrdu ? "right" : "left",
              lineHeight: isUrdu ? "2.2" : "1.9",
            }}
          >
            {para}
          </p>
        ) : (
          <div key={key} className="mb-3" />
        );
      })}
    </>
  );
}

function LangToggle({
  lang,
  onChange,
}: { lang: LangMode; onChange: (l: LangMode) => void }) {
  const options: { key: LangMode; label: string }[] = [
    { key: "romanUrdu", label: "Roman Urdu" },
    { key: "urdu", label: "اردو" },
    { key: "telugu", label: "తెలుగు" },
  ];
  return (
    <div
      className="flex gap-1 p-1 rounded-xl mb-4"
      style={{
        background: "rgba(10,15,44,0.06)",
        border: "1px solid rgba(212,175,55,0.15)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          data-ocid={`blog.lang.${opt.key}.toggle`}
          onClick={() => onChange(opt.key)}
          className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-all active:scale-95"
          style={{
            background:
              lang === opt.key
                ? "linear-gradient(135deg,#C9A84C,#b8941e)"
                : "transparent",
            color: lang === opt.key ? "#fff" : "#8a7040",
            fontFamily: "'Poppins', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function BlogMode({ articles, onUpdate }: BlogModeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newContent, setNewContent] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [lang, setLang] = useState<LangMode>("romanUrdu");

  // Merge built-in + user articles
  const allArticles = [
    ...BLOG_ARTICLES.map((a) => {
      const userVersion = articles.find((ua) => ua.id === a.id);
      const content = a.romanUrdu; // default
      return userVersion
        ? { ...userVersion, _multiLang: a }
        : {
            id: a.id,
            title: a.title,
            category: a.category,
            content,
            isBookmarked: false,
            readProgress: 0,
            createdAt: a.createdAt,
            _multiLang: a,
          };
    }),
    ...articles.filter((a) => a.isUserAdded),
  ];

  const categories = [
    "All",
    ...Array.from(new Set(allArticles.map((a) => a.category))),
  ];
  const filtered =
    activeFilter === "All"
      ? allArticles
      : allArticles.filter((a) => a.category === activeFilter);

  const selected = selectedId
    ? (allArticles.find((a) => a.id === selectedId) as any)
    : null;

  const getContent = (article: any): string => {
    if (article._multiLang) {
      return article._multiLang[lang] ?? article._multiLang.romanUrdu;
    }
    return article.content;
  };

  const toggleBookmark = (id: string) => {
    const existing = articles.find((a) => a.id === id);
    if (existing) {
      onUpdate(
        articles.map((a) =>
          a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a,
        ),
      );
    } else {
      const found = allArticles.find((a) => a.id === id);
      if (found) onUpdate([...articles, { ...found, isBookmarked: true }]);
    }
  };

  const addArticle = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newArticle: BlogArticle = {
      id: `user-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory.trim() || "Personal",
      content: newContent.trim(),
      isBookmarked: false,
      readProgress: 0,
      createdAt: new Date().toISOString().slice(0, 10),
      isUserAdded: true,
    };
    onUpdate([...articles, newArticle]);
    setNewTitle("");
    setNewCategory("");
    setNewContent("");
    setShowAddForm(false);
  };

  // ── Article Reader ──────────────────────────────────────────────────────────
  if (selected) {
    const isUrduScript = lang === "urdu" || lang === "telugu";
    const displayContent = getContent(selected);
    return (
      <div className="fade-in" data-ocid="blog.article.panel">
        <button
          type="button"
          data-ocid="blog.back.button"
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 mb-4 transition-all active:scale-95"
          style={{
            color: "#C9A84C",
            fontFamily: "'Poppins', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Wapas Blog</span>
        </button>

        {/* Language toggle */}
        {selected._multiLang && <LangToggle lang={lang} onChange={setLang} />}

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(201,168,76,0.15)",
            boxShadow: "0 6px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* Article Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#0A0F2C 0%,#1a2550 100%)",
              padding: "20px",
            }}
          >
            <span
              className="text-[10px] px-2 py-0.5 rounded-full mb-3 inline-block"
              style={{
                background: "rgba(201,168,76,0.2)",
                color: "#C9A84C",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {selected.category}
            </span>
            <h2
              className="font-bold text-base leading-snug mb-3"
              style={{
                color: "#ffffff",
                fontFamily: "'Amiri','Georgia',serif",
                fontSize: "18px",
              }}
            >
              {selected.title}
            </h2>
            <div className="flex items-center justify-between">
              <span
                className="text-[10px]"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                {selected.createdAt}
              </span>
              <button
                type="button"
                data-ocid="blog.bookmark.button"
                onClick={() => toggleBookmark(selected.id)}
                className="flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg transition-all active:scale-95"
                style={{
                  background: "rgba(201,168,76,0.12)",
                  color: "#C9A84C",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {selected.isBookmarked ? (
                  <BookmarkCheck size={13} />
                ) : (
                  <Bookmark size={13} />
                )}
                {selected.isBookmarked ? "Saved" : "Bookmark"}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5" style={{ background: "#fafaf8" }}>
            <ArticleContent content={displayContent} isUrdu={isUrduScript} />
          </div>
        </div>
      </div>
    );
  }

  // ── Add Form ────────────────────────────────────────────────────────────────
  if (showAddForm) {
    return (
      <div className="fade-in" data-ocid="blog.add.panel">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-semibold"
            style={{ color: "#0A0F2C", fontFamily: "'Poppins',sans-serif" }}
          >
            Naya Article
          </h2>
          <button
            type="button"
            data-ocid="blog.addform.close.button"
            onClick={() => setShowAddForm(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.06)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <X size={14} style={{ color: "#4a5568" }} />
          </button>
        </div>
        <div
          className="space-y-3"
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "16px",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          {[
            {
              id: "blog-title",
              label: "Title *",
              val: newTitle,
              set: setNewTitle,
              placeholder: "Article ka naam...",
              multi: false,
            },
            {
              id: "blog-category",
              label: "Category",
              val: newCategory,
              set: setNewCategory,
              placeholder: "e.g. Ibadat, Zikr...",
              multi: false,
            },
          ].map((f) => (
            <div key={f.id}>
              <label
                htmlFor={f.id}
                className="block text-xs font-semibold mb-1"
                style={{ color: "#4a5568", fontFamily: "'Poppins',sans-serif" }}
              >
                {f.label}
              </label>
              <input
                id={f.id}
                data-ocid={`blog.${f.id}.input`}
                type="text"
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "#0A0F2C",
                  fontFamily: "'Poppins',sans-serif",
                }}
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="blog-content"
              className="block text-xs font-semibold mb-1"
              style={{ color: "#4a5568", fontFamily: "'Poppins',sans-serif" }}
            >
              Content *
            </label>
            <textarea
              id="blog-content"
              data-ocid="blog.content.textarea"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Article content..."
              rows={8}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
              style={{
                background: "rgba(201,168,76,0.04)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#0A0F2C",
                fontFamily: "'Poppins',sans-serif",
              }}
            />
          </div>
          <button
            type="button"
            data-ocid="blog.add.submit_button"
            onClick={addArticle}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white"
            style={{
              background: "linear-gradient(135deg,#C9A84C,#b8941e)",
              fontFamily: "'Poppins',sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Article Save Karein
          </button>
        </div>
      </div>
    );
  }

  // ── Article List ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4" data-ocid="blog.list.panel">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={16} style={{ color: "#C9A84C" }} />
          <h2
            className="text-sm font-semibold"
            style={{ color: "#0A0F2C", fontFamily: "'Poppins',sans-serif" }}
          >
            Islamic Blog
          </h2>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{
              background: "rgba(201,168,76,0.12)",
              color: "#C9A84C",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            {filtered.length}
          </span>
        </div>
        <button
          type="button"
          data-ocid="blog.add.open_modal_button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "#b8941e",
            fontFamily: "'Poppins',sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Plus size={13} /> Add
        </button>
      </div>

      {/* Language toggle for list view */}
      <LangToggle lang={lang} onChange={setLang} />

      {/* Category filter */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid="blog.filter.tab"
            onClick={() => setActiveFilter(cat)}
            className="flex-shrink-0 text-[10px] px-3 py-1.5 rounded-full font-semibold transition-all active:scale-95"
            style={{
              background:
                activeFilter === cat
                  ? "linear-gradient(135deg,#C9A84C,#b8941e)"
                  : "rgba(201,168,76,0.07)",
              color: activeFilter === cat ? "#fff" : "#b8941e",
              border: `1px solid ${activeFilter === cat ? "transparent" : "rgba(201,168,76,0.15)"}`,
              fontFamily: "'Poppins',sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="space-y-3">
        {filtered.map((article, idx) => (
          <div
            key={article.id}
            data-ocid={`blog.item.${idx + 1}`}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(201,168,76,0.12)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <button
              type="button"
              data-ocid={`blog.read.button.${idx + 1}`}
              onClick={() => setSelectedId(article.id)}
              className="w-full text-left p-4 transition-all active:scale-[0.99]"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(10,15,44,0.06)",
                    color: "#0A0F2C",
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  {article.category}
                </span>
                <div className="flex items-center gap-1.5">
                  {article.isBookmarked && (
                    <BookmarkCheck
                      size={13}
                      style={{ color: "#C9A84C", flexShrink: 0 }}
                    />
                  )}
                  {article.isUserAdded && (
                    <span className="text-[9px]" style={{ color: "#2563eb" }}>
                      Mera
                    </span>
                  )}
                </div>
              </div>
              <h3
                className="font-semibold leading-snug mb-2"
                style={{
                  color: "#0A0F2C",
                  fontFamily: "'Amiri','Georgia',serif",
                  fontSize: "15px",
                }}
              >
                {article.title}
              </h3>
              <p
                className="text-xs line-clamp-2 leading-relaxed"
                style={{ color: "#6b7a99", fontFamily: "'Poppins',sans-serif" }}
              >
                {article.content.slice(0, 90)}...
              </p>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center py-4">
        <p
          className="text-xs italic"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins',sans-serif" }}
        >
          &quot;Iqra bismi rabbika alladhi khalaq&quot; (Alaq: 1)
        </p>
      </div>
    </div>
  );
}

export default BlogMode;
