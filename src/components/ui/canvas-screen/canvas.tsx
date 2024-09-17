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
} from "@react-three/postprocessing";
import { Color } from "three";
import EN124Building from "@/components/models/en124/building/en124-building";

interface Props {
  model: React.ReactNode;
  cameraPosition?: [number, number, number];
  antialias?: boolean;
  dpr?: [number, number];
  controlSettings?: OrbitControlsProps;
  onObjectHover?: (object: string | null) => void;
  onObjectClick?: (object: string) => void;
}

export default function CanvasScreen({
  model,
  cameraPosition = [0, 0, 0],
  antialias = false,
  dpr = [0.3, 0.95],
  controlSettings,
  onObjectHover,
  onObjectClick,
}: Props) {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  console.log("🚀 ~ selectedObject:", selectedObject)

  const handleObjectHover = (object: string | null) => {
    if (onObjectHover) {
      onObjectHover(object);
    }
    setSelectedObject(object);
  };

  const handleObjectClick = (object: string) => {
    if (onObjectClick) {
      onObjectClick(object);
    }
    setSelectedObject(object);
  };

  return (
    <Canvas
      className=" absolute"
      camera={{ position: cameraPosition, far: 800 }}
      gl={{
        antialias: antialias,
      }}
      dpr={dpr}
      shadows
    >
      <Suspense fallback={<ModelLoader />}>
        {/* Add directional light to cast shadows */}
        <directionalLight
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
        />

        {/* Render the JSX model directly */}
        <Selection>
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              blur
              visibleEdgeColor={
                selectedObject
                  ? Color.NAMES.greenyellow
                  : Color.NAMES.greenyellow
              }
              hiddenEdgeColor={
                selectedObject
                  ? Color.NAMES.greenyellow
                  : Color.NAMES.greenyellow
              }
              edgeStrength={0}
              width={1}
            />
          </EffectComposer>
          {React.cloneElement(model as React.ReactElement, {
            onObjectHover: handleObjectHover,
            onObjectClick: handleObjectClick,
          })}
        </Selection>

        <ambientLight intensity={-0.5} />
        {/* Ground Plane to receive shadows */}
        <Plane
          args={[500, 500]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#777777" />
        </Plane>

        <OrbitControls {...controlSettings} />
        <Environment preset="city" blur={1} />
        <Sky inclination={0.6} />

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["red", "green", "blue"]}
            labelColor="black"
          />
        </GizmoHelper>
      </Suspense>
    </Canvas>
  );
}
