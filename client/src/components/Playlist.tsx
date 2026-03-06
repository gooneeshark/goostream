/**
 * Playlist - Neon Arcade Dashboard
 * Track list with search, active track highlighting, animated eq bars
 * Supports 300+ tracks with search/filter and auto-scroll to active track
 */
import { Play, Pause, Search, X, Music, Shuffle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Track } from "@/lib/playlist";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  onShuffleAll?: () => void;
}

export default function Playlist({ tracks, currentTrackIndex, isPlaying, onSelectTrack, onShuffleAll }: PlaylistProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeTrackRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Filter tracks based on search
  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return tracks.map((t, i) => ({ track: t, originalIndex: i }));
    const q = searchQuery.toLowerCase().trim();
    return tracks
      .map((t, i) => ({ track: t, originalIndex: i }))
      .filter(({ track }) =>
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q)
      );
  }, [tracks, searchQuery]);

  // Total duration
  const totalDuration = useMemo(() => {
    const totalSec = tracks.reduce((sum, t) => sum + (t.durationSec || 0), 0);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m} min`;
  }, [tracks]);

  // Auto-scroll to active track when it changes
  useEffect(() => {
    if (activeTrackRef.current && !searchQuery) {
      activeTrackRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [currentTrackIndex, searchQuery]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => {
      if (prev) setSearchQuery("");
      return !prev;
    });
  }, []);

  return (
    <div
      className="rounded-lg overflow-hidden h-full flex flex-col"
      style={{
        background: "rgba(13,13,26,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,191,255,0.2)",
        boxShadow: "0 0 15px rgba(0,191,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className="text-[9px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-display)", color: "#00BFFF" }}
            >
              PLAYLIST
            </h3>
            <p className="text-white/30 text-[11px] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {tracks.length} tracks &middot; {totalDuration}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {onShuffleAll && (
              <button
                onClick={onShuffleAll}
                className="p-1.5 rounded-md text-white/30 hover:text-[#39FF14] hover:bg-white/[0.04] transition-all"
                title="Shuffle All"
              >
                <Shuffle size={13} />
              </button>
            )}
            <button
              onClick={toggleSearch}
              className={`p-1.5 rounded-md transition-all ${
                isSearchOpen
                  ? "text-[#00BFFF] bg-[#00BFFF]/10"
                  : "text-white/30 hover:text-[#00BFFF] hover:bg-white/[0.04]"
              }`}
              title="Search"
            >
              {isSearchOpen ? <X size={13} /> : <Search size={13} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-2 relative">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเพลง..."
              className="w-full pl-7 pr-3 py-1.5 rounded-md text-[11px] text-white/80 placeholder-white/20 outline-none transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,191,255,0.15)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,191,255,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,191,255,0.15)")}
            />
            {searchQuery && (
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                {filteredTracks.length} found
              </span>
            )}
          </div>
        )}
      </div>

      {/* Track List */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 h-[300px] sm:h-[400px] lg:h-[calc(100vh-260px)]" style={{ maxHeight: "500px" }}>
        <div className="p-1.5">
          {filteredTracks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Music size={24} className="text-white/10" />
              <p className="text-white/20 text-[11px]" style={{ fontFamily: "var(--font-mono)" }}>
                {searchQuery ? "ไม่พบเพลงที่ค้นหา" : "ไม่มีเพลงในรายการ"}
              </p>
            </div>
          ) : (
            filteredTracks.map(({ track, originalIndex }) => {
              const isActive = originalIndex === currentTrackIndex;
              const isCurrentPlaying = isActive && isPlaying;

              return (
                <button
                  key={track.id}
                  ref={isActive ? activeTrackRef : undefined}
                  onClick={() => onSelectTrack(originalIndex)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group ${
                    isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                  }`}
                  style={isActive ? {
                    borderLeft: "2px solid #FF1493",
                    boxShadow: "inset 4px 0 12px rgba(255,20,147,0.08)",
                  } : { borderLeft: "2px solid transparent" }}
                >
                  {/* Track Number / Play Icon */}
                  <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                    {isCurrentPlaying ? (
                      <div className="flex items-end gap-[2px] h-3">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-[2.5px] rounded-full"
                            style={{
                              animation: `eq-bar 0.7s ease-in-out ${i * 0.12}s infinite`,
                              height: "50%",
                              background: "linear-gradient(to top, #FF1493, #00BFFF)",
                            }}
                          />
                        ))}
                      </div>
                    ) : isActive ? (
                      <Pause size={12} className="text-[#FF1493]" />
                    ) : (
                      <>
                        <span
                          className="text-white/20 text-[10px] group-hover:hidden"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {String(originalIndex + 1).padStart(2, "0")}
                        </span>
                        <Play size={12} className="text-white/40 hidden group-hover:block" />
                      </>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 text-left overflow-hidden">
                    <p
                      className={`text-[12px] font-semibold truncate transition-colors leading-tight ${
                        isActive ? "text-[#FF1493]" : "text-white/70 group-hover:text-white/90"
                      }`}
                      style={isActive ? { textShadow: "0 0 8px rgba(255,20,147,0.4)" } : {}}
                    >
                      {track.title}
                    </p>
                    <p className="text-[9px] text-white/25 truncate" style={{ fontFamily: "var(--font-mono)" }}>
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
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
