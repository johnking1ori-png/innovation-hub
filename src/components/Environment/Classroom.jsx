import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { createNoiseTexture } from '../../utils/textures';

export default function Classroom({ position }) {
    // Noise texture simulating carpet
    const carpetTexture = useMemo(() => createNoiseTexture('#1e293b', 15), []);

    return (
        <group position={position}>
            {/* Floating Header */}
            <Text position={[0, 5, -8]} fontSize={0.8} color="#e2e8f0" anchorX="center">
                Quantum Bootcamp
            </Text>

            {/* Floor */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[15, 20]} />
                <meshStandardMaterial map={carpetTexture} roughness={1.0} metalness={0} />
            </mesh>

            {/* Smartboard - Glowing Emissive projection screen */}
            <group position={[0, 2.5, -9.8]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[10, 4, 0.2]} />
                    <meshStandardMaterial color="#000" />
                </mesh>
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[9.8, 3.8]} />
                    <meshStandardMaterial emissive="#1e40af" emissiveIntensity={0.5} color="#1e3a8a" />
                </mesh>
                {/* Dynamic Text on the Board */}
                <Text position={[0, 1, 0.12]} fontSize={0.3} color="#60a5fa">Algorithm Design</Text>
                <Text position={[0, 0, 0.12]} fontSize={0.2} color="#93c5fd" maxWidth={8} textAlign="center">
                    {`1. Initialize Qubits to |0>\n2. Apply Hadamard Gates for Superposition\n3. Entangle using CNOT Gates\n4. Measure Probabilities`}
                </Text>
            </group>

            {/* Instructor Desk */}
            <mesh position={[0, 0.75, -7]} castShadow receiveShadow>
                <boxGeometry args={[4, 1.5, 1]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
            </mesh>
            {/* Emissive Strip */}
            <mesh position={[0, 1.4, -6.49]}>
                <boxGeometry args={[4, 0.1, 0.02]} />
                <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={1} color="#000" />
            </mesh>

            {/* Student Desks */}
            {[...Array(4)].map((_, row) => (
                <group key={row} position={[0, 0, -3 + row * 4]}>
                    {[...Array(3)].map((_, col) => (
                        <group key={col} position={[-4 + col * 4, 0, 0]}>
                            {/* Desk Surface (Glass/Metallic) */}
                            <mesh position={[0, 0.75, 0]} castShadow>
                                <boxGeometry args={[3, 0.1, 1]} />
                                <meshPhysicalMaterial color="#334155" roughness={0.1} metalness={0.8} clearcoat={1} clearcoatRoughness={0.1} />
                            </mesh>
                            {/* Desk Modesty Panel */}
                            <mesh position={[0, 0.375, -0.45]}><boxGeometry args={[2.8, 0.75, 0.1]} /><meshStandardMaterial color="#1e293b" /></mesh>
                            {/* Simple Stool */}
                            <mesh position={[0, 0.45, 1]}><boxGeometry args={[0.5, 0.1, 0.5]} /><meshStandardMaterial color="#3b82f6" roughness={0.5} /></mesh>
                            <mesh position={[0, 0.225, 1]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#111" metalness={0.9} /></mesh>
                        </group>
                    ))}
                </group>
            ))}
        </group>
    );
}
