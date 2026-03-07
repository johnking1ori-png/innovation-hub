import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { createCheckerboardTexture } from '../../utils/textures';

function DeskGroup({ position }) {
    // Wood-like texture representation parametrically via color (Since real wood textures require CDNs)
    return (
        <group position={position}>
            {/* High-end Desk */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 0.1, 2]} />
                <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* Glowing Edge Trim */}
            <mesh position={[0, 0.75, 1.01]}>
                <boxGeometry args={[4, 0.02, 0.02]} />
                <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={1} color="#000" />
            </mesh>

            {/* Legs */}
            <mesh position={[-1.8, 0.375, -0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[1.8, 0.375, -0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[-1.8, 0.375, 0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>
            <mesh position={[1.8, 0.375, 0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#0f172a" /></mesh>

            {/* Chairs (Hierarchical transforms based on the desk origin) */}
            <group position={[0, 0, 1.5]}>
                <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[0.6, 0.1, 0.6]} /><meshStandardMaterial color="#0ea5e9" roughness={0.6} /></mesh>
                <mesh position={[0, 0.9, 0.25]} castShadow><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#0ea5e9" roughness={0.6} /></mesh>
                <mesh position={[0, 0.225, 0]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            </group>
            <group position={[0, 0, -1.5]} rotation={[0, Math.PI, 0]}>
                <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[0.6, 0.1, 0.6]} /><meshStandardMaterial color="#0ea5e9" roughness={0.6} /></mesh>
                <mesh position={[0, 0.9, 0.25]} castShadow><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#0ea5e9" roughness={0.6} /></mesh>
                <mesh position={[0, 0.225, 0]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            </group>

            {/* Floating Holographic Screen */}
            <group position={[0, 1.3, 0]} rotation={[-0.1, 0, 0]}>
                <mesh castShadow>
                    <planeGeometry args={[1.5, 0.8]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <Text position={[0, 0, 0.01]} fontSize={0.1} color="#000">Zuntenium SDK</Text>
            </group>
        </group>
    );
}

export default function Workspace({ position }) {
    // Tile floor texture
    const floorTexture = useMemo(() => createCheckerboardTexture('#cbd5e1', '#94a3b8', 512, 10), []);

    return (
        <group position={position}>
            {/* Section Signage */}
            <Text position={[0, 4.5, 0]} fontSize={0.6} color="#e2e8f0" anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
                The Forge Incubator
            </Text>

            {/* Floor using Checkerboard generated texture */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 15]} />
                <meshStandardMaterial map={floorTexture} roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Desk Groups */}
            <DeskGroup position={[-5, 0, -3]} />
            <DeskGroup position={[5, 0, -3]} />
            <DeskGroup position={[-5, 0, 3]} />
            <DeskGroup position={[5, 0, 3]} />
        </group>
    );
}
