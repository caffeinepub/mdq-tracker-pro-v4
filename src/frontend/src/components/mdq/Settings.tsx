import {
  AlertCircle,
  CheckCircle,
  Loader2,
  MapPin,
  Save,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import type { PrayerName } from "../../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};

interface SettingsProps {
  prayerTimes: Record<PrayerName, string>;
  onSave: (times: Record<PrayerName, string>) => void;
}

type FetchStatus = "idle" | "loading" | "success" | "error";

interface AladhanTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

function parseAladhanTime(timeStr: string): string {
  // Aladhan returns "05:12 (PKT)" or "05:12"
  const match = timeStr.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : timeStr.slice(0, 5);
}

export function Settings({ prayerTimes, onSave }: SettingsProps) {
  const [localTimes, setLocalTimes] = useState<Record<PrayerName, string>>({
    ...prayerTimes,
  });
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [fetchError, setFetchError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleTimeChange = (prayer: PrayerName, value: string) => {
    setLocalTimes((prev) => ({ ...prev, [prayer]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(localTimes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAutoFetch = () => {
    if (!navigator.geolocation) {
      setFetchError("Geolocation is not supported by your browser.");
      setFetchStatus("error");
      return;
    }

    setFetchStatus("loading");
    setFetchError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const timestamp = Math.floor(Date.now() / 1000);
          const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=2`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to fetch prayer times");
          const data = await res.json();
          const timings: AladhanTimings = data.data?.timings;
          if (!timings) throw new Error("Invalid response format");

          const newTimes: Record<PrayerName, string> = {
            Fajr: parseAladhanTime(timings.Fajr),
            Dhuhr: parseAladhanTime(timings.Dhuhr),
            Asr: parseAladhanTime(timings.Asr),
            Maghrib: parseAladhanTime(timings.Maghrib),
            Isha: parseAladhanTime(timings.Isha),
          };

          setLocalTimes(newTimes);
          setFetchStatus("success");
          setTimeout(() => setFetchStatus("idle"), 3000);
        } catch (err) {
          setFetchError(
            err instanceof Error ? err.message : "Failed to fetch prayer times",
          );
          setFetchStatus("error");
          setTimeout(() => setFetchStatus("idle"), 4000);
        }
      },
      (err) => {
        const messages: Record<number, string> = {
          1: "Location access denied. Please enable location permissions.",
          2: "Location unavailable. Try again.",
          3: "Location request timed out.",
        };
        setFetchError(messages[err.code] || "Failed to get location.");
        setFetchStatus("error");
        setTimeout(() => setFetchStatus("idle"), 4000);
      },
      { timeout: 10000 },
    );
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-2">
        <SettingsIcon size={16} className="gold-text" />
        <h2 className="text-sm font-semibold text-white/80">
          Prayer Times Settings
        </h2>
      </div>

      {/* Auto Fetch Button */}
      <div
        className="glass rounded-2xl p-4"
        style={{ border: "1px solid rgba(59,130,246,0.2)" }}
      >
        <p className="text-xs text-white/50 mb-3">
          Auto-detect prayer times based on your location using the Aladhan API.
        </p>
        <button
          type="button"
          data-ocid="settings.autofetch.button"
          onClick={handleAutoFetch}
          disabled={fetchStatus === "loading"}
          className="w-full btn-blue py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
          style={{ minHeight: "48px" }}
        >
          {fetchStatus === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Fetching Location...</span>
            </>
          ) : (
            <>
              <MapPin size={16} />
              <span>Auto Fetch via Location API</span>
            </>
          )}
        </button>

        {fetchStatus === "success" && (
          <div
            data-ocid="settings.success_state"
            className="mt-3 flex items-center gap-2 text-xs emerald-text fade-in"
          >
            <CheckCircle size={14} />
            <span>Prayer times updated from your location!</span>
          </div>
        )}
        {fetchStatus === "error" && (
          <div
            data-ocid="settings.error_state"
            className="mt-3 flex items-start gap-2 text-xs ruby-text fade-in"
          >
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>{fetchError}</span>
          </div>
        )}
      </div>

      {/* Prayer Time Inputs */}
      <div
        className="glass rounded-2xl p-4 space-y-4"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-xs text-white/40 uppercase tracking-wider">
          Manual Prayer Times
        </p>

        {PRAYER_NAMES.map((prayer) => (
          <div key={prayer} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">
                {PRAYER_EMOJI[prayer]}
              </span>
              <label
                htmlFor={`prayer-time-${prayer}`}
                className="text-sm font-medium text-white/80"
              >
                {prayer}
              </label>
            </div>
            <input
              id={`prayer-time-${prayer}`}
              type="time"
              value={localTimes[prayer]}
              onChange={(e) => handleTimeChange(prayer, e.target.value)}
              className="px-3 py-2 rounded-xl text-sm font-mono text-white font-medium"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                minWidth: "110px",
                colorScheme: "dark",
              }}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        type="button"
        data-ocid="settings.save.button"
        onClick={handleSave}
        className="w-full btn-gold py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
        style={{ minHeight: "52px" }}
      >
        {saved ? (
          <>
            <CheckCircle size={16} />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Save Prayer Times</span>
          </>
        )}
      </button>

      {/* Info */}
      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(212,175,55,0.04)",
          border: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <p className="text-xs text-white/35 leading-relaxed text-center">
          Prayer times are used by the Time-Lock Engine to prevent early
          marking. Save changes to apply immediately.
        </p>
      </div>

      {/* About App version */}
      <div className="text-center py-2">
        <p className="text-xs text-white/20">MDQ Tracker Pro V4</p>
        <p className="text-xs text-white/15">Premium Islamic Prayer Tracker</p>
      </div>
    </div>
  );
}

export default Settings;
