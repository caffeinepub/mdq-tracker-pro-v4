import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export function Toast({ message, visible, onDismiss }: ToastProps) {
  const [showing, setShowing] = useState(false);
  const [animOut, setAnimOut] = useState(false);

  useEffect(() => {
    if (visible && message) {
      setAnimOut(false);
      setShowing(true);
      // Auto-dismiss after 3 seconds
      const t = setTimeout(() => {
        setAnimOut(true);
        const t2 = setTimeout(() => {
          setShowing(false);
          setAnimOut(false);
          onDismiss();
        }, 350);
        return () => clearTimeout(t2);
      }, 3000);
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
        display: "flex",
        justifyContent: "center",
        width: "auto",
        maxWidth: "90vw",
      }}
    >
      <style>{`
        @keyframes pillIn {
          0%  { transform: translateY(-80px) scale(0.85); opacity: 0; }
          60% { transform: translateY(4px)   scale(1.03); opacity: 1; }
          100%{ transform: translateY(0)     scale(1);    opacity: 1; }
        }
        @keyframes pillOut {
          0%  { transform: translateY(0)     scale(1);    opacity: 1; }
          100%{ transform: translateY(-80px) scale(0.85); opacity: 0; }
        }
      `}</style>
      <div
        style={{
          background: "rgba(10,15,44,0.92)",
          borderRadius: "50px",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.35)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.08)",
          maxWidth: "320px",
          minWidth: "200px",
          width: "auto",
          animation: animOut
            ? "pillOut 0.35s cubic-bezier(0.4,0,0.6,1) forwards"
            : "pillIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        <span style={{ fontSize: "14px", flexShrink: 0 }}>🕌</span>
        <span
          style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: "13px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "240px",
          }}
        >
          {message}
        </span>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "rgba(201,168,76,0.7)",
            flexShrink: 0,
            marginLeft: "2px",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

export default Toast;
