import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const SAGE = '#7cc4a8'
const DEEP = '#2f8a6d'
const CLAY = '#d99560'

/**
 * A vertical column of segments that eases through a travelling sine wave —
 * a stylised spine in motion. It is the visual anchor of the hero.
 */
function KineticSpine({ still }) {
  const group = useRef()
  const segments = 14

  const nodes = useMemo(
    () =>
      Array.from({ length: segments }, (_, i) => ({
        y: (i - (segments - 1) / 2) * 0.42,
        scale: 0.42 + Math.sin((i / segments) * Math.PI) * 0.34,
        offset: i * 0.42,
      })),
    []
  )

  useFrame((state) => {
    if (!group.current) return
    const t = still ? 0 : state.clock.elapsedTime

    group.current.rotation.y = t * 0.28
    group.current.children.forEach((child, i) => {
      const wave = Math.sin(t * 1.1 - nodes[i].offset)
      child.position.x = wave * 0.5
      child.position.z = Math.cos(t * 0.9 - nodes[i].offset) * 0.28
      child.rotation.z = wave * 0.28
      child.rotation.x = Math.PI / 2
    })
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      {nodes.map((node, i) => (
        <Torus
          key={i}
          args={[node.scale, 0.11, 14, 42]}
          position={[0, node.y, 0]}
        >
          <meshStandardMaterial
            color={i % 4 === 0 ? DEEP : SAGE}
            roughness={0.32}
            metalness={0.28}
            emissive={DEEP}
            emissiveIntensity={0.18}
          />
        </Torus>
      ))}
    </group>
  )
}

/** Slow drifting motes — depth and life behind the spine. */
function Motes({ count = 420, still }) {
  const points = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Spherical shell so the motes wrap the spine rather than crowd it.
      const radius = 4.2 + Math.random() * 4.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.cos(phi) * 0.75
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!points.current || still) return
    points.current.rotation.y = state.clock.elapsedTime * 0.035
    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.08
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={SAGE}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Wireframe shells that read as range-of-motion arcs. */
function Orbits({ still }) {
  const outer = useRef()

  useFrame((state) => {
    if (!outer.current || still) return
    outer.current.rotation.y = -state.clock.elapsedTime * 0.06
    outer.current.rotation.z = state.clock.elapsedTime * 0.04
  })

  return (
    <group ref={outer}>
      <Icosahedron args={[4.6, 1]}>
        <meshBasicMaterial color={DEEP} wireframe transparent opacity={0.14} />
      </Icosahedron>
      <Float speed={still ? 0 : 1.4} rotationIntensity={0.5} floatIntensity={1.1}>
        <Torus args={[2.6, 0.02, 8, 90]} rotation={[Math.PI / 2.4, 0.4, 0]}>
          <meshBasicMaterial color={CLAY} transparent opacity={0.5} />
        </Torus>
      </Float>
    </group>
  )
}

/**
 * On wide screens the hero copy owns the left half, so slide the whole scene
 * right to sit beside it rather than behind it.
 */
function SceneContents({ still }) {
  const { size } = useThree()
  const shiftX = size.width >= 1024 ? 2.7 : size.width >= 768 ? 1.4 : 0

  return (
    <group position={[shiftX, 0, 0]}>
      <Float speed={still ? 0 : 1} rotationIntensity={0.25} floatIntensity={0.5}>
        <KineticSpine still={still} />
      </Float>
      <Motes still={still} />
      <Orbits still={still} />
    </group>
  )
}

/** Gentle camera parallax driven by pointer position. */
function ParallaxRig({ still }) {
  const { camera, pointer } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame(() => {
    if (still) return
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.9 - camera.position.y) * 0.04
    camera.lookAt(target)
  })

  return null
}

export default function Scene3D() {
  const still = usePrefersReducedMotion()

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 11], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      // Nothing in the scene is interactive; let clicks fall through to the page.
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#062925']} />
      <fog attach="fog" args={['#062925', 9, 20]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#eaf7f1" />
      <pointLight position={[-6, -3, -4]} intensity={40} color={DEEP} />
      <pointLight position={[5, -4, 3]} intensity={18} color={CLAY} />

      <Suspense fallback={null}>
        <SceneContents still={still} />
      </Suspense>

      <ParallaxRig still={still} />
    </Canvas>
  )
}
