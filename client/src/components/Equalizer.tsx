/**
 * Equalizer - Neon Arcade Dashboard
 * Pure inline styles + CSS keyframe animations
 * No Tailwind classes on bars to avoid global .flex override
 */
import { useEffect, useRef, useMemo } from "react";

interface EqualizerProps {
  isPlaying: boolean;
  barCount?: number;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
}

function generateBarData(count: number) {
  const data: Array<{ delay: number; duration: number; maxH: number }> = [];
  for (let i = 0; i < count; i++) {
    const ratio = i / count;
    const centerFactor = 1 - Math.abs(ratio - 0.5) * 1.2;
    const maxH = 40 + centerFactor * 55;
    const delay = (Math.sin(i * 0.7) * 0.5 + 0.5) * 1.2;
    const duration = 0.4 + Math.random() * 0.6;
    data.push({ delay, duration, maxH });
  }
  return data;
}

export default function Equalizer({ isPlaying, barCount = 48, audioRef }: EqualizerProps) {
  const barData = useMemo(() => generateBarData(barCount), [barCount]);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const connectedRef = useRef(false);
  const animRef = useRef<number>(0);

  // Connect Web Audio API
  useEffect(() => {
    if (!isPlaying || connectedRef.current || !audioRef?.current) return;
    try {
      const ctx = audioCtxRef.current || new AudioContext();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.82;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      connectedRef.current = true;
    } catch {
      // fallback to CSS animation
    }
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (isPlaying && audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, [isPlaying]);

  // Real audio data overlay
  useEffect(() => {
    if (!isPlaying || !connectedRef.current || !analyserRef.current) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    const analyser = analyserRef.current;
    const freqData = new Uint8Array(analyser.frequencyBinCount);
    const update = () => {
      analyser.getByteFrequencyData(freqData);
      const bars = barsRef.current;
      for (let i = 0; i < barCount; i++) {
        const bar = bars[i];
        if (!bar) continue;
        const idx = Math.floor((i / barCount) * freqData.length);
        const val = freqData[idx] / 255;
        const h = Math.max(val * 100, 4);
        bar.style.height = `${h}%`;
        bar.style.animationPlayState = "paused";
      }
      animRef.current = requestAnimationFrame(update);
    };
    animRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, barCount]);

  // Generate unique keyframe names for each bar
  const keyframesCSS = useMemo(() => {
    return barData.map((d, i) => {
      const minH = Math.max(d.maxH * 0.12, 4);
      return `
@keyframes eqBar${i} {
  0%, 100% { height: ${minH}%; }
  50% { height: ${d.maxH}%; }
}`;
    }).join("\n");
  }, [barData]);

  const containerWidth = 100; // percentage
  const barWidth = containerWidth / barCount;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "120px",
      background: "rgba(0,0,0,0.4)",
      borderRadius: "6px",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      gap: "1px",
      padding: "0 2px",
    }}>
      <style>{keyframesCSS}</style>
      {barData.map((d, i) => {
        const ratio = i / barCount;
        const hue = 320 - ratio * 140; // pink to blue
        return (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            style={{
              width: `${barWidth}%`,
              minWidth: "2px",
              borderRadius: "2px 2px 0 0",
              background: isPlaying
                ? `linear-gradient(to top, hsl(${hue}, 100%, 50%), hsl(${hue + 30}, 80%, 70%))`
                : `linear-gradient(to top, hsla(${hue}, 100%, 50%, 0.3), hsla(${hue + 30}, 80%, 70%, 0.1))`,
              boxShadow: isPlaying
                ? `0 0 8px hsla(${hue}, 100%, 50%, 0.6), 0 -6px 16px hsla(${hue}, 100%, 50%, 0.15)`
                : "none",
              height: isPlaying ? `${d.maxH * 0.5}%` : "5%",
              animation: isPlaying
                ? `eqBar${i} ${d.duration.toFixed(2)}s ${d.delay.toFixed(2)}s ease-in-out infinite`
                : `eqBar${i} 3s ${d.delay.toFixed(2)}s ease-in-out infinite`,
              opacity: isPlaying ? 1 : 0.3,
              transition: "opacity 0.5s ease",
            }}
          />
        );
      })}
      {/* Reflection effect at bottom */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "20px",
        background: "linear-gradient(to top, rgba(5,5,16,0.9), transparent)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
