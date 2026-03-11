import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
}

export function Toast({ message, visible, onDismiss }: ToastProps) {
  const [animating, setAnimating] = useState(false);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (visible && message) {
      setShowing(true);
      setAnimating(false);
    }
  }, [visible, message]);

  useEffect(() => {
    if (!visible && showing) {
      setAnimating(true);
      const t = setTimeout(() => {
        setShowing(false);
        setAnimating(false);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [visible, showing]);

  if (!showing) return null;

  return createPortal(
    <div
      data-ocid="toast"
      className={`fixed z-[200] pointer-events-auto ${
        animating ? "slide-up" : "slide-down"
      }`}
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 16px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(90vw, 380px)",
      }}
    >
      <div
        className="rounded-2xl px-5 py-4 flex items-start gap-3 toast-premium"
        style={{
          background: "rgba(255,255,255,0.97)",
          border: "1px solid rgba(212,175,55,0.3)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.12), 0 0 20px rgba(212,175,55,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <span className="text-[10px]" style={{ color: "#b8941e" }}>
              ✦
            </span>
          </div>
        </div>
        <div className="flex-1">
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
          >
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 transition-colors mt-0.5"
          style={{ color: "#8a9bb0", WebkitTapHighlightColor: "transparent" }}
        >
          <X size={15} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default Toast;
