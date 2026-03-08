import React, { useState, useMemo, useRef } from 'react';
import { Text, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Door from '../Objects/Door';
import SecurityCamera from '../Objects/SecurityCamera';
import { createGridTexture } from '../../utils/textures';

// Hologram logo — rotating NexusPoint brand in emerald
function HologramLogo({ position }) {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.rotation.y += 0.01;
    });
    return (
        <group position={position} ref={ref}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Text
                    fontSize={0.8}
                    color="#10b981"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#065f46"
                >
                    NEXUSPOINT
                </Text>
            </Float>
        </group>
    );
}

// Reception Room
export default function Reception({ position }) {
    const [lightsOn, setLightsOn] = useState(true);

    // Procedural grid texture: dark forest green tones for a premium feel
    const floorTexture = useMemo(() => createGridTexture('#071a0f', '#0f2d1a', 1024, 20), []);

    return (
        <group position={position}>
            {/* Room Floor with Texture Mapping */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 10]} />
                <meshStandardMaterial map={floorTexture} roughness={0.1} metalness={0.8} />
            </mesh>

            {/* Hologram Logo over desk */}
            <HologramLogo position={[0, 2.8, -2]} />

            {/* Reception Desk — Hierarchical Modeling */}
            <group position={[0, 0, -2]}>
                {/* Main desk base */}
                <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                    <boxGeometry args={[6, 1.2, 1.5]} />
                    <meshPhysicalMaterial color="#0f2d1a" roughness={0.6} clearcoat={1.0} />
                </mesh>
                {/* Glowing Emerald Edge */}
                <mesh position={[0, 1.2, 0.76]}>
                    <boxGeometry args={[6, 0.05, 0.05]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                {/* Glass Desk top */}
                <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
                    <boxGeometry args={[6.2, 0.1, 1.7]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.3}
                        metalness={0.2}
                        roughness={0.1}
                    />
                </mesh>
                {/* Computer on the desk */}
                <group position={[1.5, 1.3, -0.2]} rotation={[0, -0.3, 0]}>
                    <mesh position={[0, 0.1, 0]}><boxGeometry args={[0.4, 0.05, 0.4]} /><meshStandardMaterial color="#1a2e1a" /></mesh>
                    <mesh position={[0, 0.3, -0.1]}><boxGeometry args={[0.1, 0.4, 0.05]} /><meshStandardMaterial color="#1a2e1a" /></mesh>
                    <mesh position={[0, 0.6, 0]}>
                        <boxGeometry args={[1.2, 0.8, 0.05]} />
                        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.8} /> {/* Glossy screen */}
                    </mesh>
                </group>
            </group>

            {/* Interactive Light Switch */}
            <mesh
                position={[-9.8, 1.5, 4]}
                onClick={(e) => { e.stopPropagation(); setLightsOn(!lightsOn); }}
            >
                <boxGeometry args={[0.1, 0.3, 0.2]} />
                <meshStandardMaterial color={lightsOn ? "#4ade80" : "#f87171"} emissive={lightsOn ? "#4ade80" : "#f87171"} emissiveIntensity={2} />
            </mesh>
            {/* Switch Label */}
            <Text position={[-9.7, 1.8, 4]} rotation={[0, Math.PI / 2, 0]} fontSize={0.2} color="#fff">Lights</Text>

            {/* Warm point lights — conditionally on */}
            {lightsOn && (
                <>
                    <pointLight position={[-5, 4, 0]} color="#fff8e1" intensity={1.5} distance={15} castShadow />
                    <pointLight position={[5, 4, 0]} color="#fff8e1" intensity={1.5} distance={15} castShadow />
                </>
            )}

            {/* Dark forest-green Walls */}
            {/* Back Wall — Split into two pieces to create a 4-unit wide open doorway in the center to access the rest of the campus */}
            <mesh position={[-6, 2.5, -5]} castShadow receiveShadow><boxGeometry args={[8, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[6, 2.5, -5]} castShadow receiveShadow><boxGeometry args={[8, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Header above doorway */}
            <mesh position={[0, 4.5, -5]} castShadow receiveShadow><boxGeometry args={[4, 1, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[-6.5, 2.5, 5]} castShadow receiveShadow><boxGeometry args={[7, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[6.5, 2.5, 5]} castShadow receiveShadow><boxGeometry args={[7, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 4.5, 5]} castShadow receiveShadow><boxGeometry args={[6, 1, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>

            {/* Ceiling and Side Walls */}
            <mesh position={[-10, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 10.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[10, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 10.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[20.2, 0.2, 10.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>

            {/* Entrance Sliding Door */}
            <Door position={[0, 0, 5]} args={[6, 4, 0.1]} />

            {/* Security Camera near entrance */}
            <SecurityCamera position={[9, 4, 4]} rotation={[0, Math.PI / 4, 0]} />
        </group>
    );
}
