import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars, Loader, KeyboardControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import Overlay from './components/UI/Overlay.jsx';
import Hub from './components/Environment/Hub.jsx';
import Player from './components/Player.jsx';
import { useStore } from './store';

export default function App() {
  const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
    { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
    { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
    { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
  ];

  const { isPerspective } = useStore();

  return (
    <>
      <Overlay />
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows // (Enables WebGL Depth Testing for Shadows)
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]} // Limit pixel ratio for high-res screens to prevent massive fill rate lag
        >
          {/* --- GRAPHICS PRINCIPLE 3: CAMERA AND PROJECTION --- */}
          {/* Explicitly defining the Cameras to mathematically demonstrate Perspective vs Orthographic mapping */}
          {isPerspective ? (
            <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} near={0.1} far={1000} />
          ) : (
            <OrthographicCamera makeDefault position={[0, 20, 8]} zoom={40} near={0.1} far={1000} />
          )}

          <color attach="background" args={['#050505']} />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

          {/* Environment provides stunning PBR reflections for our metals and glass */}
          <Environment preset="night" background={false} />

          {/* --- GRAPHICS PRINCIPLE 2: LIGHTING AND SHADING --- */}
          {/* Ambient light for base illumination, Directional Light calculates localized Shadow Maps */}
          <ambientLight intensity={0.2} />
          <directionalLight
            castShadow
            position={[20, 30, 10]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]} // Reduced shadow map size for performance
            shadow-bias={-0.0005}
          >
            <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40]} />
          </directionalLight>

          <Suspense fallback={null}>
            <Hub />
            <Player />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <Loader />
    </>
  );
}
