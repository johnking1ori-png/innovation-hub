import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Demonstrates Animation (rotation over time) and Hierarchical Modeling (base + rotating lens)
export default function SecurityCamera({ position, rotation }) {
    const headRef = useRef();

    useFrame((state) => {
        // Oscillate rotation using sine wave
        const time = state.clock.getElapsedTime();
        if (headRef.current) {
            headRef.current.rotation.y = Math.sin(time) * 0.8; // Rotate back and forth 45 degrees
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Base mounted to wall or ceiling */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.4, 0.3]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Rotating Head */}
            <group position={[0, -0.3, 0]} ref={headRef}>
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
                {/* Lens */}
                <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.2]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Red recording light */}
                <mesh position={[0, 0.1, 0.15]}>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshBasicMaterial color="#ef4444" />
                </mesh>
            </group>
        </group>
    );
}
