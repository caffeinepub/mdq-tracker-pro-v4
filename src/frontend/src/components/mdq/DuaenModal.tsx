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
  source?: string;
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
      source: "Bukhari",
    },
    {
      arabic: "اَللّٰهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      transliteration:
        "Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilaykan-nushur",
      translation:
        "Aye Allah! Tere saath humne subah ki, tere saath shaam ki, tere saath hum jeete hain, tere saath marenge aur tere paas hi wapas jana hai",
      source: "Abu Dawud",
    },
    {
      arabic:
        "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      transliteration:
        "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
      translation:
        "Allah ke naam se — jiske naam ke saath koi cheez takleef nahi de sakti. Woh sunne wala jaanne wala hai",
      count: "3x",
      source: "Abu Dawud",
    },
    {
      arabic: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      transliteration:
        "Allahumma inni as'aluka 'ilman nafi'an wa rizqan tayyiban wa 'amalan mutaqabbalan",
      translation:
        "Aye Allah! Main tujhse nafa'mand ilm, paak rozi, aur maqbool amal maangta hun",
      source: "Ibn Majah",
    },
    {
      arabic:
        "اَللّٰهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      transliteration:
        "Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana 'abduka wa ana 'ala 'ahdika wa wa'dika mastata'tu",
      translation:
        "Aye Allah! Tu mera Rabb hai. Tere siwa koi mabood nahi. Tune mujhe paida kiya, main tera banda hun, aur apne ahad par qaim hun jis qadar ho sake",
      source: "Bukhari — Sayyidul Istighfar",
    },
    {
      arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      transliteration: "A'udhu billahi minash-shaytanir-rajim",
      translation: "Main Allah ki panah maangta hun Shaitan mardood se",
      source: "Quran",
    },
    {
      arabic: "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ",
      transliteration:
        "Allahumma inni a'udhu bika minal-hammi wal-hazani wa a'udhu bika minal-'ajzi wal-kasali",
      translation:
        "Aye Allah! Main gham aur udaasi se teri panah maangta hun, aur laachaargi aur sasti se teri panah maangta hun",
      source: "Bukhari",
    },
    {
      arabic: "اَللّٰهُمَّ عَافِنِي فِي بَدَنِي اَللّٰهُمَّ عَافِنِي فِي سَمْعِي اَللّٰهُمَّ عَافِنِي فِي بَصَرِي",
      transliteration:
        "Allahumma 'afini fi badani, Allahumma 'afini fi sam'i, Allahumma 'afini fi basari",
      translation:
        "Aye Allah! Mere jism ko aafiyat de, mere kaan ko aafiyat de, meri aankhon ko aafiyat de",
      count: "3x",
      source: "Abu Dawud",
    },
    {
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      transliteration:
        "Raditu billahi rabban wa bil-islami dinan wa bi-Muhammadin sallallahu 'alayhi wa sallama nabiyya",
      translation:
        "Main Allah ko Rabb, Islam ko deen, aur Muhammad (SAW) ko nabi maan kar raazi hun",
      count: "3x",
      source: "Abu Dawud",
    },
    {
      arabic:
        "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
      transliteration:
        "Ya Hayyu ya Qayyumu bi-rahmatika astaghithu, aslih li sha'ni kullahu wa la takilni ila nafsi tarfata 'ayn",
      translation:
        "Aye Zindah! Aye Qaim! Teri rehmat ka wasila pakad ke madad maangta hun. Mere tamam kaam sahi kar de, aur aik pal bhi mujhe mere apne nafs ke supurd mat kar",
      source: "Hakim",
    },
    {
      arabic: "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
      transliteration:
        "Allahumma inni as'alukal-'afwa wal-'afiyata fid-dunya wal-akhirah",
      translation:
        "Aye Allah! Main tujhse duniya aur aakhirat mein maafi aur aafiyat maangta hun",
      source: "Ibn Majah",
    },
  ],
  shaam: [
    {
      arabic: "اَللّٰهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      transliteration:
        "Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir",
      translation:
        "Aye Allah! Tere saath humne shaam ki, tere saath subah karenge, tere saath hum jeete hain, tere saath marenge aur tere paas hi wapas jana hai",
      source: "Abu Dawud",
    },
    {
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
      translation:
        "Main Allah ki mukammal baaton ki panah maangta hun, har burai se jo usne paida ki hai",
      count: "3x",
      source: "Muslim",
    },
    {
      arabic: "اَللّٰهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
      transliteration:
        "Allahumma anta Rabbi la ilaha illa anta khalaqtani wa ana 'abduka",
      translation:
        "Aye Allah! Tu mera Rabb hai, tere siwa koi mabood nahi, tune mujhe paida kiya aur main tera banda hun",
      source: "Bukhari",
    },
    {
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
      transliteration:
        "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i",
      translation:
        "Allah ke naam se — jiske naam ke saath koi cheez nuqsan nahi pahuncha sakti, na zameen mein na aasman mein",
      count: "3x",
      source: "Abu Dawud",
    },
    {
      arabic:
        "اَللّٰهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلَٰهَ إِلَّا أَنْتَ",
      transliteration:
        "Allahumma inni amsaytu ushhiduka wa ushhidu hamalata 'arshika wa mala'ikataka wa jami'a khalqika annaka antallahu la ilaha illa ant",
      translation:
        "Aye Allah! Main shaam ko tujhe, tere arsh uthane walon ko, farishton ko aur tamam makhlooq ko gawah banata hun ke tu hi Allah hai, tere siwa koi mabood nahi",
      count: "4x",
      source: "Abu Dawud",
    },
    {
      arabic: "اَللّٰهُمَّ مَا أَمْسَىٰ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ",
      transliteration:
        "Allahumma ma amsa bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika lak",
      translation:
        "Aye Allah! Jo bhi ne'mat shaam ke waqt mujhe ya teri makhlooq mein se kisi ko mili hai, woh sirf tere hi taraf se hai, tera koi shareek nahi",
      source: "Abu Dawud",
    },
    {
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      transliteration:
        "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu wa huwa rabbul-'arshil-'azim",
      translation:
        "Mujhe Allah kaafi hai, uske siwa koi mabood nahi, main ne usi par tawakkul kiya, aur woh 'arsh-e-azeem ka Rabb hai",
      count: "7x",
      source: "Abu Dawud",
    },
    {
      arabic:
        "اَللّٰهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا",
      transliteration:
        "Allahumma inni as'aluka khayra hadhihil-laylati wa khayra ma ba'daha wa a'udhu bika min sharri hadhihil-laylati wa sharri ma ba'daha",
      translation:
        "Aye Allah! Main is raat ki khair maangta hun aur is ke baad ki bhi, aur is raat ki burai aur is ke baad ki burai se teri panah maangta hun",
      source: "Muslim",
    },
    {
      arabic: "اَللّٰهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي",
      transliteration: "Allahummaghfir li warhamni wahdiní wa 'afini warzuqni",
      translation:
        "Aye Allah! Mujhe maaf kar, mujh par raham kar, mujhe hidayat de, mujhe aafiyat de, aur mujhe rozi de",
      source: "Muslim",
    },
    {
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      transliteration: "Subhanallahi wa bihamdihi",
      translation: "Allah paak hai aur usi ki taareef hai",
      count: "100x",
      source: "Bukhari",
    },
    {
      arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
      transliteration:
        "Astaghfirullaahal-'azeemal-ladhee laa ilaaha illaa huwal-hayyul-qayyoomu wa atuubu ilayh",
      translation:
        "Main Allah Azim se maafi maangta hun, jiske siwa koi mabood nahi, jo Zindah aur Qaim hai, aur main usi ki taraf raajoo'  karta hun",
      count: "3x",
      source: "Abu Dawud",
    },
  ],
  namaz: [
    {
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "Subhanallah",
      translation: "Allah pak hai",
      count: "33x",
      source: "Muslim",
    },
    {
      arabic: "اَلْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "Shukar hai Allah ka",
      count: "33x",
      source: "Muslim",
    },
    {
      arabic: "اَللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah sabse bada hai",
      count: "33x",
      source: "Muslim",
    },
    {
      arabic:
        "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      transliteration:
        "La ilaha illallahu wahdahu la sharika lahu lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir",
      translation:
        "Koi mabood nahi Allah ke siwa, woh akela hai, koi shareek nahi, baadshahi usi ki, taareef usi ki, aur woh har cheez par qadir hai",
      count: "1x",
      source: "Muslim",
    },
    {
      arabic: "اَللّٰهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration:
        "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
      translation:
        "Aye Allah! Tere zikr, tera shukar ada karne aur acha ibadat karne mein meri madad kar",
      source: "Abu Dawud",
    },
    {
      arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
      transliteration:
        "Rabbigh-fir li wa li-walidayya wa lil-mu'minina yawma yaqumul-hisab",
      translation:
        "Aye Rabb! Mujhe, mere waaldain ko, aur tamam mominon ko hisaab ke din maaf farma",
      source: "Quran 14:41",
    },
    {
      arabic:
        "اَللّٰهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ جَهَنَّمَ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
      transliteration:
        "Allahumma inni a'udhu bika min 'adhabil-qabri wa min 'adhabi jahannam wa min fitnatil-mahya wal-mamat",
      translation:
        "Aye Allah! Main qabar ke azaab, jahannam ke azaab, aur zindagi aur maut ki fitna se teri panah maangta hun",
      source: "Bukhari",
    },
    {
      arabic: "اَللّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
      transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammad",
      translation:
        "Aye Allah! Muhammad (SAW) par aur unke ahl-e-bait par durood bhej",
      source: "Bukhari",
    },
    {
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration:
        "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
      translation:
        "Aye Rabb! Hame duniya mein bhi bhalai de aur aakhirat mein bhi bhalai de, aur hame aag ke azaab se bacha",
      source: "Quran 2:201",
    },
    {
      arabic: "اَللّٰهُمَّ اغْفِرْ لِي ذَنْبِي وَوَسِّعْ لِي فِي دَارِي وَبَارِكْ لِي فِيمَا رَزَقْتَنِي",
      transliteration:
        "Allahummaghfir li dhambi wa wassi' li fi dari wa barik li fima razaqtani",
      translation:
        "Aye Allah! Mere gunaah maaf kar, mere ghar mein kushadi de, aur jo rozi tune di hai usme barkat dal",
      source: "Nasa'i",
    },
    {
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilma",
      translation: "Aye Rabb! Mera ilm barha",
      source: "Quran 20:114",
    },
    {
      arabic:
        "اَللّٰهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي",
      transliteration:
        "Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta faghfir li maghfiratan min 'indika warhamni",
      translation:
        "Aye Allah! Main ne apne aap par bahut zulm kiya, aur gunaah sirf tu hi maaf kar sakta hai, toh apni janib se mujhe maafi de aur mujh par raham kar",
      source: "Bukhari",
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
            Daily Duas — Arabic & Roman Urdu
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

      {/* Duas count */}
      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <p className="text-[10px] text-white/25 text-center tracking-wider">
          {duas.length} Duaen —{" "}
          {CATEGORIES.find((c) => c.id === activeCategory)?.label}
        </p>
      </div>

      {/* Dua Cards — Scrollable */}
      <div className="relative flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {duas.map((dua, idx) => (
          <div
            key={dua.transliteration}
            className="card-enter glass-premium rounded-2xl p-4"
            style={{
              animationDelay: `${idx * 0.06}s`,
              border: "1px solid rgba(212,175,55,0.12)",
            }}
            data-ocid={`duaen.item.${idx + 1}`}
          >
            {/* Top row: count badge + source */}
            <div className="flex justify-between items-center mb-2">
              {dua.source ? (
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    color: "rgba(147,197,253,0.7)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  {dua.source}
                </span>
              ) : (
                <span />
              )}
              {dua.count && (
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
              )}
            </div>

            {/* Number badge */}
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mt-1"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  color: "rgba(212,175,55,0.7)",
                }}
              >
                {idx + 1}
              </span>

              <div className="flex-1">
                {/* Arabic Text */}
                <p
                  className="text-right mb-3 leading-loose"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontSize: "1.05rem",
                    color: "#D4AF37",
                    direction: "rtl",
                    textShadow: "0 0 16px rgba(212,175,55,0.25)",
                    lineHeight: "2.2",
                  }}
                >
                  {dua.arabic}
                </p>

                {/* Divider */}
                <div
                  className="my-2"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)",
                  }}
                />

                {/* Transliteration */}
                <p
                  className="text-xs italic mb-2 leading-relaxed"
                  style={{ color: "rgba(212,175,55,0.65)" }}
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
            </div>
          </div>
        ))}

        {/* Bottom padding */}
        <div className="h-6" />
      </div>
    </div>
  );
}

export default DuaenModal;
