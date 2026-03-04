/**
 * MusicControls - Neon Arcade Dashboard
 * Now Playing info, progress bar, transport controls, volume
 * Colors: Pink (#FF1493) accent, Blue (#00BFFF) secondary
 */
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Repeat1, Shuffle, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import type { Track } from "@/lib/playlist";

interface MusicControlsProps {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: "none" | "all" | "one";
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (v: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MusicControls({
  currentTrack,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  volume,
  isMuted,
  shuffle,
  repeat,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
}: MusicControlsProps) {
  return (
    <div
      className="rounded-lg p-5"
      style={{
        background: "rgba(13,13,26,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,20,147,0.2)",
        boxShadow: "0 0 15px rgba(255,20,147,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Now Playing */}
      <div className="mb-5">
        <p
          className="text-[9px] uppercase tracking-[0.25em] mb-1.5"
          style={{ fontFamily: "var(--font-display)", color: "#FF1493" }}
        >
          NOW PLAYING
        </p>
        <h3 className="text-white text-xl font-bold truncate" style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}>
          {currentTrack?.title || "No Track Selected"}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-mono)" }}>
            {currentTrack?.artist || "---"}
          </p>
          {isLoading && (
            <Loader2 size={12} className="text-[#00BFFF] animate-spin" />
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([v]) => onSeek(v)}
          className="w-full [&_[role=slider]]:bg-[#FF1493] [&_[role=slider]]:border-[#FF1493] [&_[role=slider]]:shadow-[0_0_10px_rgba(255,20,147,0.6)] [&_[role=slider]]:w-3.5 [&_[role=slider]]:h-3.5"
        />
        <div className="flex justify-between mt-2">
          <span className="text-[11px] text-white/30 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
            {formatTime(currentTime)}
          </span>
          <span className="text-[11px] text-white/30 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-5">
        <button
          onClick={onToggleShuffle}
          className="p-2 transition-all"
          style={{ color: shuffle ? "#00BFFF" : "rgba(255,255,255,0.25)" }}
          title="Shuffle"
        >
          <Shuffle size={16} />
        </button>
        <button
          onClick={onPrev}
          className="p-2 text-white/60 hover:text-white hover:scale-110 transition-all active:scale-90"
        >
          <SkipBack size={22} fill="currentColor" />
        </button>

        {/* Play/Pause - Main button */}
        <button
          onClick={onTogglePlay}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #FF1493 0%, #C71585 50%, #8B5CF6 100%)",
            boxShadow: isPlaying
              ? "0 0 25px rgba(255,20,147,0.5), 0 0 50px rgba(255,20,147,0.2), 0 4px 15px rgba(0,0,0,0.3)"
              : "0 0 12px rgba(255,20,147,0.2), 0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          {isLoading ? (
            <Loader2 size={26} className="text-white animate-spin" />
          ) : isPlaying ? (
            <Pause size={26} className="text-white" fill="white" />
          ) : (
            <Play size={26} className="text-white ml-1" fill="white" />
          )}
        </button>

        <button
          onClick={onNext}
          className="p-2 text-white/60 hover:text-white hover:scale-110 transition-all active:scale-90"
        >
          <SkipForward size={22} fill="currentColor" />
        </button>
        <button
          onClick={onToggleRepeat}
          className="p-2 transition-all relative"
          style={{ color: repeat !== "none" ? "#FF1493" : "rgba(255,255,255,0.25)" }}
          title={repeat === "one" ? "Repeat One" : repeat === "all" ? "Repeat All" : "Repeat"}
        >
          {repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
          {repeat !== "none" && (
            <div
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              style={{ backgroundColor: "#FF1493", boxShadow: "0 0 4px #FF1493" }}
            />
          )}
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <button onClick={onToggleMute} className="text-white/40 hover:text-white transition-colors">
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          max={100}
          step={1}
          onValueChange={([v]) => onVolumeChange(v / 100)}
          className="flex-1 [&_[role=slider]]:bg-[#00BFFF] [&_[role=slider]]:border-[#00BFFF] [&_[role=slider]]:shadow-[0_0_6px_rgba(0,191,255,0.4)] [&_[role=slider]]:w-3 [&_[role=slider]]:h-3"
        />
        <span className="text-[11px] text-white/30 w-8 text-right tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
          {isMuted ? 0 : Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
