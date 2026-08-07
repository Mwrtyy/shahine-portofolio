import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, RoundedBox } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { PhoneModel } from './PhoneModel.jsx'

function OpticalGlassSlab() {
  return (
    <RoundedBox args={[5.5, 4.4, 0.36]} radius={0.8} smoothness={8} position={[0.6, 0.05, -2.3]} rotation={[0.05, -0.18, -0.06]}>
      <meshPhysicalMaterial
        color="#b9c6d5"
        transparent
        opacity={0.24}
        transmission={0.95}
        thickness={0.78}
        ior={1.42}
        roughness={0.08}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </RoundedBox>
  )
}

function Scene({ route, onNavigate, reducedMotion }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4.5, 7, 6]} intensity={3.4} color="#ffffff" />
      <directionalLight position={[-5, -2, 4]} intensity={1.6} color="#9bb2ce" />
      <pointLight position={[0, 0, 5]} intensity={8} distance={16} color="#ffffff" />
      {!reducedMotion && <OpticalGlassSlab />}
      <PhoneModel route={route} onNavigate={onNavigate} reducedMotion={reducedMotion} />
    </>
  )
}

export function PhoneScene({ route, onNavigate, reducedMotion }) {
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const sync = () => setIsLowPower(media.matches)
    sync()
    media.addEventListener?.('change', sync)
    return () => media.removeEventListener?.('change', sync)
  }, [])

  return (
    <Canvas
      className="phone-canvas"
      camera={{ position: [0, 0, 11.2], fov: 28, near: 0.1, far: 50 }}
      dpr={isLowPower ? [1, 1.25] : [1, 1.65]}
      gl={{ antialias: !isLowPower, alpha: true, powerPreference: 'high-performance' }}
      fallback={<div className="canvas-fallback">3D unavailable — use the navigation below.</div>}
    >
      <Suspense fallback={null}>
        <Scene route={route} onNavigate={onNavigate} reducedMotion={reducedMotion || isLowPower} />
        <AdaptiveDpr pixelated={false} />
      </Suspense>
    </Canvas>
  )
}
