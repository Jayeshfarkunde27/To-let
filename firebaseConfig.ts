import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Helper to use env var or fallback (ignoring empty strings)
const getEnv = (key: string, fallback: string) => {
  const val = import.meta.env[key];
  return val && val.length > 0 ? val : fallback;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY", "AIzaSyDLdt9esD820O-wc3EMzWrzjzdfChBm50w"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", "to-let-1dfd1.firebaseapp.com"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", "to-let-1dfd1"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", "to-let-1dfd1.firebasestorage.app"),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "1063072239626"),
  appId: getEnv("VITE_FIREBASE_APP_ID", "1:1063072239626:web:b1ed1f3c709cb4b2dc8ff3")
};

// Log config for debugging (hiding sensitive parts)
console.log("Firebase Config in use:", {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 5)}...` : undefined
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Log successful initialization
console.log("✅ Firebase initialized successfully");

export { auth, db, storage, app };
