import type { TabName } from "../../types";

const ACTIONS: {
  id: TabName;
  emoji: string;
  label: string;
  gradient: string;
  shadow: string;
}[] = [
  {
    id: "dua",
    emoji: "🤲",
    label: "Dua Mode",
    gradient: "linear-gradient(135deg,#0D1B2A,#162538)",
    shadow: "rgba(13,27,42,0.35)",
  },
  {
    id: "tasbih",
    emoji: "📿",
    label: "Tasbih",
    gradient: "linear-gradient(135deg,#1a2d45,#0D1B2A)",
    shadow: "rgba(13,27,42,0.35)",
  },
  {
    id: "journal",
    emoji: "✍️",
    label: "Daily Write",
    gradient: "linear-gradient(135deg,#C9A84C,#b8941e)",
    shadow: "rgba(201,168,76,0.40)",
  },
  {
    id: "blog",
    emoji: "📖",
    label: "Blog Mode",
    gradient: "linear-gradient(135deg,#0D1B2A,#162538)",
    shadow: "rgba(13,27,42,0.35)",
  },
  {
    id: "introduction",
    emoji: "📜",
    label: "App Info",
    gradient: "linear-gradient(135deg,#C9A84C,#b8941e)",
    shadow: "rgba(201,168,76,0.35)",
  },
];

interface ActionButtonsProps {
  onNavigate: (tab: TabName) => void;
}

export function ActionButtons({ onNavigate }: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {ACTIONS.map((a) => (
        <button
          key={a.id}
          type="button"
          data-ocid={`action.${a.id}.button`}
          onClick={() => onNavigate(a.id)}
          className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl transition-all active:scale-95"
          style={{
            background: a.gradient,
            boxShadow: `0 4px 16px ${a.shadow}`,
            border: "1px solid rgba(201,168,76,0.2)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>{a.emoji}</span>
          <span
            className="text-[9px] font-semibold text-center leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.02em",
              color:
                a.id === "journal" || a.id === "introduction"
                  ? "#0D1B2A"
                  : "#F5F0E8",
            }}
          >
            {a.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;
