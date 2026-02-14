import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

/* ─── Animated floating sphere ──────────────────────── */
function FloatingSphere({ position, color, size, speed, distort }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.12}
          distort={distort}
          speed={speed}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ─── Slowly rotating wireframe torus ───────────────── */
function WireframeTorus({ position, color, size }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[size, size * 0.15, 16, 48]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.06} />
    </mesh>
  );
}

/* ─── Floating particle field ───────────────────────── */
function ParticleField({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#3b82f6"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#06b6d4"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Main 3D Background ───────────────────────────── */
export default function ChatBackground3D() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Subtle ambient + directional lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.4}
          color="#93c5fd"
        />
        <directionalLight
          position={[-3, -3, 2]}
          intensity={0.2}
          color="#c084fc"
        />

        {/* Floating distorted spheres */}
        <FloatingSphere
          position={[-3.5, 1.5, -2]}
          color="#3b82f6"
          size={1.2}
          speed={0.8}
          distort={0.4}
        />
        <FloatingSphere
          position={[3, -1.5, -3]}
          color="#8b5cf6"
          size={0.9}
          speed={0.6}
          distort={0.35}
        />
        <FloatingSphere
          position={[0.5, 2.5, -4]}
          color="#06b6d4"
          size={0.7}
          speed={1}
          distort={0.3}
        />
        <FloatingSphere
          position={[-2, -2.5, -2.5]}
          color="#6366f1"
          size={0.6}
          speed={0.7}
          distort={0.45}
        />

        {/* Wireframe torus rings */}
        <WireframeTorus
          position={[2.5, 1.8, -3.5]}
          color="#3b82f6"
          size={1.5}
        />
        <WireframeTorus
          position={[-2.5, -1.5, -4]}
          color="#8b5cf6"
          size={1.2}
        />

        {/* Particle field */}
        <ParticleField count={150} />
      </Canvas>
    </div>
  );
}
