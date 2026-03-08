import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { createCheckerboardTexture } from '../../utils/textures';

// A collaborative workspace desk pod with amber chairs
function DeskGroup({ position }) {
    return (
        <group position={position}>
            {/* High-end Desk surface */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
                <boxGeometry args={[4, 0.1, 2]} />
                <meshStandardMaterial color="#1a2e1e" roughness={0.3} metalness={0.2} />
            </mesh>
            {/* Glowing Emerald Edge Trim */}
            <mesh position={[0, 0.75, 1.01]}>
                <boxGeometry args={[4, 0.02, 0.02]} />
                <meshStandardMaterial emissive="#10b981" emissiveIntensity={1} color="#000" />
            </mesh>

            {/* Legs */}
            <mesh position={[-1.8, 0.375, -0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#071a12" /></mesh>
            <mesh position={[1.8, 0.375, -0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#071a12" /></mesh>
            <mesh position={[-1.8, 0.375, 0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#071a12" /></mesh>
            <mesh position={[1.8, 0.375, 0.8]}><boxGeometry args={[0.1, 0.75, 0.1]} /><meshStandardMaterial color="#071a12" /></mesh>

            {/* Chairs — Hierarchical transforms based on the desk origin */}
            <group position={[0, 0, 1.5]}>
                {/* Amber seat */}
                <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[0.6, 0.1, 0.6]} /><meshStandardMaterial color="#f59e0b" roughness={0.6} /></mesh>
                {/* Amber back */}
                <mesh position={[0, 0.9, 0.25]} castShadow><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#f59e0b" roughness={0.6} /></mesh>
                {/* Standard black post */}
                <mesh position={[0, 0.225, 0]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            </group>
            <group position={[0, 0, -1.5]} rotation={[0, Math.PI, 0]}>
                <mesh position={[0, 0.45, 0]} castShadow><boxGeometry args={[0.6, 0.1, 0.6]} /><meshStandardMaterial color="#f59e0b" roughness={0.6} /></mesh>
                <mesh position={[0, 0.9, 0.25]} castShadow><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#f59e0b" roughness={0.6} /></mesh>
                <mesh position={[0, 0.225, 0]}><cylinderGeometry args={[0.05, 0.05, 0.45]} /><meshStandardMaterial color="#1e293b" metalness={0.8} /></mesh>
            </group>

            {/* Collaborative Screen on desk */}
            <group position={[0, 1.3, 0]} rotation={[-0.1, 0, 0]}>
                <mesh castShadow>
                    <planeGeometry args={[1.5, 0.8]} />
                    <meshStandardMaterial color="#fff" />
                </mesh>
                <Text position={[0, 0, 0.01]} fontSize={0.1} color="#000">NexusPoint Collab</Text>
            </group>
        </group>
    );
}

export default function Workspace({ position }) {
    // Light emerald tile floor texture
    const floorTexture = useMemo(() => createCheckerboardTexture('#d1fae5', '#a7f3d0', 512, 10), []);

    return (
        <group position={position}>
            {/* Section Signage */}
            <Text position={[0, 4.5, 0]} fontSize={0.6} color="#d1fae5" anchorX="center" rotation={[0, -Math.PI / 2, 0]}>
                Collaborative Workspace
            </Text>

            {/* Floor using emerald Checkerboard generated texture */}
            <mesh receiveShadow position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[20, 15]} />
                <meshStandardMaterial map={floorTexture} roughness={0.8} metalness={0.1} />
            </mesh>

            {/* Ceiling and Walls */}
            <mesh position={[-10, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[10, 2.5, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 2.5, -7.5]} castShadow receiveShadow><boxGeometry args={[20.2, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Front Wall with doorway connecting to Right Cross-Corridor */}
            <mesh position={[-6, 2.5, 7.5]} castShadow receiveShadow><boxGeometry args={[8, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[6, 2.5, 7.5]} castShadow receiveShadow><boxGeometry args={[8, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            <mesh position={[0, 4.5, 7.5]} castShadow receiveShadow><boxGeometry args={[4, 1, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            {/* Ceiling */}
            <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[20.2, 0.2, 15.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>

            {/* Desk Groups */}
            <DeskGroup position={[-5, 0, -3]} />
            <DeskGroup position={[5, 0, -3]} />
            <DeskGroup position={[-5, 0, 3]} />
            <DeskGroup position={[5, 0, 3]} />
        </group>
    );
}
