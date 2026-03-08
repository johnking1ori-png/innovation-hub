import React, { useMemo } from 'react';
import { Sparkles, Text } from '@react-three/drei';
import { createNoiseTexture } from '../../utils/textures';

// Stylized organic tree with amber glass canopy
function Tree({ position }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.3, 3]} />
                <meshStandardMaterial color="#3b1f0e" roughness={0.9} />
            </mesh>
            {/* Organic Floating Canopy — amber glass */}
            <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
                <octahedronGeometry args={[1.5, 1]} />
                {/* Semi-transparent amber foliage */}
                <meshPhysicalMaterial color="#f59e0b" transmission={0.88} opacity={1} roughness={0.15} ior={1.3} thickness={0.5} />
            </mesh>
            {/* Glowing amber core for warm backlighting */}
            <mesh position={[0, 3.5, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial emissive="#f59e0b" emissiveIntensity={2} color="#000" />
            </mesh>
        </group>
    );
}

export default function Outdoors() {
    // Rich forest green grass
    const grassTexture = useMemo(() => createNoiseTexture('#14532d', 20, 512), []);
    // Warm stone walkway
    const concreteTexture = useMemo(() => createNoiseTexture('#292524', 10, 256), []);

    return (
        <group>
            {/* Base Ground Plane — lush green grass texture */}
            <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial map={grassTexture} roughness={1} />
            </mesh>

            {/* Floating Campus Sign */}
            <Text position={[0, 6, 22]} fontSize={1} color="#fde68a" anchorX="center" outlineWidth={0.02} outlineColor="#000">
                NexusPoint Learning Campus
            </Text>

            {/* Walkway leading to the entrance */}
            <mesh position={[0, 0.01, 15]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6, 22]} />
                <meshStandardMaterial map={concreteTexture} roughness={0.9} />
            </mesh>

            {/* Warm golden ambient particles floating over the walkway */}
            <Sparkles position={[0, 2, 15]} scale={[8, 4, 20]} count={50} size={4} speed={0.2} opacity={0.5} color="#fde68a" />

            {/* Amber-canopy Cyber Trees along walkway */}
            <Tree position={[-5, 0, 8]} />
            <Tree position={[5, 0, 10]} />
            <Tree position={[-6, 0, 14]} />
            <Tree position={[6, 0, 18]} />
            <Tree position={[-5, 0, 20]} />
        </group>
    );
}
