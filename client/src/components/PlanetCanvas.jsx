import React, { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function PlanetModel() {
  const gltf = useGLTF("/planet/scene.gltf");
  return <primitive object={gltf.scene} scale={1.2} position={[0, -0.3, 0]} />;
}
useGLTF.preload("/planet/scene.gltf");

function PlanetCanvas() {
  return (
    <div className="pointer-events-none w-full h-[300px] opacity-60 absolute bottom-0 left-0">
      <Canvas
        dpr={[1, 1.3]}
        camera={{ position: [0, 1.2, 3], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />

        <Suspense fallback={null}>
          <PlanetModel />
        </Suspense>

        <OrbitControls
          enableRotate={true}
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}

export default memo(PlanetCanvas);
