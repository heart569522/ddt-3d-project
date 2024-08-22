"use client";
import { FloorTest } from "@/components/models/floor-test";
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import ModelLoader from "./model-loading";

export default function CanvasScreen() {
  return (
    <Canvas
      camera={{ position: [2, 8, -10] }}
      gl={{
        antialias: false,
      }}
      dpr={[0.3, 0.95]}
    >
      <Suspense fallback={<ModelLoader />}>
        <FloorTest />
        <OrbitControls
          enablePan={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
          minDistance={10}
          maxDistance={30}
        />
        <Environment preset="city" background blur={1} />
        <Sky inclination={0.52} />
      </Suspense>
    </Canvas>
  );
}
