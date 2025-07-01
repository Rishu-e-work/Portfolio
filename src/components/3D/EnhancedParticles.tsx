
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingTechIcons: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const icons = useMemo(() => {
    const shapes = [];
    const colors = theme === 'light' ? ['#0ea5e9', '#3b82f6', '#6366f1'] : ['#c19660', '#b48154', '#966848'];
    
   for (let i = 0; i < 20; i++) {
      shapes.push({
        position: [
           (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
           (Math.random() - 0.5) * 20
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.floor(Math.random() * 3), // 0: cube, 1: sphere, 2: torus
     scale: 0.3 + Math.random() * 0.5,
        speed: 0.3 + Math.random() * 0.8
      });
    }
    return shapes;
  }, [theme]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.children.forEach((child, index) => {
        const icon = icons[index];
        child.position.y = icon.position[1] + Math.sin(state.clock.elapsedTime * icon.speed + index) * 2;
        child.rotation.x += 0.005;
        child.rotation.z += 0.003;
      });
    }
  });

  return (
    <group ref={meshRef}>
      {icons.map((icon, index) => (
        <mesh key={index} position={icon.position as [number, number, number]} scale={icon.scale}>
          {icon.type === 0 && <boxGeometry args={[1, 1, 1]} />}
          {icon.type === 1 && <sphereGeometry args={[0.5, 16, 16]} />}
          {icon.type === 2 && <torusGeometry args={[0.5, 0.2, 8, 16]} />}
          <meshStandardMaterial
            color={icon.color}
            transparent
      opacity={0.6}
            roughness={0.2}
            metalness={0.7}
            emissive={icon.color}
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const EnhancedParticles: React.FC = () => {
  const { theme } = useTheme();

  return (
 <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={1} 
          color={theme === 'light' ? '#0ea5e9' : '#c19660'} 
        />
        <pointLight 
          position={[-10, -10, -10]} 
            intensity={0.6} 
          color={theme === 'light' ? '#3b82f6' : '#b48154'} 
        />
        <FloatingTechIcons />
      </Canvas>
    </div>
  );
};

export default EnhancedParticles;
