
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingLaptop: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const color = theme === 'light' ? '#0ea5e9' : '#c19660';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Laptop Base */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Laptop Screen */}
        <mesh position={[0, 0.3, -0.7]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[1.8, 1.2, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Screen Content */}
        <mesh position={[0, 0.3, -0.68]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.6, 1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>

        {/* Floating Code Elements */}
         {[...Array(8)].map((_, i) => (
          <mesh 
            key={i}
            position={[
              Math.sin(i * 2) * 4,
              Math.cos(i * 1.5) * 3,
              Math.sin(i * 3) * 3
            ]}
            scale={0.15}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
              color={color} 
              transparent 
                opacity={0.7}
              emissive={color}
                emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const Hero3DScene: React.FC = () => {
  const { theme } = useTheme();

  return (
      <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight 
          position={[5, 5, 5]} 
          intensity={1.2} 
          color={theme === 'light' ? '#0ea5e9' : '#c19660'} 
        />
                <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.8} 
          color={theme === 'light' ? '#3b82f6' : '#b48154'} 
        />
        <FloatingLaptop />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
