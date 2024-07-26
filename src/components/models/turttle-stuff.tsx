'use client'
import {
  AccumulativeShadows,
  CameraControls,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  RandomizedLight,
  useAnimations,
  useGLTF,
  useMask,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useLayoutEffect, useRef } from "react";

interface TurtleStuffPropsValue {
  radius: number;
  color: string;
  opacity: number;
  position: any;
}

interface TurtleStuffProps {
  spheres: TurtleStuffPropsValue[];
}

interface SphereProps {
  position: any;
  scale: number;
  speed: number;
  color: string;
}

export default function TurtleStuff({ spheres }: TurtleStuffProps) {
  return (
    <Canvas
      shadows="variance"
      camera={{ position: [30, 0, -3], fov: 35, near: 1, far: 50 }}
      gl={{
        antialias: false,
      }}
      dpr={[1, 2]}
    >
      {/** Glass aquarium */}
      <Aquarium position={[0, 0.25, 0]}>
        <Float rotationIntensity={2} floatIntensity={10} speed={2}>
          <Turtle
            position={[0, -0.5, -1]}
            rotation={[0, Math.PI, 0]}
            scale={23}
          />
        </Float>
        <Instances renderOrder={-1000}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial depthTest={false} />
          {spheres.map((sphere, index) => (
            <Sphere
              key={index}
              scale={sphere.radius}
              color={sphere.color}
              speed={sphere.opacity}
              position={sphere.position}
            />
          ))}
        </Instances>
      </Aquarium>
      {/** Custom environment map */}
      <Environment preset="city" blur={1} resolution={500}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={[10, 10, 1]}
          />
          {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={4}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[4, 1, 1]}
            />
          ))}
          <Lightformer
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={[50, 2, 1]}
          />
          <Lightformer
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={[50, 2, 1]}
          />
        </group>
      </Environment>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

function Aquarium({
  children,
  position,
}: {
  children: React.ReactNode;
  position?: any;
}) {
  const ref = useRef<any>();
  const { nodes } = useGLTF("/models/shapes-transformed.glb") as any;
  const stencil = useMask(1, false);

  useLayoutEffect(() => {
    // Apply stencil to all contents
    ref.current.traverse(
      (child: any) =>
        child.material && Object.assign(child.material, { ...stencil })
    );
  }, []);

  return (
    <group scale={0.9} position={position} dispose={null}>
      <mesh
        castShadow
        scale={[0.61 * 6, 0.8 * 6, 1 * 6]}
        geometry={nodes.Cube.geometry}
      >
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>
      <group ref={ref}>{children}</group>
    </group>
  );
}

function Sphere({
  position,
  scale = 1,
  speed = 0.1,
  color = "white",
}: SphereProps) {
  return (
    <Float rotationIntensity={40} floatIntensity={20} speed={speed / 2}>
      <Instance position={position} scale={scale} color={color} />
    </Float>
  );
}

/*
    Author: DigitalLife3D (https://sketchfab.com/DigitalLife3D)
    License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
    Source: https://sketchfab.com/3d-models/model-52a-kemps-ridley-sea-turtle-no-id-7aba937dfbce480fb3aca47be3a9740b
    Title: Model 52A - Kemps Ridley Sea Turtle (no ID)
    */
function Turtle(props: any) {
  const { scene, animations } = useGLTF("/models/turtle-transformed.glb");
  const { actions, mixer } = useAnimations(animations, scene);

  useEffect(() => {
    mixer.timeScale = 0.5;
    actions["Swim Cycle"]?.play();
  }, []);

  useFrame(
    (state) => (scene.rotation.z = Math.sin(state.clock.elapsedTime / 4) / 2)
  );

  return <primitive object={scene} {...props} />;
}
