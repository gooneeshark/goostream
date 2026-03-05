/**
 * Goonee' Live Stream - Neon Arcade Dashboard
 * Design: Bento Grid layout with Cyberpunk/Neon aesthetic
 * Colors: Hot Pink (#FF1493) + Electric Blue (#00BFFF) on Void Black (#050510)
 * Fonts: Press Start 2P (headings) + Space Mono (data) + Rajdhani (UI)
 */

import AvatarPlayer from "@/components/AvatarPlayer";
import MusicControls from "@/components/MusicControls";
import Playlist from "@/components/Playlist";
import Equalizer from "@/components/Equalizer";
import SceneTrigger from "@/components/SceneTrigger";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { PLAYLIST, IMAGES } from "@/lib/playlist";
import { Radio, Users, Clock, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const player = useAudioPlayer(PLAYLIST);
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 200) + 50);
  const [liveTime, setLiveTime] = useState(0);

  // Set SEO document title
  useEffect(() => {
    document.title = "Goonee' Live Stream \u2014 Interactive Music Showcase";
  }, []);

  // Simulate live timer
  useEffect(() => {
    const interval = setInterval(() => setLiveTime((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((p) => Math.max(20, p + Math.floor(Math.random() * 7) - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatLiveTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#050510" }}>
      {/* Background grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url(${IMAGES.neonGrid})`, backgroundSize: "300px", backgroundRepeat: "repeat" }}
      />
      {/* Ambient glow */}
      <div className="fixed top-[-30%] left-[-15%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,20,147,0.05) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-30%] right-[-15%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,191,255,0.05) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50" style={{
          background: "rgba(5,5,16,0.92)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)"
        }}>
          <div className="container flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FF1493, #8B5CF6)", boxShadow: "0 0 12px rgba(255,20,147,0.3)" }}>
                <Radio size={14} className="text-white" />
              </div>
              <div>
                <h1 className="text-white tracking-wider" style={{ fontFamily: "var(--font-display)", fontSize: "10px" }}>
                  GOONEE' LIVE
                </h1>
                <p className="text-white/25 text-[9px]" style={{ fontFamily: "var(--font-mono)" }}>
                  Interactive Music Stream
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex items-center gap-1.5">
                <Users size={12} className="text-[#39FF14]" />
                <span className="text-[11px] text-[#39FF14] tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
                  {viewerCount}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock size={12} className="text-white/25" />
                <span className="text-[10px] text-white/25 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
                  {formatLiveTime(liveTime)}
                </span>
              </div>
              <a href="https://goo-nee.netlify.app/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] transition-all hover:text-[#00BFFF] hover:border-[#00BFFF]/30"
                style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <ExternalLink size={10} />
                <span className="hidden sm:inline">Main Site</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Bento Grid */}
        <main className="container py-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

            {/* Left Column - Avatar Player */}
            <div className="lg:col-span-4 xl:col-span-3">
              <AvatarPlayer isPlaying={player.isPlaying} />
            </div>

            {/* Center Column - Equalizer + Controls + Scene Triggers */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col gap-3">
              {/* Equalizer Card */}
              <div className="rounded-lg p-3" style={{
                background: "rgba(13,13,26,0.85)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,191,255,0.15)", boxShadow: "0 0 12px rgba(0,191,255,0.05)"
              }}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[8px] uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-display)", color: "#00BFFF" }}>
                    EQUALIZER
                  </h3>
                  <div className="flex items-center gap-2">
                    {player.isPlaying && (
                      <span className="text-[7px] uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-mono)", color: "#39FF14" }}>ACTIVE</span>
                    )}
                    <div className={`w-1.5 h-1.5 rounded-full ${player.isPlaying ? "bg-[#39FF14]" : "bg-white/15"}`}
                      style={player.isPlaying ? { boxShadow: "0 0 6px rgba(57,255,20,0.5)", animation: "pulse-neon 1.5s ease-in-out infinite" } : {}} />
                  </div>
                </div>
                <Equalizer isPlaying={player.isPlaying} barCount={48} audioRef={player.audioRef} />
              </div>

              {/* Music Controls + Scene Triggers side by side on larger screens */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-3">
                <div className="xl:col-span-3">
                  <MusicControls
                    currentTrack={player.currentTrack}
                    isPlaying={player.isPlaying}
                    isLoading={player.isLoading}
                    currentTime={player.currentTime}
                    duration={player.duration}
                    volume={player.volume}
                    isMuted={player.isMuted}
                    shuffle={player.shuffle}
                    repeat={player.repeat}
                    onTogglePlay={player.togglePlay}
                    onNext={player.nextTrack}
                    onPrev={player.prevTrack}
                    onSeek={player.seek}
                    onVolumeChange={player.changeVolume}
                    onToggleMute={player.toggleMute}
                    onToggleShuffle={player.toggleShuffle}
                    onToggleRepeat={player.toggleRepeat}
                  />
                </div>
                <div className="xl:col-span-2">
                  <SceneTrigger />
                </div>
              </div>
            </div>

            {/* Right Column - Playlist */}
            <div className="lg:col-span-3 xl:col-span-3">
              <Playlist
                tracks={PLAYLIST}
                currentTrackIndex={player.currentTrackIndex}
                isPlaying={player.isPlaying}
                onSelectTrack={(index) => player.selectTrack(index)}
              />
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-3 relative rounded-lg overflow-hidden"
            style={{ height: "70px", border: "1px solid rgba(255,20,147,0.12)", boxShadow: "0 0 20px rgba(255,20,147,0.05)" }}>
            <img src={IMAGES.equalizerBanner} alt="Neon equalizer banner background for Goonee' music stream" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #050510 0%, transparent 30%, transparent 70%, #050510 100%)" }} />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center">
                <p style={{ fontFamily: "var(--font-display)", fontSize: "8px", color: "#FF1493",
                  textShadow: "0 0 10px rgba(255,20,147,0.5)", letterSpacing: "0.15em" }}>
                  POWERED BY GOONEE' MUSIC ENGINE
                </p>
                <p className="text-white/25 text-[11px] mt-1" style={{ fontFamily: "var(--font-mono)" }}>
                  AI-Driven Interactive Live Stream Experience
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div className="container flex items-center justify-between">
            <p className="text-[9px] text-white/15" style={{ fontFamily: "var(--font-mono)" }}>
              &copy; 2026 Goonee' — All rights reserved
            </p>
            <div className="flex items-center gap-1.5">
              {["#FF1493", "#8B5CF6", "#00BFFF", "#39FF14"].map((c) => (
                <div key={c} className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: c, boxShadow: `0 0 4px ${c}` }} />
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
