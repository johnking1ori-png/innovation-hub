import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { createNoiseTexture } from '../../utils/textures';

export default function Classroom({ position }) {
    // Noise texture simulating a soft carpet
    const carpetTexture = useMemo(() => createNoiseTexture('#14532d', 15), []);

    return (
        <group position={position}>
            {/* Floating Header */}
            <Text position={[0, 5, -8]} fontSize={0.8} color="#d1fae5" anchorX="center">
                Smart Classroom
            </Text>

            {/* Carpet Floor */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[15, 20]} />
                <meshStandardMaterial map={carpetTexture} roughness={1.0} metalness={0} />
            </mesh>

            {/* Ceiling and Walls */}
            <mesh position={[-7.5, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 20.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 2.5, -10]} castShadow receiveShadow><boxGeometry args={[15.2, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 2.5, 10]} castShadow receiveShadow><boxGeometry args={[15.2, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Right Wall with doorway connecting to Left Cross-Corridor */}
            <mesh position={[7.5, 2.5, -6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[7.5, 2.5, 6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[7.5, 4.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 1, 4]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Ceiling */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[15.2, 0.2, 20.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>

            {/* Smartboard — Glowing Emissive projection screen with emerald theme */}
            <group position={[0, 2.5, -9.8]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[10, 4, 0.2]} />
                    <meshStandardMaterial color="#000" />
                </mesh>
                {/* Glowing display surface */}
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[9.8, 3.8]} />
                    <meshStandardMaterial emissive="#065f46" emissiveIntensity={0.5} color="#064e3b" />
                </mesh>
                {/* Dynamic content on the board — Machine Learning workflow */}
                <Text position={[0, 1, 0.12]} fontSize={0.3} color="#6ee7b7">Machine Learning Pipeline</Text>
                <Text position={[0, 0, 0.12]} fontSize={0.2} color="#a7f3d0" maxWidth={8} textAlign="center">
                    {`1. Define the Problem\n2. Collect & Label Data\n3. Train the Neural Network\n4. Evaluate & Deploy Model`}
                </Text>
            </group>

            {/* Instructor Desk */}
            <mesh position={[0, 0.75, -7]} castShadow receiveShadow>
                <boxGeometry args={[4, 1.5, 1]} />
                <meshStandardMaterial color="#071a12" roughness={0.2} metalness={0.6} />
            </mesh>
            {/* Emerald Emissive Strip */}
            <mesh position={[0, 1.4, -6.49]}>
                <boxGeometry args={[4, 0.1, 0.02]} />
                <meshStandardMaterial emissive="#10b981" emissiveIntensity={1} color="#000" />
            </mesh>

            {/* Student Desks — 4 rows, 3 columns */}
            {[...Array(4)].map((_, row) => (
                <group key={row} position={[0, 0, -3 + row * 4]}>
                    {[...Array(3)].map((_, col) => (
                        <group key={col} position={[-4 + col * 4, 0, 0]}>
                            {/* Desk Surface — glass/metallic clearcoat */}
                            <mesh position={[0, 0.75, 0]} castShadow>
                                <boxGeometry args={[3, 0.1, 1]} />
                                <meshPhysicalMaterial color="#1a2e1e" roughness={0.1} metalness={0.8} clearcoat={1} clearcoatRoughness={0.1} />
                            </mesh>
                            {/* Desk Modesty Panel */}
                            <mesh position={[0, 0.375, -0.45]}><boxGeometry args={[2.8, 0.75, 0.1]} /><meshStandardMaterial color="#071a12" /></mesh>
                            {/* Emerald Stool seat */}
                            <mesh position={[0, 0.45, 1]}><boxGeometry args={[0.5, 0.1, 0.5]} /><meshStandardMaterial color="#10b981" roughness={0.5} /></mesh>
                            {/* Stool Post */}
                            <mesh position={[0, 0.225, 1]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#111" metalness={0.9} /></mesh>
                        </group>
                    ))}
                </group>
            ))}
        </group>
    );
}
