import React from 'react';
import Outdoors from './Outdoors';
import Reception from './Reception';
import AILab from './AILab';
import Workspace from './Workspace';
import Classroom from './Classroom';
import Drone from '../Objects/Drone';

/**
 * PERFECT GRID LAYOUT — T-Junction Concept
 *
 *                [AI Lab]
 *               (0,0,-32.5)
 *                    |
 *              [Center Hall]                
 *            (z: -15 to -25)
 *                    |
 * [Classroom]--[Cross Hall]--[Workspace]
 *(-29.5,0,-15)       |       (32,0,-15)
 *                    |
 *              [Center Hall] 
 *             (z: -5 to -15)
 *                    |
 *               [Reception] 
 *                 (0,0,0)
 */
export default function Hub() {
    return (
        <group>
            {/* Campus Grounds */}
            <Outdoors />

            {/* Drone patrolling entrance */}
            <Drone position={[0, 2, 8]} boundaryPathRadius={6} />

            {/* === ROOMS === */}
            {/* Front: Reception (Depth: 10, extends Z: -5 to +5) */}
            <Reception position={[0, 0, 0]} />

            {/* Back: AI Lab (Depth: 15, extends Z: -25 to -40) */}
            <AILab position={[0, 0, -32.5]} />

            {/* Left: Classroom (Width: 15, extends X: -22 to -37, Z centered at -15) */}
            <Classroom position={[-29.5, 0, -15]} />

            {/* Right: Workspace (Width: 15 after rotation, extends X: 22 to 37, Z centered at -15) */}
            {/* (Note: Workspace is rotated 90 degrees so the entrance faces the hallway on the left) */}
            <group position={[29.5, 0, -15]} rotation={[0, -Math.PI / 2, 0]}>
                <Workspace position={[0, 0, 0]} />
            </group>

            {/* === HALLWAYS (Axis-Aligned for seamless joining) === */}

            {/* Primary Center Corridor (From Reception Z=-5 to AILab Z=-25) - Total Length 20 */}
            <group position={[0, 0, -15]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 20]} />
                    <meshStandardMaterial color="#1a2e1e" roughness={0.2} metalness={0.4} />
                </mesh>
                {/* Amber neon strips on center corridor */}
                <mesh position={[1.9, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#f59e0b" />
                </mesh>
                <mesh position={[-1.9, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#f59e0b" />
                </mesh>
                {/* Walls and Ceiling for Center Corridor */}
                {/* Left Wall Segment 1 (Z=-5 to Z=-13) */}
                <mesh position={[-2, 2.5, 6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Left Wall Segment 2 (Z=-17 to Z=-25) */}
                <mesh position={[-2, 2.5, -6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Right Wall Segment 1 */}
                <mesh position={[2, 2.5, 6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Right Wall Segment 2 */}
                <mesh position={[2, 2.5, -6]} castShadow receiveShadow><boxGeometry args={[0.2, 5, 8]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[4.2, 0.2, 20]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            </group>

            {/* Left Cross-Corridor (From center X=-2 to Classroom X=-22) - Length 20 */}
            <group position={[-12, 0, -15]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 4]} />
                    <meshStandardMaterial color="#1a2e1e" roughness={0.2} metalness={0.4} />
                </mesh>
                {/* Emerald neon strips */}
                <mesh position={[0, 0.02, 1.9]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                <mesh position={[0, 0.02, -1.9]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                {/* Walls and Ceiling for Left Corridor */}
                {/* Front Wall */}
                <mesh position={[0, 2.5, 2]} castShadow receiveShadow><boxGeometry args={[20, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Back Wall */}
                <mesh position={[0, 2.5, -2]} castShadow receiveShadow><boxGeometry args={[20, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[20, 0.2, 4.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            </group>

            {/* Right Cross-Corridor (From center X=2 to Workspace X=22) - Length 20 */}
            <group position={[12, 0, -15]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 4]} />
                    <meshStandardMaterial color="#1a2e1e" roughness={0.2} metalness={0.4} />
                </mesh>
                {/* Emerald neon strips */}
                <mesh position={[0, 0.02, 1.9]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                <mesh position={[0, 0.02, -1.9]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 0.1]} />
                    <meshBasicMaterial color="#10b981" />
                </mesh>
                {/* Walls and Ceiling for Right Corridor */}
                {/* Front Wall */}
                <mesh position={[0, 2.5, 2]} castShadow receiveShadow><boxGeometry args={[20, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Back Wall */}
                <mesh position={[0, 2.5, -2]} castShadow receiveShadow><boxGeometry args={[20, 5, 0.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
                {/* Ceiling */}
                <mesh position={[0, 5, 0]} castShadow receiveShadow><boxGeometry args={[20, 0.2, 4.2]} /><meshStandardMaterial color="#071a12" roughness={0.8} /></mesh>
            </group>
        </group>
    );
}
