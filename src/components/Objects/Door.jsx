import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- GRAPHICS PRINCIPLE 4 & 5: ANIMATION & USER INTERACTION ---
// Demonstrates raycasted interaction triggering a translation matrix update over time.
export default function Door({ position, rotation = [0, 0, 0], args = [3, 4, 0.2] }) {
    const [isOpen, setIsOpen] = useState(false);
    const meshRef = useRef();

    useFrame((state, delta) => {
        // --- GRAPHICS PRINCIPLE 1: 3D TRANSFORMATIONS (Translation) ---
        // Sliding door logic: linearly interpolates the X-coordinate transformation matrix
        const targetX = isOpen ? args[0] * 0.9 : 0;
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, delta * 3);
    });

    return (
        <group position={position} rotation={rotation}>
            {/* The door panel */}
            <mesh
                position={[0, args[1] / 2, 0]}
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                castShadow
                receiveShadow
            >
                <boxGeometry args={args} />
                {/* --- GRAPHICS PRINCIPLE 2: LIGHTING AND SHADING --- */}
                {/* MeshPhongMaterial for glossy specular highlights (visible glass effect) */}
                <meshPhongMaterial
                    color={isOpen ? "#4ade80" : "#6ee7b7"}
                    shininess={100}
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </group>
    );
}
