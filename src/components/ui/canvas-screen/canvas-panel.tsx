"use client";
import React from "react";
import CanvasScreen from "./canvas";
import { EN117Building } from "@/components/models/en117/building/En117Building";
import RoomFloor8 from "@/components/models/en124/room/Room_floor_8";
import EN124Building from "@/components/models/en124/building/en124-building";

export default function CanvasPanel() {
  return (
    <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 h-full w-full gap-4">
      <div className="h-full">
        <CanvasScreen
          model={<EN117Building castShadow receiveShadow />}
          cameraPosition={[-5, 6, 12]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: 20,
            maxDistance: 50,
          }}
        />
      </div>
      <div className="h-full">
        <CanvasScreen
          model={<EN124Building castShadow receiveShadow />}
          cameraPosition={[0, 30, 45]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI /2.25 ,
            minDistance: 30,
            maxDistance: 80,
            enablePan: false,
          }}
        />
      </div>
      <div className="h-full">
        <CanvasScreen
          model={
            <RoomFloor8
              isShowLamp={false}
              isShowAir={false}
              castShadow
              receiveShadow
            />
          }
          cameraPosition={[-5, 6, 12]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: Math.PI / 2.25,
            minDistance: 20,
            maxDistance: 50,
            enablePan: true,
          }}
        />
      </div>
      <div className="h-full">
        <CanvasScreen
          model={
            <RoomFloor8
              isShowLamp={true}
              isShowAir={true}
              castShadow
              receiveShadow
            />
          }
          cameraPosition={[0, 0, 90]}
          controlSettings={{
            minPolarAngle: 0,
            maxPolarAngle: 0,
            minDistance: 10,
            maxDistance: 25,
            enablePan: true,
            enableRotate: false
          }}
        />
      </div>
    </div>
  );
}
