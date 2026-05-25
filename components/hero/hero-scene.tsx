'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line, PerspectiveCamera, Sphere, Stars } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function InteractiveRig() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.16, 0.08);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.08, 0.08);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.5, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * 0.35, 0.05);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.x * 1.4, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.y * 0.9, 0.03);
    state.camera.lookAt(0, 0, 0);
  });

  const ringPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    const radius = 2.3;
    for (let index = 0; index <= 64; index += 1) {
      const angle = (index / 64) * Math.PI * 2;
      points.push([Math.cos(angle) * radius, Math.sin(angle) * radius, 0]);
    }
    return points;
  }, []);

  return (
    <group ref={group}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 5, 4]} intensity={2.2} color="#ff4d4d" />
      <pointLight position={[-4, -2, 4]} intensity={2.4} color="#7a0000" />
      <pointLight position={[0, 0, 8]} intensity={1.5} color="#ffffff" />

      <Float speed={1.4} rotationIntensity={0.22} floatIntensity={1.1}>
        <mesh rotation={[0.7, 0.4, 0.1]}>
          <torusGeometry args={[2.2, 0.06, 16, 180]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff2a2a" emissiveIntensity={1.9} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.44} floatIntensity={1.2}>
        <mesh rotation={[1.1, 0.2, 0.4]}>
          <torusGeometry args={[1.5, 0.03, 12, 120]} />
          <meshStandardMaterial color="#ffffff" emissive="#7a0000" emissiveIntensity={1.2} metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.55} floatIntensity={1.5}>
        <mesh>
          <icosahedronGeometry args={[1.03, 2]} />
          <meshStandardMaterial wireframe color="#ffffff" emissive="#ff2a2a" emissiveIntensity={0.8} metalness={0.4} roughness={0.5} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.3}>
        <mesh position={[1.9, 0.8, 0.2]}>
          <boxGeometry args={[0.68, 0.68, 0.68]} />
          <meshStandardMaterial color="#f5f5f5" transparent opacity={0.18} metalness={0.2} roughness={0.05} emissive="#ff2a2a" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[-1.8, -1.1, 0.7]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.22} metalness={0.5} roughness={0.25} emissive="#7a0000" emissiveIntensity={0.9} />
        </mesh>
      </Float>

      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={index} position={[Math.cos((index / 8) * Math.PI * 2) * 3.3, Math.sin((index / 8) * Math.PI * 2) * 1.5, -1.4]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ff2a2a" emissive="#ff2a2a" emissiveIntensity={3} />
        </mesh>
      ))}

      <Line points={ringPoints} color="#ff2a2a" lineWidth={2.5} dashed={false} />
      <Line points={ringPoints.map(([x, y, z]) => [x * 0.72, y * 0.72, z + 0.8] as [number, number, number])} color="#ffffff" lineWidth={1} dashed={false} />
      <Sphere args={[0.42, 32, 32]} position={[0, 0.2, 0.1]}>
        <meshStandardMaterial color="#ff2a2a" emissive="#ff2a2a" emissiveIntensity={2.6} roughness={0.16} metalness={0.5} />
      </Sphere>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 md:h-[680px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,42,42,0.18),transparent_48%)]" />
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <fog attach="fog" args={['#050505', 9, 18]} />
        <color attach="background" args={['#050505']} />
        <InteractiveRig />
        <Stars radius={30} depth={18} count={1600} factor={2.2} saturation={0} fade speed={0.8} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_18%,transparent_72%,rgba(255,42,42,0.12))]" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
    </div>
  );
}