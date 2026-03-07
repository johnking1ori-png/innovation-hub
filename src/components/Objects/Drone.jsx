import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- GRAPHICS PRINCIPLE 4: ANIMATION (Moving Avatar/NPC) ---
// Demonstrates Trigonometric Transformation updates over time.
export default function Drone({ position = [0, 2, 0], boundaryPathRadius = 5 }) {
    const groupRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // --- GRAPHICS PRINCIPLE 1: 3D TRANSFORMATIONS (Translation & Rotation) ---
        // Complex animation combining periodic translation (patrolling in a circle)
        // and rotation (hovering bob via Sine waves).
        if (groupRef.current) {
            groupRef.current.position.x = position[0] + Math.cos(time * 0.5) * boundaryPathRadius;
            groupRef.current.position.z = position[2] + Math.sin(time * 0.5) * boundaryPathRadius;
            groupRef.current.position.y = position[1] + Math.sin(time * 3) * 0.2; // Hover bob

            // Face direction of travel
            groupRef.current.rotation.y = -(time * 0.5);
        }
    });

    return (
        // Hierarchical modeling root for the Drone
        <group ref={groupRef}>
            {/* Drone Core */}
            {/* --- GRAPHICS PRINCIPLE 2: LIGHTING AND SHADING --- */}
            {/* Uses MeshPhysicalMaterial for clearcoat reflection */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshPhysicalMaterial
                    color="#e2e8f0"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1.0}
                />
            </mesh>

            {/* Glowing Eye */}
            <mesh position={[0, 0.1, 0.25]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial emissive="#3b82f6" emissiveIntensity={3} color="#000" />
            </mesh>

            {/* Rotors */}
            {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
                <group key={i} position={[x * 0.4, 0.1, z * 0.4]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.02, 0.02, 0.1]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh position={[0, 0.05, 0]}>
                        {/* Use basic material for rotors to simulate motion blur unlit */}
                        <cylinderGeometry args={[0.15, 0.15, 0.01]} />
                        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
