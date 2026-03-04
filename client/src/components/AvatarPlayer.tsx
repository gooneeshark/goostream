/**
 * AvatarPlayer - Neon Arcade Dashboard
 * Displays the Goonee' avatar video with seamless loop
 * Falls back to stage performance image when video unavailable
 */
import { useRef, useEffect, useState } from "react";
import { AVATAR_VIDEO_URL, IMAGES } from "@/lib/playlist";
import { Maximize2, Minimize2 } from "lucide-react";

interface AvatarPlayerProps {
  isPlaying: boolean;
}

export default function AvatarPlayer({ isPlaying }: AvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying && videoLoaded) {
      video.play().catch(() => {});
    } else if (!isPlaying && videoLoaded) {
      video.pause();
    }
  }, [isPlaying, videoLoaded]);

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-lg overflow-hidden group"
      style={{
        aspectRatio: "9/14",
        maxHeight: "calc(100vh - 120px)",
        border: "1px solid rgba(255,20,147,0.3)",
        boxShadow: "0 0 20px rgba(255,20,147,0.15), 0 0 60px rgba(255,20,147,0.05), inset 0 0 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Background image (always visible as base) */}
      <img
        src={IMAGES.gooneeStage}
        alt="Goonee' Avatar"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Video overlay */}
      <video
        ref={videoRef}
        src={AVATAR_VIDEO_URL}
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
      />

      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050510]/80 to-transparent pointer-events-none" />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent pointer-events-none" />

      {/* Live badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#39FF14]" : "bg-red-500"}`}
          style={{ animation: isPlaying ? "pulse-neon 1.5s ease-in-out infinite" : "none" }}
        />
        <span
          className="text-[8px] font-bold tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--font-display)", color: isPlaying ? "#39FF14" : "#ef4444" }}
        >
          {isPlaying ? "LIVE" : "OFFLINE"}
        </span>
      </div>

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 p-2 rounded-md bg-black/50 text-white/60 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
      >
        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
      </button>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,191,255,0.15) 2px, rgba(0,191,255,0.15) 4px)",
        }}
      />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2
          className="text-white text-sm sm:text-base font-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            lineHeight: "1.8",
            textShadow: "0 0 10px rgba(255,20,147,0.6), 0 0 20px rgba(255,20,147,0.3)",
          }}
        >
          GOONEE' LIVE
        </h2>
        <p className="text-white/50 text-xs mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
          Interactive Avatar Stream
        </p>
      </div>
    </div>
  );
}
