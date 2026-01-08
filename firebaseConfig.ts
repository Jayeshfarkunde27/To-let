import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDLdt9esD820O-wc3EMzWrzjzdfChBm50w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "to-let-1dfd1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "to-let-1dfd1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "to-let-1dfd1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1063072239626",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1063072239626:web:b1ed1f3c709cb4b2dc8ff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Log successful initialization
console.log("✅ Firebase initialized successfully");

export { auth, db, storage, app };
