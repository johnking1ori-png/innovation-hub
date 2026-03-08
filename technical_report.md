# Technical Report: NexusPoint Innovation & Learning Hub
### Interactive 3D Virtual Environment — Computer Graphics Assignment

---

## 1. Introduction

This report documents the design and implementation of an interactive 3D virtual model of the **NexusPoint Innovation and Learning Hub**, developed using **Three.js** (via **React Three Fiber** and **@react-three/drei**) and rendered in a WebGL-powered browser application. The project simulates a multi-room educational and innovation facility, allowing the user to explore five distinct spaces: a Reception Area, an AI & Cybersecurity Lab, a Collaborative Workspace, a Smart Classroom, and an Outdoor Campus Environment.

The primary goal of this project is to demonstrate a comprehensive set of Computer Graphics principles including 3D transformations, lighting and shading models, camera projection techniques, keyframe and procedural animation, user interaction, and advanced rendering techniques such as shadow mapping, texture mapping, and depth testing.

The application is hosted as a web application and runs entirely in the browser with no server-side rendering dependency.

---

## 2. System Architecture

The application is structured as a **component-based React application** built on top of `@react-three/fiber`, a React renderer for Three.js. The architecture follows a clear hierarchical decomposition:

```
App.jsx                    ← Root scene: Canvas, Camera, Lights, Environment
│
├── Overlay.jsx            ← HTML UI layer (branding, HUD, crosshair, projection toggle)
│
└── Hub.jsx                ← Scene graph root (Orthogonal T-Junction Grid Layout)
    ├── Center/Cross Halls ← connecting corridors (fully enclosed walls/ceilings)
    ├── Outdoors.jsx       ← Ground, walkways, trees, environmental sparkles
    ├── Reception.jsx      ← Front entrance (doorway cut into back wall)
    ├── AILab.jsx          ← Back centerpiece (Deep Z-axis endpoint)
    ├── Workspace.jsx      ← Right wing pod (rotated exactly 90 degrees)
    ├── Classroom.jsx      ← Left wing pod
    ├── Drone.jsx          ← Patrolling NPC drone (animated, 16-segment optimization)
    ├── Door.jsx           ← Sliding entrance door (interactive)
    └── SecurityCamera.jsx ← Oscillating surveillance camera (animated)
```

**State Management:** A lightweight `zustand` store (`store.js`) holds the `isPerspective` boolean flag that controls the active camera projection mode.

**Player Controller:** The `Player.jsx` component couples `PointerLockControls` with `useKeyboardControls` to deliver a first-person walkthrough experience.

**Texture System:** All textures are procedurally generated at runtime via Canvas 2D API in `utils/textures.js`, eliminating any external CDN dependency.

---

## 3. Graphics Pipeline Implementation

### 3.1 Rendering Pipeline Overview

The application leverages WebGL's forward rendering pipeline via Three.js:

1. **Scene Graph Construction:** All geometry, lights, and materials are organized in a hierarchical Three.js `Group` tree, which maps directly to the model transformation stack.
2. **Vertex Processing:** Position, normal, and UV data are passed to WebGL vertex shaders. Three.js handles the Model-View-Projection (MVP) matrix computation automatically based on declared transforms.
3. **Fragment Processing:** Fragment shaders compute the final pixel color using the Phong/PBR lighting model, sampling textures and applying emissive/reflective contributions.
4. **Depth Testing:** `shadows` is enabled on the `<Canvas>` component, which activates the WebGL depth buffer (`gl.DEPTH_TEST`). This ensures correct occlusion between all opaque geometry.
5. **Output Merge:** Blending is applied for transparent materials (glass doors, drone rotors, tree canopies), respecting draw order.

---

## 4. Mathematical Transformations

All 3D objects are placed and animated using the standard affine transformation matrices applied via Three.js's scene graph:

### 4.1 Translation
Objects are positioned using `position={[x, y, z]}` which internally applies a translation matrix:

$$T = \begin{bmatrix} 1 & 0 & 0 & t_x \\ 0 & 1 & 0 & t_y \\ 0 & 0 & 1 & t_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

The sliding door uses `THREE.MathUtils.lerp()` on the X-coordinate each frame:
```js
meshRef.current.position.x = THREE.MathUtils.lerp(current, targetX, delta * 3);
```

### 4.2 Rotation
The security camera head oscillates using a sine-driven rotation:
```js
headRef.current.rotation.y = Math.sin(time) * 0.8;
```

The drone faces its direction of travel:
```js
groupRef.current.rotation.y = -(time * 0.5);
```

Rotation is applied as:
$$R_y(\theta) = \begin{bmatrix} \cos\theta & 0 & \sin\theta & 0 \\ 0 & 1 & 0 & 0 \\ -\sin\theta & 0 & \cos\theta & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### 4.3 Scaling
Scaling is applied to room geometry (e.g., `<boxGeometry args={[20, 10, 0.2]} />`) which defines the local scale of each object relative to its group's origin.

### 4.4 Hierarchical Transforms (Model Matrix Composition)
All rooms are children of `Hub.jsx`. The chair group inside `DeskGroup` is expressed relative to the desk's local origin. The drone's rotors are children of the drone body group. This composes transformation matrices as:

$$M_{world} = M_{parent} \cdot M_{local}$$

This means moving a desk automatically repositions all chairs and screens attached to it — a core principle of **hierarchical scene graph modeling**. This principle was crucial in the **Orthogonal T-Junction Layout**, allowing the Workspace (a complex 20x15 model) to be rotated exactly by `-Math.PI / 2` and translated to `X = 29.5` in `Hub.jsx` while perfectly preserving the intricate internal placement of its desks and chairs.

### 4.5 Drone Circular Path (Trigonometric Translation)
The drone patrols in a circle using parametric equations updated each frame:
```js
x = origin_x + cos(t * 0.5) * radius
z = origin_z + sin(t * 0.5) * radius
y = origin_y + sin(t * 3) * 0.2   // hover bob
```

---

## 5. Lighting and Shading

### 5.1 Lighting Sources

| Light | Type | Role |
|---|---|---|
| `ambientLight` | Ambient | Base fill illumination, warm `#fff8e1`, no shadows |
| `directionalLight` | Directional | Primary sun-like source with shadow map enabled |
| `pointLight` (Reception) | Point | Warm interior glow, toggleable by user |
| `pointLight` (AI Lab) | Point | Cyan glow for the central AI Core object |

### 5.2 Shading Models

**Phong Shading (`meshPhongMaterial`):** Used on the sliding door. Computes per-fragment specular highlights using the Phong reflection model:

$$I = k_a I_a + k_d (L \cdot N) I_d + k_s (R \cdot V)^n I_s$$

The `shininess` parameter directly controls the specular exponent `n`, producing a glass-like highlight on the door panel.

**Gouraud-approximating Standard Shading (`meshStandardMaterial`):** Used on walls, floors, desks. Implements the PBR metalness/roughness workflow — a physically-based generalization of Gouraud shading computed per-vertex then interpolated.

**Physical Shading (`meshPhysicalMaterial`):** Used on the glass desk top and drone body. Adds `clearcoat` for a secondary Fresnel-based specular layer, simulating lacquered or coated surfaces.

**Emissive Unlit (`meshBasicMaterial`):** Used on neon floor strips, drone rotors, and indicator lights. These surfaces emit color without receiving or casting light, simulating self-illuminating components.

### 5.3 Shadow Implementation

Shadow mapping is implemented via a `directionalLight` with `castShadow`:
```jsx
<directionalLight castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0005}>
  <orthographicCamera attach="shadow-camera" args={[-40, 40, 40, -40]} />
</directionalLight>
```

The shadow camera uses an orthographic frustum because directional light rays are parallel. All opaque meshes carry `castShadow` and/or `receiveShadow` flags, enabling depth comparison in the shadow pass.

---

## 6. Camera and Projection

### 6.1 Perspective Projection
The default camera uses a perspective frustum:
```jsx
<PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} near={0.1} far={1000} />
```
This applies the perspective divide: $x' = x/z$, producing a natural vanishing-point view that simulates human eye optics. FOV of 60° balances realism with spatial comfort.

### 6.2 Orthographic Projection
Toggling the projection switches to:
```jsx
<OrthographicCamera makeDefault position={[0, 20, 8]} zoom={40} near={0.1} far={1000} />
```
In orthographic mode, parallel lines remain parallel — all depth cues from perspective foreshortening are eliminated. This mode is commonly used in architectural and technical drawing applications.

The toggle is controlled via a `zustand` state flag and accessible from the HUD button during walkthrough.

### 6.3 First-Person Walkthrough (Interactive Camera)
`PointerLockControls` locks the mouse cursor and maps mouse movement to Euler rotations on the camera's orientation. Keyboard WASD input is mapped via `useKeyboardControls`, then projected onto the camera's local forward/right vectors:
```js
camera.translateX(direction.x);
camera.translateZ(direction.z);
camera.position.y = 1.8; // Eye height locked
```

---

## 7. Animation

Two primary animated components are implemented using `useFrame`, which is called each render tick:

### 7.1 Patrol Drone (Moving NPC Avatar)
The drone executes a continuous circular flight path around the reception entrance. Position updates are driven by time-based trigonometry, and the drone's yaw continuously tracks its direction of travel. A subtle sine-wave bob adds realism.

### 7.2 Rotating Security Camera (Oscillating Mechanism)
The camera head rotates around the Y-axis using `Math.sin(time)`, producing a ±45° sweep patrol motion. The head mesh is a child of the base group, demonstrating hierarchical animation — only the child rotates, the base stays fixed.

### 7.3 Hologram Logo (Continuous Rotation)
The `NEXUSPOINT` hologram over the reception desk applies `rotation.y += 0.01` per frame wrapped in a `<Float>` component for additional procedural floating offset.

### 7.4 Sliding Door (Event-Triggered Animation)
On click, the door transitions from closed (X=0) to open (X = width × 0.9) using linear interpolation per frame until the target is reached. This is a state-machine driven timed translation.

---

## 8. User Interaction

| Action | Method | Effect |
|---|---|---|
| Click canvas | PointerLock API | Enters first-person mode |
| WASD / Arrow keys | `useKeyboardControls` | Walks through the scene |
| Mouse movement | `PointerLockControls` | Rotates camera view |
| Click door | Three.js raycaster onClick | Toggles door open/close |
| Click light switch | Three.js raycaster onClick | Toggles reception lights on/off |
| HUD button | React state + zustand | Switches perspective/orthographic camera |
| ESC key | Browser PointerLock API | Releases cursor lock |

---

## 9. Texture Mapping

All textures are generated procedurally using the Canvas 2D API and converted to `THREE.CanvasTexture`:

| Texture | Algorithm | Applied To |
|---|---|---|
| Grid texture | Filled rectangles with line strokes | Reception floor |
| Checkerboard texture | Alternating filled squares | Workspace floor |
| Noise texture | Per-pixel PRNG RGB offset | Grass, carpet, walkway |

All textures are configured with `RepeatWrapping` for seamless tiling across large surfaces.

---

## 10. Rendering Techniques

### Depth Testing
WebGL's `DEPTH_TEST` is activated via the `shadows` prop on Canvas. Every fragment's Z value is compared against the depth buffer — only the nearest fragment writes to the color buffer. This prevents geometry z-fighting and ensures correct occlusion.

### Shadow Mapping (Bonus)
A two-pass shadow rendering approach is used:
- **Pass 1:** Scene is rendered from the directional light's viewpoint using `orthographicCamera`. Depth values form a shadow map texture.
- **Pass 2:** In the main render pass, each fragment's position is transformed into light space; if its depth exceeds the shadow map lookup value, it is in shadow and receives no diffuse/specular contribution.

### PBR Environment Reflections
The `<Environment preset="forest">` component from `@react-three/drei` loads a pre-filtered HDRI cube map, providing image-based lighting (IBL) for metallic surfaces throughout the scene.

---

## 11. Screenshots

> Screenshots can be captured by the user from the running application at `http://localhost:5173` after running `npm run dev` in the project directory.

Key views to capture:
- **Overhead view** (after toggling Orthographic projection): shows the full floor plan
- **Reception entrance**: hologram, sliding door, security camera
- **AI Lab**: glowing cyan AI core with containment rings
- **Workspace**: amber chairs, emerald desk trims
- **Smart Classroom**: emerald smartboard with ML pipeline content
- **Outdoor campus**: golden sparkle trail, amber-glass trees, campus sign

---

## 12. Challenges and Recommendations

### Challenges Encountered

| Challenge | Resolution |
|---|---|
| Shadow performance (large shadow maps) | Halved shadow-mapSize to `512x512` to save VRAM |
| Expensive `transmission` material (glass trees) | Used `opacity` for desk glass; kept transmission only for tree canopy |
| Pointer lock not available in all browsers | Added graceful fallback overlay when pointer lock is unavailable |
| High polygon fill rate on low-end devices | Capped DPR at 1.2, reduced background stars to 600, outdoor sparkles to 50 |
| Seamless layout without Z-fighting | Engineered a mathematically perfect Orthogonal Grid layout instead of diagonal wings |
| Tying room transitions visually | Added full height walls and ceilings (Y=5) to completely enclose the campus architecture |
| Texture Generation Memory Overhead | Lowered procedural texture resolutions (Grass 512, Concrete 256) |

### Recommendations

1. **GLTF Model Loading:** Replace procedural geometry with pre-authored GLTF models for higher visual fidelity.
2. **Level of Detail (LOD):** Implement Three.js `LOD` groups to swap low-poly versions of distant rooms.
3. **Post-Processing:** Integrate `@react-three/postprocessing` to add bloom on emissive elements and SSAO depth cues.
4. **Physics:** Add a `rapier` or `cannon-es` physics layer via `@react-three/rapier` for collision-aware walkthrough.
5. **Audio:** Spatial audio cues (ambient lab hum, footsteps) would greatly enhance immersion.

---

## 13. Conclusion

The NexusPoint Innovation & Learning Hub successfully demonstrates all six required Computer Graphics principles within an interactive, real-time WebGL application:

1. **3D Modeling & Transformations** — Hierarchical scene graph with translation, rotation, and scaling applied to all objects
2. **Lighting & Shading** — Phong, Standard (PBR), and Physical materials with ambient, directional, and point light sources
3. **Camera & Projection** — Perspective (default walkthrough) and Orthographic (toggle) with interactive first-person PointerLock control
4. **Animation** — Four animated components: drone patrol, security camera pan, hologram rotation, and sliding door
5. **User Interaction** — Mouse/keyboard navigation, clickable door, toggleable lights, and camera projection switch
6. **Rendering Techniques** — Depth testing, procedural texture mapping, shadow map implementation, and PBR environment reflections

The project demonstrates that a sophisticated, multi-room 3D environment meeting academic CG standards can be delivered as a browser-hosted WebGL application accessible from any modern device without a plugin or native binary.

---

*Built with Three.js · React Three Fiber · @react-three/drei · Zustand · Vite*
*NexusPoint Innovation & Learning Hub — Computer Graphics Assignment Submission*
