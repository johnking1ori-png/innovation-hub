# KHU Innovation and Learning Hub 3D - Technical Report

## 1. Introduction
This project implements a fully interactive 3D virtual model of the proposed **KHU Innovation and Learning Hub** (Zuntenium). The purpose of the project is to demonstrate advanced computer graphics concepts within a WebGL environment. The scene simulates a comprehensive educational and innovative space, including:
- A Reception Area (with interactive doors and lighting)
- An AI & Cybersecurity Lab (featuring a central Quantum Core)
- A Collaborative Workspace (procedural desk clusters)
- A Smart Classroom (with emissive smartboards)
- An Outdoor Environment (featuring landscaping, sci-fi trees, and walkways)

The user can explore the entire environment from a first-person perspective, observing lighting models, hierarchical elements, and real-time animations in alignment with modern graphics principles.

## 2. System Architecture
The application is built using a modern JavaScript web stack:
- **React**: Handles the overall application UI, state management (via `zustand`), and component composition.
- **Three.js**: The core WebGL 3D rendering engine.
- **React Three Fiber (R3F)**: A React renderer for Three.js, allowing 3D objects to be declared as JSX components.
- **Drei**: A collection of high-quality helper components for R3F, used for environments, stars, controls, and advanced shaders.
- **Vite**: The build tool ensuring fast bundling.

The architecture is highly modular:
- `App.jsx` establishes the global `Canvas`, central lighting, the background environment, and camera structures.
- `Player.jsx` handles custom interactive navigation controls and strict collision bounds.
- `components/Environment/` houses the individual rooms, composed procedurally to form the final Hub structure.
- `components/Objects/` contains isolated, recursively animated models like the Drone, Security Camera, and automatic Sliding Door.
- `utils/textures.js` mathematically generates raw procedural textures (grids, noise, checkerboards) using HTML5 `canvas`, injecting them directly into the Three.js pipeline to satisfy texture mapping requirements without external assets.

## 3. Explanation of Graphics Pipeline Implementation
The project leverages the WebGL graphics pipeline through Three.js to process and render the Hub:
1. **Vertex Processing:** As components load, their basic geometry (e.g., `boxGeometry`, `sphereGeometry`) defines vertices. Three.js applies model matrices to translate, rotate, and scale these vertices into world coordinates. 
2. **Camera and Projection:** The pipeline explicitly offers two projection techniques via a UI toggle:
   - **Perspective Projection (`PerspectiveCamera`)**: The default setting (FOV 60), where objects shrink mathematically with distance, converging to vanishing points to recreate realistic human vision.
   - **Orthographic Projection (`OrthographicCamera`)**: Alternative viewing mode where parallel lines remain parallel, enforcing 2D isometric rendering that ignores standard depth distortion.
3. **Rasterization:** Polygons are mapped securely to screen pixels (clamped by a fixed pixel ratio in high-resolution displays for optimum performance). 
4. **Shading & Materials:** Different rendering formulas are applied:
   - `meshStandardMaterial`: Used globally to apply Physically Based Rendering (PBR) lighting formulas based on roughness and metalness.
   - `meshPhysicalMaterial`: Used on glass objects with internal `clearcoat` and opacity settings to simulate true light refraction natively.
   - Advanced Shader Hooks: `MeshDistortMaterial` dynamically alters vertices linearly in the GPU during the fragment stage to create the waving effect inside the Quantum Core.
5. **Depth & Lighting Evaluation:** Depth testing ensures accurate occlusion of pixels. A high-resolution `directionalLight` acts as the sun, casting shadows into a 1024x1024 shadow map evaluated dynamically by receivers on the floor geometry.

## 4. Mathematical Transformations Used
Complex mathematical transformations are critical for organizing the entire 3D Hub:
- **Translation ($T$):** Applied constantly to place discrete nodes in their local `[x, y, z]` space.
  - Linear Translation Animation: The sliding entrance door interpolates its specific `x` coordinate relative to the user click condition across `useFrame` updates.
- **Rotation ($R$):** Pitch, Yaw, and Roll configurations (in radians).
  - Trigonometric Rotation Animation: The Drone NPC uses trigonometric functions (`Math.sin()`, `Math.cos()`) applied to its Y and X rotation vectors simultaneously over elapsed time to simulate continuous hovering. 
  - The Security Camera uses similar sine-wave logic bound to `rotation.y` to oscillate smoothly back and forth on its primary axis. 
- **Scale ($S$):** Used to proportionally stretch geometries (e.g., adjusting exact wall dimensions based on standard simple box polygons).
- **Hierarchical Modeling (Matrix Multiplication):** Essential for spatial structuring. By nesting standard `<mesh>` models inside `<group>` wrappers, a parent-child Matrix hierarchy is established. 
  - *Example Setup:* A student desk contains a body, legs, modesty panels, and chairs. If the parent group shifts ($T$), all subsequent child node coordinates are automatically updated by multiplying the parent transform matrix by the local matrix. This allowed identical clusters to be rapidly instantiated via arrays across the Workspace loop.

## 5. Screenshots of the Virtual Hub
*(User Action Required: Boot development server via `npm run dev` and press "PrtScn" or use snipping tools to embed images into the final submission PDF.)*
- **Please Insert: A snapshot of the overall exterior Walkway with Procedural Trees.** 
- **Please Insert: First-Person view looking into the AI Lab at the Quantum Core.**
- **Please Insert: Reception desk showing the Hologram Logo and glass material highlights.**
- **Please Insert: Compare & Contrast Perspective vs. Orthographic toggles looking at the Hub.**

## 6. Challenges and Recommendations
**Challenges Encountered:**
- **Performance Drag:** Employing highly computational materials like `transmission` on extensive glass properties and defining high-pixel ratios on 4K monitors caused immediate framerate losses.
- **Collision Detection Constraints:** Standard React Three Fiber lacks a native rigid body collision solution, resulting in the player passing through geometric walls.

**Recommendations / Resolutions:**
- **Optimization:** To secure framerates, expensive GPU models were swapped (e.g., replacing transmission with standard transparency). Shadow casting arrays on micro objects (like tiny desk legs) were manually disabled using optimized Boolean toggles, heavily relieving render loads. 
- **Nav Mesh Architecture:** Since integrating an entire physics library like `Cannon.js` for collision processing was too resource-intensive, strict boundary clamps were applied mathematically using `THREE.MathUtils.clamp()` to restrict XYZ movement vectors natively, ensuring the player stays inside the mapped boundaries.

## 7. Conclusion
The KHU Innovation and Learning Hub project successfully implemented all required foundational computer graphics principles. The model proves out complex spatial positioning through comprehensive Hierarchical transforms. Realistic lighting dynamics, PBR custom procedural material texturing, and specialized camera projection arrays (Perspective & Orthographic mapping) were integrated into an optimized, interactive first-person environment. Ultimately, the virtual 3D artifact succeeds in simulating an immersive structural space representing an advanced technological landscape.
