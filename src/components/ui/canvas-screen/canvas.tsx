"use client";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  OrbitControlsProps,
  Plane,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import ModelLoader from "./model-loading";

interface Props {
  model: React.ReactNode;
  cameraPosition?: [number, number, number];
  antialias?: boolean;
  dpr?: [number, number];
  controlSettings?: OrbitControlsProps;
}

export default function CanvasScreen({
  model,
  cameraPosition = [0, 0, 0],
  antialias = false,
  dpr = [0.3, 0.95],
  controlSettings,
}: Props) {
  return (
    <Canvas
      camera={{ position: cameraPosition }}
      gl={{
        antialias: antialias,
      }}
      dpr={dpr}
      shadows
    >
      <Suspense fallback={<ModelLoader />}>
        {/* Add directional light to cast shadows */}
        <directionalLight
          intensity={0.8}
          position={[10, 10, 10]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        {/* Render the JSX model directly */}
        {model}
        <ambientLight intensity={0.2} />
        {/* Ground Plane to receive shadows */}
        <Plane
          args={[500, 500]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#777777" />
        </Plane>

        <OrbitControls enablePan={true} {...controlSettings} />
        <Environment preset="city" blur={1} />
        <Sky inclination={0.52} />
      </Suspense>
    </Canvas>
  );
}
