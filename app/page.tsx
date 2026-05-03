"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

// 여기서 음악 파일 경로를 수정하세요
// public/audio/ 폴더에 mp3 파일을 넣고 파일명만 바꾸면 됩니다
const TRACKS = [
  { label: "서약서", color: "bg-blue-500 hover:bg-blue-600", src: "/audio/forest.mp3" },
  { label: "종식 입장곡", color: "bg-emerald-500 hover:bg-emerald-600", src: "/audio/forest.mp3" },
  { label: "소라 입장곡", color: "bg-amber-500 hover:bg-amber-600", src: "/audio/Who is This Woman.mp3" },
  { label: "입장 이후", color: "bg-rose-500 hover:bg-rose-600", src: "/audio/bgm.mp3" },
  { label: "식 마무리", color: "bg-violet-500 hover:bg-violet-600", src: "/audio/track4.mp3" }
]

export default function Home() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // 컴포넌트 언마운트 시 오디오 정리
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleButtonClick = (index: number) => {
    // 같은 버튼을 누르면 정지
    if (playingIndex === index) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setPlayingIndex(null)
      return
    }

    // 기존 재생 중인 오디오 정지
    if (audioRef.current) {
      audioRef.current.pause()
    }

    // 새 오디오 재생
    const audio = new Audio(TRACKS[index].src)
    audio.play().catch((err) => {
      console.error("오디오 재생 실패:", err)
    })
    
    // 재생 끝나면 상태 초기화
    audio.onended = () => {
      setPlayingIndex(null)
      audioRef.current = null
    }

    audioRef.current = audio
    setPlayingIndex(index)
  }

  return (
    <main className="min-h-screen p-4 flex flex-col gap-4">
      {TRACKS.map((track, index) => {
        const isPlaying = playingIndex === index
        return (
          <Button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`flex-1 w-full text-2xl font-bold text-white ${track.color} ${
              isPlaying ? "ring-4 ring-white ring-offset-2 ring-offset-black" : ""
            }`}
            size="lg"
          >
            <span className="flex items-center justify-center gap-3">
              {isPlaying && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-4 bg-white rounded-full animate-pulse" />
                  <span className="w-1 h-6 bg-white rounded-full animate-pulse [animation-delay:150ms]" />
                  <span className="w-1 h-3 bg-white rounded-full animate-pulse [animation-delay:300ms]" />
                </span>
              )}
              {track.label}
              {isPlaying && <span className="text-sm opacity-80">재생 중</span>}
            </span>
          </Button>
        )
      })}
    </main>
  )
}
