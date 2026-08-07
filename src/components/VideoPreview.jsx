import { useEffect, useRef, useState } from 'react'

export function VideoPreview({ project, compact = false, controls = false }) {
  const videoRef = useRef(null)
  const rootRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (!entry.isIntersecting && videoRef.current) videoRef.current.pause()
      },
      { rootMargin: '120px', threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const play = () => {
    if (!visible || !videoRef.current || controls) return
    videoRef.current.play().catch(() => {})
  }

  const pause = () => {
    if (!videoRef.current || controls) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <div
      ref={rootRef}
      className={`video-preview video-preview--${project.tone} ${compact ? 'is-compact' : ''}`}
      onPointerEnter={play}
      onPointerLeave={pause}
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={visible ? project.video : undefined}
          poster={project.poster || undefined}
          muted={!controls}
          loop={!controls}
          playsInline
          controls={controls}
          preload="metadata"
        />
      ) : (
        <div className="video-placeholder" aria-label={`${project.title} placeholder`}>
          <span className="video-placeholder__time">00:{String(project.id.length * 3).padStart(2, '0')}</span>
          <div className="video-placeholder__frame">
            <span>9:16</span>
          </div>
          <span className="video-placeholder__label">ADD REAL EDIT</span>
        </div>
      )}
    </div>
  )
}
