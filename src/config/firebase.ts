import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const firebaseAnalytics = app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
export const firebaseAuth = getAuth();
export const firestore = getFirestore(app);
