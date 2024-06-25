import { useState, useEffect, useRef, useCallback } from "react";

export interface Audio {
  playing: boolean;
  toggle: () => void;
}

// 音楽再生機能を提供するカスタムフック
export const useAudio = (url: string): Audio => {
  // 参照に保存し現在のAudioオブジェクトを格納
  const audioRef = useRef<HTMLAudioElement>(new Audio(url));
  const audio = audioRef.current;

  audio.loop = true; // ループ再生: 有効
  audio.volume = 0.03; // 音量: 3%

  // 再生中かどうかの真偽値を管理
  const [playing, setPlaying] = useState<boolean>(false);

  // 再生/停止の切り替え関数
  const toggle = useCallback(() => setPlaying((prev) => !prev), []); // 依存関係の変化による関数の再生成を防止

  // 再生中の場合は再生、停止中の場合は停止
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  // 再生終了時の処理
  useEffect(() => {
    // 再生終了時の処理
    const handleEnded = () => setPlaying(false); // 再生終了時に停止
    audio.addEventListener("ended", handleEnded); // 再生終了時のイベントリスナー登録

    // コンポーネントのアンマウント時にイベントリスナーを解除
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio]);

  /** `const audio = useAudio(url);`という形で呼び出して利用
   * - playing: 再生中かどうかの真偽値
   * - loop: ループ再生かどうかの真偽値
   * - volume: 音量の数値
   * - toggle: 再生/停止の切り替え関数
   */
  return {
    playing,
    toggle,
  };
};
