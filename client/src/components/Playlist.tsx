/**
 * Playlist - Neon Arcade Dashboard
 * Track list with active track highlighting and animated eq bars
 */
import { Play, Pause } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Track } from "@/lib/playlist";

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export default function Playlist({ tracks, currentTrackIndex, isPlaying, onSelectTrack }: PlaylistProps) {
  return (
    <div
      className="rounded-lg overflow-hidden h-full"
      style={{
        background: "rgba(13,13,26,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,191,255,0.2)",
        boxShadow: "0 0 15px rgba(0,191,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <h3
          className="text-[9px] uppercase tracking-[0.25em]"
          style={{ fontFamily: "var(--font-display)", color: "#00BFFF" }}
        >
          PLAYLIST
        </h3>
        <p className="text-white/30 text-[11px] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
          {tracks.length} tracks
        </p>
      </div>

      {/* Track List */}
      <ScrollArea className="h-[300px] sm:h-[400px] lg:h-[calc(100vh-260px)]" style={{ maxHeight: "500px" }}>
        <div className="p-1.5">
          {tracks.map((track, index) => {
            const isActive = index === currentTrackIndex;
            const isCurrentPlaying = isActive && isPlaying;

            return (
              <button
                key={track.id}
                onClick={() => onSelectTrack(index)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all group ${
                  isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                }`}
                style={isActive ? {
                  borderLeft: "2px solid #FF1493",
                  boxShadow: "inset 4px 0 12px rgba(255,20,147,0.08)",
                } : { borderLeft: "2px solid transparent" }}
              >
                {/* Track Number / Play Icon */}
                <div className="w-7 h-7 rounded flex items-center justify-center shrink-0">
                  {isCurrentPlaying ? (
                    <div className="flex items-end gap-[2px] h-3.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-[3px] rounded-full"
                          style={{
                            animation: `eq-bar 0.7s ease-in-out ${i * 0.12}s infinite`,
                            height: "50%",
                            background: "linear-gradient(to top, #FF1493, #00BFFF)",
                          }}
                        />
                      ))}
                    </div>
                  ) : isActive ? (
                    <Pause size={13} className="text-[#FF1493]" />
                  ) : (
                    <>
                      <span
                        className="text-white/20 text-[11px] group-hover:hidden"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Play size={13} className="text-white/40 hidden group-hover:block" />
                    </>
                  )}
                </div>

                {/* Track Info */}
                <div className="flex-1 text-left overflow-hidden">
                  <p
                    className={`text-sm font-semibold truncate transition-colors ${
                      isActive ? "text-[#FF1493]" : "text-white/70 group-hover:text-white/90"
                    }`}
                    style={isActive ? { textShadow: "0 0 8px rgba(255,20,147,0.4)" } : {}}
                  >
                    {track.title}
                  </p>
                  <p className="text-[10px] text-white/25 truncate" style={{ fontFamily: "var(--font-mono)" }}>
                    {track.artist}
                  </p>
                </div>

                {/* Duration */}
                <span
                  className="text-[10px] text-white/20 shrink-0 tabular-nums"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {track.duration}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
