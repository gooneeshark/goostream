import { useState, useRef, useCallback, useEffect } from "react";
import type { Track } from "@/lib/playlist";

export function useAudioPlayer(playlist: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<"none" | "all" | "one">("none");
  const playIntentRef = useRef(false);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const isPlayingRef = useRef(isPlaying);
  const repeatRef = useRef(repeat);
  const shuffleRef = useRef(shuffle);

  // Keep refs in sync
  currentTrackIndexRef.current = currentTrackIndex;
  isPlayingRef.current = isPlaying;
  repeatRef.current = repeat;
  shuffleRef.current = shuffle;

  const currentTrack = playlist[currentTrackIndex];

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.volume = volume;
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Event listeners - set up once, use refs for current values
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };
    const onCanPlay = () => {
      setIsLoading(false);
      if (playIntentRef.current) {
        audio.play().catch(() => {});
        playIntentRef.current = false;
      }
    };
    const onWaiting = () => setIsLoading(true);
    const onEnded = () => {
      const currentRepeat = repeatRef.current;
      const currentShuffle = shuffleRef.current;
      const currentIdx = currentTrackIndexRef.current;

      if (currentRepeat === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        const nextIndex = currentShuffle
          ? Math.floor(Math.random() * playlist.length)
          : (currentIdx + 1) % playlist.length;
        if (nextIndex === 0 && currentRepeat === "none") {
          setIsPlaying(false);
        } else {
          playIntentRef.current = true;
          setCurrentTrackIndex(nextIndex);
        }
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsLoading(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, [playlist.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    const track = playlist[currentTrackIndex];
    if (!audio || !track) return;

    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);
    audio.src = track.src;
    audio.load();
  }, [currentTrackIndex, playlist]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.readyState >= 2) {
      audio.play().catch(() => {});
    } else {
      playIntentRef.current = true;
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    playIntentRef.current = false;
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlayingRef.current) {
      playIntentRef.current = false;
      audioRef.current?.pause();
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.readyState >= 2) {
        audio.play().catch(() => {});
      } else {
        playIntentRef.current = true;
        setIsPlaying(true);
      }
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setRepeat((prev) => {
      if (prev === "none") return "all";
      if (prev === "all") return "one";
      return "none";
    });
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const nextTrack = useCallback(() => {
    const nextIndex = shuffleRef.current
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrackIndexRef.current + 1) % playlist.length;
    playIntentRef.current = isPlayingRef.current;
    setCurrentTrackIndex(nextIndex);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    const prevIndex = (currentTrackIndexRef.current - 1 + playlist.length) % playlist.length;
    playIntentRef.current = isPlayingRef.current;
    setCurrentTrackIndex(prevIndex);
  }, [playlist.length]);

  const selectTrack = useCallback((index: number) => {
    playIntentRef.current = true;
    setCurrentTrackIndex(index);
  }, []);

  const changeVolume = useCallback((v: number) => {
    setVolume(Math.max(0, Math.min(1, v)));
    if (v > 0) setIsMuted(false);
  }, []);

  return {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeat,
    play,
    pause,
    togglePlay,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    seek,
    nextTrack,
    prevTrack,
    selectTrack,
    changeVolume,
    audioRef,
  };
}
