import React, { useRef } from 'react';
import { Text, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Server rack component inside the AI & Cybersecurity Lab
function ServerRack({ position, rotation }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Main Rack Body */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, 3, 1]} />
                <meshStandardMaterial color="#071a12" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Cyan activity light panel */}
            <mesh position={[0, 2.5, 0.51]}>
                <planeGeometry args={[0.8, 0.4]} />
                <meshStandardMaterial emissive="#06b6d4" emissiveIntensity={4} color="#000" />
            </mesh>
            {/* Green status light */}
            <mesh position={[0, 1.5, 0.51]}>
                <planeGeometry args={[0.8, 0.2]} />
                <meshStandardMaterial emissive="#10b981" emissiveIntensity={2} color="#000" />
            </mesh>
        </group>
    );
}

// Central animated AI Core (replaces Quantum Core with a Cybersecurity theme)
function AICore() {
    const coreRef = useRef();
    useFrame((state) => {
        if (coreRef.current) {
            coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group position={[0, 1.5, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={coreRef} castShadow>
                    {/* Sphere with distort shader — simulates neural network pulse */}
                    <sphereGeometry args={[1.5, 16, 16]} />
                    {/* Advanced Shader Material for AI distortion effect */}
                    <MeshDistortMaterial
                        color="#06b6d4"
                        emissive="#0891b2"
                        emissiveIntensity={2}
                        distort={0.4}
                        speed={2}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>
            </Float>

            {/* Core containment rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.05, 12, 32]} />
                <meshStandardMaterial color="#67e8f9" metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <torusGeometry args={[3, 0.05, 12, 32]} />
                <meshStandardMaterial color="#67e8f9" metalness={1} roughness={0.1} />
            </mesh>

            {/* Ceiling and Walls */}
            <mesh position={[0, 2.5, -7.5]} castShadow receiveShadow><boxGeometry args={[15.2, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[-7.5, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[7.5, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Front Wall with doorway connecting to center corridor */}
            <mesh position={[-4.75, 2.5, 7.5]} castShadow receiveShadow><boxGeometry args={[5.5, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[4.75, 2.5, 7.5]} castShadow receiveShadow><boxGeometry args={[5.5, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 4.5, 7.5]} castShadow receiveShadow><boxGeometry args={[4, 1, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Ceiling */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[15.2, 0.2, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>

            <Sparkles count={15} scale={6} size={4} speed={0.4} opacity={0.5} color="#06b6d4" />
        </group>
    );
}

export default function AILab({ position }) {
    return (
        <group position={position}>
            {/* Floating Section Title */}
            <Text position={[0, 4.5, 0]} fontSize={0.6} color="#d1fae5" anchorX="center">
                AI &amp; Cybersecurity Lab
            </Text>

            {/* Highly reflective dark floor */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[15, 15]} />
                <meshStandardMaterial color="#020f07" roughness={0.05} metalness={0.9} />
            </mesh>

            {/* Server Racks surrounding the core */}
            <ServerRack position={[-5, 0, -5]} rotation={[0, Math.PI / 4, 0]} />
            <ServerRack position={[-5, 0, 5]} rotation={[0, -Math.PI / 4, 0]} />
            <ServerRack position={[5, 0, -5]} rotation={[0, -Math.PI / 4, 0]} />
            <ServerRack position={[5, 0, 5]} rotation={[0, Math.PI / 4, 0]} />

            {/* The Central Animated AI Core */}
            <AICore />

            {/* Localized cyan point light for core glow */}
            <pointLight position={[0, 2, 0]} color="#67e8f9" intensity={2} distance={10} />
        </group>
    );
}
