import { Bookmark, BookmarkCheck, ChevronLeft, Plus, X } from "lucide-react";
import { useState } from "react";
import type { BlogArticle } from "../../types";

interface BlogModeProps {
  articles: BlogArticle[];
  onUpdate: (articles: BlogArticle[]) => void;
}

const SAMPLE_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    title: "Namaz ki Ahmiyat -- Qur'an aur Hadith ki Roshni Mein",
    category: "Ibadat",
    content: `Namaz Islam ke paanch arkaan mein se doosra rukn hai. Allah Ta'ala ne Quran-e-Majeed mein 700 se zyada baar namaz ka zikr farmaya hai.

**Aayat-e-Qurani:**
Allah Ta'ala farmata hai: "Aur namaz qaim karo, zakat do, aur rukoo karne waalon ke saath rukoo karo." (Baqarah: 43)

"Beshak namaz mominon par muqarrara waqton par farz hai." (Nisa: 103)

**Hadith Mubarak:**
Rasulullah ne farmaya: "Islam ki bunyaad paanch cheezon par hai: Allah ki wahdaniyat ki gawahi dena, namaz qaim karna, zakat ada karna, hajj karna aur Ramzan ke roze rakhna." (Bukhari & Muslim)

Aap ne yeh bhi farmaya: "Qayamat ke din bandey se sabse pehle namaz ka hisaab liya jaayega." (Abu Dawud)

**Namaz ke Fawaaid:**
1. Allah se seedha taaluq
2. Gunaahon ki maafi
3. Dil ka sukoon
4. Bure kaamonn se hifazat
5. Rizq mein barkat

Allah Ta'ala ne farmaya: "Beshak namaz behayadgi aur bure kaamon se rokti hai." (Ankabut: 45)

Hamein chahiye ke apni namazein waqt par aur jamaat ke saath ada karein.`,
    isBookmarked: false,
    readProgress: 0,
    createdAt: "2025-01-01",
  },
  {
    id: "blog-2",
    title: "Tahajjud -- Raat ki Qimati Ibadat",
    category: "Nafl Ibadat",
    content: `Tahajjud namaz raat ke pichhle pehar mein padhi jaati hai. Yeh nafl namazein mein sabse afzal hai.

**Qur'an mein Zikr:**
"Aur raat ke kuch hisson mein tahajjud padho, yeh tumhare liye nafl hai. Umeed hai ke tumhara Rabb tumhe maqam-e-mahmood par pahunchaye." (Isra: 79)

**Hadith:**
Rasulullah ne farmaya: "Farz ke baad sabse afzal namaz tahajjud hai." (Muslim)

Aap ne farmaya: "Allah Ta'ala raat ke aakhri teehai mein Aasmaane Duniya par nazil hota hai aur farmata hai: 'Kaun hai jo dua kare, main qabool karun. Kaun hai jo maafi maange, main maaf karun.'" (Bukhari & Muslim)

**Tahajjud ka Waqt:**
Namaaz-e-Isha ke baad se Fajr se pehle tak, lekin afzal waqt raat ka aakhri teehai hai.

**Rakaat:**
Kam se kam 2 aur zyada se zyada 8 rakaat, phir Witr.

**Fawaaid:**
- Allah ki qurbat
- Duaon ki qabooliyat
- Gunaahon ki maafi
- Dil ki paakizgi
- Bimariyon se hifazat

InshaAllah, aaj raat se Tahajjud ki shuruat karein!`,
    isBookmarked: false,
    readProgress: 0,
    createdAt: "2025-01-02",
  },
  {
    id: "blog-3",
    title: "Ramzan -- Rehmat, Maghfirat aur Nijaat ka Mahina",
    category: "Ramzan",
    content: `Ramzan al-Mubarak ka mahina Islam ka sabse azeem mahina hai. Allah Ta'ala ne is mahine mein Quran-e-Majeed nazil farmaya.

**Quran mein Ramzan:**
"Ramzan ka mahina woh hai jis mein Quran nazil kiya gaya, hidayat ke liye insaanon ki, aur dalilon ke liye hidayat aur furqaan ke." (Baqarah: 185)

**Hadith:**
Rasulullah ne farmaya: "Jab Ramzan aata hai, jannat ke darwaaze khol diye jaate hain, jahannam ke darwaaze band kar diye jaate hain aur shayaateen ko zanjeeron mein jakhad diya jaata hai." (Bukhari)

Aap ne farmaya: "Jo Ramzan mein iman aur ihtisaab ke saath roza rakhe, uske pichhle saare gunaah maaf kar diye jaate hain." (Bukhari)

**Ramzan ke teen Ashreh:**
1. Pehla Ashra (1-10): Rehmat
2. Doosra Ashra (11-20): Maghfirat
3. Teesra Ashra (21-30): Nijaat az Naar

**Shab-e-Qadr:**
Allah Ta'ala ne farmaya: "Shab-e-Qadr hazaar mahino se behtar hai." (Qadr: 3)

InshaAllah, is Ramzan mein ziyadah se zyada ibadat karein!`,
    isBookmarked: false,
    readProgress: 0,
    createdAt: "2025-01-03",
  },
  {
    id: "blog-4",
    title: "Sabr ki Fazilat -- Qur'an aur Hadith Mein",
    category: "Akhlaaq",
    content: `Sabr Islam ki buniyadi khoobi hai. Allah Ta'ala ne Quran mein sabr ka hukm baar baar diya hai.

**Quran mein Sabr:**
"Beshak Allah sabr karne waalon ke saath hai." (Baqarah: 153)

"Tum tamam logon mein se un logon ke liye behtar anjaam hai jo Taqwa ikhtiyaar karein aur sabr karein." (Yusuf: 90)

"Hum tumhe thoda khauf, bhook, malon, jaanon aur phalon ki kami se zaror aazmaenge, aur (yeh khushkhabri de do) sabr karne waalon ko." (Baqarah: 155-156)

**Hadith:**
Rasulullah ne farmaya: "Mominon ka maamla ajab hai! Uski tamam haalat behtar hai. Agar use khushi milti hai toh shukar karta hai, yeh uske liye behtar hai. Agar use takleef pahunche toh sabr karta hai, yeh bhi uske liye behtar hai." (Muslim)

**Sabr ke Aqsaam:**
1. Allah ki ibadat par sabr
2. Allah ki naraaziyon se bachne par sabr
3. Allah ki taqdeer par sabr

Hamein chahiye ke zindagi ke har marhale mein sabr ikhtiyaar karein.`,
    isBookmarked: false,
    readProgress: 0,
    createdAt: "2025-01-04",
  },
  {
    id: "blog-5",
    title: "Istighfar ki Barakaat",
    category: "Zikr",
    content: `Istighfar Allah Ta'ala se maafi maangna hai. Yeh ek aisa amal hai jis se rizq, barkat aur dua ki qabooliyat milti hai.

**Quran mein Istighfar:**
"Apne Rabb se maafi maango, beshak woh bahut maaf karne wala hai." (Nuh: 10)

"Aur jo bure kaam karein ya apne nafson par zulm karein, phir Allah ko yaad karein aur apne gunaahon ke liye maafi maangein." (Ale Imran: 135)

**Hadith:**
Rasulullah ne farmaya: "Jo roz 100 baar yeh kahe: 'Astaghfirullah wa atubu ilayh' -- Allah uske 100 gunaah maaf farmaata hai." (Bukhari)

Aap ne farmaya: "Main din mein 100 baar istighfar karta hun." (Muslim)

**Istighfar ke Fawaaid:**
- Gunaahon ki maafi
- Rizq mein zyaada
- Duaaon ki qabooliyat
- Gham aur museebat se nijaat
- Baraan ki barakaat

**Sayyidul Istighfar:**
"Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana abduka..."

InshaAllah, roz istighfar ko apni aadat banaayein!`,
    isBookmarked: false,
    readProgress: 0,
    createdAt: "2025-01-05",
  },
];

// Render article content paragraphs with stable keys
function ArticleContent({ content }: { content: string }) {
  const parts = content.split("\n");
  return (
    <>
      {parts.map((para, i) => {
        const key = `${i}-${para.slice(0, 20)}`;
        return para.trim() ? (
          <p
            key={key}
            className="mb-3 leading-relaxed"
            style={{
              color: para.startsWith("**") ? "#1a2035" : "#4a5568",
              fontWeight: para.startsWith("**") ? "700" : "400",
              fontSize: para.startsWith("**") ? "14px" : "13px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {para.replace(/\*\*/g, "")}
          </p>
        ) : (
          <div key={key} className="mb-2" />
        );
      })}
    </>
  );
}

export function BlogMode({ articles, onUpdate }: BlogModeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newContent, setNewContent] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Merge sample articles with user articles
  const allArticles = [
    ...SAMPLE_ARTICLES.map((a) => {
      const userVersion = articles.find((ua) => ua.id === a.id);
      return userVersion ? { ...a, ...userVersion } : a;
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
    ? allArticles.find((a) => a.id === selectedId)
    : null;

  const toggleBookmark = (id: string) => {
    const existing = articles.find((a) => a.id === id);
    if (existing) {
      onUpdate(
        articles.map((a) =>
          a.id === id ? { ...a, isBookmarked: !a.isBookmarked } : a,
        ),
      );
    } else {
      const sample = SAMPLE_ARTICLES.find((a) => a.id === id);
      if (sample) onUpdate([...articles, { ...sample, isBookmarked: true }]);
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

  // Article reader view
  if (selected) {
    return (
      <div className="fade-in" data-ocid="blog.article.panel">
        <button
          type="button"
          data-ocid="blog.back.button"
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 mb-4 transition-all active:scale-95"
          style={{
            color: "#b8941e",
            fontFamily: "'Poppins', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Back to Blog</span>
        </button>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(212,175,55,0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          }}
        >
          {/* Article Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              padding: "20px",
            }}
          >
            <span
              className="text-[10px] px-2 py-0.5 rounded-full mb-3 inline-block"
              style={{
                background: "rgba(212,175,55,0.2)",
                color: "#D4AF37",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {selected.category}
            </span>
            <h2
              className="font-bold text-base leading-tight"
              style={{
                color: "#ffffff",
                fontFamily: "'Amiri', 'Georgia', serif",
                marginBottom: "12px",
              }}
            >
              {selected.title}
            </h2>
            <div className="flex items-center justify-between">
              <span
                className="text-[10px]"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'Poppins', sans-serif",
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
                  background: "rgba(212,175,55,0.12)",
                  color: "#D4AF37",
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

          {/* Article Content */}
          <div className="p-5">
            <ArticleContent content={selected.content} />
          </div>
        </div>
      </div>
    );
  }

  // Add article form
  if (showAddForm) {
    return (
      <div className="fade-in" data-ocid="blog.add.panel">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Naya Article Likhein
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
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        >
          <div>
            <label
              htmlFor="blog-title"
              className="block text-xs font-semibold mb-1"
              style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
            >
              Title *
            </label>
            <input
              id="blog-title"
              data-ocid="blog.title.input"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Article ka naam likhen..."
              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "#1a2035",
                fontFamily: "'Poppins', sans-serif",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="blog-category"
              className="block text-xs font-semibold mb-1"
              style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
            >
              Category
            </label>
            <input
              id="blog-category"
              data-ocid="blog.category.input"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Ibadat, Zikr, Akhlaaq..."
              className="w-full px-3 py-2 rounded-xl text-sm outline-none"
              style={{
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "#1a2035",
                fontFamily: "'Poppins', sans-serif",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="blog-content"
              className="block text-xs font-semibold mb-1"
              style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
            >
              Content *
            </label>
            <textarea
              id="blog-content"
              data-ocid="blog.content.textarea"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Article ka content likhen..."
              rows={8}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
              style={{
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "#1a2035",
                fontFamily: "'Poppins', sans-serif",
              }}
            />
          </div>
          <button
            type="button"
            data-ocid="blog.add.submit_button"
            onClick={addArticle}
            className="w-full btn-gold py-3 rounded-xl font-semibold text-sm"
            style={{
              fontFamily: "'Poppins', sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Article Save Karein
          </button>
        </div>
      </div>
    );
  }

  // Article list view
  return (
    <div className="space-y-4" data-ocid="blog.list.panel">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "1rem" }}>📖</span>
          <h2
            className="text-sm font-semibold"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            Islamic Blog
          </h2>
        </div>
        <button
          type="button"
          data-ocid="blog.add.open_modal_button"
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
          style={{
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.25)",
            color: "#b8941e",
            fontFamily: "'Poppins', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Plus size={13} />
          Add Article
        </button>
      </div>

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
                  ? "linear-gradient(135deg, #D4AF37, #c49a1a)"
                  : "rgba(212,175,55,0.07)",
              color: activeFilter === cat ? "#fff" : "#b8941e",
              border: `1px solid ${
                activeFilter === cat ? "transparent" : "rgba(212,175,55,0.15)"
              }`,
              fontFamily: "'Poppins', sans-serif",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div className="space-y-3">
        {filtered.map((article, idx) => {
          const isBookmarked = article.isBookmarked;
          return (
            <div
              key={article.id}
              data-ocid={`blog.item.${idx + 1}`}
              className="rounded-2xl overflow-hidden card-enter"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(212,175,55,0.1)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                animationDelay: `${idx * 0.05}s`,
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
                      background: "rgba(212,175,55,0.08)",
                      color: "#b8941e",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isBookmarked && (
                      <BookmarkCheck
                        size={13}
                        style={{ color: "#b8941e", flexShrink: 0 }}
                      />
                    )}
                    {article.isUserAdded && (
                      <span
                        className="text-[9px]"
                        style={{
                          color: "#2563eb",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        Mera
                      </span>
                    )}
                  </div>
                </div>
                <h3
                  className="font-semibold text-sm leading-tight mb-2"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Amiri', 'Georgia', serif",
                  }}
                >
                  {article.title}
                </h3>
                <p
                  className="text-xs line-clamp-2 leading-relaxed"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {article.content.slice(0, 100)}...
                </p>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p
          className="text-xs italic"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          &quot;Iqra bismi rabbika alladhi khalaq&quot; (Alaq: 1)
        </p>
      </div>
    </div>
  );
}

export default BlogMode;
