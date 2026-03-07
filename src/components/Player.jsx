import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

// --- GRAPHICS PRINCIPLE 3 & 5: CAMERA AND USER INTERACTION ---
// Defines a First-Person perspective camera controlled actively by Mouse Data (PointerLock) and Keyboard Inputs (WASD).
const SPEED = 8;

export default function Player() {
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3();
    const sideVector = new THREE.Vector3();

    useFrame((state, delta) => {
        const { forward, backward, left, right } = getKeys();

        // Calculate movement vector based on keyboard input
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED * delta);

        // Apply movement relative to camera rotation
        camera.translateX(direction.x);
        camera.translateZ(direction.z);

        // Basic Bounds check and height lock
        // Keeping user within the Hub boundaries
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -50, 50);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -50, 50);
        camera.position.y = 1.8; // Average eye height
    });

    return (
        <PointerLockControls />
    );
}
