"use client";

import * as THREE from 'three';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows,
  useGLTF,
  Float,
  Html
} from '@react-three/drei';

interface ModelProps {
  url: string;
  autoRotate?: boolean;
}

function Model({ url, autoRotate = false }: ModelProps) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={group} 
      object={scene} 
      scale={1.5} 
      position={[0, -1, 0]} 
    />
  );
}

interface ViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
}

export default function ProductViewer({ modelUrl, autoRotate = true }: ViewerProps) {
  return (
    <div className="w-full h-full min-h-[500px] relative bg-transparent overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={<Html center>Loading 3D Model...</Html>}>
          <Stage environment="city" intensity={0.5}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <Model url={modelUrl} autoRotate={autoRotate} />
            </Float>
          </Stage>
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
          <OrbitControls 
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.75} 
            enableZoom={true}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
