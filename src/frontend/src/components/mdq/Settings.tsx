import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  Bell,
  BellOff,
  CheckCircle,
  Loader2,
  MapPin,
  Save,
  Settings as SettingsIcon,
  Users,
} from "lucide-react";
import { useState } from "react";
import type {
  AdvancedPrayerName,
  NotificationSettings,
  PrayerName,
} from "../../types";

const PRAYER_NAMES: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const ADVANCED_PRAYER_NAMES: AdvancedPrayerName[] = [
  "Tahajjud",
  "Ishraq",
  "Chasht",
  "Awwabin",
];

const PRAYER_EMOJI: Record<PrayerName, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤",
  Maghrib: "🌇",
  Isha: "🌙",
};
const ADVANCED_EMOJI: Record<AdvancedPrayerName, string> = {
  Tahajjud: "🌙",
  Ishraq: "🌅",
  Chasht: "☀️",
  Awwabin: "🌇",
};

interface SettingsProps {
  prayerTimes: Record<PrayerName, string>;
  advancedPrayerTimes: Record<AdvancedPrayerName, string>;
  jamaatTimes: Record<PrayerName, string>;
  notificationSettings: NotificationSettings;
  onSave: (
    times: Record<PrayerName, string>,
    advancedTimes: Record<AdvancedPrayerName, string>,
    jamaatTimes: Record<PrayerName, string>,
    notifSettings: NotificationSettings,
  ) => void;
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
  const match = timeStr.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : timeStr.slice(0, 5);
}

export function Settings({
  prayerTimes,
  advancedPrayerTimes,
  jamaatTimes,
  notificationSettings,
  onSave,
}: SettingsProps) {
  const [localTimes, setLocalTimes] = useState<Record<PrayerName, string>>({
    ...prayerTimes,
  });
  const [localAdvancedTimes, setLocalAdvancedTimes] = useState<
    Record<AdvancedPrayerName, string>
  >({ ...advancedPrayerTimes });
  const [localJamaatTimes, setLocalJamaatTimes] = useState<
    Record<PrayerName, string>
  >({ ...jamaatTimes });
  const [localNotif, setLocalNotif] = useState<NotificationSettings>({
    ...notificationSettings,
    prayers: { ...notificationSettings.prayers },
  });
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [fetchError, setFetchError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleTimeChange = (prayer: PrayerName, value: string) => {
    setLocalTimes((prev) => ({ ...prev, [prayer]: value }));
    setSaved(false);
  };

  const handleAdvancedTimeChange = (
    prayer: AdvancedPrayerName,
    value: string,
  ) => {
    setLocalAdvancedTimes((prev) => ({ ...prev, [prayer]: value }));
    setSaved(false);
  };

  const handleJamaatTimeChange = (prayer: PrayerName, value: string) => {
    setLocalJamaatTimes((prev) => ({ ...prev, [prayer]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    onSave(localTimes, localAdvancedTimes, localJamaatTimes, localNotif);
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

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid rgba(212,175,55,0.12)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  };
  const labelStyle = {
    color: "#1a2035",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <SettingsIcon size={16} style={{ color: "#b8941e" }} />
        <h2
          className="text-sm font-semibold"
          style={{ color: "#1a2035", fontFamily: "'Poppins', sans-serif" }}
        >
          Prayer Times Settings
        </h2>
      </div>

      {/* Auto Fetch */}
      <div
        className="rounded-2xl p-4"
        style={{ ...cardStyle, border: "1px solid rgba(37,99,235,0.15)" }}
      >
        <p
          className="text-xs mb-3"
          style={{ color: "#4a5568", fontFamily: "'Poppins', sans-serif" }}
        >
          Auto-detect prayer times based on your location using the Aladhan API.
        </p>
        <button
          type="button"
          data-ocid="settings.autofetch.button"
          onClick={handleAutoFetch}
          disabled={fetchStatus === "loading"}
          className="w-full btn-blue py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
          style={{
            minHeight: "48px",
            fontFamily: "'Poppins', sans-serif",
            WebkitTapHighlightColor: "transparent",
          }}
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
            className="mt-3 flex items-center gap-2 text-xs fade-in"
            style={{ color: "#059669" }}
          >
            <CheckCircle size={14} />
            <span>Prayer times updated from your location!</span>
          </div>
        )}
        {fetchStatus === "error" && (
          <div
            data-ocid="settings.error_state"
            className="mt-3 flex items-start gap-2 text-xs fade-in"
            style={{ color: "#dc2626" }}
          >
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>{fetchError}</span>
          </div>
        )}
      </div>

      {/* Manual Prayer Time Inputs */}
      <div className="rounded-2xl p-4 space-y-4" style={cardStyle}>
        <p
          className="text-xs uppercase tracking-wider"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          Manual Prayer Times (Azan)
        </p>
        {PRAYER_NAMES.map((prayer) => (
          <div key={prayer} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">
                {PRAYER_EMOJI[prayer]}
              </span>
              <label htmlFor={`prayer-time-${prayer}`} style={labelStyle}>
                {prayer}
              </label>
            </div>
            <input
              id={`prayer-time-${prayer}`}
              type="time"
              value={localTimes[prayer]}
              onChange={(e) => handleTimeChange(prayer, e.target.value)}
              className="px-3 py-2 rounded-xl text-sm font-mono font-medium"
              style={{
                background: "rgba(212,175,55,0.05)",
                border: "1px solid rgba(212,175,55,0.2)",
                minWidth: "110px",
                colorScheme: "light",
                color: "#1a2035",
              }}
            />
          </div>
        ))}
      </div>

      {/* Jamaat Times */}
      <div
        className="rounded-2xl p-4 space-y-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(5,150,105,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-2">
          <Users size={14} style={{ color: "#059669" }} />
          <p
            className="text-xs uppercase tracking-wider"
            style={{
              color: "rgba(5,150,105,0.8)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Jamaat Times (Masjid)
          </p>
        </div>
        <p
          className="text-[11px] -mt-2"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          Apne masjid ki jamaat ka waqt set karein
        </p>
        {PRAYER_NAMES.map((prayer) => (
          <div key={prayer} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">
                {PRAYER_EMOJI[prayer]}
              </span>
              <label htmlFor={`jamaat-time-${prayer}`} style={labelStyle}>
                {prayer}
              </label>
            </div>
            <input
              id={`jamaat-time-${prayer}`}
              type="time"
              value={localJamaatTimes[prayer]}
              onChange={(e) => handleJamaatTimeChange(prayer, e.target.value)}
              data-ocid={`settings.${prayer.toLowerCase()}.input`}
              className="px-3 py-2 rounded-xl text-sm font-mono font-medium"
              style={{
                background: "rgba(5,150,105,0.05)",
                border: "1px solid rgba(5,150,105,0.2)",
                minWidth: "110px",
                colorScheme: "light",
                color: "#1a2035",
              }}
            />
          </div>
        ))}
      </div>

      {/* Advanced Prayer Times */}
      <div
        className="rounded-2xl p-4 space-y-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(212,175,55,0.1)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{
              color: "rgba(5,150,105,0.7)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            ✨ Advanced Mode — Nafl Prayer Times
          </p>
          <p
            className="text-[10px]"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Sirf Advanced Mode ON karne par kaam aata hai
          </p>
        </div>
        {ADVANCED_PRAYER_NAMES.map((prayer) => (
          <div key={prayer} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">
                {ADVANCED_EMOJI[prayer]}
              </span>
              <label htmlFor={`adv-time-${prayer}`} style={labelStyle}>
                {prayer}
              </label>
            </div>
            <input
              id={`adv-time-${prayer}`}
              type="time"
              value={localAdvancedTimes[prayer]}
              onChange={(e) => handleAdvancedTimeChange(prayer, e.target.value)}
              className="px-3 py-2 rounded-xl text-sm font-mono font-medium"
              style={{
                background: "rgba(5,150,105,0.05)",
                border: "1px solid rgba(5,150,105,0.2)",
                minWidth: "110px",
                colorScheme: "light",
                color: "#1a2035",
              }}
            />
          </div>
        ))}
      </div>

      {/* Notification Settings */}
      <div
        className="rounded-2xl p-4 space-y-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-2">
          {localNotif.enabled ? (
            <Bell size={14} style={{ color: "#b8941e" }} />
          ) : (
            <BellOff size={14} style={{ color: "#8a9bb0" }} />
          )}
          <p
            className="text-xs uppercase tracking-wider"
            style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
          >
            Notification Settings
          </p>
        </div>

        {/* Master toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p style={{ ...labelStyle, fontSize: "13px" }}>
              Enable Notifications
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
            >
              Namaz waqt se pehle reminder
            </p>
          </div>
          <Switch
            checked={localNotif.enabled}
            onCheckedChange={(v) =>
              setLocalNotif((prev) => ({ ...prev, enabled: v }))
            }
            data-ocid="settings.notifications.switch"
          />
        </div>

        {localNotif.enabled && (
          <>
            {/* Minutes before */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p style={{ ...labelStyle, fontSize: "13px" }}>
                  Minutes Before Azan
                </p>
                <span
                  className="text-sm font-bold px-2.5 py-0.5 rounded-lg"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    color: "#b8941e",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {localNotif.minutesBefore} min
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={localNotif.minutesBefore}
                onChange={(e) =>
                  setLocalNotif((prev) => ({
                    ...prev,
                    minutesBefore: Number(e.target.value),
                  }))
                }
                data-ocid="settings.minutes_before.input"
                className="w-full"
                style={{ accentColor: "#D4AF37" }}
              />
              <div className="flex justify-between mt-1">
                <span
                  className="text-[10px]"
                  style={{
                    color: "#b0bec5",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  3 min
                </span>
                <span
                  className="text-[10px]"
                  style={{
                    color: "#b0bec5",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  30 min
                </span>
              </div>
            </div>

            {/* Per-prayer toggles */}
            <div className="space-y-3">
              <p
                className="text-[11px] uppercase tracking-wider"
                style={{
                  color: "#b0bec5",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Kaunsi namazein?
              </p>
              {PRAYER_NAMES.map((prayer) => (
                <div key={prayer} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{PRAYER_EMOJI[prayer]}</span>
                    <span style={{ ...labelStyle, fontSize: "13px" }}>
                      {prayer}
                    </span>
                  </div>
                  <Switch
                    checked={localNotif.prayers[prayer]}
                    onCheckedChange={(v) =>
                      setLocalNotif((prev) => ({
                        ...prev,
                        prayers: { ...prev.prayers, [prayer]: v },
                      }))
                    }
                    data-ocid={`settings.notif.${prayer.toLowerCase()}.switch`}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <button
        type="button"
        data-ocid="settings.save.button"
        onClick={handleSave}
        className="w-full btn-gold py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
        style={{
          minHeight: "52px",
          fontFamily: "'Poppins', sans-serif",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {saved ? (
          <>
            <CheckCircle size={16} />
            <span>Saved!</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Save All Settings</span>
          </>
        )}
      </button>

      <div
        className="rounded-xl p-3"
        style={{
          background: "rgba(212,175,55,0.04)",
          border: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <p
          className="text-xs leading-relaxed text-center"
          style={{ color: "#8a9bb0", fontFamily: "'Poppins', sans-serif" }}
        >
          Prayer times are used by the Time-Lock Engine to prevent early
          marking.
        </p>
      </div>

      <div className="text-center py-2">
        <p
          className="text-xs"
          style={{ color: "#b0bec5", fontFamily: "'Poppins', sans-serif" }}
        >
          NAMAZ TRACKER
        </p>
        <p
          className="text-xs"
          style={{ color: "#b0bec5", fontFamily: "'Poppins', sans-serif" }}
        >
          Premium Islamic Prayer Tracker — by MDQ
        </p>
      </div>
    </div>
  );
}

export default Settings;
