import React, { useMemo } from 'react';
import { Sparkles, Text } from '@react-three/drei';
import { createNoiseTexture } from '../../utils/textures';

function Tree({ position }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.2, 0.3, 3]} />
                <meshStandardMaterial color="#291c14" roughness={0.9} />
            </mesh>
            {/* Sci-Fi Floating Leaves */}
            <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
                <octahedronGeometry args={[1.5, 1]} />
                {/* Semi-transparent quantum leaves */}
                <meshPhysicalMaterial color="#3b82f6" transmission={0.9} opacity={1} roughness={0.2} ior={1.3} thickness={0.5} />
            </mesh>

            {/* Internal Core of tree for glow */}
            <mesh position={[0, 3.5, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={2} color="#000" />
            </mesh>
        </group>
    );
}

export default function Outdoors() {
    const grassTexture = useMemo(() => createNoiseTexture('#064e3b', 20, 1024), []);
    const concreteTexture = useMemo(() => createNoiseTexture('#334155', 10, 512), []);

    return (
        <group>
            {/* Base Ground Plane (Grass texture) */}
            <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial map={grassTexture} roughness={1} />
            </mesh>

            {/* Floating Campus Sign */}
            <Text position={[0, 6, 22]} fontSize={1} color="#fff" anchorX="center" outlineWidth={0.02} outlineColor="#000">
                KHU Innovation Hub
            </Text>

            {/* Walkway leading to the entrance */}
            <mesh position={[0, 0.01, 15]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6, 22]} />
                <meshStandardMaterial map={concreteTexture} roughness={0.9} />
            </mesh>

            {/* Beautiful ambient particles over the walkway */}
            <Sparkles position={[0, 2, 15]} scale={[8, 4, 20]} count={150} size={4} speed={0.2} opacity={0.5} color="#60a5fa" />

            {/* Decorative Sci-Fi Cyber Trees along walkway */}
            <Tree position={[-5, 0, 8]} />
            <Tree position={[5, 0, 10]} />
            <Tree position={[-6, 0, 14]} />
            <Tree position={[6, 0, 18]} />
            <Tree position={[-5, 0, 20]} />
        </group>
    );
}
