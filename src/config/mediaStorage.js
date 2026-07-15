const DB_NAME = 'rrfs_media_db';
const STORE_NAME = 'images';

/**
 * Initializes the IndexedDB database.
 */
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
    
    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
};

/**
 * Saves a File or Blob binary object to IndexedDB.
 * @param {string} id - The unique media ID
 * @param {Blob|File} file - The file/blob binary data
 */
export const saveImageBinary = async (id, file) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(file, id);
    
    request.onsuccess = () => {
      resolve(true);
    };
    
    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
};

/**
 * Retrieves a File or Blob binary object from IndexedDB.
 * @param {string} id - The unique media ID
 * @returns {Promise<Blob|File|null>}
 */
export const getImageBinary = async (id) => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      
      request.onsuccess = () => {
        resolve(request.result || null);
      };
      
      request.onerror = (e) => {
        reject(e.target.error);
      };
    });
  } catch (err) {
    console.error("IndexedDB error, returning null:", err);
    return null;
  }
};

/**
 * Deletes a File or Blob binary object from IndexedDB.
 * @param {string} id - The unique media ID
 */
export const deleteImageBinary = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve(true);
    };
    
    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
};
