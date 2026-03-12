import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  prayerName?: string;
}

export function Toast({ message, visible, onDismiss, prayerName }: ToastProps) {
  const [showing, setShowing] = useState(false);
  const [animOut, setAnimOut] = useState(false);

  useEffect(() => {
    if (visible && message) {
      setAnimOut(false);
      setShowing(true);
      const t = setTimeout(() => {
        setAnimOut(true);
        const t2 = setTimeout(() => {
          setShowing(false);
          setAnimOut(false);
          onDismiss();
        }, 350);
        return () => clearTimeout(t2);
      }, 3500);
      return () => clearTimeout(t);
    }
  }, [visible, message, onDismiss]);

  if (!showing) return null;

  return createPortal(
    <div
      data-ocid="notification.toast"
      style={{
        position: "fixed",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        pointerEvents: "none",
        width: "min(90vw, 420px)",
      }}
    >
      <style>{`
        @keyframes pillIn {
          0%  { transform: translateY(-80px) scale(0.85); opacity: 0; }
          60% { transform: translateY(4px)    scale(1.01); opacity: 1; }
          100%{ transform: translateY(0)      scale(1);    opacity: 1; }
        }
        @keyframes pillOut {
          0%  { transform: translateY(0)      scale(1);    opacity: 1; }
          100%{ transform: translateY(-80px) scale(0.85);  opacity: 0; }
        }
      `}</style>
      <div
        style={{
          background: "rgba(13,27,42,0.97)",
          borderRadius: "18px",
          padding: "10px 14px 11px 12px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(201,168,76,0.45)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.1), 0 2px 8px rgba(201,168,76,0.18)",
          width: "100%",
          animation: animOut
            ? "pillOut 0.35s cubic-bezier(0.4,0,0.6,1) forwards"
            : "pillIn 0.48s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Mosque icon */}
        <span
          style={{
            fontSize: "17px",
            flexShrink: 0,
            marginTop: "2px",
            lineHeight: 1,
          }}
        >
          🕌
        </span>

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {prayerName && (
            <div
              style={{
                color: "#C9A84C",
                fontSize: "11px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                marginBottom: "3px",
                lineHeight: 1.2,
              }}
            >
              {prayerName}
            </div>
          )}
          <div
            style={{
              color: "rgba(245,240,232,0.95)",
              fontSize: "12px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              lineHeight: 1.5,
              wordBreak: "break-word",
              whiteSpace: "normal",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {message}
          </div>
        </div>

        {/* Gold dot */}
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(201,168,76,0.85)",
            flexShrink: 0,
            marginTop: "6px",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

export default Toast;
