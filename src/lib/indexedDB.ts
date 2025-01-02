// libs/indexedDB.ts (ตัวอย่างด้วย idb)
import { openDB } from 'idb';

export async function getDB() {
  return openDB('my-3d-model-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('models')) {
        db.createObjectStore('models');
      }
    },
  });
}

export async function getModelFromIndexedDB(key: string) {
  const db = await getDB();
  return db.get('models', key);
}

export async function saveModelToIndexedDB(key: string, arrayBuffer: ArrayBuffer) {
  const db = await getDB();
  return db.put('models', arrayBuffer, key);
}
