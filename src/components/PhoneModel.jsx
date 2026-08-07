import { Html, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { MathUtils } from 'three'
import { PhoneUI } from './PhoneUI.jsx'

const sectionRotations = {
  home: [0.04, -0.2, -0.025],
  work: [-0.035, 0.12, 0.018],
  projects: [0.025, -0.08, -0.012],
  about: [-0.02, 0.22, 0.022],
  contact: [0.02, -0.14, -0.02],
}

function SideButton({ position, scale }) {
  return (
    <RoundedBox args={[0.07, scale, 0.12]} radius={0.03} smoothness={4} position={position}>
      <meshStandardMaterial color="#77787c" metalness={0.88} roughness={0.2} />
    </RoundedBox>
  )
}

function CameraCluster() {
  return (
    <group position={[-0.82, 1.86, -0.145]} rotation={[0, Math.PI, 0]}>
      <RoundedBox args={[1.12, 1.12, 0.12]} radius={0.28} smoothness={6}>
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.72} roughness={0.23} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>
      {[[-0.26, 0.25, 0.08], [0.25, 0.23, 0.08], [-0.15, -0.27, 0.08]].map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.24, 0.09, 48]} />
            <meshStandardMaterial color="#050506" metalness={0.7} roughness={0.12} />
          </mesh>
          <mesh position={[0, 0.055, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.035, 48]} />
            <meshPhysicalMaterial color={index === 1 ? '#1f2630' : '#121722'} metalness={0.35} roughness={0.08} clearcoat={1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function PhoneModel({ route, onNavigate, reducedMotion }) {
  const group = useRef()
  const drag = useRef({ active: false, x: 0, y: 0, rx: 0, ry: 0 })
  const userRotation = useRef({ x: 0, y: 0 })
  const { pointer } = useThree()
  const baseRotation = sectionRotations[route] || sectionRotations.home
  const frameColor = useMemo(() => '#727378', [])

  const onPointerDown = (event) => {
    event.stopPropagation()
    drag.current.active = true
    drag.current.x = event.clientX
    drag.current.y = event.clientY
    drag.current.rx = userRotation.current.x
    drag.current.ry = userRotation.current.y
    event.target.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!drag.current.active) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    userRotation.current.y = MathUtils.clamp(drag.current.ry + dx * 0.006, -0.7, 0.7)
    userRotation.current.x = MathUtils.clamp(drag.current.rx + dy * 0.004, -0.32, 0.32)
  }

  const stopDrag = (event) => {
    drag.current.active = false
    event.target.releasePointerCapture?.(event.pointerId)
  }

  useFrame((state, delta) => {
    if (!group.current) return
    const parallaxX = reducedMotion ? 0 : pointer.y * 0.035
    const parallaxY = reducedMotion ? 0 : pointer.x * 0.055
    const idle = reducedMotion || drag.current.active ? 0 : Math.sin(state.clock.elapsedTime * 0.55) * 0.018
    const targetX = baseRotation[0] + userRotation.current.x + parallaxX + idle
    const targetY = baseRotation[1] + userRotation.current.y + parallaxY
    const targetZ = baseRotation[2]
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetX, 5.2, delta)
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 5.2, delta)
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, targetZ, 5.2, delta)
    group.current.position.y = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.72) * 0.045
  })

  return (
    <group ref={group}>
      <RoundedBox
        args={[3.18, 6.42, 0.27]}
        radius={0.43}
        smoothness={8}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <meshPhysicalMaterial color={frameColor} metalness={0.92} roughness={0.19} clearcoat={1} clearcoatRoughness={0.1} />
      </RoundedBox>

      <RoundedBox args={[3.01, 6.25, 0.19]} radius={0.38} smoothness={8} position={[0, 0, 0.075]}>
        <meshStandardMaterial color="#050506" metalness={0.35} roughness={0.26} />
      </RoundedBox>

      <RoundedBox args={[2.91, 6.13, 0.08]} radius={0.34} smoothness={8} position={[0, 0, 0.19]}>
        <meshPhysicalMaterial color="#09090b" roughness={0.16} metalness={0.18} clearcoat={1} clearcoatRoughness={0.06} />
      </RoundedBox>

      <Html transform center distanceFactor={1.26} position={[0, -0.005, 0.245]} className="phone-html-anchor">
        <div className="phone-html-shell">
          <PhoneUI route={route} onNavigate={onNavigate} />
        </div>
      </Html>

      <CameraCluster />
      <SideButton position={[1.61, 1.3, 0]} scale={0.86} />
      <SideButton position={[-1.61, 1.55, 0]} scale={0.58} />
      <SideButton position={[-1.61, 0.72, 0]} scale={0.92} />
      <SideButton position={[-1.61, -0.28, 0]} scale={0.92} />
    </group>
  )
}
