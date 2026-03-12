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
    gradient: "linear-gradient(135deg,#3b82f6,#2563eb)",
    shadow: "rgba(59,130,246,0.35)",
  },
  {
    id: "tasbih",
    emoji: "📿",
    label: "Tasbih",
    gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
    shadow: "rgba(124,58,237,0.35)",
  },
  {
    id: "journal",
    emoji: "✍️",
    label: "Daily Write",
    gradient: "linear-gradient(135deg,#D4AF37,#b8941e)",
    shadow: "rgba(212,175,55,0.35)",
  },
  {
    id: "blog",
    emoji: "📖",
    label: "Blog Mode",
    gradient: "linear-gradient(135deg,#14b8a6,#0d9488)",
    shadow: "rgba(20,184,166,0.35)",
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
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span style={{ fontSize: "22px", lineHeight: 1 }}>{a.emoji}</span>
          <span
            className="text-[9px] font-semibold text-white text-center leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.02em",
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
