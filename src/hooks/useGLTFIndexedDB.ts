"use client";

import { useEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// 1) ฟังก์ชันเพื่อเปิดหรืออัปเกรด IndexedDB
async function getDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("my-3d-model-db", 1);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("models")) {
        db.createObjectStore("models");
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

// 2) ดึงไฟล์ (ArrayBuffer) จาก IndexedDB
async function getModelFromIndexedDB(key: string) {
  const db = await getDB();
  return new Promise<ArrayBuffer | null>((resolve, reject) => {
    const tx = db.transaction("models", "readonly");
    const store = tx.objectStore("models");
    const req = store.get(key);
    req.onsuccess = () => {
      resolve(req.result || null);
    };
    req.onerror = () => {
      reject(req.error);
    };
  });
}

// 3) เซฟไฟล์ (ArrayBuffer) ลง IndexedDB
async function saveModelToIndexedDB(key: string, buffer: ArrayBuffer) {
  const db = await getDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("models", "readwrite");
    const store = tx.objectStore("models");
    const req = store.put(buffer, key);
    req.onsuccess = () => {
      resolve();
    };
    req.onerror = () => {
      reject(req.error);
    };
  });
}

// 4) สร้าง hook หลักสำหรับโหลด (และ parse) โมเดล
export function useGLTFFromIndexedDB<T extends GLTF = GLTF>(
  url: string
): { gltf: T | null; loading: boolean; error: any } {
  const [gltf, setGltf] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      setGltf(null);

      try {
        // ลองดึงไฟล์จาก IndexedDB
        let buffer = await getModelFromIndexedDB(url);
        if (!buffer) {
          // ถ้าไม่มีต้อง fetch จาก server
          const resp = await fetch(url, { cache: "no-store" });
          const buf = await resp.arrayBuffer();
          buffer = buf;
          await saveModelToIndexedDB(url, buffer);
        }

        // สร้าง GLTFLoader + DRACOLoader
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        // ชี้ path ที่มีไฟล์ .wasm หรือ .js สำหรับถอด Draco
        // ต้องตรงกับตำแหน่งที่คุณวางไฟล์ draco_decoder.js / draco_decoder.wasm
        dracoLoader.setDecoderPath("/draco/"); 
        loader.setDRACOLoader(dracoLoader);

        loader.parse(
          buffer,
          "",
          (parsed) => {
            if (!isCancelled) {
              setGltf(parsed as T);
              setLoading(false);
            }
          },
          (err) => {
            if (!isCancelled) {
              console.error("Error parsing GLTF:", err);
              setError(err);
              setLoading(false);
            }
          }
        );
      } catch (err) {
        if (!isCancelled) {
          setError(err);
          setLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { gltf, loading, error };
}