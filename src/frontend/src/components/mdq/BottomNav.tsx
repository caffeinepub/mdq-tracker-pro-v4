import {
  Archive,
  BarChart2,
  CheckCircle,
  Clock,
  House,
  Settings,
} from "lucide-react";
import type { TabName } from "../../types";

interface BottomNavProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  graceBadge: number;
}

const TABS: {
  id: TabName;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  ocid: string;
}[] = [
  { id: "home", label: "Home", icon: House, ocid: "nav.home.tab" },
  { id: "qaza", label: "Qaza", icon: Archive, ocid: "nav.qaza.tab" },
  { id: "adaa", label: "Adaa", icon: CheckCircle, ocid: "nav.adaa.tab" },
  { id: "grace", label: "Missing", icon: Clock, ocid: "nav.grace.tab" },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    ocid: "nav.settings.tab",
  },
  {
    id: "analysis",
    label: "Analysis",
    icon: BarChart2,
    ocid: "nav.analysis.tab",
  },
];

export function BottomNav({
  activeTab,
  onTabChange,
  graceBadge,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-bottom">
      <div className="mx-auto max-w-[430px] flex items-center justify-around px-1 h-16">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              data-ocid={tab.ocid}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 group"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {/* Gold top indicator bar */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-350"
                style={{
                  background: "#D4AF37",
                  width: isActive ? "28px" : "0px",
                  opacity: isActive ? 1 : 0,
                  boxShadow: isActive ? "0 0 8px rgba(212,175,55,0.8)" : "none",
                  transition:
                    "width 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
                }}
              />

              {/* Icon container with glow background */}
              <span
                className="relative flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-250"
                style={{
                  background: isActive ? "rgba(212,175,55,0.1)" : "transparent",
                  boxShadow: isActive
                    ? "0 0 12px rgba(212,175,55,0.2)"
                    : "none",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Icon
                  size={18}
                  className={`transition-colors duration-200 ${isActive ? "text-[#D4AF37]" : "text-white/40"}`}
                />

                {/* Grace period badge */}
                {tab.id === "grace" && graceBadge > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      boxShadow: "0 0 8px rgba(239,68,68,0.5)",
                      lineHeight: 1,
                      padding: "0 3px",
                    }}
                  >
                    {graceBadge > 9 ? "9+" : graceBadge}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className="text-[9px] font-semibold leading-none tracking-wide uppercase transition-all duration-200"
                style={{
                  color: isActive ? "#D4AF37" : "rgba(255,255,255,0.3)",
                  letterSpacing: "0.08em",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
