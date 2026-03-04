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
        className="glass-dark rounded-2xl px-5 py-4 flex items-start gap-3 shadow-2xl toast-premium"
        style={{
          border: "1px solid rgba(212,175,55,0.45)",
          boxShadow:
            "0 8px 32px rgba(212,175,55,0.15), 0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(212,175,55,0.2)",
              border: "1px solid rgba(212,175,55,0.4)",
            }}
          >
            <span className="text-[10px]">✦</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white leading-relaxed">
            {message}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 text-white/40 hover:text-white/80 transition-colors mt-0.5"
        >
          <X size={15} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default Toast;
