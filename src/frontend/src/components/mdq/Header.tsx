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
        className="fixed top-0 left-0 right-0 z-50 glass-nav"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto max-w-[430px] flex items-center justify-between px-4 h-14">
          <button
            type="button"
            data-ocid="header.hamburger.button"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl glass hover:bg-white/10 transition-all"
          >
            <Menu size={20} className="text-white/80" />
          </button>

          <div className="flex flex-col items-center gap-0">
            <div className="flex items-center gap-1.5">
              <Moon size={12} className="gold-text" />
              <h1
                className="font-bold text-sm tracking-[0.15em] shimmer-gold"
                style={{
                  fontFamily: "'Georgia', 'Palatino Linotype', serif",
                  letterSpacing: "0.12em",
                }}
              >
                NAMAZ TRACKER
              </h1>
              <Star size={9} className="gold-text" fill="#D4AF37" />
            </div>
            <p
              className="text-[8px] tracking-[0.18em] uppercase"
              style={{ color: "rgba(212,175,55,0.45)", letterSpacing: "0.2em" }}
            >
              Created by MDQ
            </p>
          </div>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center glass"
            style={{ border: "1px solid rgba(212,175,55,0.3)" }}
          >
            <span className="text-sm font-bold gold-text">{initial}</span>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
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
              background:
                "linear-gradient(160deg, rgba(15,23,42,0.98) 0%, rgba(20,30,55,0.98) 100%)",
              borderRight: "1px solid rgba(212,175,55,0.2)",
            }}
          >
            {/* Sidebar Header */}
            <div
              className="flex items-center justify-between px-5 pt-12 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col">
                <h2
                  className="font-bold text-base shimmer-gold"
                  style={{
                    fontFamily: "'Georgia', 'Palatino Linotype', serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  NAMAZ TRACKER
                </h2>
                <p
                  className="text-[8px] tracking-[0.18em] uppercase"
                  style={{ color: "rgba(212,175,55,0.4)" }}
                >
                  Created by MDQ
                </p>
              </div>
              <button
                type="button"
                data-ocid="sidebar.close.button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={16} className="text-white/70" />
              </button>
            </div>

            {/* Profile Section */}
            <div
              className="px-5 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)",
                    border: "2px solid rgba(212,175,55,0.4)",
                  }}
                >
                  {editName ? (
                    <span className="text-xl font-bold gold-text">
                      {initial}
                    </span>
                  ) : (
                    <User size={24} className="gold-text" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 mb-1">Your Name</p>
                  <input
                    id="sidebar-profile-name"
                    data-ocid="sidebar.profile.input"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-white text-sm font-medium border-none outline-none pb-1 focus:border-gold transition-colors"
                    style={{ borderBottom: "1px solid rgba(212,175,55,0.3)" }}
                  />
                </div>
              </div>

              {/* Mode Toggle */}
              <div
                className="flex items-center justify-between p-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <p className="text-sm font-medium text-white/90">Mode</p>
                  <p className="text-xs text-white/40">
                    {localMode ? "Normal User" : "Advanced Mode"}
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
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${localMode ? "left-[26px]" : "left-0.5"}`}
                  />
                </button>
              </div>
            </div>

            {/* Duaen Mode Button */}
            <div
              className="px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
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
                    "linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.06) 100%)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  boxShadow:
                    "0 0 20px rgba(212,175,55,0.15), inset 0 1px 0 rgba(212,175,55,0.1)",
                  animation: "pulse-gold 3s ease-in-out infinite",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.1) 100%)",
                    border: "1px solid rgba(212,175,55,0.5)",
                    boxShadow: "0 0 12px rgba(212,175,55,0.2)",
                  }}
                >
                  <BookOpen size={18} className="gold-text" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold shimmer-gold tracking-wide">
                    Duaen Mode
                  </p>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "rgba(212,175,55,0.5)" }}
                  >
                    Roz Marra ki Muqaddas Duaen ✦
                  </p>
                </div>
                <Moon size={16} className="gold-text breathe" />
              </button>
            </div>

            {/* About Section */}
            <div className="px-5 py-5 flex-1 overflow-y-auto">
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Moon size={16} className="gold-text" />
                  <h3 className="text-sm font-semibold gold-text uppercase tracking-wider">
                    About
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(212,175,55,0.05)",
                    border: "1px solid rgba(212,175,55,0.1)",
                  }}
                >
                  <p className="text-xs text-white/70 leading-relaxed">
                    <strong className="text-white/90">NAMAZ TRACKER</strong> is
                    a premium Islamic prayer tracking app. Track your daily
                    Salah, maintain Qaza records, and never miss a prayer with
                    our Time-Lock Engine and Grace Period system.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-5 space-y-2">
                {[
                  { icon: "🕌", label: "5 Daily Prayers" },
                  { icon: "⏰", label: "Time-Lock Engine" },
                  { icon: "📋", label: "Qaza Vault & Adaa Records" },
                  { icon: "🌙", label: "Grace Period System" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 text-xs text-white/60"
                  >
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={16} className="gold-text" />
                  <h3 className="text-sm font-semibold gold-text uppercase tracking-wider">
                    Terms & Conditions
                  </h3>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-xs text-white/50 leading-relaxed">
                    This app is for personal Islamic practice tracking. Prayer
                    times are approximations — please verify with your local
                    Masjid. All data is stored locally on your device. Use
                    responsibly and with sincere intention (Niyyah).
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
