import { ArrowLeft, Globe } from "lucide-react";
import { useState } from "react";

type Lang = "roman" | "urdu" | "telugu";

interface IntroductionPageProps {
  onBack: () => void;
}

const installGuide: Record<Lang, { title: string; steps: string[] }> = {
  roman: {
    title: "App Kaise Install Karen",
    steps: [
      "Chrome mein app ka link open karein",
      "Upar daayein 3 dots (⋮) tap karein",
      '"Add to Home Screen" option tap karein',
      '"Install" button dabayein -- app install ho jaayega',
      "App open karein, Settings mein jaayein -- Azan & Jamaat timings set karein",
      "Ab har namaz se pehle notification aayegi InshaAllah!",
    ],
  },
  urdu: {
    title: "ایپ کیسے انسٹال کریں",
    steps: [
      "کروم میں ایپ کا لنک کھولیں",
      "اوپر دائیں 3 نقطے (⋮) ٹیپ کریں",
      '"Add to Home Screen" آپشن ٹیپ کریں',
      '"Install" بٹن دبائیں -- ایپ انسٹال ہو جائے گی',
      "ایپ کھولیں، سیٹنگز میں جائیں -- اذان و جماعت ٹائمنگز سیٹ کریں",
      "اب ہر نماز سے پہلے نوٹیفکیشن آئے گی انشاء اللہ!",
    ],
  },
  telugu: {
    title: "యాప్ ఎలా ఇన్‌స్టాల్ చేయాలి",
    steps: [
      "Chrome లో యాప్ లింక్ తెరవండి",
      "పైన కుడివైపు 3 చుక్కలు (⋮) నొక్కండి",
      '"Add to Home Screen" ఎంచుకోండి',
      '"Install" నొక్కండి -- యాప్ ఇన్‌స్టాల్ అవుతుంది',
      "యాప్ తెరవండి, Settings కి వెళ్ళండి -- Azan & Jamaat సమయాలు సెట్ చేయండి",
      "ఇప్పుడు ప్రతి నమాజ్ కు ముందు notification వస్తుంది InshaAllah!",
    ],
  },
};

const content: Record<
  Lang,
  {
    title: string;
    tagline: string;
    intro: string;
    features: { icon: string; name: string; desc: string }[];
    privacy: string;
    privacyTitle: string;
    featuresTitle: string;
    dir: "ltr" | "rtl";
    font: string;
  }
> = {
  roman: {
    title: "NAMAZ TRACKER ke Baare Mein",
    tagline: "Aapki Ibadat ka Digital Muhafiz",
    intro:
      "NAMAZ TRACKER ek premium Islamic app hai jo specially un Muslims ke liye banaya gaya hai jo apni Namaz ko track karna chahte hain. Ye app aapki har Farz, Sunnah, aur Nafil Namaz ko record karta hai, Qaza ka hisaab rakhta hai, aur aapko ek muntazam Muslman banne mein madad karta hai.",
    featuresTitle: "App ki Khasiyaat",
    features: [
      {
        icon: "🕌",
        name: "Panj Waqt Namaz Tracking",
        desc: "Fajr se Isha tak har Namaz ada karo aur record karo",
      },
      {
        icon: "📊",
        name: "Qaza Vault",
        desc: "Chuti hui Namazein track karo aur adaa karo",
      },
      {
        icon: "🌙",
        name: "Nafil Analysis",
        desc: "Apni nafl ibaadat ka monthly jaiza lo",
      },
      {
        icon: "🤲",
        name: "Dua Mode",
        desc: "53+ mustanad duaen Urdu, Roman Urdu, aur Telugu mein",
      },
      {
        icon: "📿",
        name: "Tasbih Mode",
        desc: "50+ wazaif ke saath premium tasbih counter",
      },
      { icon: "✍️", name: "Daily Journal", desc: "Roz apne dil ki baat likho" },
      {
        icon: "📝",
        name: "Blog Mode",
        desc: "Islamic articles padho aur likho",
      },
      {
        icon: "🔔",
        name: "Notifications",
        desc: "Namaz ke waqt yaaddehani ke liye",
      },
    ],
    privacyTitle: "Privacy ka Hifazat",
    privacy:
      "Aapka sab data aapke phone mein mehfooz hai. Koi cloud sync nahi, koi privacy issue nahi. Aapki ibadat sirf aapki apni hai.",
    dir: "ltr",
    font: "'Poppins', sans-serif",
  },
  urdu: {
    title: "نماز ٹریکر کے بارے میں",
    tagline: "آپ کی عبادت کا ڈیجیٹل محافظ",
    intro:
      "نماز ٹریکر ایک پریمیم اسلامی ایپ ہے جو خاص طور پر ان مسلمانوں کے لیے بنائی گئی ہے جو اپنی نماز کو ٹریک کرنا چاہتے ہیں۔ یہ ایپ آپ کی ہر فرض، سنت، اور نفل نماز کو ریکارڈ کرتی ہے، قضا کا حساب رکھتی ہے، اور آپ کو ایک منظم مسلمان بننے میں مدد کرتی ہے۔",
    featuresTitle: "ایپ کی خصوصیات",
    features: [
      {
        icon: "🕌",
        name: "پانچ وقت نماز ٹریکنگ",
        desc: "فجر سے عشاء تک ہر نماز ادا کریں اور ریکارڈ کریں",
      },
      {
        icon: "📊",
        name: "قضا والٹ",
        desc: "چھوٹی ہوئی نمازیں ٹریک کریں اور ادا کریں",
      },
      {
        icon: "🌙",
        name: "نفل تجزیہ",
        desc: "اپنی نفل عبادت کا ماہانہ جائزہ لیں",
      },
      {
        icon: "🤲",
        name: "دعا موڈ",
        desc: "53+ مستند دعائیں اردو اور رومن اردو میں",
      },
      {
        icon: "📿",
        name: "تسبیح موڈ",
        desc: "50+ وظائف کے ساتھ پریمیم تسبیح کاؤنٹر",
      },
      { icon: "✍️", name: "روزانہ جرنل", desc: "روز اپنے دل کی بات لکھیں" },
      { icon: "📝", name: "بلاگ موڈ", desc: "اسلامی مضامین پڑھیں اور لکھیں" },
      { icon: "🔔", name: "نوٹیفیکیشن", desc: "نماز کے وقت یاددہانی کے لیے" },
    ],
    privacyTitle: "پرائیویسی کی حفاظت",
    privacy:
      "آپ کا سارا ڈیٹا آپ کے فون میں محفوظ ہے۔ کوئی کلاؤڈ سنک نہیں، کوئی پرائیویسی مسئلہ نہیں۔ آپ کی عبادت صرف آپ کی اپنی ہے۔",
    dir: "rtl",
    font: "'Amiri', serif",
  },
  telugu: {
    title: "నమాజ్ ట్రాకర్ గురించి",
    tagline: "మీ ఇబాదత్ యొక్క డిజిటల్ రక్షకుడు",
    intro:
      "నమాజ్ ట్రాకర్ ఒక ప్రీమియం ఇస్లామిక్ యాప్, ఇది ప్రత్యేకంగా ముస్లిం సోదరులకు వారి నమాజ్ ట్రాక్ చేయడానికి రూపొందించబడింది. ఈ యాప్ మీ ప్రతి ఫర్జ్, సున్నత్ మరియు నఫిల్ నమాజ్‌ని రికార్డ్ చేస్తుంది మరియు మీకు క్రమబద్ధమైన ముస్లిం అవ్వడంలో సహాయపడుతుంది.",
    featuresTitle: "యాప్ యొక్క విశేషాలు",
    features: [
      {
        icon: "🕌",
        name: "పంచ వక్త్ నమాజ్ ట్రాకింగ్",
        desc: "ఫజర్ నుండి ఇషా వరకు ప్రతి నమాజ్ చేయండి మరియు రికార్డ్ చేయండి",
      },
      { icon: "📊", name: "ఖజా వాల్ట్", desc: "మిస్ అయిన నమాజ్‌లు ట్రాక్ చేయండి మరియు చేయండి" },
      { icon: "🌙", name: "నఫిల్ విశ్లేషణ", desc: "మీ నఫిల్ ఇబాదత్ యొక్క నెలవారీ సమీక్ష చేయండి" },
      { icon: "🤲", name: "దువా మోడ్", desc: "53+ ప్రామాణిక దువాలు తెలుగు మరియు ఉర్దూలో" },
      { icon: "📿", name: "తస్బీహ్ మోడ్", desc: "50+ వజాయిఫ్‌తో ప్రీమియం తస్బీహ్ కౌంటర్" },
      { icon: "✍️", name: "డైలీ జర్నల్", desc: "రోజూ మీ మనసులో ఉన్న మాటలు రాయండి" },
      { icon: "📝", name: "బ్లాగ్ మోడ్", desc: "ఇస్లామిక్ వ్యాసాలు చదవండి మరియు రాయండి" },
      { icon: "🔔", name: "నోటిఫికేషన్లు", desc: "నమాజ్ వేళప్పుడు గుర్తు చేయడానికి" },
    ],
    privacyTitle: "గోప్యత రక్షణ",
    privacy:
      "మీ డేటా మీ ఫోన్‌లో సురక్షితంగా ఉంటుంది. క్లౌడ్ సింక్ లేదు, గోప్యత సమస్య లేదు. మీ ఇబాదత్ మీకు మాత్రమే చెందినది.",
    dir: "ltr",
    font: "'Poppins', sans-serif",
  },
};

export function IntroductionPage({ onBack }: IntroductionPageProps) {
  const [lang, setLang] = useState<Lang>("roman");
  const c = content[lang];
  const guide = installGuide[lang];

  const langButtons: { key: Lang; label: string }[] = [
    { key: "roman", label: "Roman Urdu" },
    { key: "urdu", label: "اردو" },
    { key: "telugu", label: "తెలుగు" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        background: "#F5F0E8",
        paddingBottom: "40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D1B2A 0%, #1a2d45 100%)",
          padding: "16px 20px 20px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <button
            type="button"
            data-ocid="intro.close_button"
            onClick={onBack}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.4)",
              background: "rgba(201,168,76,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <ArrowLeft size={18} style={{ color: "#C9A84C" }} />
          </button>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                color: "#C9A84C",
                fontFamily: "'Amiri', serif",
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              App ka Ta'aruf
            </h1>
            <p
              style={{
                color: "rgba(201,168,76,0.6)",
                fontSize: "11px",
                margin: 0,
              }}
            >
              Introduction
            </p>
          </div>
          <Globe size={20} style={{ color: "rgba(201,168,76,0.5)" }} />
        </div>

        {/* Language Toggle */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "4px",
          }}
        >
          {langButtons.map((btn) => (
            <button
              key={btn.key}
              type="button"
              data-ocid={`intro.lang.${btn.key}.tab`}
              onClick={() => setLang(btn.key)}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: "9px",
                border: "none",
                background:
                  lang === btn.key
                    ? "linear-gradient(135deg, #C9A84C, #b8941e)"
                    : "transparent",
                color: lang === btn.key ? "#0D1B2A" : "rgba(201,168,76,0.7)",
                fontSize: "12px",
                fontWeight: lang === btn.key ? "700" : "500",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                fontFamily:
                  btn.key === "urdu"
                    ? "'Amiri', serif"
                    : "'Poppins', sans-serif",
                transition: "all 0.2s",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }} dir={c.dir}>
        {/* Title Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #0D1B2A 0%, #1a2d45 100%)",
            borderRadius: "20px",
            padding: "24px 20px",
            marginBottom: "16px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(201,168,76,0.08)",
            }}
          />
          <div style={{ fontSize: "42px", marginBottom: "12px" }}>🕌</div>
          <h2
            style={{
              color: "#C9A84C",
              fontFamily: c.font,
              fontSize: lang === "urdu" ? "22px" : "18px",
              fontWeight: "700",
              margin: "0 0 8px",
              lineHeight: 1.4,
            }}
          >
            {c.title}
          </h2>
          <p
            style={{
              color: "rgba(201,168,76,0.7)",
              fontFamily: c.font,
              fontSize: "13px",
              margin: 0,
            }}
          >
            {c.tagline}
          </p>
        </div>

        {/* Intro Paragraph */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "16px",
            boxShadow: "0 2px 12px rgba(13,27,42,0.08)",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <p
            style={{
              color: "#374151",
              fontFamily: c.font,
              fontSize: lang === "urdu" ? "16px" : "13px",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {c.intro}
          </p>
        </div>

        {/* PWA Install Guide */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "16px",
            boxShadow: "0 2px 12px rgba(13,27,42,0.08)",
            border: "1px solid rgba(201,168,76,0.15)",
          }}
        >
          <h3
            style={{
              color: "#0D1B2A",
              fontFamily: c.font,
              fontSize: "15px",
              fontWeight: "700",
              marginBottom: "14px",
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>📲</span> {guide.title}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {guide.steps.map((step, idx) => (
              <div
                key={step.slice(0, 20)}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0D1B2A, #1a2d45)",
                    border: "2px solid #C9A84C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: "#C9A84C",
                      fontSize: "11px",
                      fontWeight: "700",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {idx + 1}
                  </span>
                </div>
                <p
                  style={{
                    color: "#374151",
                    fontFamily: c.font,
                    fontSize: lang === "urdu" ? "15px" : "13px",
                    margin: 0,
                    lineHeight: 1.6,
                    flex: 1,
                  }}
                >
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "16px",
            boxShadow: "0 2px 12px rgba(13,27,42,0.08)",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <h3
            style={{
              color: "#0D1B2A",
              fontFamily: c.font,
              fontSize: "15px",
              fontWeight: "700",
              marginBottom: "14px",
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#C9A84C" }}>✦</span> {c.featuresTitle}
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {c.features.map((f) => (
              <div
                key={f.name}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  background: "rgba(201,168,76,0.04)",
                  border: "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <span style={{ fontSize: "20px", flexShrink: 0 }}>
                  {f.icon}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "#0D1B2A",
                      fontFamily: c.font,
                      fontSize: "13px",
                      fontWeight: "600",
                      margin: "0 0 2px",
                    }}
                  >
                    {f.name}
                  </p>
                  <p
                    style={{
                      color: "#6b7280",
                      fontFamily: c.font,
                      fontSize: "11px",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(13,27,42,0.04), rgba(201,168,76,0.04))",
            borderRadius: "16px",
            padding: "18px",
            marginBottom: "16px",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
        >
          <h3
            style={{
              color: "#0D1B2A",
              fontFamily: c.font,
              fontSize: "14px",
              fontWeight: "700",
              marginBottom: "8px",
              marginTop: 0,
            }}
          >
            🔒 {c.privacyTitle}
          </h3>
          <p
            style={{
              color: "#374151",
              fontFamily: c.font,
              fontSize: lang === "urdu" ? "15px" : "12px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {c.privacy}
          </p>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: "8px" }}>
          <p
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "13px",
              background: "linear-gradient(135deg, #C9A84C, #b8941e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}
          >
            Crafted with Purity by MDQ ✦
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroductionPage;
