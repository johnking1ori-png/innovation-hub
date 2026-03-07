import React, { useRef } from 'react';
import { Text, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

function ServerRack({ position, rotation }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Main Rack Body */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, 3, 1]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Blinking/Glowing lights referencing cybersecurity and quantum nodes */}
            <mesh position={[0, 2.5, 0.51]}>
                <planeGeometry args={[0.8, 0.4]} />
                <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={4} color="#000" />
            </mesh>
            <mesh position={[0, 1.5, 0.51]}>
                <planeGeometry args={[0.8, 0.2]} />
                <meshStandardMaterial emissive="#10b981" emissiveIntensity={2} color="#000" />
            </mesh>
        </group>
    );
}

function QuantumCore() {
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
                    {/* Reduced sphere segments from 64 to 32 for performance */}
                    <sphereGeometry args={[1.5, 32, 32]} />
                    {/* Advanced Shader Material for Quantum distortion effect */}
                    <MeshDistortMaterial
                        color="#c084fc"
                        emissive="#9333ea"
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
                <torusGeometry args={[2.5, 0.05, 16, 50]} />
                <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <torusGeometry args={[3, 0.05, 16, 50]} />
                <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.1} />
            </mesh>

            <Sparkles count={40} scale={6} size={4} speed={0.4} opacity={0.5} color="#c084fc" />
        </group>
    );
}

export default function AILab({ position }) {
    return (
        <group position={position}>
            {/* Floating Section Title */}
            <Text position={[0, 4.5, 0]} fontSize={0.6} color="#e2e8f0" anchorX="center">
                Quantum Computing Launchpad
            </Text>

            {/* Floor */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[15, 15]} />
                <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.9} /> {/* Highly reflective floor */}
            </mesh>

            {/* Server Racks surrounding the core */}
            <ServerRack position={[-5, 0, -5]} rotation={[0, Math.PI / 4, 0]} />
            <ServerRack position={[-5, 0, 5]} rotation={[0, -Math.PI / 4, 0]} />
            <ServerRack position={[5, 0, -5]} rotation={[0, -Math.PI / 4, 0]} />
            <ServerRack position={[5, 0, 5]} rotation={[0, Math.PI / 4, 0]} />

            {/* The Central Animated Quantum Core */}
            <QuantumCore />

            {/* Localized purple point light for core glow */}
            <pointLight position={[0, 2, 0]} color="#d8b4fe" intensity={2} distance={10} />
        </group>
    );
}
