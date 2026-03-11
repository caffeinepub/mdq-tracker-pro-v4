import {
  Archive,
  BarChart2,
  BookOpen,
  CheckCircle,
  Clock,
  Grid3X3,
  History,
  House,
  Settings,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { TabName } from "../../types";

interface BottomNavProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  graceBadge: number;
}

const MAIN_TABS: {
  id: TabName;
  label: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  ocid: string;
}[] = [
  { id: "home", label: "Home", icon: House, ocid: "nav.home.tab" },
  { id: "qaza", label: "Qaza", icon: Archive, ocid: "nav.qaza.tab" },
  { id: "grace", label: "Missing", icon: Clock, ocid: "nav.grace.tab" },
  {
    id: "analysis",
    label: "Analysis",
    icon: BarChart2,
    ocid: "nav.analysis.tab",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    ocid: "nav.settings.tab",
  },
];

const MORE_TABS: {
  id: TabName;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    style?: React.CSSProperties;
  }>;
  ocid: string;
  color: string;
}[] = [
  {
    id: "adaa",
    label: "Adaa Records",
    sublabel: "Completed prayer logs",
    icon: CheckCircle,
    ocid: "nav.adaa.tab",
    color: "#059669",
  },
  {
    id: "history",
    label: "History",
    sublabel: "Monthly prayer history",
    icon: History,
    ocid: "nav.history.tab",
    color: "#2563eb",
  },
  {
    id: "blog",
    label: "Islamic Blog",
    sublabel: "Articles & duas",
    icon: BookOpen,
    ocid: "nav.blog.tab",
    color: "#7c3aed",
  },
];

const MORE_TAB_IDS: TabName[] = ["adaa", "history", "blog"];

export function BottomNav({
  activeTab,
  onTabChange,
  graceBadge,
}: BottomNavProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const isMoreActive = MORE_TAB_IDS.includes(activeTab);

  const handleMoreSelect = (tab: TabName) => {
    onTabChange(tab);
    setMoreOpen(false);
  };

  return (
    <>
      {/* More Drawer Overlay */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(3px)",
              }}
              onClick={() => setMoreOpen(false)}
            />

            {/* Slide-up Sheet */}
            <motion.div
              key="more-sheet"
              data-ocid="nav.more.sheet"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="fixed bottom-0 left-0 right-0 z-50"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(32px) saturate(2)",
                WebkitBackdropFilter: "blur(32px) saturate(2)",
                borderTop: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.12)",
                paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)",
              }}
            >
              {/* Handle + Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3">
                <div className="flex flex-col">
                  <div
                    className="w-10 h-1 rounded-full mx-auto mb-3"
                    style={{ background: "rgba(212,175,55,0.35)" }}
                  />
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "#b8941e",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    More Pages
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="nav.more.close_button"
                  onClick={() => setMoreOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <X size={14} style={{ color: "#4a5568" }} />
                </button>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(212,175,55,0.1)",
                  marginBottom: "8px",
                }}
              />

              {/* Tab Rows */}
              <div className="px-4 flex flex-col gap-2">
                {MORE_TABS.map((tab, i) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      type="button"
                      key={tab.id}
                      data-ocid={tab.ocid}
                      onClick={() => handleMoreSelect(tab.id)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.06,
                        type: "spring",
                        stiffness: 350,
                        damping: 26,
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-4 w-full text-left rounded-2xl px-4 py-3.5"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))"
                          : "rgba(0,0,0,0.02)",
                        border: isActive
                          ? "1px solid rgba(212,175,55,0.2)"
                          : "1px solid transparent",
                        transition: "background 0.2s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {/* Icon pill */}
                      <span
                        className="flex items-center justify-center w-11 h-11 rounded-2xl flex-shrink-0"
                        style={{
                          background: isActive
                            ? "rgba(212,175,55,0.12)"
                            : `${tab.color}18`,
                          boxShadow: isActive
                            ? "0 0 12px rgba(212,175,55,0.2)"
                            : "none",
                        }}
                      >
                        <Icon
                          size={20}
                          style={{ color: isActive ? "#b8941e" : tab.color }}
                        />
                      </span>

                      {/* Labels */}
                      <span className="flex flex-col flex-1">
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: isActive ? "#b8941e" : "#1a2035",
                            fontFamily: "'Poppins', sans-serif",
                            lineHeight: 1.3,
                          }}
                        >
                          {tab.label}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#8a9bb0",
                            fontFamily: "'Poppins', sans-serif",
                            lineHeight: 1.3,
                          }}
                        >
                          {tab.sublabel}
                        </span>
                      </span>

                      {/* Active dot */}
                      {isActive && (
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            background: "#b8941e",
                            boxShadow: "0 0 6px rgba(212,175,55,0.5)",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          borderTop: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.07)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="mx-auto max-w-[430px] flex items-center justify-around h-16 px-1">
          {/* Main 5 tabs */}
          {MAIN_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                type="button"
                key={tab.id}
                data-ocid={tab.ocid}
                onClick={() => {
                  onTabChange(tab.id);
                  setMoreOpen(false);
                }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {/* Gold pill glow under icon */}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-1 top-0 h-[2.5px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #b8941e, #D4AF37, #b8941e)",
                      boxShadow: "0 0 8px rgba(212,175,55,0.7)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <motion.span
                  className="relative flex items-center justify-center w-8 h-8 rounded-xl"
                  animate={{
                    background: isActive
                      ? "rgba(212,175,55,0.1)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 0 12px rgba(212,175,55,0.18)"
                      : "none",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Icon
                    size={17}
                    style={{
                      color: isActive ? "#b8941e" : "#8a9bb0",
                      transition: "color 0.2s ease",
                    }}
                  />

                  {/* Grace period badge */}
                  {tab.id === "grace" && graceBadge > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-[14px] h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        boxShadow: "0 0 6px rgba(239,68,68,0.5)",
                        lineHeight: 1,
                        padding: "0 2px",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {graceBadge > 9 ? "9+" : graceBadge}
                    </span>
                  )}
                </motion.span>

                {/* Label */}
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: "600",
                    color: isActive ? "#b8941e" : "#8a9bb0",
                    letterSpacing: "0.04em",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "color 0.2s ease",
                    lineHeight: 1,
                  }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}

          {/* More Button */}
          <motion.button
            type="button"
            data-ocid="nav.more.button"
            onClick={() => setMoreOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {/* Indicator for when active tab is in More */}
            {isMoreActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-x-1 top-0 h-[2.5px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #b8941e, #D4AF37, #b8941e)",
                  boxShadow: "0 0 8px rgba(212,175,55,0.7)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <motion.span
              className="flex items-center justify-center w-8 h-8 rounded-xl"
              animate={{
                background:
                  moreOpen || isMoreActive
                    ? "rgba(212,175,55,0.1)"
                    : "transparent",
                boxShadow:
                  moreOpen || isMoreActive
                    ? "0 0 12px rgba(212,175,55,0.18)"
                    : "none",
                rotate: moreOpen ? 90 : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <Grid3X3
                size={17}
                style={{
                  color: moreOpen || isMoreActive ? "#b8941e" : "#8a9bb0",
                  transition: "color 0.2s ease",
                }}
              />
            </motion.span>

            <span
              style={{
                fontSize: "9px",
                fontWeight: "600",
                color: moreOpen || isMoreActive ? "#b8941e" : "#8a9bb0",
                letterSpacing: "0.04em",
                fontFamily: "'Poppins', sans-serif",
                transition: "color 0.2s ease",
                lineHeight: 1,
              }}
            >
              More
            </span>
          </motion.button>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
