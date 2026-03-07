import React from 'react';
import Outdoors from './Outdoors';
import Reception from './Reception';
import AILab from './AILab';
import Workspace from './Workspace';
import Classroom from './Classroom';
import Drone from '../Objects/Drone';

export default function Hub() {
    return (
        <group>
            {/* Overall Outdoor land */}
            <Outdoors />

            {/* The NPC Drone patrolling the main entrance/reception area */}
            <Drone position={[0, 2, 8]} boundaryPathRadius={6} />

            {/* Building Rooms arranged in a clear layout */}
            <Reception position={[0, 0, 0]} />
            <AILab position={[-20, 0, -2.5]} />
            <Workspace position={[20, 0, -2.5]} />
            <Classroom position={[0, 0, -20]} />

            {/* Hallways with glowing edge lighting (Neon aesthetics) */}

            {/* Left Hallway to AI Lab */}
            <group position={[-12.5, 0, -2.5]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[5, 4]} />
                    <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.5} />
                </mesh>
                {/* Neon Floor Strips */}
                <mesh position={[0, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5, 0.1]} /><meshBasicMaterial color="#3b82f6" /></mesh>
                <mesh position={[0, 0.02, -1.8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5, 0.1]} /><meshBasicMaterial color="#3b82f6" /></mesh>
            </group>

            {/* Right Hallway to Workspace */}
            <group position={[12.5, 0, -2.5]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[5, 4]} />
                    <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.5} />
                </mesh>
                <mesh position={[0, 0.02, 1.8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5, 0.1]} /><meshBasicMaterial color="#3b82f6" /></mesh>
                <mesh position={[0, 0.02, -1.8]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[5, 0.1]} /><meshBasicMaterial color="#3b82f6" /></mesh>
            </group>

            {/* Center Hallway to Classroom */}
            <group position={[0, 0, -10]}>
                <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 10]} />
                    <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.5} />
                </mesh>
                <mesh position={[1.8, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}><planeGeometry args={[10, 0.1]} /><meshBasicMaterial color="#a855f7" /></mesh>
                <mesh position={[-1.8, 0.02, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}><planeGeometry args={[10, 0.1]} /><meshBasicMaterial color="#a855f7" /></mesh>
            </group>

        </group>
    );
}
