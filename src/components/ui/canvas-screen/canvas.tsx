"use client";
import {
  ContactShadows,
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  OrbitControlsProps,
  Plane,
  Sky,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import ModelLoader from "./model-loading";
import {
  Selection,
  EffectComposer,
  Outline,
  SSAO,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from 'postprocessing'
import { Color } from "three";

interface Props {
  model: React.ReactNode;
  cameraPosition?: [number, number, number];
  antialias?: boolean;
  dpr?: [number, number];
  controlSettings?: OrbitControlsProps;
  planeSize?: [number, number];
  planeColor?: Color | number;
  outlineStrength?: number;
  outlineResolution?: number;
  onObjectHover?: (object: string | null) => void;
  onObjectClick?: (object: string) => void;
}

export default function CanvasScreen({
  model,
  cameraPosition = [0, 0, 0],
  antialias = false,
  dpr = [0.3, 0.95],
  controlSettings,
  planeSize = [500, 500],
  planeColor = Color.NAMES.seagreen,
  outlineStrength = 3,
  outlineResolution = 0.1,
  onObjectHover,
  onObjectClick,
}: Props) {

  return (
    <Canvas
      className="absolute"
      camera={{ position: cameraPosition, far: 800 }}
      gl={{
        antialias: antialias,
      }}
      dpr={dpr}
      shadows
    >
      <Suspense fallback={<ModelLoader />}>
        {/* Add directional light to cast shadows */}
        {/* <directionalLight
          intensity={0}
          position={[-15, 10, -15]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        /> */}

        {/* Render the JSX model directly */}
        <Selection>
          <EffectComposer resolutionScale={outlineResolution} autoClear={false}>
            <Outline
              blendFunction={BlendFunction.SCREEN}
              xRay={true}
              blur={false}
              visibleEdgeColor={Color.NAMES.yellow}
              hiddenEdgeColor={Color.NAMES.yellow}
              edgeStrength={outlineStrength}
            />
          </EffectComposer>
          {model}
        </Selection>

        {/* <ambientLight intensity={-0.5} /> */}
        {/* Ground Plane to receive shadows */}
        <Plane
          args={planeSize}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color={planeColor} />
        </Plane>

        <OrbitControls {...controlSettings} />
        <Environment preset="city" blur={1} />
        {/* <Sky inclination={0.6} /> */}
      </Suspense>
    </Canvas>
  );
}
