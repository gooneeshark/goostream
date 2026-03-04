/**
 * SceneTrigger - Neon Arcade Dashboard
 * Interactive scene buttons for triggering avatar reactions
 * Each button has a unique neon color
 */
import { useState } from "react";
import { Sparkles, Music, Hand, Zap, Camera, Heart } from "lucide-react";
import { toast } from "sonner";

interface Scene {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const SCENES: Scene[] = [
  { id: "greeting", label: "GREET", icon: <Hand size={16} />, color: "#39FF14", glowColor: "rgba(57,255,20,0.25)" },
  { id: "music", label: "MUSIC", icon: <Music size={16} />, color: "#FF1493", glowColor: "rgba(255,20,147,0.25)" },
  { id: "effect", label: "FX", icon: <Sparkles size={16} />, color: "#00BFFF", glowColor: "rgba(0,191,255,0.25)" },
  { id: "energy", label: "HYPE", icon: <Zap size={16} />, color: "#FFD700", glowColor: "rgba(255,215,0,0.25)" },
  { id: "photo", label: "SNAP", icon: <Camera size={16} />, color: "#8B5CF6", glowColor: "rgba(139,92,246,0.25)" },
  { id: "love", label: "LOVE", icon: <Heart size={16} />, color: "#FF6B9D", glowColor: "rgba(255,107,157,0.25)" },
];

export default function SceneTrigger() {
  const [activeScene, setActiveScene] = useState<string | null>(null);

  const triggerScene = (scene: Scene) => {
    setActiveScene(scene.id);
    toast(`Scene "${scene.label}" triggered!`, {
      style: {
        background: "#0D0D1A",
        border: `1px solid ${scene.color}40`,
        color: scene.color,
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      },
    });
    setTimeout(() => setActiveScene(null), 2000);
  };

  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "rgba(13,13,26,0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "0 0 15px rgba(139,92,246,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <h3
        className="text-[9px] uppercase tracking-[0.25em] mb-3"
        style={{ fontFamily: "var(--font-display)", color: "#8B5CF6" }}
      >
        SCENE TRIGGERS
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => triggerScene(scene)}
              className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-lg transition-all duration-200 active:scale-90 hover:scale-[1.03]"
              style={{
                background: isActive ? `${scene.color}10` : "rgba(255,255,255,0.015)",
                border: `1px solid ${isActive ? `${scene.color}60` : "rgba(255,255,255,0.04)"}`,
                boxShadow: isActive ? `0 0 12px ${scene.glowColor}, inset 0 0 8px ${scene.glowColor}` : "none",
              }}
            >
              <div
                className="transition-colors duration-200"
                style={{ color: isActive ? scene.color : "rgba(255,255,255,0.35)" }}
              >
                {scene.icon}
              </div>
              <span
                className="transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "7px",
                  letterSpacing: "0.1em",
                  color: isActive ? scene.color : "rgba(255,255,255,0.25)",
                }}
              >
                {scene.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
