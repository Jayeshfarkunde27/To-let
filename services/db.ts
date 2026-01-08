
import { db, storage } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, setDoc, getDoc, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Property, UserRole } from "../types";

// User Functions
export const createUserProfile = async (uid: string, email: string, name: string, role: UserRole) => {
  if (!db) return;
  try {
    await setDoc(doc(db, "users", uid), {
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// Property Functions
export const addProperty = async (property: Omit<Property, "id">) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, "properties"), property);
  return docRef.id;
};

export const getAllProperties = async (): Promise<Property[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, "properties"), orderBy("availableFrom", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
};

export const getOwnerProperties = async (ownerId: string): Promise<Property[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, "properties"), where("ownerId", "==", ownerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  } catch (error) {
    console.error("Error fetching owner properties:", error);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Property;
    }
    return null;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
};

// Image Upload
export const uploadPropertyImage = async (file: File): Promise<string> => {
  if (!storage) throw new Error("Storage not initialized");
  try {
    const storageRef = ref(storage, `properties/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
