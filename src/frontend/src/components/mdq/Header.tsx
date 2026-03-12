import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  profileName: string;
  isNormalMode: boolean;
  onProfileUpdate: (name: string, isNormalMode: boolean) => void;
  onOpenDuaen: () => void;
}

export function Header({
  profileName,
  isNormalMode,
  onProfileUpdate,
  onOpenDuaen: _onOpenDuaen,
}: HeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editName, setEditName] = useState(profileName);
  const [localMode, setLocalMode] = useState(isNormalMode);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditName(profileName);
    setLocalMode(isNormalMode);
  }, [profileName, isNormalMode]);

  const handleClose = () => {
    onProfileUpdate(editName.trim() || "Muslim User", localMode);
    setSidebarOpen(false);
  };

  const initial = (editName || "M").charAt(0).toUpperCase();

  return (
    <>
      {/* Header Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          paddingTop: "env(safe-area-inset-top, 0px)",
          background: "linear-gradient(135deg,#0A0F2C 0%,#111833 100%)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderBottom: "1px solid rgba(201,168,76,0.25)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.4)",
        }}
      >
        <div className="mx-auto max-w-[430px] flex items-center justify-between px-4 h-14">
          {/* 3D Mosque / Crescent Icon LEFT -- clean, no dots */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "1px solid rgba(201,168,76,0.25)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <title>Mosque icon</title>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#C9A84C" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Dome */}
              <ellipse
                cx="18"
                cy="20"
                rx="11"
                ry="9"
                fill="url(#goldGrad)"
                filter="url(#glow)"
                opacity="0.95"
              />
              {/* Main dome arch */}
              <path d="M7 20 Q7 11 18 11 Q29 11 29 20" fill="url(#goldGrad)" />
              {/* Center minaret */}
              <rect
                x="16.5"
                y="5"
                width="3"
                height="7"
                rx="1.5"
                fill="url(#goldGrad)"
              />
              {/* Minaret top crescent */}
              <path
                d="M18 4 C16 4 15 3 15.5 2 C16 1 17 1.5 18 2 C19 1.5 20 1 20.5 2 C21 3 20 4 18 4Z"
                fill="url(#goldGrad)"
              />
              {/* Left minaret */}
              <rect
                x="9"
                y="13"
                width="2.5"
                height="5"
                rx="1.2"
                fill="url(#goldGrad)"
                opacity="0.8"
              />
              {/* Right minaret */}
              <rect
                x="24.5"
                y="13"
                width="2.5"
                height="5"
                rx="1.2"
                fill="url(#goldGrad)"
                opacity="0.8"
              />
              {/* Door arch */}
              <path
                d="M15 28 L15 22 Q18 19 21 22 L21 28Z"
                fill="rgba(10,15,44,0.7)"
              />
              {/* Base */}
              <rect
                x="6"
                y="27"
                width="24"
                height="2.5"
                rx="1.2"
                fill="url(#goldGrad)"
                opacity="0.9"
              />
              {/* Removed window dots for clean premium look */}
            </svg>
          </div>

          {/* Title CENTER */}
          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center gap-1.5">
              <h1
                className="font-bold text-sm tracking-[0.15em] shimmer-gold"
                style={{
                  fontFamily: "'Amiri', 'Georgia', serif",
                  letterSpacing: "0.12em",
                }}
              >
                NAMAZ TRACKER
              </h1>
            </div>
            <p
              className="text-[8px] tracking-[0.18em] uppercase"
              style={{
                color: "rgba(201,168,76,0.55)",
                letterSpacing: "0.2em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Created by MDQ
            </p>
          </div>

          {/* Hamburger RIGHT */}
          <button
            type="button"
            data-ocid="header.hamburger.button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-all active:scale-95"
            style={{
              background: "rgba(201,168,76,0.12)",
              border: "1px solid rgba(201,168,76,0.3)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Menu size={20} style={{ color: "#C9A84C" }} />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100]"
          style={{
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => {
            if (e.target === overlayRef.current) handleClose();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
          role="presentation"
        >
          {/* Sidebar slides from RIGHT */}
          <div
            className="slide-in-right absolute inset-y-0 right-0 w-[300px] flex flex-col"
            style={{
              background: "#ffffff",
              borderLeft: "1px solid rgba(201,168,76,0.15)",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
            }}
          >
            {/* Sidebar Header */}
            <div
              className="flex items-center justify-between px-5 pt-12 pb-4"
              style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}
            >
              <button
                type="button"
                data-ocid="sidebar.close.button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{
                  background: "rgba(0,0,0,0.06)",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <X size={16} style={{ color: "#4a5568" }} />
              </button>
              <div className="flex flex-col items-end">
                <h2
                  className="font-bold text-base shimmer-gold"
                  style={{
                    fontFamily: "'Amiri', 'Georgia', serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  NAMAZ TRACKER
                </h2>
                <p
                  className="text-[8px] tracking-[0.18em] uppercase"
                  style={{
                    color: "rgba(184,148,30,0.5)",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Created by MDQ
                </p>
              </div>
            </div>

            {/* User Profile Section at TOP */}
            <div
              className="px-5 py-5"
              style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}
            >
              <div className="flex flex-col items-center gap-3 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.08) 100%)",
                    border: "2px solid rgba(201,168,76,0.45)",
                    boxShadow: "0 0 16px rgba(201,168,76,0.2)",
                  }}
                >
                  <span className="text-2xl font-bold shimmer-gold">
                    {initial}
                  </span>
                </div>
                <div className="text-center">
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: "#1a2035",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {editName || "Muslim User"}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Tap below to edit name
                  </p>
                </div>
              </div>
              <div
                className="rounded-xl px-3 py-2 flex items-center gap-2"
                style={{
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <span style={{ color: "#C9A84C", fontSize: "14px" }}>✏️</span>
                <input
                  id="sidebar-profile-name"
                  data-ocid="sidebar.profile.input"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Apna naam likhein"
                  className="w-full bg-transparent text-sm font-medium border-none outline-none"
                  style={{
                    color: "#1a2035",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                />
              </div>
            </div>

            {/* About & Features */}
            <div className="px-5 py-5 flex-1 overflow-y-auto">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: "#C9A84C" }}>🕌</span>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider shimmer-gold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    App ke Baare Mein
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(201,168,76,0.04)",
                    border: "1px solid rgba(201,168,76,0.1)",
                  }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#4a5568",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <strong style={{ color: "#1a2035" }}>NAMAZ TRACKER</strong>{" "}
                    ek premium Islamic prayer tracking app hai. Apni rozana ki
                    namaz track karein, Qaza records rakhen, aur koi namaz kabhi
                    na chhooren.
                  </p>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                {[
                  { icon: "🕌", label: "5 Waqt ki Namazein" },
                  { icon: "⏰", label: "Time-Lock Engine" },
                  { icon: "📋", label: "Qaza Vault & Adaa Records" },
                  { icon: "🌙", label: "Grace Period System" },
                  { icon: "📿", label: "Tasbih & Wazaif" },
                  { icon: "🤲", label: "50+ Roz ki Duaen" },
                  { icon: "✍️", label: "Daily Write Journal" },
                  { icon: "📖", label: "Blog: Islamic Articles" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 text-xs"
                    style={{
                      color: "#4a5568",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-xl p-3"
                style={{
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <p
                  className="text-[10px] leading-relaxed"
                  style={{
                    color: "#8a9bb0",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  ⚖️ Yeh app personal Islamic practice ke liye hai. Namaz ke
                  auwqaat approximate hain — apne masjid se verify karein. Sab
                  data locally stored hai, koi cloud sync nahi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
