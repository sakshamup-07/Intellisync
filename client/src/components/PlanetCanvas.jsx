import React, { Suspense, memo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PlanetModel() {
  const gltf = useGLTF("/planet/scene.gltf");
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 🌍 auto-rotation
    planetRef.current.rotation.y = t * 0.3;

    // 🌫 slight tilt (breathing effect)
    planetRef.current.rotation.x = Math.sin(t * 0.3) * 0.06;

    // 🪐 floating animation (gentle up/down)
    planetRef.current.position.y = Math.sin(t * 0.8) * 0.06;
  });

  return (
    <primitive
      ref={planetRef}
      object={gltf.scene}
      scale={1.3}
      position={[0, -0.3, 0]}
    />
  );
}

useGLTF.preload("/planet/scene.gltf");

function PlanetCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 3], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1, 1.3]}
    >
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1.1} position={[2, 2, 2]} />

      <Suspense fallback={null}>
        <PlanetModel />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export default memo(PlanetCanvas);
