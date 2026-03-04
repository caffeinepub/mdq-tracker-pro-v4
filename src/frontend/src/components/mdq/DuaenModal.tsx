import { X } from "lucide-react";
import { useState } from "react";

interface DuaenModalProps {
  open: boolean;
  onClose: () => void;
}

interface Dua {
  arabic: string;
  transliteration: string;
  translation: string;
  count?: string;
}

type Category = "subah" | "shaam" | "namaz";

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "subah", label: "Subah ki Duaen", emoji: "🌅" },
  { id: "shaam", label: "Shaam ki Duaen", emoji: "🌇" },
  { id: "namaz", label: "Namaz ke Baad", emoji: "🤲" },
];

const DUAS: Record<Category, Dua[]> = {
  subah: [
    {
      arabic: "اَلْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      transliteration:
        "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
      translation:
        "Shukar hai Allah ka jisne hume zindagi di marne ke baad, aur usi ki taraf wapas jana hai",
    },
    {
      arabic:
        "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration:
        "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
      translation:
        "Allah ke naam se — jiske naam ke saath koi cheez takleef nahi de sakti, na zameen mein na aasman mein. Aur woh sunne wala, jaanne wala hai",
    },
    {
      arabic: "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      transliteration:
        "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur",
      translation:
        "Aye Allah! Tere saath humne subah ki, tere saath shaam ki, tere saath hum jeete hain, tere saath marenge aur tere paas hi wapas jana hai",
    },
    {
      arabic: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      transliteration:
        "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban wa 'amalan mutaqabbalan",
      translation:
        "Aye Allah! Main tujhse nafa'mand ilm, paak rozi, aur maqbool amal maangta hun",
    },
  ],
  shaam: [
    {
      arabic: "اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      transliteration:
        "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir",
      translation:
        "Aye Allah! Tere saath humne shaam ki, tere saath subah karenge, tere saath hum jeete hain, tere saath marenge aur tere paas hi wapas jana hai",
    },
    {
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation:
        "Main Allah ki mukammal baaton ki panah maangta hun, har burai se jo usne paida ki hai",
    },
    {
      arabic: "اَللّٰهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      transliteration:
        "Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana 'abduka",
      translation:
        "Aye Allah! Tu mera Rabb hai, tere siwa koi mabood nahi, tune mujhe paida kiya aur main tera banda hun",
    },
    {
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
      transliteration:
        "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i",
      translation:
        "Allah ke naam se — jiske naam ke saath koi cheez nuqsan nahi pahuncha sakti, na zameen mein na aasman mein",
    },
  ],
  namaz: [
    {
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "Subhanallah",
      translation: "Allah pak hai",
      count: "33x",
    },
    {
      arabic: "اَلْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "Shukar hai Allah ka",
      count: "33x",
    },
    {
      arabic: "اَللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah sabse bada hai",
      count: "33x",
    },
    {
      arabic:
        "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration:
        "La ilaha illallahu wahdahu la sharika lahu lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation:
        "Koi mabood nahi Allah ke siwa, woh akela hai, koi shareek nahi, baadshahi usi ki, taareef usi ki, aur woh har cheez par qadir hai",
    },
  ],
};

export function DuaenModal({ open, onClose }: DuaenModalProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("subah");

  if (!open) return null;

  const duas = DUAS[activeCategory];

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(5,8,20,0.97)" }}
      data-ocid="duaen.modal"
    >
      {/* Animated background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 15%, rgba(212,175,55,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 85%, rgba(16,185,129,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Header */}
      <div
        className="relative flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.15)" }}
      >
        <div>
          <h2
            className="font-bold text-lg shimmer-gold"
            style={{
              fontFamily: "'Georgia', 'Palatino Linotype', serif",
              letterSpacing: "0.06em",
            }}
          >
            📖 Roz Marra ki Duaen
          </h2>
          <p className="text-[10px] text-white/35 mt-0.5 tracking-wider">
            Daily Duas — Roman Urdu & Arabic
          </p>
        </div>
        <button
          type="button"
          data-ocid="duaen.close.button"
          onClick={onClose}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
          style={{ border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <X size={18} className="text-white/70" />
        </button>
      </div>

      {/* Category Tabs */}
      <div
        className="relative flex gap-1 px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            data-ocid={`duaen.${cat.id}.tab`}
            onClick={() => setActiveCategory(cat.id)}
            className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[9px] font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95"
            style={{
              background:
                activeCategory === cat.id
                  ? "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)"
                  : "rgba(255,255,255,0.03)",
              border:
                activeCategory === cat.id
                  ? "1px solid rgba(212,175,55,0.35)"
                  : "1px solid rgba(255,255,255,0.06)",
              color:
                activeCategory === cat.id
                  ? "#D4AF37"
                  : "rgba(255,255,255,0.35)",
              boxShadow:
                activeCategory === cat.id
                  ? "0 0 16px rgba(212,175,55,0.15)"
                  : "none",
            }}
          >
            <span className="text-base">{cat.emoji}</span>
            <span className="leading-tight text-center">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Dua Cards — Scrollable */}
      <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {duas.map((dua, idx) => (
          <div
            key={dua.transliteration}
            className="card-enter glass-premium rounded-2xl p-4"
            style={{
              animationDelay: `${idx * 0.08}s`,
              border: "1px solid rgba(212,175,55,0.12)",
            }}
            data-ocid={`duaen.item.${idx + 1}`}
          >
            {/* Count badge */}
            {dua.count && (
              <div className="flex justify-end mb-2">
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    color: "#D4AF37",
                    border: "1px solid rgba(212,175,55,0.3)",
                  }}
                >
                  {dua.count}
                </span>
              </div>
            )}

            {/* Arabic Text */}
            <p
              className="text-right mb-3 leading-loose"
              style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "1.1rem",
                color: "#D4AF37",
                direction: "rtl",
                textShadow: "0 0 16px rgba(212,175,55,0.25)",
                lineHeight: "2",
              }}
            >
              {dua.arabic}
            </p>

            {/* Divider */}
            <div
              className="my-3"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
              }}
            />

            {/* Transliteration */}
            <p
              className="text-xs italic mb-2 leading-relaxed"
              style={{ color: "rgba(212,175,55,0.7)" }}
            >
              {dua.transliteration}
            </p>

            {/* Translation */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              🌙 {dua.translation}
            </p>
          </div>
        ))}

        {/* Bottom padding */}
        <div className="h-6" />
      </div>
    </div>
  );
}

export default DuaenModal;
