
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

const Particles: React.FC = () => {
  const meshRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const particlesCount = 1000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const color = theme === 'light' ? '#0ea5e9' : '#c19660';

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const InteractiveParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default InteractiveParticles;
