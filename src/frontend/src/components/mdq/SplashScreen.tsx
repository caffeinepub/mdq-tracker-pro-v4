import { useEffect, useState } from "react";

interface SplashScreenProps {
  onEnter: () => void;
}

const KISWAH_BANDS = ["30%", "50%", "68%"];

export function SplashScreen({ onEnter }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 800);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background:
          "linear-gradient(160deg, #060d1f 0%, #0d1a35 40%, #091428 70%, #050c1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
        overflow: "hidden",
      }}
    >
      {/* Background radial glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "30%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Star particles -- deterministic positions */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            borderRadius: "50%",
            background:
              i % 3 === 0 ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.3)",
            top: `${5 + ((i * 8) % 85)}%`,
            left: `${5 + ((i * 13) % 88)}%`,
            animation: `breathe ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Kaaba Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "28px",
            position: "relative",
            animation: "floatKaaba 4s ease-in-out infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-12px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)",
              animation: "breathe 3s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "16px",
              background:
                "linear-gradient(145deg, rgba(212,175,55,0.15) 0%, rgba(12,18,32,0.9) 40%, rgba(5,10,20,0.98) 100%)",
              border: "2px solid rgba(212,175,55,0.5)",
              boxShadow:
                "0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1), inset 0 1px 0 rgba(212,175,55,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {KISWAH_BANDS.map((top) => (
              <div
                key={top}
                style={{
                  position: "absolute",
                  top,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: "rgba(212,175,55,0.3)",
                }}
              />
            ))}
            <div style={{ fontSize: "36px", lineHeight: 1 }}>🕋</div>
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Amiri', 'Georgia', serif",
            fontSize: "2.2rem",
            fontWeight: "800",
            letterSpacing: "0.15em",
            background:
              "linear-gradient(90deg, #b8941e 0%, #D4AF37 35%, #f5d97a 55%, #D4AF37 75%, #b8941e 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 3s linear infinite",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Tracker Pro
        </h1>

        {/* Spiritual message */}
        <p
          style={{
            fontFamily: "'Amiri', 'Georgia', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: "rgba(212,175,55,0.7)",
            textAlign: "center",
            marginBottom: "8px",
            letterSpacing: "0.04em",
          }}
        >
          &ldquo;Apne Rab ki taraf laut aao&rdquo;
        </p>

        {/* Arabic */}
        <p
          style={{
            fontFamily: "'Amiri', serif",
            fontSize: "1.1rem",
            color: "rgba(212,175,55,0.5)",
            direction: "rtl",
            marginBottom: "44px",
            letterSpacing: "0.06em",
          }}
        >
          إِقَامَةُ الصَّلاةِ
        </p>

        {/* Bismillah Button */}
        <button
          type="button"
          data-ocid="splash.bismillah.button"
          onClick={handleEnter}
          style={{
            padding: "16px 48px",
            borderRadius: "50px",
            background:
              "linear-gradient(135deg, #D4AF37 0%, #c49a1a 50%, #D4AF37 100%)",
            backgroundSize: "200% 100%",
            color: "#060d1f",
            fontWeight: "800",
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            border: "none",
            cursor: "pointer",
            boxShadow:
              "0 0 30px rgba(212,175,55,0.5), 0 4px 20px rgba(212,175,55,0.3)",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            WebkitTapHighlightColor: "transparent",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "pulse-gold 2.5s ease-in-out infinite",
            fontFamily: "'Amiri', 'Georgia', serif",
          }}
          onTouchStart={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(0.96)";
          }}
          onTouchEnd={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <span>بِسْمِ اللَّهِ</span>
          <span
            style={{ fontSize: "0.85rem", fontFamily: "'Poppins', sans-serif" }}
          >
            Bismillah
          </span>
          <span>→</span>
        </button>

        {/* Divider */}
        <div
          style={{
            width: "120px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
            margin: "36px 0 12px",
          }}
        />

        {/* Footer */}
        <p
          style={{
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Crafted with Purity by{" "}
          <span
            style={{
              fontWeight: "800",
              fontSize: "0.85rem",
              background: "linear-gradient(90deg, #D4AF37, #f5d97a, #D4AF37)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}
          >
            MDQ
          </span>
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
