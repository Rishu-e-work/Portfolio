
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

const AnimatedCube: React.FC<{ position: [number, number, number]; scale: number }> = ({ position, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const color = theme === 'light' ? '#0ea5e9' : '#c19660';

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingCubes: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={1} 
          color={theme === 'light' ? '#0ea5e9' : '#c19660'} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={0.5} 
          color={theme === 'light' ? '#3b82f6' : '#b48154'} 
        />
        
        <AnimatedCube position={[-4, 0, 0]} scale={0.8} />
        <AnimatedCube position={[4, 2, -2]} scale={1.2} />
        <AnimatedCube position={[0, -3, -1]} scale={0.6} />
        <AnimatedCube position={[-2, 3, 1]} scale={1} />
        <AnimatedCube position={[3, -1, 2]} scale={0.9} />
        <AnimatedCube position={[-1, 1, -3]} scale={0.7} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingCubes;
