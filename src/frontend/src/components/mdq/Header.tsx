import { BookOpen, Menu, Moon, Shield, Star, User, X } from "lucide-react";
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
  onOpenDuaen,
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
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="mx-auto max-w-[430px] flex items-center justify-between px-4 h-14">
          {/* Hamburger */}
          <button
            type="button"
            data-ocid="header.hamburger.button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-all active:scale-95"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Menu size={20} style={{ color: "#b8941e" }} />
          </button>

          {/* Title */}
          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center gap-1.5">
              <Moon size={12} style={{ color: "#b8941e" }} />
              <h1
                className="font-bold text-sm tracking-[0.15em] shimmer-gold"
                style={{
                  fontFamily: "'Amiri', 'Georgia', serif",
                  letterSpacing: "0.12em",
                }}
              >
                NAMAZ TRACKER
              </h1>
              <Star size={9} style={{ color: "#D4AF37" }} fill="#D4AF37" />
            </div>
            <p
              className="text-[8px] tracking-[0.18em] uppercase"
              style={{
                color: "rgba(184,148,30,0.5)",
                letterSpacing: "0.2em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Created by MDQ
            </p>
          </div>

          {/* Profile icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.06) 100%)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <span
              className="text-sm font-bold shimmer-gold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {initial}
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100]"
          style={{
            background: "rgba(0,0,0,0.35)",
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
          <div
            className="slide-in-left absolute inset-y-0 left-0 w-[300px] flex flex-col"
            style={{
              background: "#ffffff",
              borderRight: "1px solid rgba(212,175,55,0.15)",
              boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
            }}
          >
            {/* Sidebar Header */}
            <div
              className="flex items-center justify-between px-5 pt-12 pb-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
            >
              <div className="flex flex-col">
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
            </div>

            {/* Profile Section */}
            <div
              className="px-5 py-5"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.08) 100%)",
                    border: "2px solid rgba(212,175,55,0.35)",
                  }}
                >
                  {editName ? (
                    <span className="text-xl font-bold shimmer-gold">
                      {initial}
                    </span>
                  ) : (
                    <User size={24} style={{ color: "#b8941e" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs mb-1"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Your Name
                  </p>
                  <input
                    id="sidebar-profile-name"
                    data-ocid="sidebar.profile.input"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm font-medium border-none outline-none pb-1"
                    style={{
                      borderBottom: "1px solid rgba(212,175,55,0.3)",
                      color: "#1a2035",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  />
                </div>
              </div>

              {/* Mode Toggle */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(212,175,55,0.15)" }}
              >
                <div
                  className="flex items-center justify-between p-3"
                  style={{
                    background: localMode
                      ? "rgba(212,175,55,0.06)"
                      : "rgba(0,0,0,0.02)",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{
                        color: localMode ? "#b8941e" : "#8a9bb0",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      🕌 Normal Mode
                    </p>
                    <p
                      className="text-[10px]"
                      style={{
                        color: "#8a9bb0",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Sirf 5 Farz Namazein
                    </p>
                  </div>
                  <button
                    type="button"
                    data-ocid="sidebar.mode.toggle"
                    onClick={() => setLocalMode((m) => !m)}
                    className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                    style={{
                      background: localMode
                        ? "linear-gradient(135deg, #D4AF37, #b8941e)"
                        : "rgba(0,0,0,0.12)",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${localMode ? "left-[26px]" : "left-0.5"}`}
                    />
                  </button>
                </div>
                <div
                  className="p-3"
                  style={{
                    background: !localMode
                      ? "rgba(16,185,129,0.04)"
                      : "transparent",
                  }}
                >
                  <p
                    className="text-[11px] font-semibold mb-0.5"
                    style={{
                      color: !localMode ? "#059669" : "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    ✨ Advanced Mode {!localMode ? "(Active)" : "(OFF)"}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Tahajjud · Ishraq · Chasht · Awwabin
                  </p>
                  <p
                    className="text-[10px] mt-1"
                    style={{
                      color: "#b0bec5",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Normal toggle OFF karo → Advanced ON
                  </p>
                </div>
              </div>
            </div>

            {/* Duaen Mode Button */}
            <div
              className="px-5 py-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.1)" }}
            >
              <button
                type="button"
                data-ocid="sidebar.duaen.button"
                onClick={() => {
                  handleClose();
                  onOpenDuaen();
                }}
                className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-95 btn-duaen"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 2px 16px rgba(212,175,55,0.1)",
                  animation: "pulse-gold 3s ease-in-out infinite",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 100%)",
                    border: "1px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <BookOpen size={18} style={{ color: "#b8941e" }} />
                </div>
                <div className="text-left flex-1">
                  <p
                    className="text-sm font-bold shimmer-gold tracking-wide"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    Duaen Mode
                  </p>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{
                      color: "rgba(184,148,30,0.6)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Roz Marra ki Muqaddas Duaen ✶
                  </p>
                </div>
                <Moon
                  size={16}
                  style={{ color: "#b8941e" }}
                  className="breathe"
                />
              </button>
            </div>

            {/* About Section */}
            <div className="px-5 py-5 flex-1 overflow-y-auto">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Moon size={16} style={{ color: "#b8941e" }} />
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider shimmer-gold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    About
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(212,175,55,0.04)",
                    border: "1px solid rgba(212,175,55,0.1)",
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
                    is a premium Islamic prayer tracking app. Track your daily
                    Salah, maintain Qaza records, and never miss a prayer.
                  </p>
                </div>
              </div>

              <div className="mb-5 space-y-2">
                {[
                  { icon: "🕌", label: "5 Daily Prayers" },
                  { icon: "⏰", label: "Time-Lock Engine" },
                  { icon: "📋", label: "Qaza Vault & Adaa Records" },
                  { icon: "🌙", label: "Grace Period System" },
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

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} style={{ color: "#b8941e" }} />
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider shimmer-gold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Terms & Conditions
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "#8a9bb0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    This app is for personal Islamic practice tracking. Prayer
                    times are approximations — verify with your local Masjid.
                    All data stored locally.
                  </p>
                </div>
              </div>
            </div>

            {/* Save button */}
            <div className="px-5 py-4 safe-bottom">
              <button
                type="button"
                onClick={handleClose}
                className="w-full btn-gold py-3 text-sm font-semibold rounded-xl"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
