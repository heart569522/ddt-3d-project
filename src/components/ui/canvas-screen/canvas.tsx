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
import React, { Suspense, useEffect, useState } from "react";
import ModelLoader from "./model-loading";
import {
  Selection,
  EffectComposer,
  Outline,
  SSAO,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Color, Vector3 } from "three";
import { getFloorStore } from "@/stores/get-floor-store";
import { usePathname } from "next/navigation";

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
  isRoomPage?: boolean;
  isUsePlane?: boolean;
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
  isRoomPage = false,
  isUsePlane = true,
}: Props) {
  // const pathname = usePathname();
  // const roomPath = pathname.split("/room/")[1]
  // const { setSelect } = getFloorStore(roomPath.substring(0, 7));

  // useEffect(() => {
  //   if (isRoomPage) {
  //     setSelect(roomPath)
  //   }
  // }, [isRoomPage, roomPath])

  const setDefaultPosition = new Vector3(...cameraPosition);
  // const [cameraPos, setCameraPos] = useState(new Vector3(...cameraPosition));

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
          <EffectComposer
            resolutionScale={outlineResolution}
            multisampling={0}
            autoClear={false}
          >
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
        {isUsePlane && (
          <Plane
            args={planeSize}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial color={planeColor} />
          </Plane>
        )}

        <OrbitControls
          {...controlSettings}
          // onChange={(e) => {
          //   const newPosition = e?.target?.object?.position?.clone();
          //   if (newPosition) {
          //     setCameraPos(newPosition); // Update camera position if defined
          //     console.log("Camera position:", newPosition); // Log position for testing
          //   }
          // }}
          target={isRoomPage ? setDefaultPosition : 0}
        />
        <Environment preset="city" blur={1} />
        {/* <Sky inclination={0.6} /> */}
      </Suspense>
    </Canvas>
  );
}
