import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const PRAYER_EMOJI: Record<string, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

interface NotificationOverlayProps {
  prayerName: string;
  timeStr: string;
  minutesBefore: number;
  onDismiss: () => void;
}

export function NotificationOverlay({
  prayerName,
  timeStr,
  minutesBefore,
  onDismiss,
}: NotificationOverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="notif-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-6"
        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
        onClick={onDismiss}
      >
        <motion.div
          key="notif-card"
          initial={{ scale: 0.82, opacity: 0, y: -24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xs rounded-3xl overflow-hidden"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(212,175,55,0.15)",
          }}
        >
          {/* Gold gradient top bar */}
          <div
            style={{
              height: "4px",
              background:
                "linear-gradient(90deg, #b8941e, #D4AF37, #f0d060, #D4AF37, #b8941e)",
            }}
          />

          <div className="p-6">
            {/* Prayer emoji big */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))",
                  border: "1.5px solid rgba(212,175,55,0.2)",
                  fontSize: "2.5rem",
                }}
              >
                {PRAYER_EMOJI[prayerName] ?? "🕌"}
              </motion.div>
            </div>

            {/* Main message */}
            <div className="text-center mb-5">
              <p
                className="text-xl font-bold mb-1"
                style={{
                  color: "#1a2035",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {prayerName} ka Waqt!
              </p>
              <p
                className="text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #b8941e, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Azan mein {minutesBefore} minute baki hain
              </p>
              <p
                className="text-base font-semibold mt-2"
                style={{
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                ⏰ {timeStr} baje
              </p>
            </div>

            {/* Motivational */}
            <div
              className="rounded-2xl p-3 mb-4"
              style={{
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              <p
                className="text-xs text-center leading-relaxed"
                style={{
                  color: "#4a5568",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                🤲 Tahaarat kar lo, masjid ki taraf chalo — Jamaat ka waqt aane
                wala hai!
              </p>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              data-ocid="notification.close_button"
              onClick={onDismiss}
              className="w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #b8941e)",
                color: "#ffffff",
                fontFamily: "'Poppins', sans-serif",
                minHeight: "48px",
                WebkitTapHighlightColor: "transparent",
                boxShadow: "0 4px 15px rgba(212,175,55,0.35)",
              }}
            >
              <X size={14} />
              Theek hai, Shukriya!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NotificationOverlay;
